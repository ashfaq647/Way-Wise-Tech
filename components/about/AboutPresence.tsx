import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { aboutPresence } from "@/lib/content/about";
import "./about-presence.css";

/** The small red arrow in each list item's circle, drawn to the reference. */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-[clamp(10px,0.625vw,12px)]"
    >
      <path d="M1.5 6h8.5M6.5 2.5 10 6l-3.5 3.5" />
    </svg>
  );
}

/**
 * "Our Global Presence" on the About Us page, from Frame 2147239135.png. At 1920 the section is
 * 1080px tall on #d0d0c8: the heading on the left and the description on the right share a bottom
 * line (the Industries trust header pattern), then three 504px office cards, 24px apart and 739px
 * tall. Each card is a 504x350 photo (its top corners rounded in the file) over a white body with
 * the office name, location, "Key Operations:" and a list with red arrow markers. Below lg the
 * header stacks and the cards run one per row.
 */
export function AboutPresence() {
  const { eyebrow, heading, description, operationsLabel, offices } = aboutPresence;

  return (
    // overflow-x-clip: cards entering from the sides (about-presence.css) never widen the page.
    <section id="about-presence" aria-labelledby="about-presence-heading" className="overflow-x-clip bg-[#d0d0c8]">
      <Container className="py-14 md:py-20 lg:pt-[clamp(48px,4.063vw,78px)] lg:pb-[clamp(56px,4.167vw,80px)]">
        <Reveal each>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="min-w-0">
              <SectionEyebrow weight="bold" tracking="0.069em" className="ww-rise">
                {eyebrow}
              </SectionEyebrow>
              <SectionHeading
                id="about-presence-heading"
                tone="navy"
                className="mt-2 lg:mt-[clamp(2px,0.208vw,4px)]"
              >
                <MaskLine order={1}>{heading.first}</MaskLine>{" "}
                <MaskLine order={2} className="text-brand">
                  {heading.second}
                </MaskLine>
              </SectionHeading>
            </div>
            <p
              style={revealOrder(3)}
              className="ww-rise max-w-[26.9em] text-[18px] leading-[1.45] text-ink-muted lg:shrink-0 lg:text-[clamp(17px,1.146vw,22px)]"
            >
              {description}
            </p>
          </div>

          {/*
            Tablet (md to lg): two across on four tracks, each card spanning two, so the third card
            starts on the second track and sits centred on its own row at the same width. From lg the
            three cards share one row, as in the reference; below md they run one per row.
          */}
          <ul className="wp-presence-row mt-8 grid gap-6 md:grid-cols-4 lg:mt-[clamp(26px,2.083vw,40px)] lg:grid-cols-3 lg:gap-[clamp(14px,1.25vw,24px)]">
            {offices.map((office, index) => (
              <li
                key={office.title}
                style={revealOrder(2 + index)}
                // wp-presence-card: the scroll-linked split convergence in about-presence.css.
                className="wp-presence-card ww-rise md:col-span-2 md:last:col-start-2 lg:col-span-1 lg:last:col-start-auto"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white">
                  {/* overflow-hidden clips the photo's settling zoom to the card. */}
                  <div className="wp-presence-card__media relative aspect-[1008/700] overflow-hidden">
                    <AssetImage
                      src={office.image.src}
                      alt={office.image.alt}
                      sizes="(min-width: 1024px) 27vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-6 pt-6 pb-8 lg:px-[clamp(20px,1.667vw,32px)] lg:pt-[clamp(18px,1.458vw,28px)] lg:pb-[clamp(22px,1.875vw,36px)]">
                    <h3 className="text-[24px] leading-[1.286] font-semibold text-ink lg:text-[clamp(19px,1.458vw,28px)]">
                      {office.title}
                    </h3>
                    <p className="mt-1 text-[18px] leading-[1.273] text-ink-muted lg:mt-[clamp(2px,0.156vw,3px)] lg:text-[clamp(15px,1.146vw,22px)]">
                      {office.location}
                    </p>
                    <p className="mt-5 text-[19px] leading-[1.36] font-medium text-[#2a2a2a] lg:mt-[clamp(14px,1.163vw,22.3px)] lg:text-[clamp(16px,1.146vw,22px)]">
                      {operationsLabel}
                    </p>
                    <ul className="mt-3 grid gap-4 lg:mt-[clamp(9px,0.729vw,14px)] lg:gap-[clamp(12px,0.938vw,18px)]">
                      {office.operations.map((operation) => (
                        <li
                          key={operation}
                          className="flex items-center gap-4 text-[18px] leading-6 tracking-[0.03em] text-steel lg:gap-[clamp(10px,0.833vw,16px)] lg:text-[clamp(15px,1.042vw,20px)]"
                        >
                          <span
                            aria-hidden="true"
                            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#faeddc] text-brand lg:size-[clamp(20px,1.25vw,24px)]"
                          >
                            <ArrowIcon />
                          </span>
                          {operation}
                        </li>
                      ))}
                    </ul>
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
