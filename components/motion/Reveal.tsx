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

    const targets = each
      ? Array.from(container.querySelectorAll<HTMLElement>(".ww-rise"))
      : [container];

    // Next re-runs effects when a visited page is shown again, and the attribute keeps its state.
    const revealLine = window.innerHeight * 0.95;
    const waiting = targets.filter((target) => {
      const state = target.getAttribute(ATTRIBUTE);
      if (state === "running" || state === "none") return false;
      // Already reached, for example a reload partway down the page: nothing to reveal.
      if (!state && target.getBoundingClientRect().top < revealLine) {
        target.setAttribute(ATTRIBUTE, "none");
        return false;
      }
      target.setAttribute(ATTRIBUTE, "pending");
      return true;
    });
    if (waiting.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute(ATTRIBUTE, "running");
          observer.unobserve(entry.target);
        }
      },
      // Low enough that the last row of a page can always reach it, even while offset by its hidden look.
      { rootMargin: "0px 0px -5% 0px" },
    );
    waiting.forEach((target) => observer.observe(target));

    // Nobody should tab onto a link that is still hidden.
    const showAll = () => {
      observer.disconnect();
      waiting.forEach((target) => target.setAttribute(ATTRIBUTE, "running"));
    };
    container.addEventListener("focusin", showAll);

    return () => {
      observer.disconnect();
      container.removeEventListener("focusin", showAll);
    };
  }, [each]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
