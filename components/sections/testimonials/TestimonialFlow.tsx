"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import type { PortfolioTestimonial } from "@/lib/content/portfolio";

type TestimonialFlowProps = {
  testimonials: PortfolioTestimonial[];
};

/** Autoplay: one testimonial every 3 seconds. The active progress segment fills over exactly this. */
const AUTOPLAY_MS = 3000;
/**
 * After a change, further presses are ignored for this long, so transitions never pile up and a
 * headline is never cut off mid-reveal. The cards are about 95% of the way and the text fully in.
 */
const LOCK_MS = 750;
/** Swipes shorter than this, or more vertical than horizontal, are taps or page scrolls. */
const SWIPE = 40;
/** Autoplay runs only while at least this share of the carousel is on screen and not covered. */
const MIN_VISIBLE = 0.4;
/** Places in the reference's row: the featured card, then four behind it to the right. */
const SHOWN = 5;

/**
 * A portrait's place, from its distance after the current one (wrapping round): "0" is the featured
 * card, "1" to "4" the reference's row behind it, and "far" the hidden place past the end of the row
 * (the next card fades in from there; the featured card goes there when it leaves). See
 * portfolio-testimonials.css.
 */
function placeOf(index: number, active: number, count: number) {
  const distance = (((index - active) % count) + count) % count;
  return distance < SHOWN ? String(distance) : "far";
}

/**
 * Phones only: a card's place in the mobile deck (the owner's mobile reference): "0" the front card,
 * "1" and "2" the cards tilted behind it, "prev" where the front card leaves to on Next, and "far"
 * the hidden cards behind those.
 */
function deckPlaceOf(index: number, active: number, count: number) {
  const distance = (((index - active) % count) + count) % count;
  if (distance === 0) return "0";
  if (distance === count - 1) return "prev";
  return distance <= 2 ? String(distance) : "far";
}

const pad = (value: number) => String(value).padStart(2, "0");

/** The Figma card's red quote mark (42x30 at 1920): two rounded marks, traced from the reference. */
function QuoteMark({ open = false }: { open?: boolean }) {
  const mark = "M17.5 9C17.5 19 12 26 4.5 29.5L2.8 27C7.5 24.5 10.6 21 11.4 17.2A8.5 8.5 0 1 1 17.5 9Z";
  return (
    <svg viewBox="0 0 42 30" aria-hidden="true" className={`block w-full ${open ? "rotate-180" : ""}`} fill="currentColor">
      <path d={mark} />
      <path d={mark} transform="translate(22 0)" />
    </svg>
  );
}

const STAR = "M12 1.6l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.7l-6.4 3.5 1.4-7.1-5.3-5 7.2-.9z";

/** Five stars, filled to the rating (a half star is half gold, half grey). */
function Stars({ rating, id }: { rating: number; id: string }) {
  // `id` must be unique on the page: the desktop panel and the phone deck each render their own stars.
  return (
    <span className="flex gap-[calc(var(--u)*3)]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        const clip = `pt-star-${id}-${index}`;
        return (
          <svg key={index} viewBox="0 0 24 24" className="size-[max(18px,calc(var(--u)*22))]">
            <defs>
              <clipPath id={clip}>
                <rect width={24 * fill} height="24" />
              </clipPath>
            </defs>
            <path d={STAR} fill="#d9d9d9" />
            {fill > 0 && <path d={STAR} fill="#ffab00" clipPath={`url(#${clip})`} />}
          </svg>
        );
      })}
    </span>
  );
}



