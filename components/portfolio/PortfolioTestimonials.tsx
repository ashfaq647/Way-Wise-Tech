import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { portfolioTestimonials } from "@/lib/content/portfolio";
import { TestimonialFlow } from "./TestimonialFlow";
import "./portfolio-testimonials.css";

/*
  Every size is the design's 1920 value times --u, as in the Case Study sections: 1px at 1920,
  scaling with the width from xl down to 1280, and fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

/**
 * "What Our Clients Say About Us" on the Our Portfolio page (rebuilt 2026-11-15 after the live
 * preview of Framer's Testimonial Flow Pro; it replaced the scroll-built card stack). The header
 * follows the site's trust-section pattern (eyebrow and heading on the left, the description on the
 * right, sharing a bottom line from lg). Below it, TestimonialFlow: from xl the current testimonial
 * on the left and the portrait conveyor on the right, trailing off the screen edge (clipped by this
 * section's overflow-hidden); below xl the testimonial comes first and the conveyor follows.
 *
 * The page pins the section like its neighbours (held while Final CTA rises over it); nothing in
 * it is scroll-driven. Autoplay pauses itself while Final CTA covers it.
 */
export function PortfolioTestimonials() {
  const { eyebrow, heading, description, testimonials } = portfolioTestimonials;

  return (
    <section
      id="portfolio-testimonials"
      aria-labelledby="portfolio-testimonials-heading"
      className={`overflow-hidden bg-sand ${unit}`}
    >
      {/*
        The section is shorter than most desktop screens, so it pins at the top while Final CTA rises:
        from lg its top padding clears the Navbar (about 90px) so the eyebrow stays visible then.
      */}
      <Container className="pt-14 pb-10 sm:pb-14 md:py-20lg:pt-[112px] xl:pt-[max(100px,calc(var(--u)*112))] xl:pb-[calc(var(--u)*80)]">
        <Reveal
          each
          className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,auto)] lg:items-end lg:gap-10"
        >
          <div className="min-w-0">
            <SectionEyebrow weight="bold" tracking="0.1em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="portfolio-testimonials-heading"
              className="mt-2 text-[clamp(26px,7.4vw,48px)] leading-[1.173] font-semibold tracking-[-0.015em] text-ink lg:mt-[calc(var(--u)*7)] lg:text-[max(34px,calc(var(--u)*52))]"
            >
              <MaskLine order={1}>{heading.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
          </div>
          <p
            style={revealOrder(3)}
            className="ww-rise max-w-[24em] text-[17px] leading-[1.45] text-ink-muted lg:text-right lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333]"
          >
            {description}
          </p>
        </Reveal>

        <Reveal each className="mt-10 md:mt-14 xl:mt-[calc(var(--u)*48)]">
          <div className="ww-rise">
            <TestimonialFlow testimonials={testimonials} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
