"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import "./motion.css";

const ATTRIBUTE = "data-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Reveal each `.ww-rise` inside on its own as it enters, for content taller than the screen. */
  each?: boolean;
};

/**
 * Plays an entrance once, when scrolled to. The hidden look only exists once this sets its attribute,
 * so content always shows without JavaScript. An attribute, not state, so scrolling never re-renders.
 */
export function Reveal({ children, className, each = false }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = root.current;
    if (!container) return;

    let observer: IntersectionObserver | undefined;
    let waiting: HTMLElement[] = [];

    // Nobody should tab onto a link that is still hidden.
    const showAll = () => {
      observer?.disconnect();
      waiting.forEach((target) => target.setAttribute(ATTRIBUTE, "running"));
    };

    // On a client-side navigation Next resets the scroll in a parent layout effect, which runs after
    // this one, so positions read here would still use the previous page's scroll. The next frame
    // comes after that reset but before the first paint, so nothing shows in the wrong state.
    const frame = requestAnimationFrame(() => {
      const targets = each
        ? Array.from(container.querySelectorAll<HTMLElement>(".ww-rise"))
        : [container];

      // Visited pages stay mounted (cacheComponents), and Next re-runs this effect when one is shown
      // again, with the attributes it had. So every showing starts like a fresh load: anything not
      // reached yet waits to play as it is scrolled to, even if it played on an earlier visit, while
      // anything reached stays as it is. The hidden look has no transition, so resetting is instant.
      const revealLine = window.innerHeight * 0.95;
      waiting = targets.filter((target) => {
        if (target.getBoundingClientRect().top >= revealLine) {
          target.setAttribute(ATTRIBUTE, "pending");
          return true;
        }
        const state = target.getAttribute(ATTRIBUTE);
        // Already reached, for example a reload partway down the page: nothing to reveal.
        if (!state) target.setAttribute(ATTRIBUTE, "none");
        return state === "pending";
      });
      if (waiting.length === 0) return;

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute(ATTRIBUTE, "running");
            io.unobserve(entry.target);
          }
        },
        // Low enough that the last row of a page can always reach it, even while offset by its hidden look.
        { rootMargin: "0px 0px -5% 0px" },
      );
      observer = io;
      waiting.forEach((target) => io.observe(target));
      container.addEventListener("focusin", showAll);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      container.removeEventListener("focusin", showAll);
    };
  }, [each]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
