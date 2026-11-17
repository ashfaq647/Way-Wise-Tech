import { AssetImage } from "@/components/ui/AssetImage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { portfolioShowcase, type PortfolioProject } from "@/lib/content/portfolio";
import { ShowcaseFan } from "./ShowcaseFan";

/*
  Sizes outside the cards are the design's 1920 value times --u, as in the Case Study and testimonial
  sections: 1px at 1920, scaling with the width from xl down to 1280, and fixed below. Fonts keep
  minimums. --g is the page gutter (the Container's padding, 180px at 1920).

  The cards are sized from --sf-w, the front card's width, so each one scales as a whole (its
  proportions are Frame 2147239009.png's 513px card). --sf-s1 and --sf-s2 are how far the first and
  second cards behind sit from the centre, in card widths (see showcase-fan.css). On phones the
  second cards are hidden (--sf-far), because only the first ones fit beside the front card.

  From xl the fan's stage runs from the right column's start (x 690 at 1920) to the screen edge, and
  the fan is centred in it (x 1305 at 1920), so the front card is the design's full 513px card while
  the outermost card on the left still ends clear of the text column (about 659 against 620 at 1920).
  The outermost card on the right may run slightly past the screen edge, where the section clips it.
  The fan reaches about 1.26 card widths either side of its centre (scale and turn included), so the
  card is also capped at 0.418 of the stage as a safety limit (513u is the smaller at every width checked).
*/
const layout = [
  "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]",
  "[--g:20px] md:[--g:32px] xl:[--g:max(20px,calc((100cqw-1560px)/2))]",
  "[--sf-s1:0.6] [--sf-s2:1] [--sf-far:0] md:[--sf-far:1]",
  "[--sf-w:min(78cqw,340px)] sm:[--sf-w:min(56cqw,400px)] md:[--sf-w:min(48cqw,440px)] lg:[--sf-w:min(40cqw,460px)]",
  "xl:[--sf-w:min(calc(var(--u)*513),calc(((100cqw-2*var(--g))*1050/1560+var(--g))*0.418))]",
].join(" ");

/** A length in card widths, from the 513px card in the design: `card(28)` is 28px at 513 wide. */
const card = (px: number) => `calc(var(--sf-w)*${(px / 513).toFixed(4)})`;

/** One card as drawn: the image (rounded top corners in the file), two pills, title, description. */
function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[inherit] bg-white">
      <div className="relative aspect-[1026/840]">
        <AssetImage
          src={project.image.src}
          alt={project.image.alt}
          sizes="(min-width: 1280px) 27vw, (min-width: 1024px) 40vw, (min-width: 768px) 48vw, (min-width: 640px) 56vw, 78vw"
          className="object-cover"
        />
      </div>
      <div style={{ padding: `${card(32)} ${card(32)} ${card(31)}` }}>
        <ul className="flex flex-wrap" style={{ gap: card(11) }}>
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center rounded-full bg-[#f3eae1] leading-none text-ink-muted"
              style={{
                height: `max(28px, ${card(32)})`,
                paddingInline: `max(11px, ${card(16)})`,
                fontSize: `max(13px, ${card(18)})`,
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
        <h3
          className="leading-[1.25] font-semibold tracking-[-0.005em] text-ink"
          style={{ marginTop: `max(10px, ${card(12)})`, fontSize: `max(20px, ${card(28)})` }}
        >
          {project.title}
        </h3>
        <p
          className="leading-[1.5] text-ink-muted"
          style={{ marginTop: `max(6px, ${card(13)})`, fontSize: `max(16px, ${card(20)})` }}
        >
          {project.description}
        </p>
      </div>
    </article>
  );
}

/**
 * Our Portfolio, the section between the Hero and Recent Projects. The section is
 * Frame 2147239009.png: a sand section with the heading, description and seven category labels on
 * the left (x 180 to 690 at 1920) and the project cards on the right. The cards are a fan carousel
 * after the CMS Fan Carousel reference (ShowcaseFan): the current card in front, the others fanned
 * out behind it, with round Prev and Next arrows and page dots below.
 *
 * The category labels are plain labels, and the cards are not links yet (owner, 2026-11-15). Below xl
 * the text comes first and the fan follows, centred at full width.
 */
export function PortfolioShowcase() {
  const { eyebrow, heading, description, categories, listLabel, projects } = portfolioShowcase;

  return (
    <section
      id="portfolio-showcase"
      aria-labelledby="portfolio-showcase-heading"
      className="@container overflow-x-clip bg-sand"
    >
      <div
        className={`grid gap-10 py-12 md:gap-12 md:py-16 lg:py-20 xl:grid-cols-[var(--g)_minmax(0,510fr)_minmax(0,1050fr)_var(--g)] xl:items-center xl:gap-0 xl:pt-[calc(var(--u)*82)] xl:pb-[calc(var(--u)*68)] ${layout}`}
      >
        <Reveal each className="min-w-0 px-[var(--g)] xl:col-start-2 xl:-mt-[calc(var(--u)*16)] xl:px-0">
          <SectionEyebrow weight="bold" tracking="0.1em" className="ww-rise">
            {eyebrow}
          </SectionEyebrow>
          <h2
            id="portfolio-showcase-heading"
            className="mt-2 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink lg:mt-[calc(var(--u)*8)] lg:text-[max(34px,calc(var(--u)*53.5))] lg:leading-[calc(var(--u)*61.7)]"
          >
            <MaskLine order={1}>{heading.first} </MaskLine>
            <MaskLine order={2}>
              {`${heading.second} `}
              <span className="text-brand">{heading.accent}</span>{" "}
            </MaskLine>
            <MaskLine order={3} className="text-brand">
              {heading.third}
            </MaskLine>
          </h2>
          <p
            style={revealOrder(4)}
            className="ww-rise mt-5 max-w-[22em] text-[18px] leading-[1.45] text-ink-muted lg:mt-[calc(var(--u)*25)] lg:max-w-[calc(var(--u)*440)] lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333]"
          >
            {description}
          </p>
          {/* Plain labels, not filters: no hover or pressed state (owner, 2026-11-15). */}
          <ul
            aria-label="What we design"
            className="mt-6 flex max-w-[calc(var(--u)*440)] min-w-[min(100%,300px)] flex-wrap gap-x-[max(10px,calc(var(--u)*16))] gap-y-[max(8px,calc(var(--u)*10))] lg:mt-[calc(var(--u)*23)]"
          >
            {categories.map((category, index) => (
              <li
                key={category}
                style={revealOrder(5 + index)}
                className="ww-rise flex h-[max(44px,calc(var(--u)*55))] items-center rounded-[max(4px,calc(var(--u)*5))] border border-[#ada7a4] bg-[#f7f1eb] px-[max(18px,calc(var(--u)*29))] text-[max(16px,calc(var(--u)*20))] leading-none font-medium text-ink"
              >
                {category}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="min-w-0 px-[var(--g)] xl:col-[3/5] xl:px-0">
          <div className="ww-rise">
            <ShowcaseFan
              label={listLabel}
              cards={projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
