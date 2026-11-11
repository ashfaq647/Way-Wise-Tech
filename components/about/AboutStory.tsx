import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { aboutStory } from "@/lib/content/about";

/** The outlined map pin on each location label, drawn to the reference. */
function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="size-[clamp(18px,1.25vw,24px)] shrink-0 text-brand"
    >
      <path d="M12 21.5c-1.9-1.7-7.5-6.6-7.5-11.5a7.5 7.5 0 0 1 15 0c0 4.9-5.6 9.8-7.5 11.5Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.75" />
    </svg>
  );
}

/**
 * "Our Story" on the About Us page, from Frame 2147239133.png. At 1920 the section is 1080px tall
 * on sand: the text on the left (eyebrow, two-line heading, three paragraphs) and, on the right, a
 * 730px grid of four 353x286 photo cards, 24px apart, each with a white location label in its
 * top-right corner. The photos' rounded corners are in the files. Below lg the text comes first;
 * the cards are two across from sm, one below.
 */
export function AboutStory() {
  const { eyebrow, heading, paragraphs, locations } = aboutStory;

  return (
    <section aria-labelledby="about-story-heading" className="bg-sand">
      <Container className="py-14 md:py-20 lg:py-[clamp(80px,12.604vw,242px)]">
        <Reveal
          each
          className="grid gap-10 lg:grid-cols-[minmax(0,830fr)_minmax(0,730fr)] lg:items-center lg:gap-0"
        >
          {/* The reference sits the text 12px above the cards' centre; the bottom padding keeps that. */}
          <div className="min-w-0 lg:pr-[clamp(24px,3.125vw,60px)] lg:pb-[clamp(12px,1.25vw,24px)]">
            <SectionEyebrow weight="bold" tracking="0.095em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>

            <SectionHeading id="about-story-heading" className="mt-3 lg:mt-[clamp(8px,0.625vw,12px)]">
              <MaskLine order={1}>{heading.first}</MaskLine>{" "}
              <MaskLine order={2}>
                {heading.second}{" "}
                {/* The reference leaves a wider gap before the red words. */}
                <span className="ml-[0.18em] text-brand">{heading.accent}</span>
              </MaskLine>
            </SectionHeading>

            <div className="mt-6 lg:mt-[clamp(15px,1.406vw,27px)]">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  style={revealOrder(3 + index)}
                  className="ww-rise mt-5 max-w-[35em] text-[18px] leading-[1.45] text-ink first:mt-0 lg:mt-[clamp(16px,1.51vw,29px)] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.318] lg:first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-[clamp(14px,1.25vw,24px)]">
            {locations.map((location, index) => (
              <li
                key={location.image.src}
                style={revealOrder(2 + index)}
                className="group/card ww-rise relative aspect-[706/573]"
              >
                {/*
                  Hover zooms the photo only, inside a frame clipped to the photo's own rounded
                  corners (26px in each 706x573 file, so 3.683% x 4.538% at any size). The card, its
                  size and its label never move. hover: applies only on devices that can hover, and
                  motion-safe: drops the zoom for reduced motion.
                */}
                <div className="absolute inset-0 isolate overflow-hidden rounded-[3.683%_/_4.538%]">
                  <AssetImage
                    src={location.image.src}
                    alt={location.image.alt}
                    sizes="(min-width: 1024px) 19vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-[1.03]"
                  />
                </div>
                <p className="absolute top-[clamp(8px,0.521vw,10px)] right-[clamp(8px,0.521vw,10px)] flex h-[clamp(30px,1.823vw,35px)] items-center gap-[clamp(4px,0.339vw,6.5px)] rounded-[clamp(6px,0.417vw,8px)] bg-white pr-[clamp(9px,0.625vw,12px)] pl-[clamp(8px,0.599vw,11.5px)] text-[clamp(14px,0.833vw,16px)] leading-none font-medium whitespace-nowrap text-navy">
                  <PinIcon />
                  {location.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
