"use client";

import { useId, useState } from "react";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { StaggerText } from "@/components/motion/StaggerText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { servicesFaq } from "@/lib/content/faq";

type Question = { question: string; answer: string };

// The questions in two equal columns, as in the design: the first half on the left, the rest on the right.
const half = Math.ceil(servicesFaq.items.length / 2);
const columns: Question[][] = [servicesFaq.items.slice(0, half), servicesFaq.items.slice(half)];

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
  Frame per variant (2026-11-16): only the vertical padding differs. "default" is the original
  1080px frame at 1920 (unchanged on every page). "compact" is the 1920x942 frame (/services): 69px
  less above and below, so the same content stays centred. Nothing else changes.
*/
const frames = {
  default: "lg:pt-[clamp(64px,12.396vw,238px)] lg:pb-[clamp(64px,12.474vw,239.5px)]",
  compact: "lg:pt-[clamp(64px,8.802vw,169px)] lg:pb-[clamp(64px,8.880vw,170.5px)]",
};

type FaqProps = {
  /** "compact": the 1920x942 frame. Default: the original 1080px frame. */
  frame?: keyof typeof frames;
};

export function Faq({ frame = "default" }: FaqProps) {
  return (
    <section aria-labelledby="faq-heading" className="bg-[#eae2dd]">
      <noscript>
        <style>
          {"[data-faq-answer]{visibility:visible!important;grid-template-rows:1fr!important}"}
        </style>
      </noscript>
      <div className={`mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 xl:px-5 ${frames[frame]}`}>
        <Reveal className="grid gap-5 lg:grid-cols-[minmax(0,1002fr)_minmax(0,558fr)] lg:gap-0">
          <div>
            <p className="ww-rise flex items-center gap-2 text-[16px] leading-5 font-bold tracking-[0.078em] text-brand uppercase lg:text-[clamp(16px,1.042vw,20px)]">
              <span
                className="h-[3px] w-[22px] shrink-0 -translate-y-px bg-brand"
                aria-hidden="true"
              />
              {servicesFaq.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-[#0d1d44] lg:text-[clamp(34px,2.71vw,52px)]"
            >
              <MaskLine order={1}>{servicesFaq.heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {servicesFaq.heading.accent}
              </MaskLine>
            </h2>
          </div>

          <div style={revealOrder(3)} className="ww-rise lg:pt-0.5">
            <p className="text-[18px] leading-[1.45] tracking-[0.036em] text-[#0d1d44] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
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
          className="mt-8 grid items-start gap-6 lg:mt-[60.5px] lg:grid-cols-2 lg:gap-x-10 min-[1600px]:-mx-[14.5px]"
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.map((item, rowIndex) => (
                <FaqItem key={item.question} {...item} order={(columnIndex + rowIndex) * 0.6} />
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
