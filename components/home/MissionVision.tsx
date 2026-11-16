import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { homeMissionVision } from "@/lib/content/home";

const { eyebrow, heading, description, image, cards } = homeMissionVision;

/*
  The Homepage Mission & Vision section (2026-11-16 redesign, reference `Frame 2147239025.png`,
  1920x942). At 1920 the content runs from y 100 to 842: on the left the eyebrow, a two-line heading,
  a three-line description and the 750x431.5 image (its corners are in the file), its bottom level
  with the second card's; on the right two 750px white cards, 24px apart, filling the same height.

  Every size is the 1920 value times --u, as in the newer sections: 1px at 1920, scaling with the
  width down to 1280, fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

export function MissionVision() {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className={`${unit} bg-[#f4f0e9]`}
    >
      <Reveal each>
        {/*
          Side by side from xl. Between lg and xl each column would be about 450px: the heading's
          first line no longer fits and the cards' text runs far taller than the left column, so
          below xl the left column comes first and the cards follow, full width.
        */}
        <Container className="grid gap-10 py-14 md:py-16 lg:py-[calc(var(--u)*100)] xl:grid-cols-2 xl:gap-x-[calc(var(--u)*60)]">
          <div className="flex min-w-0 flex-col">
            <SectionEyebrow className="ww-rise lg:-mt-px" tracking="0.068em">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="mission-vision-heading"
              className="mt-2 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink lg:mt-[calc(var(--u)*8)] lg:text-[max(34px,calc(var(--u)*53.5))]"
            >
              <MaskLine order={1}>
                {`${heading.first} `}
                <span className="text-brand">{heading.accent}</span>
              </MaskLine>
              <MaskLine order={2}>
                <span className="text-brand">{heading.second}</span>
              </MaskLine>
            </h2>
            <p
              style={revealOrder(2)}
              className="ww-rise mt-4 text-[18px] leading-[1.45] text-ink-muted lg:mt-[calc(var(--u)*26)] xl:mb-[calc(var(--u)*35)] lg:text-[max(18px,calc(var(--u)*26))] lg:leading-[1.231]"
            >
              {description}
            </p>
            {/*
              Its bottom lines up with the second card's: the column stretches to the cards' height and
              the image takes any spare space above it (at least the description's 35px margin).
            */}
            <div
              style={revealOrder(3)}
              className="ww-rise relative mt-8 aspect-[1500/863] w-full xl:mt-auto"
            >
              <AssetImage
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:gap-[calc(var(--u)*24)] xl:grid-rows-2">
            {cards.map((card, index) => (
              <article
                key={card.title.accent}
                aria-labelledby={`mission-vision-${card.title.accent.toLowerCase()}`}
                style={revealOrder(index + 1)}
                className="ww-rise rounded-[max(12px,calc(var(--u)*16))] bg-white px-6 py-7 md:px-8 lg:px-[calc(var(--u)*24)] lg:pt-[calc(var(--u)*27)] lg:pb-[calc(var(--u)*41.95)]"
              >
                <h3
                  id={`mission-vision-${card.title.accent.toLowerCase()}`}
                  className="text-[32px] leading-[1.15] font-semibold tracking-[-0.015em] text-navy lg:text-[max(30px,calc(var(--u)*47))]"
                >
                  {`${card.title.first} `}
                  <span className="text-brand">{card.title.accent}</span>
                </h3>
                <p className="mt-3 text-[17px] leading-[1.45] text-ink-muted lg:mt-[calc(var(--u)*20)] lg:text-[max(17px,calc(var(--u)*26))] lg:leading-[1.385]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
