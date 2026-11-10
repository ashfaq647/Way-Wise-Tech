import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { industriesAtAGlance } from "@/lib/content/industries";

/**
 * "Industries at a Glance" on the Industries page, from Frame 2147239119.png. At 1920 the text sits
 * in the left 610px and four 459px cards fill the right 950px, 32px apart, all centred in a 1080px
 * section. Card images are 2x exports of their 459x250 frame. Cards share the Services card styles,
 * including its hover lift. Below lg the text comes first; cards are two across from md, one below.
 */
export function IndustriesAtAGlance() {
  return (
    <section aria-labelledby="industries-glance-heading" className="bg-sand">
      <Container className="py-12 md:py-16 lg:py-[clamp(56px,5.781vw,111px)]">
        <Reveal
          each
          className="grid gap-10 lg:grid-cols-[minmax(0,610fr)_minmax(0,950fr)] lg:items-center lg:gap-0"
        >
          <div className="min-w-0 lg:pr-[clamp(24px,2.083vw,40px)]">
            <SectionEyebrow weight="bold" tracking="0.069em" className="ww-rise">
              Industries at a Glance
            </SectionEyebrow>

            <SectionHeading id="industries-glance-heading" className="mt-2 lg:mt-1">
              <MaskLine order={1}>Digital Solutions for</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                All Types of Businesses
              </MaskLine>
            </SectionHeading>

            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[25.5em] lg:mt-[clamp(16px,1.12vw,21.5px)] text-[18px] leading-[1.45] text-ink-muted lg:text-[clamp(17px,1.146vw,22px)]"
            >
              From local businesses to global brands, we design websites, apps, and digital products
              for a wide range of industries.
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-2 lg:gap-[clamp(20px,1.667vw,32px)]">
            {industriesAtAGlance.map((industry, index) => (
              <li key={industry.title} style={revealOrder(2 + index)} className="ww-rise">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-[translate,box-shadow] duration-300 ease-out hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:hover:-translate-y-1">
                  <div className="relative aspect-918/500">
                    <AssetImage
                      src={industry.image}
                      alt={industry.alt}
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
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
