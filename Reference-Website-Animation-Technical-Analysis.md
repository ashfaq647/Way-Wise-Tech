# Reference Website Animation: Technical Analysis

| | |
|---|---|
| **Subject** | Scrolling and animation system of the reference website (`https://joyful-studies-761814.framer.app/`) |
| **Prepared for** | WayWise Tech website project (Next.js 16 App Router + Tailwind CSS v4) |
| **Date** | 2026-11-11 |
| **Method** | Read-only runtime inspection of the live site in Chrome: loaded modules, globals, stylesheets, DOM, computed styles, the Web Animations API, a mutation observer on scroll-driven elements, frame-by-frame scroll sampling and real mouse-wheel input |
| **Scope** | Documentation only. No project files, packages, configuration or Git state were changed during the investigation |

---

## Executive summary

The reference website is a **Framer** site that uses **native page scrolling**, with **Lenis 1.1.20** adding smoothing to the mouse wheel only.

- **How Lenis works here:** it cancels each native wheel step and eases the real document scroll position towards the target. It moves 10% of the remaining distance per frame (`lerp: 0.1`), so one wheel step glides out over about one second instead of the roughly 150–200 ms of Chrome's own wheel smoothing.
- **How the animations work:** custom Framer code components write one numeric progress value per frame into inline CSS custom properties. They also toggle state classes at thresholds. The CSS then computes `translate`, `scale` and `opacity` from those values, and the state classes trigger timed CSS transitions.
- **A second layer of smoothing:** the components also smooth their own progress values over several frames, on top of the Lenis smoothing.
- **What it does not use:** GSAP, CSS scroll-driven animations, or transform-based "virtual" scrolling. Pinning is plain `position: sticky`.

**For WayWise Tech:** the project already uses the same building blocks: native scrolling, sticky pinning, CSS-variable- and state-driven transitions, and `transform`/`opacity` motion. Its scroll-linked motion uses compositor-driven CSS scroll timelines, which are exactly 1:1 with the scroll and cost nothing when idle.

- **The only missing ingredient** is the wheel-smoothing layer (Lenis), plus the deliberate softening of scroll-linked values.
- **No replacement needed:** adopting the reference's approach would not require replacing the existing animation architecture. At most it adds one optional, separate layer.
- **Owner decision required:** that layer adds a dependency, overrides the native wheel, and trades strict 1:1 synchronisation for a softer glide. It conflicts with current project rules unless the owner approves it.

---

## 1. Investigation method

| Area | Technique |
|---|---|
| **Loaded technologies** | Script elements, `performance.getEntriesByType("resource")` module names, `window` globals and `<html>` classes |
| **Smooth-scroll engine** | Read the live Lenis instance's `options` and state. Wrapped its frame function to count calls and capture the calling stack |
| **Wheel behaviour** | Real mouse-wheel input through browser automation, a passive `wheel` listener recording `defaultPrevented`, and frame-by-frame sampling of `scrollY` and Lenis `targetScroll` |
| **Animation inventory** | `document.getAnimations()` (types, timelines and keyframe properties), computed `will-change`, `position` and `transform` on all 3,274 body elements |
| **Stylesheets** | Walked every CSS rule, including `@media`, `@supports` and component-injected `<style>` tags |
| **Scroll-linked updates** | Diffed every attribute in the pinned scenes at two scroll positions, then returned to confirm they revert. A `MutationObserver` logged inline style writes per frame |
| **Runtime cost** | Counted `getBoundingClientRect` and `offsetHeight` calls per frame while scrolling and while idle |

> **Measurement caveat:** the automated browser tab was throttled to roughly 30–40 frames per second (background-tab behaviour). All timings are real measurements, but at that frame rate, not at 60 or 120 Hz.

---

## 2. Findings: Confirmed (direct evidence)

### 2.1 Technology stack

