"use client";

import { useEffect, useRef, type ReactNode } from "react";

type CardStackProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Gives each card its measured height, because CSS cannot read an element's own height for `top`.
 * A card that would not fit at its usual pin can then stop higher, so its bottom is never cut off.
 * It also measures where the list sits in its parent: --stack-head (the parent's top padding, where
 * the sticky header rests) on the parent, and --stack-top (that plus the list's distance below the
 * parent's content top, i.e. below the header) on the list. Layout boxes only, so the header's
 * sticky shift and reveal translate never skew it.
 * Until this runs the variables are unset, `top` is invalid and the cards scroll normally.
 */
export function CardStack({ children, className }: CardStackProps) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = list.current;
    const parent = ul?.parentElement;
    if (!ul || !parent) return;

    const measureStack = () => {
      const style = getComputedStyle(parent);
      // The header rests at the parent's top padding, so the list's arrival position is its distance
      // from the parent's padding edge (border excluded).
      const offset = ul.getBoundingClientRect().top - parent.getBoundingClientRect().top;
      parent.style.setProperty("--stack-head", style.paddingTop);
      ul.style.setProperty("--stack-top", `${offset - parseFloat(style.borderTopWidth)}px`);
    };

    const cards = new Set<Element>(ul.children);
    const observer = new ResizeObserver((entries) => {
      for (const { target } of entries) {
        if (cards.has(target)) {
          (target as HTMLElement).style.setProperty(
            "--card-height",
            `${target.getBoundingClientRect().height}px`,
          );
        }
      }
      measureStack();
    });
    cards.forEach((card) => observer.observe(card));
    observer.observe(parent);
    if (parent.firstElementChild && parent.firstElementChild !== ul) {
      observer.observe(parent.firstElementChild);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={list} className={className}>
      {children}
    </ul>
  );
}
