"use client";

import { useEffect, useRef } from "react";
import { ourProcess } from "@/lib/content/process";

/** The step circles are 104px at every width (OurProcess.tsx). */
const CIRCLE_RADIUS = 52;
/** Control-point offset of each rope curve: the rope swings about 33px above and below the circle centres. */
const SWAY = 44;
/** From xl: scroll distance of the pinned journey (01 → 05), then the existing 30svh rest before the hand-off. */
const JOURNEY = 1.6;
const REST = 0.3;
/** From xl: the journey starts just after the section has settled into its pin. */
const LEAD = 0.04;
/** Below xl: a step activates when its circle centre rises to this fraction of the screen height. */
const ENTER = 0.7;

const GREEN = "#24a872";

/**
 * The Our Process journey (owner, 2026-11-18): a green rope that guides the reader through the five
 * steps with scroll. Scroll position is the single source of truth: one passive scroll listener turns
 * it into one progress value and, in the same handler, writes the rope's line, its head, the small-
 * screen pill and the steps' states, so nothing can drift apart. No React state, no timers.
 *
 * From xl (five across) the section is pinned for the journey: the page passes
 * `hold="var(--op-hold, 30svh)"` and this sets --op-hold on the pin wrapper to the journey plus the
 * existing 30svh rest, so the pin, then the hand-off, work exactly as before, only later. A curved
 * rope runs through the five circle centres over a dotted track, with a glowing head that slips behind
 * each circle as it arrives.
 *
 * Below xl the steps stack (3 + 2, 2 columns, 1 column), where a rope between them would cross their
 * text. The steps keep their layout and each activates as its circle scrolls into view; the rope
 * becomes a compact pill that rides at the bottom of the steps: a straight green rope with five nodes
 * and the current step's name.
 *
 * Steps get data-state: "active" (the hover look, the panel and a green ring), "done" (lifted, green
 * number) or "todo" (text dimmed). Reverse scrolling retraces the same values; stopping keeps them.
 * Reduced motion: no pin extension, the rope fully drawn, no pill, the steps at rest.
 */
