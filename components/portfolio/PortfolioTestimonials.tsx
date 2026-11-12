import type { CSSProperties } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { portfolioTestimonials } from "@/lib/content/portfolio";
import "./portfolio-testimonials.css";

/*
  Every size is the design's 1920 value times --u, as in the Case Study sections: 1px at 1920,
  scaling with the width from xl down to 1280, and fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

/** A phase of the pinned hold, as fractions of it, for portfolio-testimonials.css. */
const phase = (a: number, b: number) => ({ "--a": a, "--b": b }) as CSSProperties;

/*
  The choreography over the pinned hold (0 to 1). The back card is in place from the start; the two
  blank cards rise in one after the other, then the testimonial card with its clip reveal, portrait
  settle and content stagger. The last tenth holds the finished frame before Recent Projects rises.
*/
const cardPhases = [null, phase(0, 0.2), phase(0.2, 0.4), phase(0.4, 0.74)];

/** The reference's red closing quote, two rounded marks, drawn on a 42x30 grid. */
function QuoteMark() {
  const mark = "M17.5 9C17.5 19 12 26 4.5 29.5L2.8 27C7.5 24.5 10.6 21 11.4 17.2A8.5 8.5 0 1 1 17.5 9Z";
  return (
    <svg viewBox="0 0 42 30" aria-hidden="true" className="size-full" fill="currentColor">
      <path d={mark} />
      <path d={mark} transform="translate(22 0)" />
    </svg>
  );
}

const STAR = "M12 1.6l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.7l-6.4 3.5 1.4-7.1-5.3-5 7.2-.9z";

/** Five stars, filled to the rating (a half star is half gold, half grey), as drawn. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-[calc(var(--u)*3)]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <svg key={index} viewBox="0 0 24 24" className="size-[max(20px,calc(var(--u)*25.5))]">
            <defs>
              <clipPath id={`pt-star-${index}`}>
                <rect width={24 * fill} height="24" />
              </clipPath>
            </defs>
            <path d={STAR} fill="#d9d9d9" />
            {fill > 0 && <path d={STAR} fill="#ffab00" clipPath={`url(#pt-star-${index})`} />}
          </svg>
        );
      })}
    </span>
  );
}

/**
 * "What Our Clients Say About Us" on the Our Portfolio page, from Frame 2147239021.png. At 1920: a
 * 1080px section on sand, the heading on the left (centred against the stack) and four 1020px white
 * cards (12px radius) stacked 57px apart on the right. The three behind are blank, as drawn; the
 * front card (457px, 60px padding) holds the testimonial beside the 300x337 portrait.
 *
 * The page pins this section with a hold; during the hold the stack builds up, scroll-linked, as
 * set out in portfolio-testimonials.css. Its finished state is the design exactly. Below xl the text
 * comes first and the stack follows full width (beside the text, a 1024px screen leaves the cards so
 * narrow that the front card is taller than the screen); below md the portrait sits above the
 * testimonial. A section taller than the screen pins with its bottom, the stack, in view.
 */
