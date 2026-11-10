"use client";

import { useLayoutEffect, useRef } from "react";
import "./rolling-number.css";

const ATTRIBUTE = "data-roll";
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type RollingNumberProps = {
  /** The final text, such as "100+", "98%" or "2x". Digits roll; anything else stays still. */
  value: string;
  className?: string;
};

/**
 * Rolls each digit vertically, like an odometer, through one full turn and onto its final digit,
 * once, when it reaches the same trigger line as Reveal, including when it is already on screen at
 * load (the observer reports that in its first callback). All digits share one duration and easing.
 * Until then the number is invisible (its space is kept); it appears at 0 when reached, then rolls.
 * The server renders the final value, so it shows without JavaScript, with reduced motion, and when
 * the number is entirely above the screen at load. CSS does the motion; this only sets an attribute.
 * Screen readers get the final value only.
 */
export function RollingNumber({ value, className }: RollingNumberProps) {
  const root = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    // Next re-runs effects when a visited page is shown again; the attribute keeps it rolled once.
    if (element.getAttribute(ATTRIBUTE)) return;
    // Entirely above the screen at load, such as a reload further down: it would otherwise show 0
    // until scrolled back up. Anything on or below the screen rolls when the observer reports it.
    const passedAlready = element.getBoundingClientRect().bottom <= 0;
    if (passedAlready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.setAttribute(ATTRIBUTE, "done");
      return;
    }

    // Set before the first paint after hydration, so the final value never flashes first.
    element.setAttribute(ATTRIBUTE, "pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        element.setAttribute(ATTRIBUTE, "running");
      },
      { rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      // Not reached yet (React's development double run, or a page hidden first): reset, so the
      // next run can still roll. A roll already started keeps going to its final digit.
      if (element.getAttribute(ATTRIBUTE) === "pending") element.removeAttribute(ATTRIBUTE);
    };
  }, []);

  return (
    <span ref={root} className={className}>
      <span aria-hidden="true" className="ww-roll__visual">
        {[...value].map((character, index) => {
          if (!/\d/.test(character)) return <span key={index}>{character}</span>;
          const digit = Number(character);
          return (
            <span key={index} className="ww-roll__digit">
              {/* Sizes the column to the final digit, so the layout never changes. */}
              <span className="invisible">{character}</span>
              <span
                className="ww-roll__strip"
                style={{ "--roll-to": 10 + digit, "--roll-count": 11 + digit } as React.CSSProperties}
              >
                {/* One full turn, then on to the final digit. */}
                {[...DIGITS, ...DIGITS.slice(0, digit + 1)].map((step, position) => (
                  <span key={position}>{step}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