export function ProcessJourney() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const container = svg?.parentElement;
    const pill = container?.querySelector<HTMLElement>("[data-op-pill]");
    const list = container?.querySelector("ol");
    const section = container?.closest("section");
    if (!svg || !pill || !container || !list || !section) return;

    const track = svg.querySelector<SVGPathElement>("[data-rope-track]")!;
    const line = svg.querySelector<SVGPathElement>("[data-rope-line]")!;
    const head = container.querySelector<HTMLElement>("[data-rope-head]")!;
    const pillFill = pill.querySelector<HTMLElement>("[data-pill-fill]")!;
    const pillNodes = Array.from(pill.querySelectorAll<HTMLElement>("[data-pill-node]"));
    const pillLabel = pill.querySelector<HTMLElement>("[data-pill-label]")!;
    const panel = container.querySelector<HTMLElement>(".ww-process__panel");
    const steps = Array.from(list.children) as HTMLElement[];
    const wrapper = section.closest<HTMLElement>(".pin-wrapper");
    const xl = window.matchMedia("(min-width: 1280px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // stops: scroll positions where progress reaches each step (each quarter of the rope);
    // activations: where each step activates (from xl, the moment the line touches its circle's edge).
    let thresholds: number[] = [];
    let activations: number[] = [];
    let ropeLength = 0;
    let current = -2; // nothing written yet

    const setReached = (reached: number) => {
      if (reached === current) return;
      current = reached;
      const resting = reduced.matches;
      steps.forEach((step, index) => {
        if (resting) delete step.dataset.state;
        else step.dataset.state = index === reached ? "active" : index < reached ? "done" : "todo";
      });
      pillNodes.forEach((node, index) => {
        node.dataset.state = index === reached ? "active" : index < reached ? "done" : "todo";
      });
      const shown = ourProcess.steps[Math.max(0, reached)];
      pillLabel.textContent = `${String(Math.max(0, reached) + 1).padStart(2, "0")}  ${shown.title}`;
      if (!panel) return;
      // The hover panel follows the active step unless a pointer is over the steps (OurProcess.tsx).
      if (reached >= 0 && !resting) panel.dataset.scrollStep = String(reached);
      else delete panel.dataset.scrollStep;
      if (panel.hasAttribute("data-hover")) return;
      if (reached >= 0 && !resting) {
        panel.style.setProperty("--ww-step", String(reached));
        panel.setAttribute("data-active", "");
      } else panel.removeAttribute("data-active");
    };

    /** Progress 0..1 along the rope: each step sits at a quarter, reached exactly at its threshold. */
    const progressAt = (scroll: number) => {
      const last = thresholds.length - 1;
      if (scroll <= thresholds[0]) return 0;
      if (scroll >= thresholds[last]) return 1;
      let i = 0;
      while (scroll >= thresholds[i + 1]) i++;
      const span = thresholds[i + 1] - thresholds[i];
      return (i + (span > 0 ? (scroll - thresholds[i]) / span : 1)) / last;
    };

    const update = () => {
      if (reduced.matches || !thresholds.length) return;
      const scroll = window.scrollY;
      const progress = progressAt(scroll);
      let reached = -1;
      activations.forEach((at, index) => {
        if (index === 0 ? scroll > at : scroll >= at) reached = index;
      });
      // Every visual is written from the same progress value, in the same frame.
      line.style.strokeDashoffset = String(1 - progress);
      if (ropeLength) {
        const point = line.getPointAtLength(progress * ropeLength);
        head.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
        head.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
      }
      pillFill.style.transform = `scaleX(${progress})`;
      setReached(reached);
    };

    const measure = () => {
      const viewport = window.innerHeight;
      const journey = xl.matches && !reduced.matches;

      // The pin rest: the journey plus the existing rest from xl; otherwise the page's 30svh fallback.
      if (wrapper) {
        if (journey) wrapper.style.setProperty("--op-hold", `${Math.round(viewport * (JOURNEY + REST))}px`);
        else wrapper.style.removeProperty("--op-hold");
      }

      // The rope through the circle centres (container coordinates; offsets ignore the reveal's translate).
      const centres = steps.map((step) => [
        list.offsetLeft + step.offsetLeft + CIRCLE_RADIUS,
        list.offsetTop + step.offsetTop + CIRCLE_RADIUS,
      ]);
      svg.setAttribute("width", String(container.offsetWidth));
      svg.setAttribute("height", String(container.offsetHeight));
      let d = `M${centres[0][0]} ${centres[0][1]}`;
      for (let i = 1; i < centres.length; i++) {
        const [x0, y0] = centres[i - 1];
        const [x1, y1] = centres[i];
        const reach = (x1 - x0) * 0.4;
        const sway = (i % 2 ? 1 : -1) * SWAY;
        d += ` C${x0 + reach} ${y0 + sway} ${x1 - reach} ${y1 + sway} ${x1} ${y1}`;
      }
      track.setAttribute("d", d);
      line.setAttribute("d", d);
      ropeLength = xl.matches ? line.getTotalLength() : 0;

      // Scroll positions in document pixels. The pin wrapper is never sticky, so its box is the
      // section's natural position; the section pins once its bottom reaches the screen bottom.
      const top = (wrapper ?? section).getBoundingClientRect().top + window.scrollY;
      const pinStart = top - Math.min(0, viewport - section.offsetHeight);
      if (journey) {
        const start = pinStart + viewport * LEAD;
        const span = viewport * JOURNEY;
        thresholds = steps.map((_, index) => start + (span * index) / (steps.length - 1));
        // Progress runs linearly from start, so a length along the rope maps straight to a scroll
        // position. Each step after the first activates where the line first touches its circle.
        activations = centres.map(([cx, cy], index) => {
          if (index === 0) return thresholds[0];
          let low = (ropeLength * (index - 1)) / (steps.length - 1);
          let high = (ropeLength * index) / (steps.length - 1);
          for (let i = 0; i < 24; i++) {
            const mid = (low + high) / 2;
            const point = line.getPointAtLength(mid);
            if (Math.hypot(point.x - cx, point.y - cy) > CIRCLE_RADIUS) low = mid;
            else high = mid;
          }
          return start + (high / ropeLength) * span;
        });
      } else {
        // Each step as its circle comes into view, in order, all reached by the end of the rest.
        let hold = 0;
        if (wrapper) {
          const probe = document.createElement("div");
          probe.style.cssText = "position:absolute;visibility:hidden;height:var(--pin-hold,0px)";
          wrapper.appendChild(probe);
          hold = probe.offsetHeight;
          probe.remove();
        }
        const listTop = list.getBoundingClientRect().top - section.getBoundingClientRect().top;
        const end = pinStart + hold;
        const enter = steps.map((step) => top + listTop + step.offsetTop + CIRCLE_RADIUS - viewport * ENTER);
        // Steps in the same grid row enter together, so each step gets at least a minimum scroll
        // distance after the previous one; all are reached by the end of the rest.
        const gap = Math.min(viewport * 0.12, Math.max(0, end - enter[0]) / (steps.length - 1));
        let previous = -Infinity;
        thresholds = enter.map((at, index) => {
          previous = index === 0 ? at : Math.max(at, previous + gap);
          return Math.min(previous, end - gap * (steps.length - 1 - index));
        });
        activations = thresholds;
      }
      container.toggleAttribute("data-journey", journey);
      current = -2;
      update();
    };

    const applyMotionPreference = () => {
      measure();
      if (reduced.matches) {
        line.style.strokeDashoffset = "0";
        head.style.opacity = "0";
        setReached(-1);
      }
    };

    applyMotionPreference();
    svg.dataset.ready = "";

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    observer.observe(section);
    observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });
    xl.addEventListener("change", measure);
    reduced.addEventListener("change", applyMotionPreference);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
      xl.removeEventListener("change", measure);
      reduced.removeEventListener("change", applyMotionPreference);
      wrapper?.style.removeProperty("--op-hold");
      container.removeAttribute("data-journey");
      steps.forEach((step) => delete step.dataset.state);
      if (panel) {
        delete panel.dataset.scrollStep;
        if (!panel.hasAttribute("data-hover")) panel.removeAttribute("data-active");
      }
      delete svg.dataset.ready;
    };
  }, []);

  return (
    <>
      {/* From xl: the rope. A dotted track, the green line drawn over it, and a glowing head. */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        fill="none"
        className="pointer-events-none invisible absolute top-0 left-0 hidden overflow-visible duration-[600ms] ease-out data-ready:visible xl:block motion-safe:transition-opacity motion-safe:group-data-[reveal=pending]/steps:opacity-0"
      >
        <path data-rope-track stroke={GREEN} strokeOpacity={0.35} strokeWidth={3} strokeLinecap="round" strokeDasharray="0 9" />
        <path
          data-rope-line
          pathLength={1}
          stroke={GREEN}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray="1 1"
          strokeDashoffset={1}
        />
      </svg>
      <div
        data-rope-head
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 hidden size-0 opacity-0 transition-opacity duration-300 will-change-transform xl:block motion-reduce:xl:hidden"
      >
        <span className="absolute -top-[7px] -left-[7px] size-[14px] rounded-full border-[3px] border-white bg-[#24a872] shadow-[0_0_0_6px_rgb(36_168_114/0.16),0_4px_10px_rgb(36_168_114/0.35)]" />
      </div>

    </>
  );
}

