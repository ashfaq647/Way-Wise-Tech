"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  The Insights article grid (the <ul>), with the desktop pointer tilt of the "3D Stacked Editorial"
  motion (insights-articles.css). Only for a real mouse, from 1024px, with motion allowed: touch
  devices, smaller screens and reduced motion never run it, and the cards then use the plain CSS
  hover.

  No flicker: which card is hovered is worked out from the cards' layout boxes (offsetLeft/Top, which
  ignore transforms), not from the browser's hit-testing of the tilted card, so the tilt and lift can
  never move a card out from under the pointer and switch the hover off again.

  Smoothness: one shared listener on the grid stores the pointer; one animation frame loop eases
  each card's tilt, lift and photo shift towards its target and writes them as CSS variables on that
  card only. When a card has eased fully back, its variables and data-tilt are removed, so at rest
  it has no transform at all (pixel-identical to the reference).

  Cards still playing their entrance (a transform transition) are left alone until it ends.
*/

const QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const TILT_Y = 2.5; // deg, sideways
const TILT_X = 2; // deg, vertical
const LIFT = 4; // px
const PHOTO_X = 4; // px, against the tilt
const PHOTO_Y = 3; // px
const EASE = 0.14; // per 60fps frame
const SETTLE = 0.002;

type Tilt = { rx: number; ry: number; lift: number; ix: number; iy: number };
const REST: Tilt = { rx: 0, ry: 0, lift: 0, ix: 0, iy: 0 };
const KEYS = Object.keys(REST) as (keyof Tilt)[];

function isEntering(card: HTMLElement) {
  if (card.getAttribute("data-reveal") === "pending") return true;
  return card
    .getAnimations()
    .some(
      (animation) =>
        "transitionProperty" in animation &&
        (animation as CSSTransition).transitionProperty === "transform" &&
        animation.playState === "running",
    );
}

export function ArticleTiltGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const media = window.matchMedia(QUERY);

    const current = new Map<HTMLElement, Tilt>();
    const targets = new Map<HTMLElement, Tilt>();
    let pointer: { x: number; y: number } | null = null;
    let hovered: HTMLElement | null = null;
    let frame = 0;
    let last = 0;
    let active = false;

    const cards = () => Array.from(grid.children) as HTMLElement[];

    const setHovered = (card: HTMLElement | null) => {
      if (card === hovered) return;
      if (hovered) {
        hovered.removeAttribute("data-hover");
        targets.set(hovered, REST);
      }
      hovered = card;
      if (card) card.setAttribute("data-hover", "");
    };

    // Which card is under the pointer, by layout box, and where on it (-1 to 1 each way).
    const evaluate = () => {
      if (!pointer) {
        setHovered(null);
        return;
      }
      const box = grid.getBoundingClientRect();
      const x = pointer.x - box.left;
      const y = pointer.y - box.top;
      const card = cards().find(
        (item) =>
          x >= item.offsetLeft &&
          x < item.offsetLeft + item.offsetWidth &&
          y >= item.offsetTop &&
          y < item.offsetTop + item.offsetHeight,
      );
      if (!card || isEntering(card)) {
        setHovered(null);
        return;
      }
      setHovered(card);
      const nx = Math.max(-1, Math.min(1, ((x - card.offsetLeft) / card.offsetWidth) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((y - card.offsetTop) / card.offsetHeight) * 2 - 1));
      // The point under the pointer presses gently away; the photo shifts against the tilt.
      targets.set(card, {
        rx: -ny * TILT_X,
        ry: nx * TILT_Y,
        lift: LIFT,
        ix: -nx * PHOTO_X,
        iy: -ny * PHOTO_Y,
      });
      if (!current.has(card)) {
        current.set(card, { ...REST });
        card.setAttribute("data-tilt", "");
      }
    };

    const write = (card: HTMLElement, tilt: Tilt) => {
      const style = card.style;
      style.setProperty("--wi-rx", `${tilt.rx.toFixed(3)}deg`);
      style.setProperty("--wi-ry", `${tilt.ry.toFixed(3)}deg`);
      style.setProperty("--wi-lift", tilt.lift.toFixed(3));
      style.setProperty("--wi-ix", `${tilt.ix.toFixed(2)}px`);
      style.setProperty("--wi-iy", `${tilt.iy.toFixed(2)}px`);
    };

    const clear = (card: HTMLElement) => {
      card.removeAttribute("data-tilt");
      for (const name of ["--wi-rx", "--wi-ry", "--wi-lift", "--wi-ix", "--wi-iy"]) {
        card.style.removeProperty(name);
      }
      current.delete(card);
      targets.delete(card);
    };

    const tick = (now: number) => {
      frame = 0;
      evaluate();
      const step = 1 - Math.pow(1 - EASE, Math.min(4, (now - (last || now - 16.7)) / 16.7));
      last = now;
      for (const [card, tilt] of current) {
        const target = targets.get(card) ?? REST;
        let moving = false;
        for (const key of KEYS) {
          tilt[key] += (target[key] - tilt[key]) * step;
          if (Math.abs(target[key] - tilt[key]) > SETTLE) moving = true;
          else tilt[key] = target[key];
        }
        if (!moving && card !== hovered && KEYS.every((key) => tilt[key] === 0)) clear(card);
        else write(card, tilt);
      }
      if (current.size > 0) frame = requestAnimationFrame(tick);
      else last = 0;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };
    // The page can scroll under a still pointer; re-check which card it is over.
    const onScroll = () => {
      if (pointer) schedule();
    };
    // A card that finished its entrance under the pointer can start tilting.
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "transform" && pointer) schedule();
    };

    const start = () => {
      if (active) return;
      active = true;
      grid.setAttribute("data-tilt-ready", "");
      grid.addEventListener("pointermove", onMove);
      // Also fired when scrolling brings the grid under a still pointer.
      grid.addEventListener("pointerover", onMove);
      grid.addEventListener("pointerleave", onLeave);
      grid.addEventListener("transitionend", onTransitionEnd);
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    const stop = () => {
      if (!active) return;
      active = false;
      grid.removeAttribute("data-tilt-ready");
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerover", onMove);
      grid.removeEventListener("pointerleave", onLeave);
      grid.removeEventListener("transitionend", onTransitionEnd);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      pointer = null;
      setHovered(null);
      for (const card of Array.from(current.keys())) clear(card);
    };

    const sync = () => (media.matches ? start() : stop());
    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <ul ref={ref} className="wi-grid">
      {children}
    </ul>
  );
}
