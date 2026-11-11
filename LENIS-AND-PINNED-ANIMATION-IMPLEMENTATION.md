# Lenis and Layered Depth Pinned Transitions: Implementation Handoff

| | |
|---|---|
| **Prepared** | 2026-11-11 |
| **For** | The next Claude Code session (implementation starts 2026-11-12) |
| **Project root** | `D:\Ashfaq\Next JS\waywise Tech\Tech\waywise tech` |
| **Status** | Both requirements **approved and mandatory**. Nothing implemented yet. Documentation only so far |
| **Related documents** | `AGENTS.md` (project-wide source of truth; read it first), `Reference-Website-Animation-Technical-Analysis.md` (the investigation behind the Lenis decision) |

This document records every approved decision so implementation can start without asking the owner to repeat anything. Each section separates:

- **APPROVED**: decided by the owner. Do not reopen, re-ask or offer alternatives.
- **TO VERIFY**: technical details the implementer must confirm against the real code, package or browser before relying on them.

---

## 1. Project context

### 1.1 Stack and architecture (verify against `AGENTS.md` and the code)

- **Framework:** Next.js 16.4.5 App Router, React 19.3, TypeScript, Tailwind CSS v4 (configured in `app/globals.css`, no config file). Font: Outfit via `next/font`.
- **Next.js docs:** `AGENTS.md` notes that this Next.js version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing code.
- **Dependencies today:** `next`, `react`, `react-dom`, `motion`. `motion` is only used for the mobile menu; section animations use CSS and `IntersectionObserver`. **GSAP is not installed and must not be added.**
- **`next.config.ts`:**
  - **`cacheComponents: true`:** visited routes stay mounted but hidden with `<Activity>`, so ids and `document.querySelector` results can come from hidden pages.
  - **Other settings:** `partialPrefetching: true`, `experimental.agentFeedback: true`, and a Turbopack `*.css` rule.
  - **CSS Modules do not work in this project:** use plain CSS with prefixed class names.
- **`app/layout.tsx`:** `<html className="… h-full scroll-pt-[110px] antialiased">`, `<body className="min-h-full flex flex-col">`, root metadata. `body` has `overflow-x: clip` (in `globals.css`).
- **Pages that render `PinnedSection`:** `/` (`app/page.tsx`), `/services`, the six Service Details pages (through `components/service-details/ServiceDetailsPage.tsx`), `/industries`, `/our-work`, `/contact`, `/about`, `/faq`, `/insights`. The per-page table is under "Pinned sections" in `AGENTS.md`.
- **Dev server:** `next dev` is normally running on port 3000. Do not stop or restart it, and avoid `next build` while it runs (both write `.next/`).
- **Checks that write no files:** `npx --no-install tsc --noEmit --incremental false` and `npx --no-install eslint .`.

### 1.2 Current `PinnedSection` (do not replace or redesign it)

Files: `components/home/PinnedSection.tsx` and `components/home/pinned-section.css`.

**Markup:**

```
div.pin-wrapper  (data-hold when `hold` is set; inline --pin-hold, --pin-height, --pin-limit)
  div.pin-body   (position: sticky, motion-safe only)
    <the section>
```

