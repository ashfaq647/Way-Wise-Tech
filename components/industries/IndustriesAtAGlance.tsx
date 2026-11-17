import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { industriesAtAGlance, industriesAtAGlanceSection } from "@/lib/content/industries";

const { eyebrow, heading, description } = industriesAtAGlanceSection;

/**
 * Each photo's framing in its 459x232 frame, matched to `industriesAtAGlance` by position (fitted to
 * `Frame 2147239232.png`). Reordering the cards needs this list reordered too.
 */
const imagePositions = ["object-[50%_17%]", "object-[50%_72%]", "object-top", "object-center"];

/**
 * "Industries at a Glance" on the Industries page, from Frame 2147239232.png (2026-11-17, 942 frame).
 * At 1920 the text sits in the left 610px and four 459x380 cards fill the right 950px, 32px apart,
 * with 75px above and below (942px). Photos are cropped to 459x232. Cards share the Services card styles,
 * including its hover lift. Below lg the text comes first; cards are two across from md, one below.
 */
export function IndustriesAtAGlance() {
  return (
    <section aria-labelledby="industries-glance-heading" className="bg-sand">
      <Container className="py-12 md:py-16 lg:py-[clamp(48px,3.906vw,75px)]">
        <Reveal
          each
          className="grid gap-10 lg:grid-cols-[minmax(0,610fr)_minmax(0,950fr)] lg:items-center lg:gap-0"
        >
          <div className="min-w-0 lg:pr-[clamp(24px,2.083vw,40px)]">
            <SectionEyebrow weight="bold" tracking="0.069em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>

            <SectionHeading id="industries-glance-heading" className="mt-2 lg:mt-1">
              <MaskLine order={1}>{heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {heading.accent}
              </MaskLine>
            </SectionHeading>

            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[25.5em] lg:mt-[clamp(16px,1.12vw,21.5px)] text-[18px] leading-[1.45] text-ink-muted lg:text-[clamp(17px,1.146vw,22px)]"
            >
              {description}
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-2 lg:gap-[clamp(20px,1.667vw,32px)]">
            {industriesAtAGlance.map((industry, index) => (
              <li key={industry.title} style={revealOrder(2 + index)} className="ww-rise">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:hover:-translate-y-1">
                  <div className="relative aspect-[459/232]">
                    <AssetImage
                      src={industry.image}
                      alt={industry.alt}
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw"
                      className={`object-cover ${imagePositions[index]}`}
                    />
                  </div>
                  <div className="px-6 pt-5 pb-6">
                    <h3 className="text-[22px] leading-[1.286] font-semibold text-ink lg:text-[clamp(20px,1.458vw,28px)]">
                      {industry.title}
                    </h3>
                    <p className="mt-2 text-[17px] leading-normal text-ink-muted lg:text-[clamp(15px,1.042vw,20px)]">
                      {industry.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