/** Below xl: the rope as a compact pill riding at the bottom of the steps. Rendered after the step list; ProcessJourney drives it. */
export function ProcessPill() {
  return (
    <div
      data-op-pill
      aria-hidden="true"
      className="pointer-events-none sticky bottom-4 z-20 mx-auto mt-10 flex w-full max-w-[440px] items-center gap-4 rounded-full bg-white/95 py-3 pr-5 pl-4 shadow-[0_8px_24px_rgb(35_31_32/0.08),0_0_0_1px_rgb(35_31_32/0.05)] transition-opacity duration-500 xl:hidden motion-reduce:hidden group-data-[reveal=pending]/steps:opacity-0"
    >
      <span data-pill-label className="shrink-0 text-[14px] leading-5 font-medium whitespace-pre text-[#0d1d44] tabular-nums">
        {`01  ${ourProcess.steps[0].title}`}
      </span>
      <span className="relative h-4 min-w-0 flex-1">
        <span className="absolute inset-x-[6px] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#24a872]/20" />
        <span
          data-pill-fill
          className="absolute inset-x-[6px] top-1/2 h-[3px] origin-left -translate-y-1/2 scale-x-0 rounded-full bg-[#24a872]"
        />
        {ourProcess.steps.map((step, index) => (
          <span
            key={step.title}
            data-pill-node
            data-state="todo"
            style={{ left: `calc(6px + (100% - 12px) * ${index / (ourProcess.steps.length - 1)})` }}
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#24a872]/40 bg-white transition-[background-color,border-color,scale] duration-300 data-[state=active]:scale-125 data-[state=active]:border-[#24a872] data-[state=active]:bg-[#24a872] data-[state=done]:border-[#24a872] data-[state=done]:bg-[#24a872]"
          />
        ))}
      </span>
    </div>
  );
}
