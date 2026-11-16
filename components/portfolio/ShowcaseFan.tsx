"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import "./showcase-fan.css";

type ShowcaseFanProps = {
  /** Accessible name of the carousel. */
  label: string;
  /** One node per card, in order. */
  cards: ReactNode[];
};

/** A card's place in the fan: its offset from the front card (wrapping round), or parked at the back. */
function offsetOf(index: number, active: number, count: number) {
  let offset = (((index - active) % count) + count) % count;
  if (offset > count / 2) offset -= count;
  return Math.abs(offset) <= 2 ? String(offset) : "back";
}

/** Autoplay: one card every this many milliseconds (the CSS glide itself takes 900ms). */
const AUTOPLAY_MS = 3000;
/** Autoplay runs only while at least this share of the carousel is on screen and uncovered. */
const MIN_VISIBLE = 0.4;

/** Swipes shorter than this, or more vertical than horizontal, are taps or page scrolls. */
const SWIPE = 40;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`size-[40%] ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const arrowClass =
  "flex size-[max(44px,calc(var(--u)*52))] shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/*
  The Our Portfolio fan carousel, after the CMS Fan Carousel reference (cmsfancarousel.framer.website):
  one card in front, the others fanned out behind it on either side, smaller, tilted, turned in
  perspective and dimmed with distance. Changing card glides every card to its new place at once.
  The geometry lives in showcase-fan.css; this component only says which card is in front.

  Prev and Next (and the left and right arrow keys on the focused carousel, a horizontal swipe, or a
  click on a card behind) move one card; the dots go to a chosen card. It wraps round, as the
  reference does. It also advances on its own every 3 seconds, as the reference does; any manual move
  restarts that countdown. Autoplay pauses while the carousel is off screen or covered by the next
  section rising over it, while the tab is hidden and while keyboard focus is inside it, and is off
  with reduced motion.

  Only the front card is exposed to keyboards and screen readers; the cards behind are inert.
  Without JavaScript the first card is in front and the controls are hidden.
*/
export function ShowcaseFan({ label, cards }: ShowcaseFanProps) {
  const count = cards.length;
  const [active, setActive] = useState(0);
  /** Announce the current card only once someone has moved the carousel, not on load. */
  const [moved, setMoved] = useState(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  /** Bumped by every manual move, so the autoplay countdown restarts even when the card stays the same. */
  const [interaction, setInteraction] = useState(0);
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);
  const controls = useRef<HTMLDivElement>(null);

  const wrap = (index: number) => ((index % count) + count) % count;
  const goTo = (index: number) => {
    setActive(wrap(index));
    setMoved(true);
    setInteraction((value) => value + 1);
  };
  // From the latest state, so presses in quick succession each count.
  const move = (step: -1 | 1) => {
    setActive((current) => wrap(current + step));
    setMoved(true);
    setInteraction((value) => value + 1);
  };

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setTabHidden(document.visibilityState === "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  /*
    On screen and not covered. The section is pinned, so while the next section rises over it the
    carousel is still inside the viewport, only covered: the section after this one's pin wrapper is
    watched too, and only the part of the carousel above that section's top edge counts.
  */
  useEffect(() => {
    const carousel = stage.current;
    if (!carousel) return;
    const cover = carousel.closest(".pin-wrapper")?.nextElementSibling ?? null;
    const thresholds = Array.from({ length: 21 }, (_, step) => step / 20);

    const measure = () => {
      const box = carousel.getBoundingClientRect();
      const top = Math.max(box.top, 0);
      let bottom = Math.min(box.bottom, window.innerHeight);
      if (cover) bottom = Math.min(bottom, cover.getBoundingClientRect().top);
      setInView(box.height > 0 && (bottom - top) / Math.min(box.height, window.innerHeight) >= MIN_VISIBLE);
    };

    const observer = new IntersectionObserver(measure, { threshold: thresholds });
    observer.observe(carousel);
    if (cover) observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  /*
    Keyboard focus inside the carousel (the stage or its controls) pauses autoplay, so nothing moves
    under a keyboard or screen reader user; it resumes when focus leaves. A mouse click leaves focus on
    a control without pausing, because mouse focus is not :focus-visible. A key pressed on a control
    focused by the mouse makes it :focus-visible without a new focus event, so the state is re-read
    after every key and pointer release as well as on every focus change.
  */
  useEffect(() => {
    const sync = () => {
      const focused = document.activeElement;
      const inside =
        !!focused && (stage.current?.contains(focused) === true || controls.current?.contains(focused) === true);
      setKeyboardInside(inside && focused.matches(":focus-visible"));
    };
    const onFocusOut = () => setKeyboardInside(false);
    const events = ["focusin", "keyup", "pointerup"] as const;
    events.forEach((type) => document.addEventListener(type, sync));
    document.addEventListener("focusout", onFocusOut);
    return () => {
      events.forEach((type) => document.removeEventListener(type, sync));
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const playing = count > 1 && inView && !tabHidden && !reducedMotion && !keyboardInside;

  // One timeout per resting card: a change of card, a manual move or a pause restarts the countdown.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % count);
      setMoved(false); // autoplay is not announced; only moves someone made are
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, interaction, count]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowLeft: () => move(-1),
      ArrowRight: () => move(1),
      Home: () => goTo(0),
      End: () => goTo(count - 1),
    };
    if (!keys[event.key]) return;
    event.preventDefault();
    keys[event.key]();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipe.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy)) return;
    swiped.current = true;
    move(dx < 0 ? 1 : -1);
  };

  // A click on a card behind brings it to the front (a mouse convenience; keys and buttons do the same).
  // The cards behind are inert, and inert elements are not hit-tested, so the click lands on the stage:
  // the card is found from the cards' on-screen boxes, the one nearest the front winning where they overlap.
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (swiped.current) return;
    if ((event.target as HTMLElement).closest('[data-offset="0"]')) return;
    const { clientX: x, clientY: y } = event;
    const hit = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[data-index]"))
      .filter((card) => card.dataset.offset !== "0" && card.dataset.offset !== "back")
      .sort((a, b) => Math.abs(Number(a.dataset.offset)) - Math.abs(Number(b.dataset.offset)))
      .find((card) => {
        const box = card.getBoundingClientRect();
        const shown = Number(getComputedStyle(card).opacity) > 0; // the ±2 cards are hidden on phones
        return shown && box.width > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
      });
    if (hit) goTo(Number(hit.dataset.index));
  };

  return (
    <>
      <noscript>
        <style>{"[data-fan-controls]{display:none}"}</style>
      </noscript>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        ref={stage}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipe.current = null)}
        onClick={onClick}
        className="sf-stage rounded-[max(10px,calc(var(--u)*13))] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        {cards.map((card, index) => {
          const behind = index !== active;
          return (
            <div
              key={index}
              data-index={index}
              data-offset={offsetOf(index, active, count)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={behind || undefined}
              inert={behind}
              className="sf-card"
            >
              {card}
            </div>
          );
        })}
      </div>

      {/* Prev and Next round arrows, as in the reference, with the page dots between them. */}
      <div
        ref={controls}
        data-fan-controls
        className="mt-[max(16px,calc(var(--u)*24))] flex items-center justify-center gap-[max(16px,calc(var(--u)*28))]"
      >
        <button type="button" aria-label="Previous project" onClick={() => move(-1)} className={arrowClass}>
          <Chevron direction="left" />
        </button>

        <div className="flex items-center" role="group" aria-label="Choose a project">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Project ${index + 1} of ${count}`}
              aria-current={index === active || undefined}
              onClick={() => goTo(index)}
              className="group/dot flex h-6 items-center justify-center px-[max(3px,calc(var(--u)*4))] focus-visible:outline-2 focus-visible:outline-ink"
            >
              <span
                className={`block h-[max(6px,calc(var(--u)*8))] rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-300 motion-safe:ease-out ${
                  index === active
                    ? "w-[max(20px,calc(var(--u)*30))] bg-ink"
                    : "w-[max(6px,calc(var(--u)*8))] bg-ink/30 group-hover/dot:bg-ink/60"
                }`}
              />
            </button>
          ))}
        </div>

        <button type="button" aria-label="Next project" onClick={() => move(1)} className={arrowClass}>
          <Chevron direction="right" />
        </button>

        <p className="sr-only" aria-live="polite">
          {moved ? `Project ${active + 1} of ${count}` : ""}
        </p>
      </div>
    </>
  );
}
