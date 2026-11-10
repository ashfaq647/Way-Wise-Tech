"use client";

import { useEffect, useRef, type ReactNode } from "react";

type CardStackProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Gives each card its measured height, because CSS cannot read an element's own height for `top`.
 * A card that would not fit at its usual pin can then stop higher, so its bottom is never cut off.
 * Until this runs the height is unset, `top` is invalid and the cards scroll normally.
 */
export function CardStack({ children, className }: CardStackProps) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!list.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const { target } of entries) {
        (target as HTMLElement).style.setProperty(
          "--card-height",
          `${target.getBoundingClientRect().height}px`,
        );
      }
    });
    Array.from(list.current.children).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={list} className={className}>
      {children}
    </ul>
  );
}
