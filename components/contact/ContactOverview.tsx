import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { contactOverview, type ContactOverviewIcon } from "@/lib/content/contact";

/**
 * The reference draws the same four icons as the Service Details "Why Choose Us" cards. That
 * section is frozen and keeps them private, so the paths are repeated here; keep the two in step.
 */
function Icon({ name }: { name: ContactOverviewIcon }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 3 } as const;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="size-full">
      {name === "lightbulb" && (
        <>
          <path
            {...stroke}
            strokeLinejoin="round"
            d="M18.6 34c0-3-3.2-4.4-5.6-7.3a13.8 13.8 0 1 1 22 0c-2.4 2.9-5.6 4.3-5.6 7.3"
          />
          <path fillRule="evenodd" fill="currentColor" d="M16.6 34h14.8v8.4a2.6 2.6 0 0 1-2.6 2.6h-9.6a2.6 2.6 0 0 1-2.6-2.6Zm3 6v1.2h8.8V40Z" />
          <rect x="22.2" y="25" width="3.6" height="10" fill="currentColor" />
        </>
      )}
      {name === "team" && (
        <g {...stroke} strokeWidth={2.6}>
          <circle cx="23.9" cy="15.1" r="4.6" />
          <circle cx="14" cy="21.9" r="2.6" />
          <circle cx="33.8" cy="21.9" r="2.6" />
          <path d="M17.9 39.5v-8.7a6.45 6.45 0 0 1 12.9 0v8.7" />
          <path d="M10.2 39.5v-8.9a3.3 3.3 0 0 1 3.3-3.3" />
          <path d="M37.7 39.5v-8.9a3.3 3.3 0 0 0-3.3-3.3" />
        </g>
      )}
      {name === "laptop" && (
        <g {...stroke} strokeWidth={2.9}>
          <rect x="12.45" y="9.2" width="27.1" height="19.35" />
          <path d="M9.1 33.3h33.8" />
        </g>
      )}
      {name === "chat-check" && (
        <g {...stroke} strokeWidth={2.9} strokeLinejoin="miter">
          <path d="M12.55 35.6V9.2h26.9v21.25H16.6Z" />
          <path d="m19.3 18.7 5.6 5 8.1-8.1" />
        </g>
      )}
    </svg>
  );
}

/**
 * "Client Overview" on the Contact Us page, from Frame 2147239128.png. At 1920: the text beside a
 * 750x272 image (its rounded corners are in the file, and it has no stroke, in the file or in the
 * reference), then four 765x188 cards, two across, 30px apart. Below lg everything stacks.
 */
export function ContactOverview() {
  const { eyebrow, heading, description, image, channels } = contactOverview;
  return (
    <section aria-labelledby="contact-overview-heading" className="bg-[#eee9e1]">
      <Container className="py-12 md:py-16 lg:py-[clamp(56px,8.75vw,168px)]">
        <Reveal
          each
          className="grid gap-8 lg:grid-cols-[minmax(0,810fr)_minmax(0,750fr)] lg:items-start lg:gap-0"
        >
          <div className="min-w-0">
            <SectionEyebrow size="lg" weight="bold" tracking="0.078em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            {/*
              54px at 1920, a little larger than SectionHeading's 52px: the reference's lines measured
              4% wider and taller than SectionHeading's at the same weight.
            */}
            <h2
              id="contact-overview-heading"
              className="mt-2 text-[clamp(26px,7.4vw,48px)] leading-[1.13] font-semibold tracking-[-0.015em] text-navy lg:mt-[clamp(4px,0.365vw,7px)] lg:text-[clamp(34px,2.8125vw,54px)]"
            >
              {/* Two lines at every width, as in the design: each MaskLine is its own line. */}
              <MaskLine order={1}>{heading.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[25em] text-[18px] leading-[1.45] text-navy lg:mt-[clamp(20px,1.615vw,31px)] lg:text-[clamp(16px,1.25vw,24px)] lg:leading-[1.3333]"
            >
              {description}
            </p>
          </div>

          <div
            style={{ ...revealOrder(2), aspectRatio: `${image.width} / ${image.height}` }}
            className="ww-rise relative w-full"
          >
            <AssetImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1600px) 750px, (min-width: 1024px) 48vw, 100vw"
              className="object-contain"
            />
          </div>
        </Reveal>

        <Reveal
          each
          className="mt-10 grid gap-5 lg:mt-[clamp(32px,3.125vw,60px)] lg:grid-cols-2 lg:gap-[clamp(20px,1.563vw,30px)]"
        >
          {channels.map((channel, index) => (
            <article
              key={channel.title}
              style={revealOrder(index)}
              className="ww-rise flex items-center gap-5 rounded-lg bg-white p-5 sm:p-8 lg:gap-[clamp(16px,1.25vw,24px)] lg:p-[clamp(24px,2.083vw,40px)]"
            >
              <span
                style={{ backgroundColor: channel.tone }}
                className="grid size-16 shrink-0 place-items-center self-start rounded-full text-black sm:size-20 lg:size-[clamp(72px,5.417vw,104px)]"
              >
                <span className="block size-[46%]">
                  <Icon name={channel.icon} />
                </span>
              </span>
              <div className="min-w-0">
                <h3 className="text-[22px] leading-[1.15] font-medium text-black lg:text-[clamp(22px,1.458vw,28px)] lg:leading-[1.2]">
                  {channel.title}
                </h3>
                <p className="mt-3 text-[17px] leading-[1.4] tracking-[0.034em] text-steel lg:mt-[clamp(8px,0.781vw,15px)] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.3636]">
                  {channel.description}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
