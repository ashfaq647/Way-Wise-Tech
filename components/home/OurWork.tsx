import type { CSSProperties } from "react";
import { CardStack } from "@/components/home/CardStack";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";

// UNVERIFIED CONTENT: every project and client detail below is copied exactly from the
// Figma reference and has not been confirmed. Do not treat these as real clients or
// real project records. Confirm or replace them before launch.
const projects = [
  {
    number: "01",
    title: "Laravel Backend System",
    image: assets.workLaravelBackend,
    alt: "Laptop on a blue chair showing a medical website",
    client: "Marvin McKinney",
    role: "Nursing Assistant",
    photo: assets.workClient1,
    background: "bg-[#d0c7ae]",
  },
  {
    number: "02",
    title: "Landing Page Dev Work",
    image: assets.workLandingPage,
    alt: "Laptop in a spotlight showing a dark green landing page",
    client: "Brooklyn Simmons",
    role: "Web Designer",
    photo: assets.workClient2,
    background: "bg-[#d5d9cc]",
  },
  {
    number: "03",
    title: "Online Store Launch",
    image: assets.workOnlineStore,
    alt: "Laptop on a stone surface showing a furniture store",
    client: "Bessie Cooper",
    role: "Marketing Coordinator",
    photo: assets.workClient3,
    background: "bg-[#ead3bb]",
  },
  {
    number: "04",
    title: "React Dashboard Panel",
    image: assets.workReactDashboard,
    alt: "Tablet showing a medical dashboard on a pastel background",
    client: "Ronald Richards",
    role: "Medical Assistant",
    photo: assets.workClient4,
    background: "bg-[#e1daed]",
  },
  {
    number: "05",
    title: "Mobile App UI Design",
    image: assets.workMobileApp,
    alt: "Hand holding a phone showing a medical appointment app",
    client: "Esther Howard",
    role: "President of Sales",
    photo: assets.workClient5,
    background: "bg-[#c3dbf6]",
  },
];

const details = [
  { label: "Project Scope", value: "Website Development" },
  { label: "Project Duration", value: "3 Month" },
];

/**
 * Plain CSS stacking: each card pins 16px lower than the last, and later cards paint on top.
 * --t is the first card's pin: the compact navbar height (72px, or 90px from 1280px) plus a gap.
 * A card too tall for that pin stops higher, 12px above the screen bottom, so all of it gets seen.
 * --card-height comes from CardStack.
 */
const stacking = [
  "motion-safe:sticky",
  "top-[min(calc(var(--t)+var(--i)*16px),calc(100svh-var(--card-height)-12px))]",
  "[--t:88px] md:[--t:96px] xl:[--t:114px]",
  "[@media(min-width:1280px)_and_(min-height:820px)]:[--t:148px]",
].join(" ");

export function OurWork() {
  return (
    <section aria-labelledby="our-work-heading" className="bg-[#eee9e1]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[98px] lg:pb-[100px] xl:px-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:gap-0">
          <div>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[clamp(16px,1.042vw,20px)]">
              <span
                className="h-[3px] w-[22px] shrink-0 -translate-y-px bg-brand"
                aria-hidden="true"
              />
              Our Work
            </p>
            <h2
              id="our-work-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.365] font-semibold tracking-[-0.015em] text-[#0d1d44] lg:text-[clamp(34px,2.71vw,52px)]"
            >
              Real Projects. <span className="text-brand">Real</span>
              <br />
              <span className="text-brand">Digital Solutions.</span>
            </h2>
          </div>

          <div className="lg:pt-[34px]">
            <p className="text-[18px] leading-[1.45] text-[#0d1d44] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
              Explore some of the websites, apps, and software solutions we&apos;ve designed and
              developed for different businesses.
            </p>
            <ButtonLink
              href="#"
              variant="outline"
              className="mt-[15px] h-[52px] border-[#0d1d44]! px-6 text-[18px] text-[#0d1d44]! hover:bg-[#0d1d44]! hover:text-white! lg:text-[20px]"
            >
              View All Projects
            </ButtonLink>
          </div>
        </div>

        {/*
          The empty ::after gives pinned cards room to stay pinned while Final CTA rises over them.
          The negative margin cancels it, so section and page heights do not change. It must exceed
          the distance Final CTA travels to cover the stack (64px + card + section padding) but stay
          below Final CTA's height plus that padding, or cards would show beneath Final CTA.
        */}
        <CardStack className="mt-8 flex flex-col gap-[30px] [--cover:1000px] after:block after:h-(--cover) mb-[calc(-30px-var(--cover))] lg:mt-[59px] lg:[--cover:760px]">
          {projects.map((project, index) => (
            <li key={project.number} className={stacking} style={{ "--i": index } as CSSProperties}>
              <article
                className={`grid gap-6 rounded-3xl p-4 sm:p-6 md:grid-cols-2 md:items-center lg:grid-cols-[minmax(0,737fr)_minmax(0,683fr)] lg:gap-[clamp(24px,3.125vw,60px)] lg:p-[clamp(24px,2.083vw,40px)] ${project.background}`}
              >
                <div className="min-w-0">
                  <p className="text-[15px] leading-[22px] text-brand uppercase lg:text-[clamp(14px,0.9375vw,18px)]">
                    {project.number}&nbsp;&nbsp;/&nbsp;&nbsp;Industry
                  </p>
                  <h3 className="mt-1.5 text-[24px] leading-[1.25] font-semibold text-[#0d1d44] lg:text-[clamp(22px,1.667vw,32px)]">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 max-w-[21.5em] text-[17px] leading-[1.364] text-[#3d4e5c] max-[1599px]:text-pretty lg:text-[clamp(16px,1.146vw,22px)]">
                    Our team of 10 highly skilled engineers excels in delivering innovative
                    solutions.
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
                        src={project.photo}
                        alt=""
                        sizes="42px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[18px] leading-6 font-medium text-[#1b3447]">
                        {project.client}
                      </span>
                      <span className="mt-0.5 block text-[16px] leading-6 text-[#3d4e5c]">
                        {project.role}
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
                    src={project.image}
                    alt={project.alt}
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
