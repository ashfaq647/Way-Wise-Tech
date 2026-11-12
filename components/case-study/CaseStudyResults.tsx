import type { CSSProperties } from "react";
import { Icon } from "@/components/case-study/CaseStudyOverview";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { RollingNumber } from "@/components/motion/RollingNumber";
import { revealOrder } from "@/components/motion/revealOrder";
import { clientLogos } from "@/lib/assets";
import { caseStudyResults } from "@/lib/content/case-study";
import "./case-study-results.css";

/*
  Every size is the design's 1920 value times --u, as in the other Case Study sections: 1px at 1920,
  scaling with the width from xl down to 1280, and fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

// Each result's type (48px semibold navy at 1920, raised 3px as drawn), rolled or not.
const valueType =
  "text-[max(32px,calc(var(--u)*48))] leading-[1.2] font-semibold text-navy lg:-mt-[calc(var(--u)*3)]";

/**
 * The Case Study trust section, "A Trusted Partner Across Industries", from Trust Section.png. At
 * 1920: a 1080px section on sand, the heading on the left and the description on the right (the
 * Technologies header layout), four white 768x232 result cards (15px radius) two across, 24px and
 * 27px apart, then the client logos (without r&n, as drawn) spread across the content width.
 * Each card: a 78px #faeddc circle with the Client Overview people icon (30px), then the result
 * (48px navy), its label (28px black), a 1px #ede8e0 line and the shared line (22px ink-muted).
 * Below lg the header and the cards stack; below xl (where the six logos would not fit on one line)
 * the logos form an even grid (three across from sm, two below).
 */
export function CaseStudyResults() {
  const { eyebrow, heading, description, results, logos } = caseStudyResults;

  return (
    <section
      id="case-study-results"
      aria-labelledby="case-study-results-heading"
      className={`bg-sand ${unit}`}
    >
      <Container className="py-12 md:py-16 lg:pt-[calc(var(--u)*136)] lg:pb-[calc(var(--u)*138)]">
        <Reveal
          each
          className="grid gap-6 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:items-end lg:gap-0"
        >
          <div className="min-w-0">
            <SectionEyebrow weight="bold" tracking="0.065em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="case-study-results-heading"
              className="mt-2 text-[clamp(26px,7.4vw,48px)] leading-[1.173] font-semibold tracking-[-0.015em] text-navy lg:mt-[calc(var(--u)*7)] lg:text-[max(34px,calc(var(--u)*52))]"
            >
              <MaskLine order={1}>{heading.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
          </div>
          <p
            style={revealOrder(3)}
            className="ww-rise max-w-[30em] text-[18px] leading-[1.45] text-ink-muted lg:max-w-[calc(var(--u)*592)] lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333] lg:tracking-[-0.03em]"
          >
            {description}
          </p>
        </Reveal>

        <Reveal
          each
          className="mt-10 grid gap-4 lg:mt-[calc(var(--u)*58)] lg:grid-cols-2 lg:gap-x-[calc(var(--u)*24)] lg:gap-y-[calc(var(--u)*27)]"
        >
          {results.map((result, index) => (
            <article
              key={result.label}
              style={{ ...revealOrder(index), "--csr-i": index } as CSSProperties}
              // overflow-clip: RollingNumber's hidden digit strips would otherwise count towards the
              // page's scrollable height (blank scrolling at the end, as found on About Us). Nothing
              // visible extends past the card.
              className="csr-card ww-rise flex items-start gap-4 overflow-clip rounded-[calc(var(--u)*15)] bg-white p-5 sm:p-6 lg:h-[calc(var(--u)*232)] lg:gap-[calc(var(--u)*42)] lg:p-0 lg:pt-[calc(var(--u)*39)] lg:pr-[calc(var(--u)*24)] lg:pl-[calc(var(--u)*40)]"
            >
              <span className="grid size-[max(56px,calc(var(--u)*78))] shrink-0 place-items-center rounded-full bg-[#faeddc] text-brand">
                <span className="block size-[38.5%]">
                  <Icon name="users" />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                {/\d/.test(result.value) ? (
                  // Digits roll (shared RollingNumber, unchanged); ".", "x" and "%" stay still.
                  <RollingNumber value={result.value} className={`block ${valueType}`} />
                ) : (
                  // A word ("High"): a small fade-up on the same timing (case-study-results.css).
                  <p className={`csr-fade ${valueType}`}>{result.value}</p>
                )}
                <h3 className="mt-[calc(var(--u)*4)] text-[max(20px,calc(var(--u)*32))] leading-[1.25] text-black">
                  {result.label}
                </h3>
                <p className="mt-[calc(var(--u)*11)] border-t border-[#ede8e0] pt-[max(12px,calc(var(--u)*11))] text-[max(16px,calc(var(--u)*22))] leading-[1.4] text-ink-muted">
                  {result.text}
                </p>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal
          each
          className="mt-12 grid grid-cols-2 place-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:mt-[calc(var(--u)*61)] xl:flex xl:flex-nowrap xl:items-center xl:justify-between"
        >
          {logos.map((logo, index) => {
            const file = clientLogos.find((entry) => entry.name === logo.name);
            if (!file) return null;
            return (
              <div
                key={logo.name}
                style={{
                  ...revealOrder(index),
                  width: `calc(var(--u) * ${logo.size[0]})`,
                  aspectRatio: `${logo.size[0]} / ${logo.size[1]}`,
                }}
                // The sand background keeps the blend right while the reveal animation isolates it.
                className="ww-rise relative max-w-full shrink-0 bg-sand"
              >
                <AssetImage
                  src={file.src}
                  alt={logo.name}
                  sizes="240px"
                  className={`object-contain ${logo.blend ? "mix-blend-darken" : ""}`}
                />
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
