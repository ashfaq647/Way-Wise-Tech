import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { caseStudyChallenges } from "@/lib/content/case-study";

type Kind = "challenge" | "solution";

/**
 * The reference's two point markers, traced from it at 1920: a 34px filled circle with a white
 * mark, a cross (3.6px strokes) on brand red for challenges and a tick (4px) on #24a872 green for
 * the approach.
 */
function Marker({ kind }: { kind: Kind }) {
  const challenge = kind === "challenge";
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true" className="size-full">
      <circle cx="17" cy="17" r="17" fill={challenge ? "#d71920" : "#24a872"} />
      <path
        d={challenge ? "M11 11 23 23M23 11 11 23" : "M9.7 17.4l6.1 5.4 9.9-10.2"}
        fill="none"
        stroke="#fff"
        strokeWidth={challenge ? 3.6 : 4}
      />
    </svg>
  );
}

/*
  Every size is the design's 1920 value times --u, as in the Client Overview section: 1px at 1920,
  scaling with the width from xl down to 1280, and fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

// Headings: 52px semibold (SectionHeading's size at 1920) with 60px line spacing.
const heading =
  "text-[clamp(26px,7.4vw,48px)] leading-[1.1538] font-semibold tracking-[-0.015em] lg:text-[max(34px,calc(var(--u)*52))]";

function PointsCard({ kind, order }: { kind: Kind; order: number }) {
  const { eyebrow, heading: title, points } = caseStudyChallenges[kind];
  const id = `case-study-${kind}-heading`;
  return (
    <article
      aria-labelledby={id}
      style={revealOrder(order)}
      className="ww-rise rounded-[calc(var(--u)*14.5)] bg-white px-5 py-8 sm:px-8 lg:px-[calc(var(--u)*60)] lg:pt-[calc(var(--u)*38)] lg:pb-[calc(var(--u)*40)]"
    >
      <SectionEyebrow size="lg" weight="bold" tracking="0.078em">
        {eyebrow}
      </SectionEyebrow>
      <h3 id={id} className={`mt-2 text-navy lg:mt-[calc(var(--u)*12)] ${heading}`}>
        <MaskLine order={order + 1}>
          {title.first} <span className="text-brand">{title.second}</span>
        </MaskLine>
      </h3>
      {/*
        At 1920 the left column's text is 405px and the right one's 441px (it runs 28px into the
        card's right padding, as drawn), so each point breaks where the reference does.
      */}
      <ul className="mt-6 grid items-start gap-y-[max(14px,calc(var(--u)*24))] md:grid-cols-2 md:gap-x-6 lg:mt-[calc(var(--u)*39)] lg:-mr-[calc(var(--u)*28)] lg:grid-cols-[minmax(0,463fr)_minmax(0,499fr)] lg:gap-x-[calc(var(--u)*32)]">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-center gap-[max(12px,calc(var(--u)*20))] lg:min-h-[calc(var(--u)*40)] text-[max(17px,calc(var(--u)*26))] leading-[1.25] text-ink-muted lg:leading-[1.1538] lg:pl-[calc(var(--u)*4)]"
          >
            <span className="block size-[max(28px,calc(var(--u)*34))] shrink-0">
              <Marker kind={kind} />
            </span>
            <span className="min-w-0">
              {/*
                A "\n" in the content is a line break the design sets by hand. It breaks from lg,
                where the points use the reference's column split; below that the parts are joined
                by an ordinary space.
              */}
              {point.split("\n").map((part, partIndex) => (
                <Fragment key={partIndex}>
                  {partIndex > 0 && (
                    <>
                      {" "}
                      <br className="hidden lg:inline" />
                    </>
                  )}
                  {part}
                </Fragment>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * "The Challenge & Our Solution" on the Case Study page, from Frame 2147239025.png. At 1920: a
 * 1080px section on #f4f0e9, the heading and description on the left (centred against the cards),
 * and two white 1086px cards on the right, 25px apart: "Key Challenges" with red-cross points and
 * "Our Approach" with green-tick points, two columns each. Below xl (where the left column would be
 * too narrow for the heading) the text comes first and the
 * cards follow full width; the points show one column below md.
 */
export function CaseStudyChallenges() {
  const { eyebrow, heading: title, description } = caseStudyChallenges;

  return (
    <section
      id="case-study-challenges"
      aria-labelledby="case-study-challenges-heading"
      className={`bg-[#f4f0e9] ${unit}`}
    >
      <Container className="py-12 md:py-16 lg:pt-[calc(var(--u)*101)] lg:pb-[calc(var(--u)*102)]">
        <Reveal
          each
          className="grid gap-8 xl:grid-cols-[minmax(0,474fr)_minmax(0,1086fr)] xl:items-center xl:gap-0"
        >
          <div className="min-w-0">
            {/* Drawn with much tighter spacing than the card eyebrows. */}
            <SectionEyebrow size="lg" weight="bold" tracking="0.016em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="case-study-challenges-heading"
              className={`mt-2 text-ink lg:mt-[calc(var(--u)*7)] ${heading}`}
            >
              <MaskLine order={1}>{title.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {title.second}
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[30em] text-[18px] leading-[1.45] text-ink-muted lg:mt-[calc(var(--u)*24)] lg:max-w-[calc(var(--u)*460)] lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333]"
            >
              {description}
            </p>
          </div>

          <div className="grid gap-[max(16px,calc(var(--u)*25))]">
            <PointsCard kind="challenge" order={1} />
            <PointsCard kind="solution" order={2} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
