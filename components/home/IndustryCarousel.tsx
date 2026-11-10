"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type IndustryCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Fade colour as space-separated RGB channels. */
  fade: string;
};

type IndustryCarouselProps = {
  cards: IndustryCard[];
  heading: ReactNode;
  intro: ReactNode;
  action: ReactNode;
};

const AUTOPLAY_MS = 3000;
const SLIDE_MS = 700;

const subscribeToNothing = () => () => {};

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const fadeGradient = (rgb: string) =>
  `linear-gradient(to bottom, rgb(${rgb} / 0) 38%, rgb(${rgb} / 0.31) 48.6%, rgb(${rgb} / 0.57) 59.5%, rgb(${rgb} / 0.77) 70.3%, rgb(${rgb} / 0.91) 81%, rgb(${rgb} / 0.98) 92%, rgb(${rgb}) 97.3%)`;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="23"
      height="17"
      viewBox="0 0 23 17"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path
        d="M1 8.5h20.5M14.5 1.5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Card({ card, isClone }: { card: IndustryCard; isClone: boolean }) {
  return (
    <li className="w-[var(--card)] shrink-0 snap-start" aria-hidden={isClone || undefined}>
      <article className="group relative aspect-[504/370] min-h-[240px] w-full overflow-hidden rounded-[10px] transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01]">
        <Image
          src={card.image}
          alt={isClone ? "" : card.alt}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 85vw"
          loading="eager"
          fetchPriority="low"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: fadeGradient(card.fade) }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 text-white lg:px-[clamp(20px,2.083vw,40px)] lg:pb-[clamp(16px,2.083vw,40px)]">
          <h3 className="text-[22px] leading-[1.25] font-semibold lg:text-[clamp(22px,1.875vw,36px)]">
            {card.title}
          </h3>
          <p className="mt-1.5 text-[16px] leading-[1.3] text-white/85 lg:text-[clamp(15px,1.25vw,24px)] lg:leading-[1.25]">
            {card.description}
          </p>
        </div>
      </article>
    </li>
  );
}