**How it works:**
- **Sticky pin:** `.pin-body` is `position: sticky; top: min(0px, calc(100svh - var(--pin-height)))`. A section pins once its bottom reaches the screen bottom (or at its top if it's shorter than the screen).
- **Page length unchanged:** `.pin-wrapper::after` is a spacer of `var(--pin-cover) + var(--pin-hold, 0px)`, cancelled by `margin-bottom: calc(-1 * var(--pin-cover))`.
- **Cover distance:** `--pin-cover: min(100svh, var(--pin-height), var(--pin-limit, var(--pin-height)))`.
- **Height measurement:** a `ResizeObserver` writes `--pin-height` (and `--pin-limit` when `limitCoverTo` is set). There are **no scroll or wheel listeners**.
- **Props:**
  - **`limitCoverTo`:** caps the pin at another element's height.
  - **`hold`:** a CSS length of extra pinned scrolling before the next section rises. The section stretches to at least `100svh` (`data-hold`).
- **Reduced motion:** every pin rule sits inside `@media (prefers-reduced-motion: no-preference)`. With reduced motion (or without JavaScript) sections are in normal document flow.
- **Keyboard focus release:** `.pin-body:has(:focus-visible):not([data-pointer-focus])` becomes `position: relative`. A `pointerdown` sets `data-pointer-focus`, so clicks never release the pin.
- **Rules (from `AGENTS.md`):**
  - **Positioned next section:** the section after a pin must be positioned (`PinnedSection` or a `relative` wrapper).
  - **Last-section rule:** applies to unfinished pages.
  - **Footer height:** the Footer is at least one screen tall when motion is allowed.

### 1.3 CSS scroll-timeline and animation conventions already in use

- **Scroll-driven animations** use `animation-timeline: view()` or named view timelines, and only exist inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Examples:
  - **About:** Our Global Presence (`components/about/about-presence.css`).
  - **Industries:** the Industry Solutions stack (`components/industries/industries-solutions.css`).
  - **Insights:** the photo drift (`components/insights/insights-articles.css`).
  - **FAQ:** the timeline (`components/faq/faq-questions.css`).
- **Single-transform rule:** write motion as a single `transform` in keyframes. Separate `translate`/`scale` beside `transform` were dropped from compiled keyframes in this pipeline.
- **Named timelines:** an element inside an `overflow: hidden` frame must use a named timeline from an ancestor, not `view()`.
- **Entrance reveals:** `components/motion/Reveal.tsx` (an `IntersectionObserver` that plays once, `data-reveal="pending|running|none"`) with `.ww-rise` in `components/motion/motion.css`.
- **Scroll listeners today (both passive):**
  - **FAQ timeline** (`components/faq/FaqQuestions.tsx`): toggles `data-hit` on the timeline points.
  - **Insights tilt** (`components/insights/ArticleTiltGrid.tsx`): re-checks the hovered card after a scroll.

### 1.4 FAQ timeline (built 2026-11-11, must keep working)

- **Fill:** `components/faq/faq-questions.css` defines `.pin-wrapper:has(> .pin-body > #faq-questions) { view-timeline: --wf-line block; }`. The fill animates `scaleY` over `animation-range: cover var(--wf-a) cover var(--wf-b)`.
- **Measuring and points:** `useFaqTimeline` in `FaqQuestions.tsx` measures on resize only. It sets `--wf-a`, `--wf-b` and `--wf-hold` (on the wrapper), and toggles `data-hit` on each point from a passive scroll listener.
- **Hold:** `app/faq/page.tsx` passes `hold="var(--wf-hold, 0px)"` to the FAQ `PinnedSection`.
- **Sticky card:** `lg:motion-safe:sticky`, at 96px at `lg` and 110px from `xl`.
- **Full details and QA:** in `AGENTS.md` under "FAQ page", in the entry titled "FAQ timeline + sticky card".

### 1.5 Protected and frozen components

`AGENTS.md` ("Section status") is authoritative. Relevant here:

- **Frozen:** Hero, ClientLogos, Services, Industries, FAQ (`components/services/Faq.tsx`), Final CTA, the UI/UX Details page, About Leadership, About Our Global Presence, Contact world map.
- **Protected:**
  - **`SiteHeader.tsx` (Navbar):** make no changes without the owner's instruction; see the exception in section 4.
  - **Our Work / `CardStack`:** `CardStack` is also used by Industry Solutions.
- **Shared files:** `components/ui/*`, `lib/assets.ts` (adding entries is fine) and `app/globals.css` need the owner's permission to change.
- **`pinned-section.css`:** "awaiting comprehensive QA and owner approval". The owner has **approved changing it for the Layered Depth transitions** (section 3). Keep the existing pin rules unchanged.

---

## 2. Mandatory requirement: Lenis

### 2.1 APPROVED

- **Mandatory, site-wide:** Lenis **must** be integrated for smooth mouse-wheel scrolling across the whole WayWise Tech website. It is **not optional**. Do not reconsider it or ask whether to use it.
- **Keep the existing Next.js architecture and CSS scroll timelines.**
- **Must be compatible with:** `PinnedSection`, reverse scrolling, navigation and reduced motion.
- **Wheel interception approved:** Lenis cancels native wheel events. That would otherwise fall under the project's "no scroll hijacking" rule.
- **Dependency approved:** Lenis is the only new dependency for this work. No GSAP, no other scroll library.

### 2.2 Researched configuration (from the reference investigation)

The reference site runs Lenis 1.1.20 with: `wrapper: window`, `content: <html>`, `smoothWheel: true`, `syncTouch: false`, `lerp: 0.1`, `wheelMultiplier: 1`, `touchMultiplier: 1`, `autoRaf: false` (driven by an external loop), `anchors: false`, `overscroll: true`, `autoResize: true`.

**Planned configuration for WayWise Tech:**

| Option | Value | Reason |
|---|---|---|
| `smoothWheel` | `true` | Smooth mouse-wheel scrolling (the requirement) |
| `syncTouch` | `false` | Keep native touch momentum on phones and tablets |
| `lerp` | `0.1` | The reference value: each wheel step glides out over about 1s |
| `autoRaf` | `true` | Use Lenis's own frame loop; no other animation library needed (the reference used `false` with an external loop) |
| `anchors` | `false` | Leave `#hash` links to the browser and Next.js |
| `wheelMultiplier` / `touchMultiplier` | `1` | Unchanged input distance |
| Wrapper | default (window / document) | Lenis must move the **real** document scroll, so sticky, scroll timelines, `IntersectionObserver` and `window.scrollY` keep working |
| Nested scroll | Lenis's nested-scroll handling and/or `data-lenis-prevent` (see 2.4) | Scrollable inner panels keep native scroll |

**TO VERIFY at install time:**
- **Version:** install the current stable `lenis` package, pinned to an exact version. Confirm its option names in that version (for example whether `allowNestedScroll` exists and what `autoRaf` and `anchors` default to).
- **Recommended CSS:** confirm its path (`lenis/dist/lenis.css`) and contents.

### 2.3 Root layout integration plan

- **Component:** a new client component, `components/motion/SmoothScroll.tsx` (`"use client"`), that creates and destroys the Lenis instance and renders no visible UI.
- **Mount:** once in `app/layout.tsx`, inside `<body>`. No other layout or page changes.
- **CSS:** import Lenis's recommended CSS from the component (global CSS imports are allowed in App Router components). **Do not edit `app/globals.css`**, which is protected. The recommended rules are `html.lenis { height: auto }`, `.lenis-smooth`, `.lenis-stopped` and `[data-lenis-prevent]`.
- **Cleanup:** call `lenis.destroy()` on unmount.

### 2.4 Behaviour rules

| Topic | Plan |
|---|---|
| **Reduced motion** | Do not create Lenis when `prefers-reduced-motion: reduce` matches. Listen for media-query changes and create or destroy it accordingly. Native scrolling then applies, as today |
| **Touch** | `syncTouch: false`: native touch scrolling everywhere |
| **Keyboard, scrollbar drag, Ctrl+wheel zoom** | Left native (Lenis does not smooth them) |
| **Nested scrolling** | Inner scroll areas must scroll natively. Known one: the mobile menu panel in `components/layout/SiteHeader.tsx` (around line 170, `max-h-[calc(100dvh-5rem)] … overflow-y-auto`). Try Lenis's built-in nested-scroll detection first. **Only if testing shows it fails**, add `data-lenis-prevent` to that panel (the only allowed `SiteHeader.tsx` change; see section 4) |
| **Navbar dropdowns (desktop)** | Not scrollable; no change expected. Verify the wheel over an open dropdown scrolls the page normally |
| **Anchor links** | `anchors: false`. `#hash` links keep native and Next.js behaviour. `scroll-pt-[110px]` on `<html>` keeps working |
| **Route transitions** | Per `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md`, `<Link>` keeps scroll position when the new page is in view, and otherwise scrolls natively to the top of the first Page element. A Lenis glide still in progress must not fight that: on pathname change, cancel it and re-sync, for example `lenis.scrollTo(window.scrollY, { immediate: true })` after Next has scrolled (one animation frame later), plus `lenis.resize()` if needed |
| **Kept-mounted pages** | Page height changes when routes swap. Lenis `autoResize` (it observes content size) must pick this up. Verify |

### 2.5 Compatibility with pinned sections and scroll timelines

- **Everything follows the real scroll:** Lenis moves the real document scroll position. `PinnedSection` (CSS sticky), every CSS scroll timeline, `Reveal`, the Industries and Our Work card stacks, the FAQ timeline and the Insights tilt all follow the smoothed scroll **without code changes**.
- **FAQ timeline stays locked to the page:** its fill is tied 1:1 to the scroll position. With Lenis the page itself glides, so the line glides with it. This is expected and approved.
- **Scroll listeners:** the two passive listeners keep firing, because Lenis produces native scroll events.

---

## 3. Mandatory requirement: premium `PinnedSection` transitions ("Layered Depth")

### 3.1 APPROVED experience

- The **previous section stays pinned**.
- The **incoming section rises over it exactly as currently designed** (1:1 with scroll, unchanged).
- While it is covered, the **outgoing section subtly scales down**, a **brand-navy tint** (`#0d1d44`) deepens over it, and **subtle rounded corners** give a layered-card impression.
- The animation is **scroll-driven** and **reverses naturally**.
- **Not used:** fade-to-zero, blur, full-section parallax or 3D tilt.
- No awkward gaps, sudden jumps or layout shifts. Content stays readable, and approved section designs stay unchanged at rest.

### 3.2 APPROVED starting values (desktop)

| Section type | Scale | Tint (navy overlay opacity at full cover) | Radius |
|---|---|---|---|
| **Hero + logos** | 1 → 0.97 | 22% | 16px |
| **Standard light sections** | 1 → 0.985 | 16% | 12px |
| **Dark CTA** (Final CTA) | 1 → 0.99 | 8% | 12px |

**Which sections get which type:**
- **Hero + logos:** the combined Hero + Client Logos unit, which is the first `PinnedSection` in `<main>` on every page that pins it.
- **Dark CTA:** the shared Final CTA (`components/home/FinalCta.tsx`, frozen; style it only through the pin layers).
- **Standard light:** every other pinned section.
- **Not pinned, so unaffected:** Our Work (Homepage) and Industry Solutions (`/industries`); their own card-stack animations must not change.
- **Held sections** (Industries trust `hold="70svh"`, FAQ questions `hold="var(--wf-hold, 0px)"`): the depth effect starts only **after** the hold, during the actual cover phase.

### 3.3 APPROVED responsive and reduced-motion behaviour

| Context | Behaviour |
|---|---|
| **Desktop** | Full subtle effect (values above) |
| **Tablet** | Reduced intensity |
| **Mobile** | The natural overlap stays. **Scale and rounded corners disabled** |
| **Reduced motion** | Lenis **and** the depth effects disabled. The existing natural-flow behaviour returns (pins already off) |

**TO VERIFY / implementation details (not owner decisions):**
- **Tablet amounts:** the research proposed about half the desktop scale change (Hero 1 → 0.985, Standard 1 → 0.9925, Dark CTA 1 → 0.995), keeping the radius and tint. Choose values, check them visually, and report them.
- **Breakpoints:** the research proposed desktop ≥ 1024px, tablet 768–1023px, mobile < 768px.
- **Tint on mobile:** the approved text only says to disable scale and radius. The research proposed keeping the tint on phones. Keep the tint, or a reduced tint, and state the choice in the report.

### 3.4 Technical design (proposed in research; verify while implementing)

- **Where:** only `components/home/pinned-section.css`, inside the existing `@media (prefers-reduced-motion: no-preference)` block and `@supports (animation-timeline: view())`. Existing pin rules stay as they are.
- **Timeline:** each `.pin-wrapper` gets a shared named view timeline (proposed name `--pin`). The wrapper is never sticky, so it moves 1:1 with the scroll. Animated elements are its descendants: the section inside `.pin-body`, `.pin-body::before` and `.pin-body::after`.
- **Range:** exactly the cover phase, after any hold, using variables the wrapper already has:
  - **Start:** `cover calc(max(100svh, var(--pin-height)) + var(--pin-hold, 0px))`
  - **End:** the same plus `var(--pin-cover)`

  **TO VERIFY:** that view-timeline range offsets accept these `calc()` and `max()` expressions. Confirm the start and end positions numerically against the moment the next section starts and finishes covering.
- **Outgoing section:** `transform: scale(...)` plus `border-radius` 0 → radius on the section inside `.pin-body`.
  - **Scale origin:** the centre of its visible part, `transform-origin: 50% calc(var(--pin-height) - min(var(--pin-height), 100svh) / 2)`.
  - **Keyframes:** single `transform` per keyframe (project rule).
- **Tint:** an overlay on `.pin-body::after` (brand navy `#0d1d44`), animating `opacity` 0 → the tint value.
- **Stage:** a navy backdrop on `.pin-body::before` behind the section, fading in with the effect. It shows only at the edges revealed by the scale and rounded corners, so nothing changes at rest.
- **Rest state must be pixel-identical:**
  - **Before the range:** no transform and no visible overlay. Use `animation-fill-mode` so that before the range there is no effect (for example `forwards`, not `both`).
  - **At the range end:** the section is fully covered, so holding the end state is invisible.
- **Section-type selection in CSS only (no prop, no page edits):**
  - **Hero + logos:** `main > .pin-wrapper:first-child`. Check every page; `/our-work` and `/insights` heroes may not be pinned.
  - **Dark CTA:** a selector that matches only the Final CTA's wrapper, for example `.pin-wrapper:has(> .pin-body > [aria-labelledby="final-cta-heading"])`. Verify the real attribute in `FinalCta.tsx`.
  - **Standard:** everything else.
- **Keyboard focus release:** while `.pin-body:has(:focus-visible):not([data-pointer-focus])` is released, switch the depth animations off (`animation: none`), so a section in normal flow is never scaled or tinted.
- **No JavaScript, no scroll listeners, no `PinnedSection.tsx` changes expected.** If a change becomes truly necessary, keep it minimal and non-structural, and report it.

---

## 4. Protected components and rules

- **Never structurally replace or redesign `PinnedSection`.** CSS additions in `pinned-section.css` are approved; the pin mechanism stays.
- **Do not modify** Our Work (`components/home/OurWork.tsx`, `CardStack.tsx`) or the Industry Solutions card-stack animations (`components/industries/IndustriesSolutions.tsx`, `industries-solutions.css`).
- **Preserve** approved section designs, content, SEO and existing animations, including frozen sections; see `AGENTS.md`.
- **The FAQ sticky card and the FAQ timeline must stay correct.** That covers the line synchronisation, the point switching, the measured hold, the Footer hand-off and the sticky card.
- **Preserve the keyboard-focus pin release.**
- **`SiteHeader.tsx`** may only change if testing proves it's needed for nested scrolling (the `data-lenis-prevent` attribute on the mobile menu panel), and nothing else.
- **No GSAP, no other new dependencies, no unrelated refactoring, no edits to `app/globals.css`.**
- **Global Content & SEO policy** (`AGENTS.md`): do not change any copy or metadata.

---

## 5. Approved implementation order

### Stage 1: Lenis

1. Install `lenis` (exact version) and add `components/motion/SmoothScroll.tsx`.
2. Mount it in `app/layout.tsx`.
3. Run the Lenis QA (section 6) and report.

### Stage 2: Layered Depth transitions

1. Implement the depth layers in `pinned-section.css`.
2. Fix the FAQ timeline-name conflict (section 6.1).
3. Run the transitions QA (section 6) and report.

**Do not combine the two stages into one unverified change.** Each stage is verified and reported on its own, so any regression can be traced to one change.

---

## 6. Technical risks and QA

### 6.1 Risks and planned fixes

| # | Risk | Planned fix / check |
|---|---|---|
| 1 | **FAQ view-timeline naming conflict.** A shared `view-timeline: --pin block` on every `.pin-wrapper` overrides the FAQ's `.pin-wrapper:has(> .pin-body > #faq-questions) { view-timeline: --wf-line block; }`, because it's the same element and property, which would break the FAQ fill | In Stage 2, switch the FAQ fill to the shared timeline name (`animation-timeline: --pin`) and remove its own `view-timeline` declaration. Ranges (`--wf-a`, `--wf-b`) stay the same. Re-run the FAQ timeline checks |
| 2 | **Next.js route navigation** fighting a Lenis glide still in progress | Cancel and re-sync on pathname change (2.4). Test client-side navigation from mid-scroll on every route, back and forward, and kept-mounted pages |
| 3 | **Hash links** | `anchors: false`. Native jumps; `scroll-pt-[110px]` still applies |
| 4 | **Mobile nested scrolling** (mobile menu `overflow-y-auto`) | Lenis's nested-scroll handling, else `data-lenis-prevent` on the panel (the only allowed `SiteHeader.tsx` change). Test the wheel and trackpad over the open menu below 1280px |
| 5 | **`<html>` is `h-full` (100%) while Lenis CSS sets `html.lenis { height: auto }`** | Verify on every route that page length, the sticky Navbar, `body min-h-full flex` and Footer placement are unchanged, and that there is no extra scroll or blank space |
| 6 | **Capped pins (`limitCoverTo`)**: with a cap smaller than the section's visible height (mainly very tall screens such as 2560×1440), part of the outgoing section can stay visible after the cover phase while keeping its end state (scaled and tinted), then scroll away | Check every capped pin (About Hero/Story/Leadership, FAQ Hero, Contact Overview/map, Homepage Final CTA `"footer"`) at 1920 and the tallest widths. If it's visible, reduce or skip the effect for that wrapper, and report |
| 7 | **Keyboard-focus pin release** | Disable depth animations while released (3.4). Tab through pinned sections and confirm no scaled or tinted section appears in normal flow |
| 8 | **Horizontal carousels** (Industries `IndustryCarousel`, Service Details `ProjectCarousel`) | `gestureOrientation` vertical; horizontal swipe, trackpad and arrows stay native. Test arrows, touch swipe and a horizontal trackpad |
| 9 | **Browser support** | Without `animation-timeline` (for example Firefox) the depth effect is absent and the plain overlap remains. Lenis still works. Not available in this environment: Safari and Firefox tests (report as untested) |
| 10 | **Reduced motion** | No Lenis, no depth effects, pins off (existing). Verify with Chrome `--force-prefers-reduced-motion` |
| 11 | **Transforms on outgoing sections** | No transform at rest. During cover only the outgoing section is scaled. Verify fixed and sticky children (FAQ sticky card, Navbar outside) behave |
| 12 | **Kept-mounted pages (`cacheComponents`)** | Lenis resize after route swaps. `:first-child` selectors only apply inside the visible page's `<main>`; confirm hidden pages don't match unexpectedly |

### 6.2 Approved QA matrix

| Dimension | Coverage |
|---|---|
| **Routes** | Every existing route: `/`, `/services`, all six `/services/<slug>` Details pages, `/industries`, `/our-work`, `/contact`, `/about`, `/faq`, `/insights` |
| **Widths** | 1920, 1440, 1280, 1024, 768, 390 |
| **Lenis (Stage 1)** | Real mouse-wheel scrolling (glide, no stutter); forward and reverse pinned hand-offs unchanged; client-side navigation between routes (mid-scroll, back/forward); `#hash` links; mobile menu scrolling; the FAQ timeline (line, points, hold, Footer hand-off); carousels; keyboard scrolling and focus; reduced motion (no Lenis) |
| **Layered Depth (Stage 2)** | Forward and reverse pinned hand-offs on every route with the approved values; rest state pixel-identical before covering; FAQ timeline still correct after the timeline-name change; capped pins; held sections (effect only after the hold); keyboard-focus release; reduced motion (no effect) |
| **Always** | No horizontal overflow, no blank gaps or end gaps, no layout shifts, no visual regressions in approved sections, no console errors |

---

## 7. Execution instructions for the next session

- **Read first:** this document, then the root `AGENTS.md`.
- **Verify the current source before editing:** `PinnedSection.tsx`, `pinned-section.css`, `app/layout.tsx`, `FaqQuestions.tsx`, `faq-questions.css`, `SiteHeader.tsx` (mobile menu), `FinalCta.tsx` (selector), `package.json`.
- **Follow the two-stage order** (section 5): finish and verify Lenis before starting the depth transitions.
- **Testing approach:**
  - **Default to code and terminal checks:** `tsc`, `eslint .`, and headless-Chrome scripts that measure positions and computed styles while scrolling.
  - **Screenshots:** use Chrome screenshots only where a visual judgement is needed. Avoid screenshot loops.
  - **Lenis glide:** headless sweeps can't show it; test it with real wheel input in Chrome.
- **Do not stop or restart the running dev server.** Avoid `next build` while it runs.
- **No Git operations** (no `git init`, commits or other Git commands) unless the owner explicitly asks.
- **No unrelated refactoring** and no dependencies other than `lenis`.
- **Update `AGENTS.md` after each successful stage:** the new component, configuration, pin depth layers, values, responsive behaviour, QA results and limitations. Also keep the FAQ timeline entry accurate after the timeline-name change.
- **Report after each stage:** changed files, test results (with numbers) and limitations. Then wait for the owner's instructions.

---

## Start here tomorrow

1. [ ] Read this file and the root `AGENTS.md`.
2. [ ] Re-read the current source of the files listed in section 7, and confirm nothing changed since 2026-11-11.
3. [ ] Read the relevant Next.js docs in `node_modules/next/dist/docs/` (`Link` scroll behaviour, client components in the root layout).
4. [ ] **Stage 1:** install `lenis` (exact version), create `components/motion/SmoothScroll.tsx` (configuration in 2.2, rules in 2.4), and mount it in `app/layout.tsx`.
5. [ ] Stage 1 QA (6.2), then update `AGENTS.md` and report. Stop for the owner's go-ahead if anything fails.
6. [ ] **Stage 2:** add Layered Depth to `pinned-section.css` (3.2–3.4) and move the FAQ fill to the shared timeline name (6.1 #1).
7. [ ] Stage 2 QA (6.2), then update `AGENTS.md` and report changed files, results and limitations.
