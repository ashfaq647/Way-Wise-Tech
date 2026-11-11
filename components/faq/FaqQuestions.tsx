"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { faqQuestions } from "@/lib/content/faq";
import { FaqQuestionMark } from "./FaqQuestionMark";
import "./faq-questions.css";

type Item = (typeof faqQuestions.items)[number];

/** Plus that turns into a minus: the vertical bar turns flat onto the horizontal one. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="size-[18px] shrink-0 lg:size-[clamp(16px,0.938vw,18px)]"
    >
      <rect x="0" y="8" width="18" height="2" rx="1" fill="currentColor" />
      <rect
        x="8"
        y="0"
        width="2"
        height="18"
        rx="1"
        fill="currentColor"
        className={`origin-center [transform-box:fill-box] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-90" : ""}`}
      />
    </svg>
  );
}

/*
  One question. Items open and close independently, as in the site's shared FAQ, so opening one
  never moves another that is already being read. The answer opens through grid-template-rows (0fr
  to 1fr), so it reaches its natural height with no measuring, while the text fades in and settles
  a little after the row starts opening, and fades out quickly on close. Reduced motion: instant.
*/
function FaqItem({ question, answer, order }: Item & { order: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <li
      style={revealOrder(order)}
      className="ww-rise rounded-[10px] bg-white transition-shadow duration-300 has-[button:hover]:shadow-[0_6px_18px_-10px_rgb(35_31_32/0.25)]"
    >
      {/* Relative so the progress node can sit at the middle of the question row (faq-questions.css). */}
      <h3 className="relative">
        <span aria-hidden="true" className="wf-node" />
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group/q flex min-h-[72px] w-full items-center justify-between gap-5 rounded-[10px] py-4 pr-6 pl-5 text-left text-[18px] leading-[1.3] font-medium text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:pl-[30px] lg:min-h-[clamp(60px,3.75vw,72px)] lg:pr-[clamp(24px,1.927vw,37px)] lg:text-[clamp(18px,1.146vw,22px)]"
        >
          {question}
          <span className="text-black transition-colors duration-200 group-hover/q:text-brand">
            <ToggleIcon open={open} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-faq-panel
        className={`grid motion-safe:transition-[grid-template-rows,visibility] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className={`pr-6 pb-6 pl-5 text-[17px] leading-[1.55] text-steel sm:pl-[30px] lg:pr-[clamp(60px,4.167vw,80px)] lg:text-[clamp(16px,0.99vw,19px)] motion-safe:transition-[opacity,translate] motion-safe:ease-out ${open ? "translate-y-0 opacity-100 motion-safe:delay-100 motion-safe:duration-500" : "-translate-y-1.5 opacity-0 motion-safe:duration-200"}`}
          >
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}

/*
  FAQ timeline (faq-questions.css), rebuilt from the owner's screen recording and the live reference
  it came from, in WayWise colours.

  The line: its fill is tied 1:1 to the scroll (no spring lag). While the list moves up, the fill's
  end holds on a fixed line, 551px from the top of the screen as in the reference (never lower than
  60% of a short screen). The section is pinned, though: it stops moving when its bottom reaches the
  screen bottom, and the Footer then rises over it. So the FAQ PinnedSection holds the section for
  exactly as much extra scrolling as the line still needs (--wf-hold, read by the page's `hold`
  prop): during that hold the list stands still and the fill keeps running down it at scroll speed,
  reaching the end of the list just as the Footer starts to rise. Fill length = scroll past its
  start, in both stages, so it is continuous and reverses exactly.

  How: the fill is a CSS scroll-driven animation on the PinnedSection wrapper's view timeline (the
  wrapper is never sticky, so it moves 1:1 with the scroll the whole time, while the section inside
  it holds still when pinned). This measures, only when sizes change (the list, the section, the
  page or the window; an answer opening), where the fill starts and ends on that timeline (--wf-a,
  --wf-b) and the hold. Without scroll-timeline support the fill is set from the scroll listener.

  The points: a node at the middle of each question row turns active the moment the fill reaches
  its centre (data-hit on the node; CSS runs the reference's short colour change and pop), and turns
  back when the fill falls behind it again. One passive scroll listener compares the scroll position
  with the precomputed points: no layout reads and no React state on scroll, and no scroll hijacking.

  Only from md, with motion allowed (the line is hidden below md; with reduced motion the static
  track shows with inactive points, there is no hold, and the pins are off).
*/
const LINE = 551;
const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function useFaqTimeline(
  listRef: RefObject<HTMLUListElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const list = listRef.current;
    const section = sectionRef.current;
    const body = section?.parentElement;
    const wrapper = body?.parentElement;
    if (!list || !section || !body || !wrapper?.classList.contains("pin-wrapper")) return;
    const fill = list.querySelector<HTMLElement>(".wf-rail__fill");
    const media = window.matchMedia(QUERY);
    const scrollTimeline = CSS.supports("animation-timeline: view()");

    let active = false;
    let start = 0; // the scroll position where the fill starts
    let height = 0; // the list height, which is the full fill
    let points: { node: HTMLElement; at: number; hit: boolean }[] = [];
    let frame = 0;

    const update = () => {
      if (!active || height === 0) return;
      const length = window.scrollY - start;
      for (const point of points) {
        const hit = length >= point.at;
        if (hit !== point.hit) {
          point.hit = hit;
          point.node.toggleAttribute("data-hit", hit);
        }
      }
      if (!scrollTimeline && fill) {
        fill.style.transform = `scaleY(${Math.min(1, Math.max(0, length / height)).toFixed(4)})`;
      }
    };

    const reset = () => {
      wrapper.style.setProperty("--wf-hold", "0px");
      list.removeAttribute("data-wf-ready");
      for (const point of points) point.node.removeAttribute("data-hit");
      points = [];
      if (fill) fill.style.removeProperty("transform");
    };

    const measure = () => {
      frame = 0;
      active = media.matches;
      height = list.offsetHeight;
      // Below md, reduced motion, or a kept-mounted hidden page (no layout): no timeline.
      if (!active || height === 0) {
        reset();
        return;
      }
      const screen = window.innerHeight;
      const line = Math.min(LINE, screen * 0.6);
      // The list's layout offset inside the pinned body (offsetTop ignores the pin's sticky shift).
      let offset = 0;
      for (
        let el: HTMLElement | null = list;
        el && el !== body && el !== wrapper;
        el = el.offsetParent as HTMLElement | null
      ) {
        offset += el.offsetTop;
      }
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      start = wrapperTop + offset - line;
      // The pin starts when the section's bottom reaches the screen bottom (at its top if shorter).
      const pinAt = wrapperTop + Math.max(0, section.offsetHeight - screen);
      const hold = Math.max(0, Math.ceil(start + height - pinAt));
      wrapper.style.setProperty("--wf-hold", `${hold}px`);

      // On the wrapper's view timeline, "cover 0" is the wrapper's top at the screen bottom.
      const a = start - (wrapperTop - screen);
      list.style.setProperty("--wf-a", `${a.toFixed(1)}px`);
      list.style.setProperty("--wf-b", `${(a + height).toFixed(1)}px`);

      const nodes = Array.from(list.querySelectorAll<HTMLElement>(".wf-node"));
      points = nodes.map((node) => {
        const head = node.parentElement as HTMLElement;
        // The row heads' layout offsets (they ignore the rows' reveal translate), summed to the list.
        let y = head.offsetHeight / 2;
        for (
          let el: HTMLElement | null = head;
          el && el !== list;
          el = el.offsetParent as HTMLElement | null
        ) {
          y += el.offsetTop;
        }
        return { node, at: y, hit: node.hasAttribute("data-hit") };
      });
      list.setAttribute("data-wf-ready", "");
      update();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(list);
    observer.observe(section);
    // Content above can change height (images, the Hero pin), moving where the section starts.
    observer.observe(document.documentElement);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", update, { passive: true });
    media.addEventListener("change", schedule);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", update);
      media.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
      reset();
    };
  }, [listRef, sectionRef]);
}

/**
 * The FAQ page's questions section, from Frame 2147239138.png. At 1920 it is 1080px tall on #f4f0e9:
 * a 428x433 dark card (the animated question mark, "Still have a question?", a short line and a
 * gold button) beside nine white question rows (72px tall, 16px apart). The content runs from x 200
 * to 1720. Since the FAQ timeline (owner, 2026-11-11) the rows are 1016px wide and 76px from the
 * card (40px card to line, 34px line to rows, as in the reference); they were 1068px, 24px from it.
 * Below lg the card comes first and the list follows.
 */
export function FaqQuestions() {
  const { heading, card, items } = faqQuestions;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useFaqTimeline(listRef, sectionRef);

  return (
    <section ref={sectionRef} id="faq-questions" aria-labelledby="faq-questions-heading" className="bg-[#f4f0e9]">
      <noscript>
        <style>{"[data-faq-panel]{visibility:visible!important;grid-template-rows:1fr!important}[data-faq-panel] p{opacity:1!important;translate:none!important}"}</style>
      </noscript>
      {/* The reference has no visible heading; this names the section for assistive technology. */}
      <h2 id="faq-questions-heading" className="sr-only">
        {heading}
      </h2>

      <Reveal
        each
        className="mx-auto grid w-full max-w-[1560px] items-start gap-6 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,428fr)_minmax(0,1016fr)] lg:gap-[clamp(52px,3.958vw,76px)] lg:py-[clamp(96px,7.917vw,152px)] xl:px-5"
      >
        {/* From lg the card stays in view beside the scrolling questions (motion-safe, as other sticky parts): 110px from the top as in the reference, 96px below xl (shorter Navbar). */}
        <div className="wf-card ww-rise lg:motion-safe:sticky lg:motion-safe:top-[96px] xl:motion-safe:top-[110px] flex flex-col items-center rounded-xl bg-[#4b2524] px-6 pt-8 pb-8 text-center text-white md:px-10 lg:px-[clamp(24px,2.083vw,40px)] lg:pt-[clamp(28px,2.344vw,45px)] lg:pb-[clamp(28px,2.083vw,40px)]">
          <FaqQuestionMark className="w-[150px] lg:w-[clamp(130px,9.375vw,180px)]" />
          <p className="mt-4 text-[27px] leading-[1.25] font-light lg:mt-[clamp(9px,0.729vw,14px)] lg:text-[clamp(23px,1.563vw,30px)]">
            {card.title}
          </p>
          <p className="mt-3 w-fit max-w-[18.25em] text-center text-balance lg:text-left lg:text-wrap text-[16px] leading-[1.375] lg:mt-[clamp(10px,0.885vw,17px)] lg:text-[clamp(14px,0.833vw,16px)]">
            {card.description}
          </p>
          <ButtonLink
            href={card.action.href}
            className="mt-6 h-[46px] w-full rounded-md border-[#ce9d43]! bg-[#ce9d43]! text-[14px] hover:border-[#b98a35]! hover:bg-[#b98a35]! lg:mt-[clamp(12px,0.781vw,15px)] lg:h-[clamp(40px,2.396vw,46px)] lg:text-[clamp(13px,0.729vw,14px)]"
          >
            {card.action.label}
          </ButtonLink>
        </div>

        <ul ref={listRef} className="wf-list grid gap-4">
          {/* The timeline line, in the gap beside the list (md and up). */}
          <li aria-hidden="true" className="wf-rail">
            <span className="wf-rail__track" />
            <span className="wf-rail__fill" />
          </li>
          {items.map((item, index) => (
            <FaqItem key={item.question} {...item} order={1 + index * 0.5} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