export function PortfolioTestimonials() {
  const { eyebrow, heading, description, backCards, testimonial } = portfolioTestimonials;
  const cards = backCards + 1;

  return (
    <section
      id="portfolio-testimonials"
      aria-labelledby="portfolio-testimonials-heading"
      className={`flex flex-col justify-center overflow-hidden bg-sand ${unit}`}
    >
      <Container className="grid gap-10 py-12 md:py-16 xl:grid-cols-[minmax(0,510fr)_minmax(0,1020fr)_minmax(0,30fr)] xl:items-center xl:gap-0 xl:py-[calc(var(--u)*226)]">
        <Reveal each className="min-w-0">
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
          <p
            style={revealOrder(3)}
            className="ww-rise mt-6 max-w-[22em] text-[18px] leading-[1.45] text-ink-muted lg:mt-[calc(var(--u)*22)] lg:max-w-[calc(var(--u)*440)] lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333]"
          >
            {description}
          </p>
        </Reveal>

        {/*
          All cards share one grid cell. Each sits 57px lower than the last (top margin) and stops at
          the front card's bottom (bottom margin), so the blank cards are exactly the front card's
          height and only their top edges show, as drawn. Later cards paint on top.
        */}
        <div className="pt-stack grid min-w-0" style={{ "--pt-cards": cards } as CSSProperties}>
          {Array.from({ length: cards }, (_, index) => {
            const front = index === cards - 1;
            return (
              <div
                key={index}
                className={`pt-slot [grid-area:1/1] ${cardPhases[index] ? "pt-anim pt-enter" : ""}`}
                style={{
                  ...cardPhases[index],
                  // The next card's phase: this card dips back while it passes over.
                  ...(cardPhases[index + 1] && {
                    "--na": (cardPhases[index + 1] as Record<string, number>)["--a"],
                    "--nb": (cardPhases[index + 1] as Record<string, number>)["--b"],
                  }),
                  marginTop: `calc(var(--pt-step) * ${index})`,
                  marginBottom: `calc(var(--pt-step) * ${cards - 1 - index})`,
                } as CSSProperties}
                aria-hidden={front ? undefined : true}
              >
                <div className={`pt-card relative h-full rounded-[calc(var(--u)*12)] bg-white ${front ? "" : "pt-press"}`}>
                  {front && (
                    <figure className="flex flex-col gap-6 p-5 sm:p-8 md:flex-row md:items-start md:gap-[calc(var(--u)*60)] lg:p-[calc(var(--u)*60)]">
                      <div className="min-w-0 flex-1 lg:-mt-[calc(var(--u)*9)]">
                        <div className="flex items-start justify-between gap-4">
                          <figcaption className="pt-anim pt-fade" style={phase(0.58, 0.78)}>
                            <span className="block text-[max(22px,calc(var(--u)*32))] leading-[1.25] font-semibold text-navy">
                              {testimonial.name}
                            </span>
                            <span className="mt-[calc(var(--u)*4)] block text-[max(15px,calc(var(--u)*20))] leading-[1.35] text-steel">
                              {testimonial.role}
                            </span>
                          </figcaption>
                          <span
                            className="pt-anim pt-fade mt-[calc(var(--u)*17)] block w-[max(34px,calc(var(--u)*46))] shrink-0 text-brand"
                            style={phase(0.62, 0.8)}
                          >
                            <span className="block aspect-[42/30]">
                              <QuoteMark />
                            </span>
                          </span>
                        </div>
                        <blockquote
                          className="pt-anim pt-fade mt-[calc(var(--u)*27)] text-[max(16px,calc(var(--u)*22))] leading-[1.364] tracking-[-0.01em] text-ink"
                          style={phase(0.64, 0.84)}
                        >
                          {testimonial.quote}
                        </blockquote>
                        <div className="pt-anim pt-fade mt-[calc(var(--u)*30)]" style={phase(0.7, 0.9)}>
                          <div className="flex items-center gap-[calc(var(--u)*24)]">
                            <Stars rating={testimonial.rating} />
                            <span className="text-[max(15px,calc(var(--u)*18))] font-bold text-ink">
                              <span className="sr-only">Rated </span>
                              {testimonial.ratingLabel}
                            </span>
                          </div>
                          <p className="mt-[calc(var(--u)*16)] text-[max(15px,calc(var(--u)*18))] text-ink">
                            {testimonial.reviews}
                          </p>
                        </div>
                      </div>
                      {/*
                        The portrait's 52px corners (on 600x674) are in the file; the frame clips to
                        them exactly, so the settling zoom never shows a square edge.
                      */}
                      <div className="pt-portrait relative order-first aspect-[600/674] w-full max-w-[260px] shrink-0 overflow-hidden rounded-[8.667%_/_7.715%] md:order-none md:w-[calc(var(--u)*300)] md:max-w-none">
                        <div className="pt-anim pt-portrait-img absolute inset-0" style={phase(0.4, 0.84)}>
                          <AssetImage
                            src={testimonial.image.src}
                            alt={testimonial.image.alt}
                            sizes="(min-width: 768px) 300px, 260px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </figure>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
