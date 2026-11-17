import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import type { ReasonIcon, WhyChooseUsContent } from "@/lib/content/service-details";

/** Icons traced from the reference on a 48px grid centred in the circle. Stroke 3, as drawn there. */
function Icon({ name }: { name: ReasonIcon }) {
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
 * "Why Choose Us" on the Service Details pages: heading and description beside the image card,
 * then four reason cards. Two columns from lg; stacked below. One shared design for every Service
 * Details page (only the content differs).
 *
 * From lg, a 942 frame at 1920 (2026-11-17, reference `Frame 2147238937.png`): 901 / 659 header
 * columns, the 53.5px heading broken as drawn (the red part's first word on line 1), a 659×272
 * image card (cover, 13px corners, a 1px warm outline), then four 768×223 cards 40px below, 25px apart.
 */
export function WhyChooseUs({ eyebrow, heading, description, image, reasons }: WhyChooseUsContent) {
  // The red part's first word ends line 1 ("Designs That Make a Real / Difference"), as drawn.
  const [accentFirst, ...accentRest] = heading.second.split(" ");
  return (
    <section aria-labelledby="why-choose-us-heading" className="bg-[#f4f0e9]">
      <Container className="py-12 md:py-16 lg:pt-[clamp(48px,4.063vw,78px)] lg:pb-[clamp(48px,4.167vw,80px)]">
        <Reveal
          each
          className="grid gap-8 lg:grid-cols-[minmax(0,901fr)_minmax(0,659fr)] lg:items-start lg:gap-0"
        >
          <div className="min-w-0">
            <SectionEyebrow
              size="md"
              weight="bold"
              tracking="0.078em"
              barClassName="max-h-[2px]"
              className="ww-rise"
            >
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="why-choose-us-heading"
              className="mt-[10px] text-[clamp(28px,7.4vw,48px)] leading-[1.09375] font-bold tracking-[-0.006em] text-navy lg:font-semibold lg:tracking-[-0.014em] lg:mt-[clamp(6px,0.469vw,9px)] lg:text-[clamp(34px,2.786vw,53.5px)] lg:leading-[1.159]"
            >
              <MaskLine order={1}>
                {`${heading.first} `}
                <span className="text-brand">{accentFirst}</span>
              </MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {accentRest.join(" ")}
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[25em] text-[18px] leading-[1.45] text-navy lg:mt-[clamp(16px,1.25vw,24px)] lg:max-w-[27em] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.4545] lg:tracking-[-0.005em]"
            >
              {description}
            </p>
          </div>

          <div
            style={{ ...revealOrder(2), aspectRatio: `${image.width} / ${image.height}` }}
            className="ww-rise relative w-full lg:mt-px lg:aspect-[659/272]! lg:overflow-hidden lg:rounded-[13px] lg:after:pointer-events-none lg:after:absolute lg:after:inset-0 lg:after:rounded-[inherit] lg:after:border lg:after:border-[#ceb8b1]"
          >
            <AssetImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1600px) 659px, (min-width: 1024px) 42vw, 100vw"
              className="object-contain lg:object-cover"
            />
          </div>
        </Reveal>

        <Reveal
          each
          className="mt-10 grid gap-5 lg:mt-[clamp(28px,2.031vw,39px)] lg:grid-cols-2 lg:gap-x-[clamp(20px,1.25vw,24px)] lg:gap-y-[clamp(20px,1.25vw,24px)]"
        >
          {reasons.map((reason, index) => (
            <article
              key={reason.title.join(" ")}
              style={revealOrder(index)}
              className="ww-rise flex items-start gap-5 rounded-lg bg-white p-5 sm:p-8 lg:min-h-[clamp(180px,11.667vw,224px)] lg:rounded-[10px] lg:gap-[clamp(16px,1.25vw,24px)] lg:px-[clamp(24px,2.083vw,40px)] lg:pt-[clamp(24px,2.031vw,39px)] lg:pb-[clamp(24px,2.031vw,39px)]"
            >
              <span
                style={{ backgroundColor: reason.tone }}
                className="grid size-16 shrink-0 place-items-center rounded-full text-black sm:size-20 lg:size-[clamp(72px,5.417vw,104px)]"
              >
                <span className="block size-[46%]">
                  <Icon name={reason.icon} />
                </span>
              </span>
              <div className="min-w-0">
                <h3 className="text-[22px] leading-[1.15] font-medium text-black lg:mt-[2px] lg:text-[clamp(22px,1.458vw,28px)] lg:leading-[1.25]">
                  {reason.title[0]}
                  <br />
                  {reason.title[1]}
                </h3>
                <p className="mt-3 text-[17px] leading-[1.4] tracking-[0.034em] text-steel lg:mt-[clamp(8px,0.677vw,13px)] lg:text-[clamp(16px,1.042vw,20px)] lg:leading-[1.5] lg:tracking-[0.045em]">
                  {reason.description}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