/*
  The Our Portfolio testimonial carousel (final redesign 2026-11-15), rebuilt on the live preview of
  Framer's Testimonial Flow Pro, measured in the browser (no Framer code):
  - Portraits: the featured card on a fixed white plate under a dark quote badge, and four cards in a
    row to its right, each 0.86x the one before, on one vertical centre line, no rotation, washed
    towards the background more the further back they are (0.4, 0.64, 0.784, 0.87), their photos
    zoomed 1.12x. Each card is placed with its own perspective and a real depth (translateZ), chosen
    so the projection lands exactly on the reference's position and size. On Next the row advances
    one place, the featured card drifts left and fades out as in the reference (it then waits,
    hidden, past the end of the row), and the next card fades in at the end of the row; Prev
    reverses it.
  - Text: the reference's text column (sizes and spacing in card units, so text and portraits scale
    together) in a white panel with the Figma card's corners, shadow and red quote mark. From lg the
    panel is exactly as tall as the portrait plate and shares its top and bottom edges. The headline
    rises in word by word, then the quote, rating and author fade up, in step with the portraits.
  - It advances every 3 seconds: the active progress segment fills over that time and its end is the
    tick, so the bar and the timing never drift apart. It pauses while off screen or covered by the
    section rising over it, while the tab is hidden, and while keyboard focus is inside it; it is off
    with reduced motion. Prev and Next, the segments, the arrow keys (and Home/End) on the focused
    carousel, a horizontal swipe, or a click on a card behind change testimonial and restart the
    countdown. It loops. No pause button (owner's instruction).

  Every testimonial's text is rendered in the same grid cell, only the current one shown, so the
  panel is always as tall as the longest testimonial and nothing moves on a change. All motion is CSS
  (portfolio-testimonials.css); this component only says which testimonial is current, which way the
  last change went and whether autoplay is paused. Without JavaScript the first testimonial shows and
  the controls are hidden.
*/
export function TestimonialFlow({ testimonials }: TestimonialFlowProps) {
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  /**
   * Which way the last change went: the leaving and arriving featured cards move by it. Unset until
   * the first change, so nothing plays on load.
   */
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  /** Bumped on every change, so the active segment's fill restarts even on the same index. */
  const [cycle, setCycle] = useState(0);
  /** Set only by someone moving the carousel, never by autoplay, for the live region. */
  const [announcement, setAnnouncement] = useState("");
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const mobile = useRef<HTMLDivElement>(null);
  /** The current index, read synchronously so presses in quick succession see the latest value. */
  const activeRef = useRef(0);
  const lockUntil = useRef(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const change = useCallback(
    (next: (current: number) => number, byUser: boolean) => {
      const now = performance.now();
      if (byUser && now < lockUntil.current) return;
      const current = activeRef.current;
      const index = ((next(current) % count) + count) % count;
      if (index === current) return;
      lockUntil.current = now + LOCK_MS;
      // Forward if the target is at most half the loop ahead, so Next/autoplay are always forward.
      const ahead = (index - current + count) % count;
      setDirection(ahead <= count / 2 ? "next" : "prev");
      activeRef.current = index;
      setActive(index);
      setCycle((value) => value + 1);
      if (byUser) setAnnouncement(`Testimonial ${index + 1} of ${count}: ${testimonials[index].name}`);
    },
    [count, testimonials],
  );

  const move = (step: -1 | 1) => change((current) => current + step, true);
  const goTo = (index: number) => change(() => index, true);

  // Reduced motion: no autoplay (and, in the CSS, no transitions).
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
    On screen and not covered. The section is pinned, so while Final CTA rises over it the carousel
    is still inside the viewport, only covered: the section after this one's pin wrapper is watched
    too, and the carousel counts as visible while enough of it is above that section's top edge.
  */
  useEffect(() => {
    const carousel = root.current;
    if (!carousel) return;
    // The section that rises over this one: the next pin, or, when this is the last section in <main>
    // (the Case Study page), the shared Footer after it.
    const pin = carousel.closest(".pin-wrapper");
    const cover = pin?.nextElementSibling ?? (pin?.parentElement?.tagName === "MAIN" ? pin.parentElement.nextElementSibling : null) ?? null;
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
    Phones: the deck reserves the tallest testimonial card (--mdeck-h), so the section never changes
    height between testimonials, and the cards behind take the front card's height (--mh), so none of
    them sticks out below it, as in the reference. The segments sit 24px under the front card.
  */
  useEffect(() => {
    const wrap = mobile.current;
    if (!wrap) return;
    const measure = () => {
      const cards = Array.from(wrap.querySelectorAll<HTMLElement>(".pt-mcard"));
      const front = wrap.querySelector<HTMLElement>('.pt-mcard[data-place="0"]');
      if (!front || front.offsetHeight === 0) return; // hidden from sm up
      const tallest = Math.max(...cards.map((card) => card.scrollHeight));
      wrap.style.setProperty("--mdeck-h", `${tallest}px`);
      wrap.style.setProperty("--mh", `${front.scrollHeight}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    wrap.querySelectorAll(".pt-mcard").forEach((card) => observer.observe(card));
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [active]);

  const paused = !inView || tabHidden || keyboardInside || reducedMotion;

  // The active segment's fill ending is the autoplay tick.
  const onFillEnd = () => {
    if (!paused) change((current) => current + 1, false);
  };

  // Keyboard focus inside pauses autoplay, so nothing changes under a keyboard or screen reader user.
  // A mouse click on a control leaves focus there without pausing (it is not :focus-visible).
  const syncKeyboardFocus = () => {
    const focused = document.activeElement;
    setKeyboardInside(!!focused && root.current?.contains(focused) === true && focused.matches(":focus-visible"));
  };
  const onBlur = () => requestAnimationFrame(syncKeyboardFocus);

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

  // A click on a card behind brings it to the front (a mouse convenience; buttons and keys do the same).
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    // The click that ends a swipe is not a card choice; the flag is spent either way.
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-index]");
    if (card && card.dataset.place !== "0") goTo(Number(card.dataset.index));
  };

  return (
    <>
      <noscript>
        <style>{"[data-pt-controls]{display:none}"}</style>
      </noscript>

      <div
        ref={root}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onFocus={syncKeyboardFocus}
        onBlur={onBlur}
        data-paused={paused || undefined}
        style={{ "--pt-autoplay": `${AUTOPLAY_MS}ms` } as CSSProperties}
        className="pt-flow rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink"
      >
        {/*
          The white text panel: the reference's text column (its sizes and spacing, in card units)
          on the Figma card's white, corners, shadow and red quote mark. From lg it is exactly as tall
          as the portrait plate beside it and shares its top and bottom edges. Text only; the
          portraits are outside it.
        */}
        <div className="pt-textcard min-w-0">
          <div className="pt-textcard__inner">
            <p className="pt-counter flex items-center tabular-nums">
              <span className="flex items-baseline">
                <span className="sr-only">Testimonial </span>
                <span className="inline-flex overflow-hidden text-ink">
                  <span key={active} className="pt-count">
                    {pad(active + 1)}
                  </span>
                </span>
                <span aria-hidden="true">&nbsp;/&nbsp;</span>
                <span className="sr-only"> of </span>
                {pad(count)}
              </span>
              <span aria-hidden="true" className="pt-mark ml-auto">
                <QuoteMark />
              </span>
            </p>

            <div className="pt-texts grid">
              {testimonials.map((testimonial, index) => {
                const isActive = index === active;
                const words = testimonial.headline?.split(" ") ?? [];
                return (
                  <figure
                    key={testimonial.id}
                    data-active={isActive || undefined}
                    aria-hidden={!isActive || undefined}
                    inert={!isActive}
                    className="pt-panel"
                  >
                    {words.length > 0 && (
                      <p className="pt-headline text-navy">
                        {words.map((word, wordIndex) => (
                          <span key={wordIndex} className="pt-word-mask">
                            <span className="pt-word" style={{ "--w": wordIndex } as CSSProperties}>
                              {word}
                            </span>
                            {wordIndex < words.length - 1 ? " " : ""}
                          </span>
                        ))}
                      </p>
                    )}
                    <blockquote className="pt-rise pt-quote" style={{ "--d": "270ms" } as CSSProperties}>
                      {testimonial.quote}
                    </blockquote>
                    {testimonial.rating && (
                      <div className="pt-rise pt-rating" style={{ "--d": "320ms" } as CSSProperties}>
                        <Stars rating={testimonial.rating.value} id={testimonial.id} />
                        <span className="font-bold text-ink">
                          <span className="sr-only">Rated </span>
                          {testimonial.rating.label}
                        </span>
                        <span className="text-ink-muted">{testimonial.rating.reviews}</span>
                      </div>
                    )}
                    {/* Directly under the review. */}
                    <figcaption className="pt-rise pt-author" style={{ "--d": "370ms" } as CSSProperties}>
                      <span className="min-w-0">
                        <span className="pt-name block font-semibold text-navy">{testimonial.name}</span>
                        <span className="pt-role block text-steel">{testimonial.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            {/*
              Prev, the progress segments (filled up to the current one; the current one fills over
              the autoplay interval) and Next, as in the reference.
            */}
            <div data-pt-controls className="pt-controls flex items-center">
              <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)} className="pt-nav">
                <span aria-hidden="true">Prev</span>
              </button>
              <div role="group" aria-label="Choose a testimonial" className="flex min-w-0 flex-1 items-center gap-[4px]">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    aria-label={`Show testimonial ${index + 1} of ${count}`}
                    aria-current={index === active || undefined}
                    onClick={() => goTo(index)}
                    className="group/seg pt-segbtn flex min-w-0 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-ink/12 transition-colors group-hover/seg:bg-ink/25">
                      {index === active ? (
                        <span key={cycle} data-current className="pt-seg" onAnimationEnd={onFillEnd} />
                      ) : (
                        <span data-filled={index < active || undefined} className="pt-seg" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" aria-label="Next testimonial" onClick={() => move(1)} className="pt-nav">
                <span aria-hidden="true">Next</span>
              </button>
            </div>
          </div>
        </div>

        {/*
          The portraits, as in the reference: a fixed white plate at the featured place and the
          cards moving over it (the reference's dark quote badge was removed by the owner, so the red
          mark in the text panel is the only quote symbol). Only the featured card is exposed to assistive
          technology.
        */}
        <div className="pt-stage-wrap">
          <div className="pt-stage-box">
            <span className="pt-plate" aria-hidden="true" />
            <div
              className="pt-stage"
              data-dir={direction ?? undefined}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipe.current = null)}
              onClick={onClick}
            >
              {testimonials.map((testimonial, index) => {
                const place = placeOf(index, active, count);
                const front = place === "0";
                return (
                  <div
                    key={testimonial.id}
                    data-index={index}
                    data-place={place}
                    aria-hidden={!front || undefined}
                    className="pt-card"
                  >
                    <AssetImage
                      src={testimonial.image.src}
                      alt={front ? testimonial.image.alt : ""}
                      sizes="(min-width: 1280px) 330px, 300px"
                      className="pt-card__photo object-cover object-[50%_16%]"
                    />
                    {/* The reference's wash on the cards behind. */}
                    <span className="pt-card__wash" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*
          Phones only (below sm), from the owner's mobile reference screenshot: one white testimonial
          card (the portrait on top, then a dark quote mark, the review, and the name and role at its
          foot), two cards tilted behind it to the right, and round Prev/Next arrows on its edges; the
          progress segments sit under the deck (they also time the autoplay). The panel and portrait
          row above are hidden on phones, and this deck is hidden from sm up, so only one is ever in the
          accessibility tree and only one set of segments runs.
        */}
        {/* Outside both layouts, so it announces on phones and from sm up alike. */}
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>

        <div ref={mobile} className="pt-mobile">
          <div
            className="pt-mdeck"
            data-dir={direction ?? undefined}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
            onClick={onClick}
          >
            {testimonials.map((testimonial, index) => {
              const place = deckPlaceOf(index, active, count);
              const front = place === "0";
              return (
                <figure
                  key={testimonial.id}
                  data-index={index}
                  data-place={place}
                  aria-hidden={!front || undefined}
                  inert={!front}
                  className="pt-mcard"
                >
                  <div className="pt-mcard__photo">
                    <AssetImage
                      src={testimonial.image.src}
                      alt={front ? testimonial.image.alt : ""}
                      sizes="260px"
                      className="object-cover object-[50%_18%]"
                    />
                  </div>
                  <span aria-hidden="true" className="pt-mcard__mark">
                    <QuoteMark open />
                  </span>
                  <blockquote className="pt-mcard__quote">{testimonial.quote}</blockquote>
                  {testimonial.rating && (
                    <div className="pt-mcard__rating">
                      <Stars rating={testimonial.rating.value} id={`m-${testimonial.id}`} />
                      <span className="font-bold text-ink">
                        <span className="sr-only">Rated </span>
                        {testimonial.rating.label}
                      </span>
                      <span>{testimonial.rating.reviews}</span>
                    </div>
                  )}
                  <figcaption className="pt-mcard__author">
                    <span className="pt-mcard__name">{testimonial.name}</span>
                    <span className="pt-mcard__role">{testimonial.role}</span>
                  </figcaption>
                  {/* The cards behind: washed toward light grey, as in the reference. */}
                  <span className="pt-mcard__wash" aria-hidden="true" />
                </figure>
              );
            })}
            <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)} className="pt-marrow pt-marrow--prev">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13 8H3.5M7.5 4 3.5 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => move(1)} className="pt-marrow pt-marrow--next">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div data-pt-controls role="group" aria-label="Choose a testimonial" className="pt-msegs">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show testimonial ${index + 1} of ${count}`}
                aria-current={index === active || undefined}
                onClick={() => goTo(index)}
                className="group/seg pt-segbtn flex min-w-0 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-ink/15">
                  {index === active ? (
                    <span key={cycle} data-current className="pt-seg" onAnimationEnd={onFillEnd} />
                  ) : (
                    <span data-filled={index < active || undefined} className="pt-seg" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
