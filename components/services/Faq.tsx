"use client";

import { useId, useState } from "react";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { StaggerText } from "@/components/motion/StaggerText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { servicesFaq } from "@/lib/content/faq";

type Question = { question: string; answer: string };

function FaqItem({ question, answer, order }: Question & { order: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div style={revealOrder(order)} className="ww-rise rounded-lg bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-20 w-full items-center justify-between gap-4 rounded-lg py-4 pr-5 pl-5 text-left text-[18px] leading-[1.3] text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:pr-9 sm:pl-[30px] lg:text-[clamp(18px,1.146vw,22px)]"
        >
          {question}
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0">
            <rect x="0.67" y="8.67" width="18.67" height="2.67" rx="0.5" fill="currentColor" />
            {/* Collapsing this bar turns the plus into a minus. */}
            <rect
              x="8.67"
              y="0.67"
              width="2.67"
              height="18.67"
              rx="0.5"
              fill="currentColor"
              className={`origin-center [transform-box:fill-box] motion-safe:transition-[scale] motion-safe:duration-300 motion-safe:ease-out ${open ? "scale-y-0" : ""}`}
            />
          </svg>
        </button>
      </h3>

      {/* Animating the grid row lets the answer open to its natural height, with no measuring. */}
      <div
        id={id}
        role="region"
        data-faq-answer
        className={`grid motion-safe:transition-[grid-template-rows,visibility] motion-safe:duration-300 motion-safe:ease-out ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pr-5 pb-6 pl-5 text-[17px] leading-[1.5] text-[#3d4e5c] sm:pr-9 sm:pl-[30px] lg:text-[clamp(16px,1.042vw,20px)]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/*
  One design on every page (owner, 2026-11-17), from `Frame 2147239032.png` (1920x942): a single
  column of full-width rows (all eight questions; the first six fill the 942 frame), 75px above and
  76px below at 1920, an 18px eyebrow and a 53.5px heading.
*/
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-[#eae2dd]">
      <noscript>
        <style>
          {"[data-faq-answer]{visibility:visible!important;grid-template-rows:1fr!important}"}
        </style>
      </noscript>
      <div className={`mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 xl:px-5 lg:pt-[clamp(48px,3.906vw,75px)] lg:pb-[clamp(48px,3.958vw,76px)]`}>
        <Reveal className="grid gap-5 lg:grid-cols-[minmax(0,1002fr)_minmax(0,558fr)] lg:gap-0">
          <div>
            <p className="ww-rise flex items-center gap-2 text-[16px] leading-5 font-bold tracking-[0.078em] text-brand uppercase lg:text-[clamp(16px,0.9375vw,18px)]">
              <span
                className="h-[3px] w-[22px] shrink-0 -translate-y-px bg-brand"
                aria-hidden="true"
              />
              {servicesFaq.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-[#0d1d44] lg:mt-2 lg:text-[clamp(34px,2.786vw,53.5px)] lg:leading-[1.159]"
            >
              <MaskLine order={1}>{servicesFaq.heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {servicesFaq.heading.accent}
              </MaskLine>
            </h2>
          </div>

          <div style={revealOrder(3)} className="ww-rise">
            <p className="text-[18px] leading-[1.45] tracking-[0.036em] text-[#0d1d44] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)] lg:leading-[1.5]">
              {servicesFaq.description}
            </p>
            <ButtonLink
              href={servicesFaq.action.href}
              variant="secondary"
              className="mt-6 h-[60px] border-[#a49e9b]! px-7 text-[20px] hover:border-ink! lg:min-w-[161px]"
            >
              <StaggerText text={servicesFaq.action.label} />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          each
          className="mt-8 flex flex-col gap-5 lg:mt-[60.5px] min-[1600px]:-mx-[14.5px]"
        >
          {servicesFaq.items.map((item: Question, index) => (
            <FaqItem key={item.question} {...item} order={index * 0.3} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
