import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import type { RecentProjectsContent } from "@/lib/content/service-details";
import { ProjectCarousel } from "./ProjectCarousel";

/** "Recent Projects" on the Service Details pages: heading and intro above the project carousel. */
export function RecentProjects({ eyebrow, heading, intro, projects }: RecentProjectsContent) {
  return (
    <section
      aria-labelledby="recent-projects-heading"
      className="overflow-hidden bg-[#d0d0c8] py-12 md:py-16 lg:pt-[clamp(56px,6.146vw,118px)] lg:pb-[clamp(56px,5.625vw,108px)]"
    >
      <ProjectCarousel
        cards={projects}
        heading={
          <Reveal>
            <SectionEyebrow
              size="md"
              weight="bold"
              tracking="0.1em"
              barClassName="max-h-[2px] -translate-y-0.5"
              className="ww-rise"
            >
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="recent-projects-heading"
              className="mt-[10px] text-[clamp(28px,7.4vw,48px)] leading-[1.09375] font-semibold tracking-[-0.013em] text-ink lg:mt-[clamp(6px,0.365vw,7px)] lg:text-[clamp(34px,3.333vw,64px)]"
            >
              <MaskLine order={1}>{heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
          </Reveal>
        }
        intro={
          <Reveal>
            <p
              style={revealOrder(3)}
              className="ww-rise max-w-[24em] text-[18px] leading-[1.45] text-ink lg:text-[clamp(16px,1.25vw,24px)] lg:leading-[1.3333] lg:tracking-[-0.01em]"
            >
              {intro}
            </p>
          </Reveal>
        }
      />
    </section>
  );
}
