import type { CSSProperties } from "react";
import { CardStack } from "@/components/motion/CardStack";
import { stackCard, stackHeader } from "@/components/motion/cardStackClasses";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { industrySolutions, industrySolutionsSection } from "@/lib/content/industries";
import "./industries-solutions.css";

const { eyebrow, heading, description } = industrySolutionsSection;

/**
 * "Industry Solutions" on the Industries page, from Our Work Section.png (section) and
 * Frame 2147238556.png (cards). At 1920 each card is 1560x360 with 40px padding, a 96px number
 * circle, the text, and a 660x280 image on the right with 12px rounded corners; cards are 30px
 * apart. Below lg the image sits on top of each card. Scroll-linked layering (lean, image zoom,
 * receding cards) is in industries-solutions.css.
 */
export function IndustriesSolutions() {
  return (
    <section aria-labelledby="industries-solutions-heading" className="bg-[#eee9e1]">
      <Container className="py-12 md:py-16 lg:pt-[clamp(56px,5.208vw,100px)] lg:pb-[clamp(56px,5.208vw,100px)]">
        {/*
          The shared sticky header (stackHeader in CardStack): from lg it stays at its arrival position
          while the cards stack below it, and leaves with the section.
        */}
        <Reveal each className={stackHeader}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0">
              <SectionEyebrow weight="semibold" tracking="0.094em" className="ww-rise">
                {eyebrow}
              </SectionEyebrow>
              <SectionHeading id="industries-solutions-heading" tone="navy" className="mt-2 lg:mt-1.5">
                <MaskLine order={1}>{heading.first}</MaskLine>{" "}
                <MaskLine order={2}>
                  {/* One string, so "for " stays a single text node before the red span. */}
                  {`${heading.second} `}
                  <span className="text-brand">{heading.accent}</span>
                </MaskLine>
              </SectionHeading>
            </div>
            <p
              style={revealOrder(3)}
              className="ww-rise max-w-[26.9em] text-[18px] leading-[1.45] text-navy lg:mt-[clamp(28px,2.188vw,42px)] lg:shrink-0 lg:text-[clamp(17px,1.146vw,22px)]"
            >
              {description}
            </p>
          </div>
        </Reveal>

        {/*
          As in the Homepage Our Work: the empty ::after gives the pinned cards room to stay pinned
          while Final CTA rises over them, so the last card completes the stack. The negative margin
          (spacer plus one gap) cancels it, so section and page heights do not change. It must exceed
          the distance Final CTA travels to cover the stack (48px + card + section padding) but stay
          below Final CTA's height plus that padding, or cards would show beneath Final CTA.
        */}
        {/*
          Hold (2026-11-17 frame rule, as in the Homepage Our Work): the spacer grows by --hold while
          the negative margin does not, so the finished stack rests before Final CTA rises and Final
          CTA never shows before card 4 pins. --hold is 30svh plus the room Final CTA would otherwise
          already have: 100svh minus card 4's pin (--p4: --t + 48px), the card (18.75vw, 360px at
          1920; smaller widths only make it taller, so the hold errs longer) and the bottom padding.
          From lg with motion allowed only; elsewhere --hold is unset (0).
        */}
        <CardStack className="ws-solutions mt-8 flex flex-col gap-5 [--cover:1000px] after:block after:h-[calc(var(--cover)+var(--hold,0px))] mb-[calc(-20px-var(--cover))] lg:mt-[clamp(32px,3.125vw,60px)] lg:gap-[30px] lg:[--cover:600px] lg:mb-[calc(-30px-var(--cover))] [--p4:144px] lg:[--p4:calc(var(--stack-top)+48px)] lg:motion-safe:[--hold:calc(30svh+max(0px,100svh-var(--p4)-18.75vw-clamp(56px,5.208vw,100px)))]">
          {industrySolutions.map((solution, index) => (
            <li
              key={solution.number}
              className={`ws-solution ${stackCard}`}
              style={
                {
                  "--i": index,
                  // Scroll-linked layering in industries-solutions.css: each card's own timeline,
                  // and the next card's, which this card recedes under.
                  "--self": `--ws-solution-${index}`,
                  ...(index < industrySolutions.length - 1 && { "--next": `--ws-solution-${index + 1}` }),
                } as CSSProperties
              }
            >
              <article className="ws-solution__card grid gap-6 rounded-2xl bg-[#fffaf7] p-4 sm:p-6 lg:grid-cols-[minmax(0,780fr)_minmax(0,660fr)] lg:items-center lg:gap-[clamp(24px,2.083vw,40px)] lg:p-[clamp(24px,2.083vw,40px)]">
                <div className="ws-solution__media relative aspect-[1320/560] rounded-xl lg:order-last lg:rounded-[clamp(8px,0.625vw,12px)]">
                  <AssetImage
                    src={solution.image}
                    alt={solution.alt}
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex items-start gap-4 sm:items-center lg:items-start lg:gap-[clamp(20px,2.083vw,40px)]">
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: solution.tone }}
                    className="flex size-14 shrink-0 items-center justify-center rounded-full text-[22px] font-bold text-white lg:size-[clamp(64px,5vw,96px)] lg:text-[clamp(24px,1.875vw,36px)]"
                  >
                    {solution.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[22px] leading-[1.25] font-semibold text-navy lg:text-[clamp(22px,1.667vw,32px)]">
                      {solution.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-[1.45] tracking-[0.035em] text-steel lg:max-w-[24.3em] lg:tracking-normal lg:mt-[clamp(6px,0.521vw,10px)] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.364]">
                      {solution.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2.5 lg:mt-[clamp(16px,1.563vw,30px)] lg:gap-3">
                      {solution.tags.map((tag) => (
                        <li
                          key={tag}
                          className="flex h-9 items-center rounded-full bg-[#f3eae1] px-4 text-[15px] text-ink-muted lg:h-[clamp(34px,2.083vw,40px)] lg:px-[clamp(14px,1.042vw,20px)] lg:text-[clamp(15px,0.938vw,18px)]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </CardStack>
      </Container>
    </section>
  );
}
