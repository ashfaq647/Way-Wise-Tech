import type { ReactNode } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RollingNumber } from "@/components/motion/RollingNumber";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { assets } from "@/lib/assets";
import { industryStats, type IndustryStatIcon } from "@/lib/content/industries";

/** Line icons drawn for the stats, 24-unit grid, in the brand red like the reference. */
const icons: Record<IndustryStatIcon, ReactNode> = {
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M15 4.8a3.5 3.5 0 0 1 0 6.4M17.5 13.9c2.4.9 4 3.2 4 6.1" />
    </>
  ),
  building: (
    <>
      <path d="M3.5 20.5h17M5.5 20.5V4.5h9v16M14.5 10.5h4v10" />
      <path d="M8.5 8h3M8.5 11.5h3M8.5 15h3M16.5 14h0M16.5 17h0" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  growth: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="m7 15 4-4.5 3 3 5.5-6M15.5 7.5h4v4" />
    </>
  ),
};

/** Left padding of each stat inside its quarter, as measured in the design: 38, 39, 41 and 44px. */
const statPadding = [
  "lg:pl-[clamp(22px,1.979vw,38px)]",
  "lg:pl-[clamp(23px,2.031vw,39px)]",
  "lg:pl-[clamp(24px,2.135vw,41px)]",
  "lg:pl-[clamp(26px,2.292vw,44px)]",
];

/**
 * "A Trusted Partner Across Industries" on the Industries page, from Trust Section.png. At 1920 the
 * heading and the right-hand text share a bottom line, the 1560x465 image spans the content width
 * (its rounded corners are in the file), and a white stats bar sits 40px below it, split into
 * quarters by thin dividers. Below lg the text stacks and the stats go two across, then one.
 */
export function IndustriesTrust() {
  return (
    <section aria-labelledby="industries-trust-heading" className="bg-[#d0d0c8]">
      <Container className="py-12 md:py-16 lg:pt-[clamp(56px,6.198vw,119px)] lg:pb-[clamp(56px,6.25vw,120px)]">
        <Reveal each>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="min-w-0">
              <SectionEyebrow weight="bold" tracking="0.069em" className="ww-rise">
                Why Businesses Choose Us
              </SectionEyebrow>
              <SectionHeading id="industries-trust-heading" tone="navy" className="mt-2 lg:mt-1.5">
                <MaskLine order={1}>A Trusted Partner</MaskLine>{" "}
                <MaskLine order={2} className="text-brand">
                  Across Industries
                </MaskLine>
              </SectionHeading>
            </div>
            <p
              style={revealOrder(3)}
              className="ww-rise max-w-[26.9em] text-[18px] leading-[1.45] text-ink-muted lg:shrink-0 lg:text-[clamp(17px,1.146vw,22px)]"
            >
              We understand different business needs and deliver designs that create real value.
            </p>
          </div>

          <div
            style={revealOrder(4)}
            className="ww-rise relative mt-8 aspect-3120/931 lg:mt-[clamp(24px,2.083vw,40px)]"
          >
            <AssetImage
              src={assets.industryTrustedPartner}
              alt="Phone, laptop and tablet on stone blocks, each showing a property website design"
              sizes="(min-width: 1600px) 1560px, 100vw"
              className="object-contain"
            />
          </div>

          <ul
            style={revealOrder(5)}
            className="ww-rise relative mt-8 grid gap-6 rounded-2xl bg-white px-6 py-7 sm:grid-cols-2 lg:mt-[clamp(24px,2.083vw,40px)] lg:grid-cols-4 lg:gap-0 lg:px-0 lg:py-0"
          >
            {industryStats.map((stat, index) => (
              <li
                key={stat.label}
                className={`flex items-center gap-[clamp(16px,1.563vw,30px)] lg:h-[clamp(110px,7.813vw,150px)] ${statPadding[index]} ${
                  index > 0
                    ? "lg:relative lg:before:absolute lg:before:top-1/2 lg:before:left-0 lg:before:h-[60%] lg:before:w-0.5 lg:before:-translate-x-1/2 lg:before:-translate-y-1/2 lg:before:bg-[#e7e0d5]"
                    : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#faeddc] text-brand lg:size-[clamp(52px,3.75vw,72px)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8 lg:size-[clamp(28px,1.875vw,36px)]"
                  >
                    {icons[stat.icon]}
                  </svg>
                </span>
                <span className="min-w-0">
                  <RollingNumber
                    value={stat.value}
                    className="block text-[36px] leading-[1.1] font-semibold text-navy lg:text-[clamp(32px,2.5vw,48px)] lg:leading-[0.85]"
                  />
                  <span className="mt-1 block text-[17px] leading-6 text-ink-muted lg:mt-[clamp(8px,0.833vw,16px)] lg:text-[clamp(15px,1.146vw,22px)]">
                    {stat.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
