import type { CSSProperties } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import type { WhyChooseContent } from "@/lib/content/service-details";

/**
 * "Why Choose" on the Service Details pages: the image card beside the text from lg, the image on
 * top below that. One shared design for every Service Details page (only the content differs).
 *
 * From lg, a 942 frame at 1920 (2026-11-17, reference `Frame 2147238537.png`): 100px above and
 * below a 727×742 image card (cover crop, 12px corners, a 1px warm outline), 60px gap, then the
 * text column (773px) centred on the card. Below lg the image is shown whole at its own ratio
 * (its rounded corners are in the file), as before.
 */
export function WhyChoose({ eyebrow, heading, description, points, image }: WhyChooseContent) {
  return (
    <section aria-labelledby="why-choose-heading" className="bg-sand">
      <Container className="py-12 md:py-16 lg:py-[clamp(56px,5.208vw,100px)]">
        <Reveal
          each
          className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,727fr)_minmax(0,773fr)] lg:items-center lg:gap-x-[clamp(32px,3.125vw,60px)]"
        >
          <div
            className="ww-rise relative aspect-(--ar) w-full max-w-[520px] lg:aspect-[727/742] lg:max-w-none lg:overflow-hidden lg:rounded-[12px] lg:after:pointer-events-none lg:after:absolute lg:after:inset-0 lg:after:rounded-[inherit] lg:after:border lg:after:border-[#ceb8b1]"
            style={{ "--ar": `${image.width} / ${image.height}` } as CSSProperties}
          >
            <AssetImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1600px) 727px, (min-width: 1024px) 46vw, 520px"
              className="object-contain lg:object-cover"
            />
          </div>

          <div className="min-w-0 lg:pb-[clamp(2px,0.156vw,3px)]">
            <SectionEyebrow size="md" weight="bold" tracking="0.1em" barClassName="max-h-[2px] -translate-y-0.5" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>

            <h2
              id="why-choose-heading"
              className="mt-[10px] text-[clamp(28px,7.4vw,48px)] leading-[1.0625] font-semibold tracking-[-0.013em] text-ink lg:mt-[clamp(6px,0.469vw,9px)] lg:text-[clamp(34px,2.786vw,53.5px)] lg:leading-[1.153]"
            >
              <MaskLine order={1}>{heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>

            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 text-[18px] leading-[1.45] text-ink-muted lg:mt-[clamp(18px,1.667vw,32px)] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.4545] lg:tracking-[0.041em]"
            >
              {description}
            </p>

            <ul className="mt-8 grid gap-y-4 lg:mt-[clamp(18px,1.667vw,32px)] lg:gap-y-[clamp(12px,1.354vw,26px)]">
              {points.map((point, index) => (
                <li
                  key={point}
                  style={revealOrder(4 + index)}
                  className="ww-rise flex items-center gap-3.5 text-[18px] leading-[1.3] text-[#171717] lg:gap-[clamp(10px,0.938vw,18px)] lg:text-[clamp(16px,1.146vw,22px)]"
                >
                  <svg
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    className="size-7 shrink-0 lg:size-[clamp(26px,1.667vw,32px)]"
                  >
                    <circle cx="16" cy="16" r="14" className="fill-brand" />
                    <path
                      d="m10.6 16.3 3.6 3.5 7.2-7.4"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
