import type { CSSProperties } from "react";
import { CardStack } from "@/components/motion/CardStack";
import { stackCard, stackHeader } from "@/components/motion/cardStackClasses";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { homeOurWork } from "@/lib/content/home";

// The section's content comes from lib/content/home.ts. UNVERIFIED CONTENT: the project and client
// details there are copied from the Figma reference and have not been confirmed (see its note).
const { eyebrow, heading, description, action, industryLabel, summary, details } = homeOurWork;

// Each card's background colour, in the content's order.
const cardBackgrounds = ["bg-[#d0c7ae]", "bg-[#d5d9cc]", "bg-[#ead3bb]", "bg-[#e1daed]", "bg-[#c3dbf6]"];

const projects = homeOurWork.projects.map((project, index) => ({
  ...project,
  background: cardBackgrounds[index],
}));

export function OurWork() {
  return (
    <section aria-labelledby="our-work-heading" className="bg-[#eee9e1]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[98px] lg:pb-[100px] xl:px-5">
        <div className={`grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:gap-0 ${stackHeader}`}>
          <div>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[clamp(16px,1.042vw,20px)]">
              <span
                className="h-[3px] w-[22px] shrink-0 -translate-y-px bg-brand"
                aria-hidden="true"
              />
              {eyebrow}
            </p>
            <h2
              id="our-work-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.365] font-semibold tracking-[-0.015em] text-[#0d1d44] lg:text-[clamp(34px,2.71vw,52px)]"
            >
              {/* One text node ("Real Projects. "), as before: a separate " " node shifts the red words' sub-pixel rendering. */}
              {`${heading.first} `}
              <span className="text-brand">{heading.accent}</span>
              <br />
              <span className="text-brand">{heading.second}</span>
            </h2>
          </div>

          <div className="lg:pt-[34px]">
            <p className="text-[18px] leading-[1.45] text-[#0d1d44] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
              {description}
            </p>
            <ButtonLink
              href={action.href}
              variant="outline"
              className="mt-[15px] h-[52px] border-[#0d1d44]! px-6 text-[18px] text-[#0d1d44]! hover:bg-[#0d1d44]! hover:text-white! lg:text-[20px]"
            >
              {action.label}
            </ButtonLink>
          </div>
        </div>

        {/*
          The empty ::after gives pinned cards room to stay pinned while Final CTA rises over them.
          The negative margin cancels it, so section and page heights do not change. It must exceed
          the distance Final CTA travels to cover the stack (64px + card + section padding) but stay
          below Final CTA's height plus that padding, or cards would show beneath Final CTA.
        */}
        {/*
          Hold (2026-11-16 frame rule): the spacer grows by --hold while its negative margin does not,
          so the finished stack stays pinned and Final CTA arrives that much later, as with
          PinnedSection's `hold`. --hold is 30svh plus the amount Final CTA would otherwise already
          show when card 5 pins (its pin --p5 + its height, about 27.6vw from lg, + the 100px bottom
          padding, short of the screen height). From lg with motion allowed only; elsewhere 0.
        */}
        <CardStack className="mt-8 flex flex-col gap-[30px] [--cover:1000px] after:block after:h-[calc(var(--cover)+var(--hold,0px))] mb-[calc(-30px-var(--cover))] lg:mt-[59px] lg:[--cover:760px] [--p5:calc(var(--stack-top)+64px)] lg:motion-safe:[--hold:calc(30svh+max(0px,100svh-var(--p5)-27.604vw-100px))]">
          {projects.map((project, index) => (
            <li key={project.number} className={stackCard} style={{ "--i": index } as CSSProperties}>
              <article
                className={`grid gap-6 rounded-3xl p-4 sm:p-6 md:grid-cols-2 md:items-center lg:grid-cols-[minmax(0,737fr)_minmax(0,683fr)] lg:gap-[clamp(24px,3.125vw,60px)] lg:p-[clamp(24px,2.083vw,40px)] ${project.background}`}
              >
                <div className="min-w-0">
                  <p className="text-[15px] leading-[22px] text-brand uppercase lg:text-[clamp(14px,0.9375vw,18px)]">
                    {/* Two text nodes, "01" and "  /  Industry" (non-breaking spaces), exactly as before. */}
                    {project.number}
                    {`  /  ${industryLabel}`}
                  </p>
                  <h3 className="mt-1.5 text-[24px] leading-[1.25] font-semibold text-[#0d1d44] lg:text-[clamp(22px,1.667vw,32px)]">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 max-w-[21.5em] text-[17px] leading-[1.364] text-[#3d4e5c] max-[1599px]:text-pretty lg:text-[clamp(16px,1.146vw,22px)]">
                    {summary}
                  </p>

                  <dl className="mt-6 grid grid-cols-[minmax(0,393fr)_minmax(0,344fr)] lg:mt-[clamp(24px,2.6vw,50px)]">
                    {details.map((detail) => (
                      <div key={detail.label} className="pr-3">
                        <dt className="text-[14px] leading-5 text-[#1b3447] lg:text-[clamp(14px,0.833vw,16px)]">
                          {detail.label}
                        </dt>
                        <dd className="mt-2.5 text-[18px] leading-[1.27] font-semibold text-[#0d1d44] lg:text-[clamp(17px,1.146vw,22px)]">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex min-h-20 items-center gap-2.5 rounded-lg bg-white px-4 py-3 lg:mt-[clamp(24px,2.5vw,48px)] lg:px-6">
                    <span className="relative size-[42px] shrink-0">
                      <AssetImage
                        src={project.client.photo.src}
                        alt=""
                        sizes="42px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[18px] leading-6 font-medium text-[#1b3447]">
                        {project.client.name}
                      </span>
                      <span className="mt-0.5 block text-[16px] leading-6 text-[#3d4e5c]">
                        {project.client.role}
                      </span>
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-[#1b3447]"
                    >
                      <path
                        d="M2 18 18 2M5 2h13v13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative order-first aspect-[683/450] overflow-hidden rounded-xl md:order-none">
                  <AssetImage
                    src={project.image.src}
                    alt={project.image.alt}
                    sizes="(min-width: 1024px) 36vw, (min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            </li>
          ))}
        </CardStack>
      </div>
    </section>
  );
}
