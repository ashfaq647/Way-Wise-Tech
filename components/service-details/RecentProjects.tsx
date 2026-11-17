import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import type { RecentProjectsContent } from "@/lib/content/service-details";
import { ProjectCarousel } from "./ProjectCarousel";

/**
 * "Recent Projects" (shared: every Service Details page, /case-study, /our-work): heading and intro
 * above the project carousel. 942 frame since 2026-11-17 (`quill-pen-ai-line.png`, owner: one design
 * on every page): from lg a 53.5px heading broken as drawn ("Our Recent Design" / "Projects"), the
 * intro at the top of the right column with the arrows under it, and exactly three cards in view.
 */
export function RecentProjects({ eyebrow, heading, intro, projects }: RecentProjectsContent) {
  // The red part's first word ends line 1, the rest is line 2, as drawn.
  const [accentFirst, ...accentRest] = heading.second.split(" ");
  return (
    <section
      aria-labelledby="recent-projects-heading"
      className="overflow-hidden bg-[#d0d0c8] py-12 md:py-16 lg:pt-[clamp(48px,3.438vw,66px)] lg:pb-[clamp(40px,2.604vw,50px)]"
    >
      <ProjectCarousel
        cards={projects}
        heading={
          <Reveal>
            <SectionEyebrow
              size="md"
              weight="bold"
              tracking="0.07em"
              barClassName="max-h-[2px] -translate-y-0.5"
              className="ww-rise"
            >
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="recent-projects-heading"
              className="mt-[10px] text-[clamp(28px,7.4vw,48px)] leading-[1.09375] font-semibold tracking-[-0.013em] text-ink lg:mt-[clamp(6px,0.365vw,7px)] lg:text-[clamp(34px,2.786vw,53.5px)] lg:leading-[1.178]"
            >
              <MaskLine order={1}>
                {`${heading.first} `}
                <span className="text-brand">{accentFirst}</span>
              </MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {accentRest.join(" ")}
              </MaskLine>
            </h2>
          </Reveal>
        }
        intro={
          <Reveal>
            <p
              style={revealOrder(3)}
              className="ww-rise max-w-[24em] text-[18px] leading-[1.45] text-ink lg:max-w-[28.5em] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.4545]"
            >
              {intro}
            </p>
          </Reveal>
        }
      />
    </section>
  );
}
