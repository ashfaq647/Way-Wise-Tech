import type { ReactNode } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { RollingNumber } from "@/components/motion/RollingNumber";
import { revealOrder } from "@/components/motion/revealOrder";
import { aboutLeadership } from "@/lib/content/about";
import type { IndustryStatIcon } from "@/lib/content/industries";

/*
  The stats bar is the Industries trust section's bar, drawn the same way (IndustriesTrust.tsx keeps
  its markup private, and that section is not part of this task). Keep the two in step: icons,
  sizes, dividers and paddings.
*/
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

/** Left padding of each stat inside its quarter, as in the Industries bar: 38, 39, 41 and 44px. */
const statPadding = [
  "lg:pl-[clamp(22px,1.979vw,38px)]",
  "lg:pl-[clamp(23px,2.031vw,39px)]",
  "lg:pl-[clamp(24px,2.135vw,41px)]",
  "lg:pl-[clamp(26px,2.292vw,44px)]",
];

/**
 * Space between paragraphs from xl, per message as in the reference: about 11px in the Chairman's
 * message and 15px in the CEO's. Below xl both use the same spacing.
 */
const paragraphGap = ["xl:mt-[clamp(7px,0.573vw,11px)]", "xl:mt-[clamp(10px,0.781vw,15px)]"];

/**
 * The Chairman's and CEO's messages on the About Us page, from Frame 2147239134.png. At 1920 the
 * section is 1080px tall on #f4f0e9: two 750px messages 60px apart, each a 240x400 portrait (12px
 * corners), 40px, then a 470px text column (eyebrow, two-line heading, three paragraphs, name, role
 * and company); 81px below, the 1560x150 stats bar. From xl the messages sit side by side and scale
 * with the width; below xl they stack, the portrait beside the text from md and above it below md.
 */
export function AboutLeadership() {
  const { messages, stats } = aboutLeadership;

  return (
    <section id="about-leadership" aria-label="Leadership messages" className="bg-[#f4f0e9]">
      <Container className="py-14 md:py-20 xl:pt-[clamp(80px,7.552vw,145px)] xl:pb-[clamp(80px,7.708vw,148px)]">
        <Reveal each>
          <div className="grid gap-14 xl:grid-cols-2 xl:gap-[clamp(32px,3.125vw,60px)]">
            {messages.map((message, index) => {
              const headingId = `about-leadership-heading-${index + 1}`;
              return (
                <article
                  key={message.name}
                  aria-labelledby={headingId}
                  className="grid gap-8 md:grid-cols-[minmax(0,240fr)_minmax(0,470fr)] md:items-start md:gap-10 xl:gap-[clamp(24px,2.083vw,40px)]"
                >
                  {/* The text's eyebrow sits 2px above the portrait's top edge in the reference. */}
                  <div
                    style={revealOrder(1)}
                    className="ww-rise relative aspect-[480/800] w-full max-w-[240px] overflow-hidden rounded-xl md:max-w-none md:mt-[2px] xl:mt-[clamp(1px,0.104vw,2px)] xl:rounded-[clamp(8px,0.625vw,12px)]"
                  >
                    <AssetImage
                      src={message.image.src}
                      alt={message.image.alt}
                      sizes="(min-width: 1280px) 13vw, (min-width: 768px) 30vw, 240px"
                      className="object-cover"
                    />
                  </div>

                  {/*
                    From xl the text runs 4px past its 470px column into the 60px gap, as in the
                    reference, where "long-" ends a 469px line.
                  */}
                  <div className="min-w-0 xl:w-[calc(100%+clamp(2px,0.208vw,4px))]">
                    <SectionEyebrow weight="bold" tracking="0.095em" className="ww-rise">
                      {message.eyebrow}
                    </SectionEyebrow>

                    <h2
                      id={headingId}
                      className="mt-3 text-[clamp(26px,7vw,40px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink xl:mt-[clamp(8px,0.625vw,12px)] xl:text-[clamp(30px,2.396vw,46px)]"
                    >
                      <MaskLine order={1}>{message.heading.first}</MaskLine>{" "}
                      <MaskLine order={2}>
                        {message.heading.second} <span className="text-brand">{message.heading.accent}</span>
                      </MaskLine>
                    </h2>

                    <div className="mt-6 xl:mt-[clamp(15px,1.354vw,26px)]">
                      {message.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraph}
                          style={revealOrder(3 + paragraphIndex)}
                          className={`ww-rise mt-3 text-[18px] leading-[1.45] text-ink first:mt-0 ${paragraphGap[index] ?? paragraphGap[0]} xl:text-[clamp(16px,1.146vw,22px)] xl:leading-[1.273] xl:first:mt-0`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <p
                      style={revealOrder(6)}
                      className="ww-rise mt-5 text-[22px] leading-[1.3] font-semibold text-ink xl:mt-[clamp(10px,0.833vw,16px)] xl:text-[clamp(18px,1.354vw,26px)]"
                    >
                      {message.name}
                    </p>
                    <p
                      style={revealOrder(7)}
                      className="ww-rise mt-1 text-[20px] leading-[1.27] text-ink-muted xl:mt-[clamp(3px,0.313vw,6px)] xl:text-[clamp(17px,1.354vw,26px)]"
                    >
                      {message.role}
                      <br />
                      {message.company}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/*
            overflow-clip: RollingNumber's off-screen digit strips are hidden by clip-path but still
            count towards the page's scrollable height. This bar ends the page, so without the clip
            phones got up to 560px of blank scrolling at the end. Nothing visible extends past the bar.
          */}
          <ul
            style={revealOrder(4)}
            className="ww-rise relative mt-14 grid overflow-clip gap-6 rounded-2xl bg-white px-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-0 lg:py-0 xl:mt-[clamp(40px,4.063vw,78px)]"
          >
            {stats.map((stat, index) => (
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
