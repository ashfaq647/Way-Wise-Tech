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
 * then four reason cards. Two columns from lg; stacked below.
 */
export function WhyChooseUs({ eyebrow, heading, description, image, reasons }: WhyChooseUsContent) {
  return (
    <section aria-labelledby="why-choose-us-heading" className="bg-[#f4f0e9]">
      <Container className="py-12 md:py-16 lg:pt-[clamp(56px,6.042vw,116px)] lg:pb-[clamp(56px,6.094vw,117px)]">
        <Reveal
          each
          className="grid gap-8 lg:grid-cols-[minmax(0,809fr)_minmax(0,751fr)] lg:items-start lg:gap-0"
        >
          <div className="min-w-0">
            <SectionEyebrow
              size="lg"
              weight="bold"
              tracking="0.078em"
              barClassName="max-h-[2px]"
              className="ww-rise"
            >
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="why-choose-us-heading"
              className="mt-[10px] text-[clamp(28px,7.4vw,48px)] leading-[1.09375] font-bold tracking-[-0.006em] text-navy lg:mt-[clamp(8px,0.625vw,12px)] lg:text-[clamp(34px,3.333vw,64px)]"
            >
              <MaskLine order={1}>{heading.first}</MaskLine>{" "}
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[25em] text-[18px] leading-[1.45] text-navy lg:mt-[clamp(20px,2.344vw,45px)] lg:text-[clamp(16px,1.25vw,24px)] lg:leading-[1.3333] lg:tracking-[-0.005em]"
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
              sizes="(min-width: 1600px) 751px, (min-width: 1024px) 48vw, 100vw"
              className="object-contain"
            />
          </div>
        </Reveal>

        <Reveal
          each
          className="mt-10 grid gap-5 lg:mt-[clamp(32px,3.177vw,61px)] lg:grid-cols-2 lg:gap-x-[clamp(20px,1.563vw,30px)] lg:gap-y-[clamp(20px,1.615vw,31px)]"
        >
          {reasons.map((reason, index) => (
            <article
              key={reason.title.join(" ")}
              style={revealOrder(index)}
              className="ww-rise flex items-start gap-5 rounded-lg bg-white p-5 sm:p-8 lg:min-h-[clamp(180px,11.51vw,221px)] lg:gap-[clamp(16px,1.25vw,24px)] lg:px-[clamp(24px,2.083vw,40px)] lg:pt-[clamp(24px,2.031vw,39px)] lg:pb-[clamp(24px,2.031vw,39px)]"
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
                <h3 className="text-[22px] leading-[1.15] font-medium text-black lg:text-[clamp(22px,1.563vw,30px)] lg:leading-[1.1333]">
                  {reason.title[0]}
                  <br />
                  {reason.title[1]}
                </h3>
                <p className="mt-3 text-[17px] leading-[1.4] tracking-[0.034em] text-steel lg:mt-[clamp(8px,0.781vw,15px)] lg:text-[clamp(16px,1.146vw,22px)] lg:leading-[1.3636]">
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
