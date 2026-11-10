import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import type { WhyChooseContent } from "@/lib/content/service-details";

/**
 * "Why Choose" on the Service Details pages: the image card beside the text from lg, the image on
 * top below that. The image is shown whole at its own ratio; its rounded corners are in the file.
 */
export function WhyChoose({ eyebrow, heading, description, points, image }: WhyChooseContent) {
  return (
    <section aria-labelledby="why-choose-heading" className="bg-sand">
      <Container className="py-12 md:py-16 lg:py-[clamp(56px,5.208vw,100px)]">
        <Reveal
          each
          className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,707fr)_minmax(0,772fr)] lg:items-center lg:gap-x-[clamp(32px,4.219vw,81px)]"
        >
          <div
            className="ww-rise relative w-full max-w-[520px] lg:max-w-none"
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <AssetImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1600px) 707px, (min-width: 1024px) 45vw, 520px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <SectionEyebrow size="md" weight="bold" tracking="0.1em" barClassName="max-h-[2px] -translate-y-0.5" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>

            <h2
              id="why-choose-heading"
              className="mt-[10px] text-[clamp(28px,7.4vw,48px)] leading-[1.0625] font-semibold tracking-[-0.013em] text-ink lg:mt-[clamp(6px,0.365vw,7px)] lg:text-[clamp(34px,3.333vw,64px)]"
            >
              <MaskLine order={1}>{heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>

            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 text-[18px] leading-[1.45] text-ink-muted lg:mt-[clamp(18px,1.823vw,35px)] lg:text-[clamp(16px,1.25vw,24px)] lg:leading-[1.3333]"
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
