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

// Section heading: 53.5px semibold with 62px line spacing (942 frame, 2026-11-17, Frame 2147239210.png).
const heading =
  "text-[clamp(26px,7.4vw,48px)] leading-[1.1538] font-semibold tracking-[-0.015em] lg:text-[max(34px,calc(var(--u)*53.5))] lg:leading-[1.159]";
// Card headings: 45px on 54px lines, as drawn.
const cardHeading =
  "text-[clamp(26px,7.4vw,44px)] leading-[1.2] font-semibold tracking-[-0.015em] lg:text-[max(30px,calc(var(--u)*45))]";
// Row spacing per card, as drawn: 16px between the challenges, 24px between the approach points.
// The approach card's right column is drawn as a narrower text box (318px at 1920), so its points
// wrap as in the reference ("Dedicated practice area / pages", "Lead generation focused / structure").
const narrowText = "lg:max-w-[calc(var(--u)*318)]";
const rowGap = { challenge: "lg:gap-y-[calc(var(--u)*16)]", solution: "lg:gap-y-[calc(var(--u)*24)]" };

function PointsCard({ kind, order }: { kind: Kind; order: number }) {
  const { eyebrow, heading: title, points } = caseStudyChallenges[kind];
  const id = `case-study-${kind}-heading`;
  return (
    <article
      aria-labelledby={id}
      style={revealOrder(order)}
      className="ww-rise rounded-[calc(var(--u)*14.5)] bg-white px-5 py-8 sm:px-8 lg:px-[calc(var(--u)*60)] lg:pt-[calc(var(--u)*28)] lg:pb-[calc(var(--u)*29)]"
    >
      <SectionEyebrow size="lg" weight="bold" tracking="0.063em">
        {eyebrow}
      </SectionEyebrow>
      <h3 id={id} className={`mt-2 text-navy lg:mt-[calc(var(--u)*12)] ${cardHeading}`}>
        <MaskLine order={order + 1}>
          {title.first} <span className="text-brand">{title.second}</span>
        </MaskLine>
      </h3>
      {/*
        At 1920 (942 frame) the columns are 441px and 457px with a 32px gap, inside the card's
        padding, so the points break where the reference does (except where Figma drew a narrower
        text box than its column).
      */}
      <ul className={`mt-6 grid items-start gap-y-[max(14px,calc(var(--u)*24))] md:grid-cols-2 md:gap-x-6 lg:mt-[calc(var(--u)*27)] lg:grid-cols-[minmax(0,441fr)_minmax(0,457fr)] lg:gap-x-[calc(var(--u)*32)] ${rowGap[kind]}`}>
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-center gap-[max(12px,calc(var(--u)*20))] lg:min-h-[calc(var(--u)*40)] text-[max(17px,calc(var(--u)*26))] leading-[1.25] text-ink-muted lg:text-[max(17px,calc(var(--u)*24))] lg:leading-[1.25] lg:pl-[calc(var(--u)*4)]"
          >
            <span className="block size-[max(28px,calc(var(--u)*34))] shrink-0">
              <Marker kind={kind} />
            </span>
            <span className={`min-w-0 ${kind === "solution" && index % 2 === 1 ? narrowText : ""}`}>
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
 * "The Challenge & Our Solution" on the Case Study page, from Frame 2147239210.png (942 frame,
 * 2026-11-17). At 1920: 69px above and below on #f4f0e9, the heading and description on the left
 * (centred against the cards), and two white 1050px cards on the right, 24px apart: "Key Challenges" with red-cross points and
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
      <Container className="py-12 md:py-16 lg:pt-[calc(var(--u)*69)] lg:pb-[calc(var(--u)*68.4)]">
        <Reveal
          each
          className="grid gap-8 xl:grid-cols-[minmax(0,510fr)_minmax(0,1050fr)] xl:items-center xl:gap-0"
        >
          <div className="min-w-0">
            <SectionEyebrow weight="bold" tracking="0.07em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="case-study-challenges-heading"
              className={`mt-2 text-ink lg:mt-[calc(var(--u)*9.5)] ${heading}`}
            >
              <MaskLine order={1}>{title.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {title.second}
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[30em] text-[18px] leading-[1.45] text-ink-muted lg:mt-[calc(var(--u)*22.5)] lg:max-w-[calc(var(--u)*460)] lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333]"
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