export function IndustryCarousel({ cards, heading, intro, action }: IndustryCarouselProps) {
  // Clones exist only once JavaScript runs, so the fallback is a plain scrollable list.
  const looping = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const scroller = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const targetIndex = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauses = useRef(new Set<string>());
  const manualScroll = useRef(false);
  const count = cards.length;

  const stepOf = useCallback((el: HTMLDivElement) => {
    const items = el.firstElementChild?.children;
    return items && items.length > 1
      ? (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft
      : 0;
  }, []);

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Moves into the middle set; the clones make this jump invisible. */
  const normalize = useCallback(
    (el: HTMLDivElement) => {
      const step = stepOf(el);
      if (!step) return;
      const index = Math.round(el.scrollLeft / step);
      const shift = index < count ? count : index >= 2 * count ? -count : 0;
      if (shift) el.scrollLeft += shift * step;
    },
    [count, stepOf],
  );

  const stopSlide = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    targetIndex.current = null;
    if (scroller.current) scroller.current.style.scrollSnapType = "";
  }, []);

  const move = useCallback(
    (delta: number) => {
      const el = scroller.current;
      if (!el) return;
      const step = stepOf(el);
      if (!step) return;

      // A click during a slide continues from where that slide was heading.
      let index = targetIndex.current ?? Math.round(el.scrollLeft / step);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      el.style.scrollSnapType = "none";

      const shift = index < count ? count : index >= 2 * count ? -count : 0;
      if (shift) {
        el.scrollLeft += shift * step;
        index += shift;
      }

      const next = index + delta;
      const finish = () => {
        stopSlide();
        normalize(el);
      };

      if (prefersReducedMotion()) {
        el.scrollLeft = next * step;
        finish();
        return;
      }

      const from = el.scrollLeft;
      const to = next * step;
      const start = performance.now();
      targetIndex.current = next;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / SLIDE_MS);
        el.scrollLeft = from + (to - from) * easeInOutCubic(progress);
        if (progress < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };
      frame.current = requestAnimationFrame(tick);
    },
    [count, normalize, stepOf, stopSlide],
  );

  const restartTimer = useCallback(() => {
    if (timer.current !== null) clearInterval(timer.current);
    timer.current = null;
    if (pauses.current.size > 0 || document.hidden || prefersReducedMotion()) return;
    timer.current = setInterval(() => move(1), AUTOPLAY_MS);
  }, [move]);

  const pause = useCallback(
    (reason: string) => {
      pauses.current.add(reason);
      restartTimer();
    },
    [restartTimer],
  );

  const resume = useCallback(
    (reason: string) => {
      pauses.current.delete(reason);
      restartTimer();
    },
    [restartTimer],
  );

  // Runs before paint, so adding the leading clones never shows a shift.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!looping || !el) return;
    el.style.scrollSnapType = "none";
    el.scrollLeft = count * stepOf(el);
    el.style.scrollSnapType = "";
  }, [count, looping, stepOf]);

  useEffect(() => {
    if (!looping) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    restartTimer();
    document.addEventListener("visibilitychange", restartTimer);
    motionQuery.addEventListener("change", restartTimer);
    return () => {
      document.removeEventListener("visibilitychange", restartTimer);
      motionQuery.removeEventListener("change", restartTimer);
      if (timer.current !== null) clearInterval(timer.current);
      if (settleTimer.current !== null) clearTimeout(settleTimer.current);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [looping, restartTimer]);

  const handleScroll = () => {
    if (settleTimer.current !== null) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const el = scroller.current;
      if (!el || !looping || frame.current !== null || pauses.current.has("touch")) return;
      normalize(el);
      if (manualScroll.current) {
        manualScroll.current = false;
        restartTimer();
      }
    }, 150);
  };

  const handleManualInput = () => {
    manualScroll.current = true;
    stopSlide();
  };

  const handleArrow = (delta: number) => {
    move(delta);
    restartTimer();
  };

  const renderSet = (isClone: boolean, set: string) =>
    cards.map((card) => <Card key={`${set}-${card.title}`} card={card} isClone={isClone} />);

  return (
    <div
      className="@container w-full"
      onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) pause("focus");
      }}
      onBlurCapture={() => resume("focus")}
    >
      <noscript>
        <style>{"[data-carousel-arrows]{display:none}"}</style>
      </noscript>

      <div className="[--card:calc(100cqw-var(--g)-56px)] [--g:20px] md:[--card:calc((100cqw-var(--g)-104px)/2)] md:[--g:32px] lg:[--card:calc((100cqw-2*var(--g)-48px)/3)] xl:[--g:max(20px,calc((100cqw-1560px)/2))]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 xl:px-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,885fr)_minmax(0,675fr)] lg:gap-0">
            <div>{heading}</div>
            <div>
              {intro}
              <div className="mt-[23px] flex items-end justify-between gap-1 sm:gap-3">
                {action}
                <div data-carousel-arrows className="-mr-1 -mb-1 flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Previous industry"
                    onClick={() => handleArrow(-1)}
                    className="flex size-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next industry"
                    onClick={() => handleArrow(1)}
                    className="flex size-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    <ArrowIcon direction="right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 12px of padding leaves room for hover lift; at rest nothing shows left of the content edge. */}
        <div
          ref={scroller}
          role="group"
          aria-label="Industries we serve"
          tabIndex={0}
          onScroll={handleScroll}
          onWheel={handleManualInput}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") pause("hover");
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") resume("hover");
          }}
          onTouchStart={() => {
            handleManualInput();
            pause("touch");
          }}
          onTouchEnd={() => resume("touch")}
          onTouchCancel={() => resume("touch")}
          className="relative mt-[28px] ml-[calc(var(--g)-12px)] snap-x snap-mandatory scroll-pl-3 overflow-x-auto py-3 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max gap-6 pl-3">
            {looping && renderSet(true, "before")}
            {renderSet(false, "main")}
            {looping && renderSet(true, "after")}
          </ul>
        </div>
      </div>
    </div>
  );
}