| Technology | Evidence |
|---|---|
| **Framer (published site)** | Modules served from `framerusercontent.com`: `framer.*.mjs`, `react.*.mjs`, `motion.*.mjs`, `rolldown-runtime.*.mjs`, `toplevel-deps.*.mjs`, `script_main.*.mjs`. Framer globals `__framer_importFromPackage` (function) and `__framer_events` (object) |
| **React** | `react.*.mjs` module (Framer's bundled React) |
| **Motion (Framer's animation library)** | `motion.*.mjs` module loaded by the Framer runtime |
| **Custom code components** | Modules `RwFaq`, `RwCta`, `RwFunnel`, `RwNumbers`, `RwPricing`, `RwTeam`. They inject about 315 KB of CSS through 19 `<style>` tags in the body, with class prefixes `rw-` and `rwfn-` |
| **Lenis 1.1.20** | Module `lenis@1.1.…mjs`. Globals `window.lenisVersion = "1.1.20"` and `window.__ltLenis` (the live instance). Class `lenis` on `<html>` |
| **No GSAP or other scroll libraries** | No `gsap`, `ScrollTrigger`, `ScrollSmoother`, `LocomotiveScroll`, `Barba` or `swup` globals, and no such modules among the loaded resources |
| **No CSS scroll-driven animations** | No CSS rule uses `animation-timeline`, `scroll-timeline` or `view-timeline`. Four `@supports` matches only tested for the feature. All running animations use `DocumentTimeline` |

### 2.2 Lenis configuration (read from the live instance)

| Option | Value | Meaning |
|---|---|---|
| `wrapper` | `window` | Smooths the **native document scroll**; no transform-based fake scrolling |
| `content` | `<html>` | Measures the whole document |
| `eventsTarget` | `window` | Listens for wheel input on the window |
| `smoothWheel` | `true` | Mouse-wheel input is smoothed |
| `lerp` | `0.1` | Each frame moves 10% of the remaining distance to the target |
| `syncTouch` | `false` | Touch scrolling is **not** smoothed; native touch scrolling is kept |
| `syncTouchLerp` | `0.075` | Unused while `syncTouch` is false |
| `touchInertiaMultiplier` | `35` | Unused while `syncTouch` is false |
| `touchMultiplier` / `wheelMultiplier` | `1` / `1` | Input distance unchanged |
| `orientation` / `gestureOrientation` | `vertical` / `vertical` | Vertical scrolling only |
| `infinite` | `false` | Normal page bounds |
| `overscroll` | `true` | Native overscroll kept |
| `autoResize` | `true` | Re-measures on resize (resize and content observers present) |
| `autoRaf` | `false` | Lenis does not run its own loop; an external frame loop calls `lenis.raf()` |
| `anchors` | `false` | Anchor links are not smoothed by Lenis |
| `easing` | function | Present (used for programmatic `scrollTo`) |

**Runtime state (idle at the top of the page):**
- **Scroll state:** `isScrolling: false`, `isStopped: false`, `isLocked: false`.
- **Dimensions:** `width 1920`, `height 945`, `scrollHeight 18644`, `scrollWidth 1905`.

### 2.3 Scroll behaviour measurements

**Wheel interception:** the recorded `wheel` event had `defaultPrevented: true`. Lenis cancels the native wheel step and drives the scroll position itself.

**One wheel input (300 px target), sampled per frame:**

| Time from wheel (ms) | `scrollY` (px) | Lenis target (px) |
|---:|---:|---:|
| 0 | 0 | 300 |
| ~6 | 54 | 300 |
| ~71 | 135 | 300 |
| ~123 | 178 | 300 |
| ~153 | 200 | 300 |
| ~254 | 245 | 300 |
| ~337 | 267 | 300 |
| ~446 | 282 | 300 |
| ~565 | 289 | 300 |
| ~706 | 296 | 300 |
| ~826 | 298 | 300 |
| ~1063 | 300 | 300 |

The curve is an exponential ease-out: each frame closes about 10% of the remaining gap. The movement lasted about 1.03 s across 35 changing frames. Chrome's own wheel smoothing typically completes a step in roughly 150–200 ms.

**Frame loop:**
- **Who drives Lenis:** `lenis.raf()` is called from a loop in `toplevel-deps.*.mjs` that runs a `Set` of callbacks (`Set.forEach`) each frame. The call rate followed the throttled tab's frame rate (about 30 per second in one sample, 20 in another).
- **Idle behaviour:** the loop keeps calling `lenis.raf()` even when the page is idle.

### 2.4 Pinning and sticky elements

All pinning is plain `position: sticky` inside a taller parent. Pinned length equals the parent's height minus the sticky element's height.

| Element | Size | `top` | Parent height | Pinned scroll distance |
|---|---|---|---|---|
| `rwfn-sticky` (full-screen scene) | 1905 × 945 | `0px` | 3024 px | about 2,079 px |
| FAQ left column (heading + card) | 588 × 574 | `110px` | 794 px | about 220 px |
| Reveal section (`rw-rev`) | 1905 × 797 | `148px` | 1594 px | about 797 px |

There were 3 sticky elements in total and 8 `position: fixed` elements.

### 2.5 Animation architecture

**Inventory (`document.getAnimations()` at load):**

| Metric | Value |
|---|---|
| Running animations | 46 |
| Types | 38 `CSSAnimation`, 8 `CSSTransition` |
| Timelines | 46 `DocumentTimeline`; no scroll or view timelines |
| Animated keyframe properties | `opacity` (70), `transform` (28), `box-shadow` (16), `scale` (6), `translate` (6), `background-color` (2), `color` (2) |
| Elements with inline `transform` (set by JavaScript) | 41 |
| `will-change` | `transform` on 8 elements, `clip-path` on 2 |
| 3D transform tricks (`translate3d`, `translateZ`, `matrix3d`) | 0 |
| `@keyframes` rules | 79 |
| `prefers-reduced-motion` rules | 42 |
| Framer "appear" elements (`data-framer-appear-id`) | 1 |

**Pattern 1: JavaScript writes a progress value, CSS does the maths.**

As you scroll, the components write numeric progress values into **inline CSS custom properties**, one style write per element per frame. Examples:

| Element | Inline variables observed |
|---|---|
| `rwfn-pin` | `--sp: 1.0000; --pp: 1.0000` |
| `rwfn-band` (×4) | `--i: 0…3; --f: 1.0000` |
| `rw-rev` | `--h: 797px; --layer: 9; --rv: 0.2156` |
| `rw-hd-i` (heading letters) | `--pd: 620ms … 785ms` (staggered delays) |

The component-injected CSS computes the visual result from these values. For example:

```css
/* Photo parallax driven by --sp */
translate: 0 calc((var(--sp, .5) - .5) * var(--par, 1) * -7%);

/* Reveal overlay driven by --rv */
translate: 0 calc((1 - var(--rv)) * var(--t));
opacity: min(1, calc(var(--rv) * (1 - var(--rv)) * 9));
```

**Pattern 2: state classes trigger timed CSS transitions.**

At scroll thresholds, the components toggle classes such as `is-on`, `is-act` and `is-done`. CSS runs a timed transition from the change. Examples:

| State | Transition |
|---|---|
| `.rw-um.is-on img { scale: 1 }` (from 1.28) | `transition: scale 1.9s cubic-bezier(.16,.84,.24,1)` |
| FAQ point `data-hit` | background 0.4 s, box-shadow 0.4 s, `scale` 0.5 s `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot) to 1.15 |
| FAQ rows (reveal) | `opacity .9s ease 200ms`, `translate 1s cubic-bezier(.2,.8,.2,1) 200ms` from `0 18px` |

**Reversibility:** an attribute diff of both pinned scenes at 10% and 60% of their pinned range, then back at 10%, showed the progress values and state classes revert exactly. One leftover inline offset in the reveal section (`-0.0px`) was cosmetic.

**Pattern 3: the components smooth their own values.**

After an instant jump in scroll position, `--rv` did not snap to its new value. It eased towards it, keeping about 82% of the remaining gap each frame, with exactly one style write per frame:

`0.1768 → 0.1450 → 0.1189 → 0.0975 → 0.0799 → 0.0655 → 0.0537 → 0.0441 → 0.0361 → 0.0296 → 0.0243 → 0.0199 → 0.0163 → 0.0134 → …`

The FAQ timeline showed the same behaviour:
- **Lag:** during a fast programmatic scroll its fill end fell about 90 px behind its line (551 px from the viewport top), then settled over about 0.6–0.8 s.
- **Fill:** a full-height element scaled with `scaleY`, with `transition-duration: 0s`. The smoothing comes from JavaScript, not CSS.

### 2.6 Runtime cost observations

| Measurement | While scrolling | While idle |
|---|---|---|
| `getBoundingClientRect` calls | 598 in 124 frames (about 4.8 per frame) | 49 in 15 frames (about 3 per frame) |
| `offsetHeight` reads | 1 | n/a |
| Lenis frame function | Called every frame | Still called every frame |
| Component style writes | 1 per animated element per frame (no more than 1 per frame observed) | n/a |

The components run per-frame loops that read layout and write CSS variables, and these loops **do not stop when the page is idle**. Lenis has no `scroll` event subscribers (its listener list is empty), so the components do not listen to Lenis.

### 2.7 Responsive and accessibility signals

| Signal | Observation |
|---|---|
| Breakpoints | Framer standard: `(min-width: 810px) and (max-width: 1199.98px)`, `(max-width: 809.98px)`, plus component-specific ones (`1240px`, `1099px`, `699px`, `600px`, `360px`) |
| Touch and small screens | `(max-width: 600px), (hover: none)` simplifies UI: `.rw-btn` wraps (`min-height: 56px`), `.rw-roll { height: auto }`, `.rw-l2` and `.rw-ping` hidden |
| Reduced motion | 42 `prefers-reduced-motion` rules in the CSS |
| Touch scrolling | `syncTouch: false`; Lenis does not smooth touch input |

---

## 3. Findings: Strong indications (not proven)

| Indication | Basis | Why it is not confirmed |
|---|---|---|
| **Lenis is driven by Motion's frame loop, probably set up by Framer's published "Smooth Scroll" component** | `lenis.raf()` is called from a `Set.forEach` callback loop in `toplevel-deps.*.mjs`, the shape of Motion's batched frame loop, which is how Framer's smooth-scroll integration is known to work | The minified source was not read; the exact component that created the instance was not identified |
| **Phones and tablets use fully native touch momentum scrolling** | `syncTouch: false` is Lenis's documented setting for leaving touch input alone | Not tested on a real touch device |
| **The components poll layout in their own animation loops rather than listening to scroll events** | Lenis has no `scroll` subscribers, yet about 3–5 `getBoundingClientRect` calls happen every frame, and progress values update once per frame | Event listeners added before inspection cannot be listed from page JavaScript |

---

## 4. Findings: Could not verify

- **Real frame rate:** the automated tab was throttled to about 30–40 fps, so smoothness at 60 or 120 Hz could not be measured.
- **Source code:** the exact (minified) component code was inferred from runtime behaviour only.
- **Rendering costs:** GPU layer promotion, compositing and paint costs need a DevTools performance trace, which was not recorded.
- **Real devices and other input:** iOS and Android behaviour, trackpad (high-resolution) wheel input, and keyboard scrolling.
- **Reduced motion and Lenis:** whether `prefers-reduced-motion` also turns Lenis smoothing off. The CSS has 42 reduced-motion rules, but Lenis's runtime behaviour under that setting was not tested.

---

## 5. How the reference achieves its smoothness

1. **Wheel smoothing (the main effect).**
   - **What it does:** native Chrome wheel smoothing finishes a step in roughly 150–200 ms. Lenis cancels the native step and eases the real scroll position towards the target, 10% of the remaining distance per frame, so each step glides out over about one second.
   - **Why nothing breaks:** Lenis moves the actual scroll position, so `position: sticky`, Intersection Observers and layout reads keep working unchanged.
2. **A second smoothing layer.** The components ease their own progress values towards their targets (about 18% of the remaining gap per frame). Even irregular input reaches the screen as a smooth curve.
3. **Cheap rendering.** JavaScript writes one number per frame into a CSS custom property, and CSS derives `translate`, `scale` and `opacity` from it. Discrete states (`is-on`, `is-act`, `data-hit`) switch on and then play timed CSS transitions with soft or slightly overshooting curves.
4. **No layout changes from scrolling.** Pins are `position: sticky` inside tall parents. Pinning never changes layout, so nothing jumps.

**Trade-offs built into this approach:**
- **Deliberate lag:** what you see trails the true scroll position by up to about one second.
- **Constant loops:** frame loops and layout reads keep running even when idle.

---

## 6. Comparison with the WayWise Tech project

| Area | Reference website | WayWise Tech project |
|---|---|---|
| **Scrolling** | Native, with Lenis wheel smoothing | Native |
| **Pinning** | `position: sticky` inside a tall parent | Same idea: `PinnedSection` (sticky body, `::after` spacer and a cancelling negative margin; optional `hold` and `limitCoverTo`) |
| **Scroll-linked motion** | JavaScript loops write CSS variables, with JavaScript smoothing | CSS scroll timelines (`animation-timeline: view()`, named view timelines) on the compositor, exactly 1:1 with the scroll; for example Our Global Presence, Industry Solutions, the Insights photo drift and the FAQ timeline |
| **State transitions** | Classes toggled at thresholds, then timed CSS transitions | The same pattern: `data-reveal`, `data-hit`, `data-hover` with timed CSS transitions |
| **Entrance reveals** | Timed transitions | `Reveal` (Intersection Observer, plays once) with CSS transitions |
| **Idle cost** | Loops and layout reads keep running | No work when idle: Intersection Observer, `ResizeObserver` and CSS timelines only |
| **Animated properties** | Mostly `opacity`, `transform`, `scale`, `translate` | `transform`, `translate`, `scale`, `opacity`, `clip-path` (with `box-shadow` on hover only) |
| **Reduced motion** | 42 reduced-motion rules (Lenis behaviour not verified) | All motion and pinning is limited to `prefers-reduced-motion: no-preference` |
| **Touch** | Native (Lenis `syncTouch: false`) | Native |

**What the project lacks:** only the wheel-smoothing layer and the deliberate softening of scroll-linked values. Everything else is already present, and the scroll-linked motion is implemented more efficiently.

---

## 7. Adoption recommendations

### 7.1 Already in place (no action needed)

- One CSS variable or data attribute written from JavaScript, with CSS deriving the visual result.
- `transform`/`opacity`-only motion.
- `position: sticky` pinning that never changes layout.
- Timed, slightly overshooting state transitions (for example the FAQ timeline's point pop, which uses the reference's exact timing).

### 7.2 Optional: Lenis for mouse-wheel smoothing only (requires owner approval)

This is the single ingredient behind most of the reference's distinctive feel.

**Integration footprint:**
- **Size:** one small client component mounted once in the root layout. Nothing would need rewriting.
- **Effect on existing motion:** because Lenis moves the real scroll position, the existing CSS scroll timelines would follow the smoothed scroll automatically. That covers `PinnedSection`, `Reveal`, the Industry Solutions card stack and the FAQ timeline.

**Suggested configuration if approved:**

| Setting | Value | Reason |
|---|---|---|
| `smoothWheel` | `true` | Smooth the mouse wheel only |
| `syncTouch` | `false` | Keep native touch momentum |
| Frame loop | Lenis's own (`autoRaf: true`) | No extra animation library needed |
| `lerp` | about `0.10–0.12` | Gentle, close to the reference |
| Keyboard and touch | Not smoothed | Keep native behaviour |
| Reduced motion | Lenis turned off | Lenis does not do this by itself |

**Risks and trade-offs:**

| Risk | Detail |
|---|---|
| **New dependency** | Adds the `lenis` package. The project rules require the owner's approval for new packages |
| **Wheel interception** | Lenis cancels the native wheel event (`defaultPrevented: true`). This conflicts with the project's current "no scroll hijacking" rule unless the owner explicitly relaxes it for mouse wheels |
| **Lag vs. strict sync** | Visuals would trail the wheel by up to about one second. This works against the strict 1:1 synchronisation the owner chose for the FAQ timeline |
| **Reduced motion** | Must be explicitly turned off under `prefers-reduced-motion` |
| **Navigation** | Anchor links and App Router route changes need handling, including scroll restoration and Next.js keeping visited pages mounted (`cacheComponents`) |
| **Nested scroll areas** | Scrollable regions such as the Navbar's mobile menu and dropdowns need `data-lenis-prevent` |
| **Runtime cost** | One additional per-frame loop while active |

### 7.3 Not recommended

- **Always-on frame loops that read layout every frame**, including when idle.
- **JavaScript smoothing of scroll-linked values.** The project's compositor-driven CSS scroll timelines are smoother under main-thread load and cost nothing when idle.

---

## 8. Conclusion

The reference website's smoothness comes from three things:
- Lenis wheel smoothing over native scrolling (`lerp: 0.1`, wheel only).
- Component-level smoothing of scroll progress values.
- A disciplined rendering model: one CSS variable per frame, `transform`/`opacity` motion, sticky pins and timed state transitions.

It uses no GSAP, no CSS scroll timelines and no transform-based virtual scrolling.

The WayWise Tech project already implements the same rendering model, with more efficient scroll-linked motion through CSS scroll timelines. **Adopting the reference's approach would not require replacing the existing animation architecture.** The only optional addition is a separate Lenis wheel-smoothing layer. That layer adds a dependency, overrides the native wheel, and trades strict 1:1 synchronisation for a softer glide, so it should only be added with the owner's explicit approval.
