import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { caseStudyOverview, type CaseStudyDetailIcon } from "@/lib/content/case-study";

/**
 * Line icons for the details, drawn inline as the site's other card icons are (no icon library is
 * installed): a 32x32 grid, 1 unit = 1px at 1920, 3px strokes in currentColor, no fill. "users" is
 * the reference's traced two-person icon (also used by the trust section); the others give each
 * detail its own meaning (2026-11-17): building = Industry, clock = Project Duration, pin =
 * Location, globe = Website, bulb = Solution, briefcase = Services.
 */
export function Icon({ name }: { name: CaseStudyDetailIcon }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-full" fill="none" stroke="currentColor" strokeWidth={3}>
      {name === "users" && (
        <>
          <circle cx="12.5" cy="9" r="7.5" />
          <path d="M2 32a10.5 10.5 0 0 1 21 0" />
          <path d="M23.85 5.9a6.5 6.5 0 0 1-1.15 12.1" />
          <path d="M25.8 23.3A10 10 0 0 1 31 32" />
        </>
      )}
      {name === "building" && (
        <>
          <path d="M2 30.5h28" />
          <path d="M6.5 30.5V3.5h13v27" />
          <path d="M19.5 12.5h6v18" />
          <path d="M10.5 9.5h5M10.5 15.5h5M10.5 21.5h5" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="16" cy="16" r="13.5" />
          <path d="M16 8v8.5l5.5 3.5" />
        </>
      )}
      {name === "pin" && (
        <>
          <path d="M16 30S5.5 20.7 5.5 12.5a10.5 10.5 0 0 1 21 0C26.5 20.7 16 30 16 30Z" />
          <circle cx="16" cy="12.5" r="4" />
        </>
      )}
      {name === "globe" && (
        <>
          <circle cx="16" cy="16" r="13.5" />
          <path d="M2.5 16h27" />
          <path d="M16 2.5c-3.6 3.8-5.5 8.3-5.5 13.5s1.9 9.7 5.5 13.5c3.6-3.8 5.5-8.3 5.5-13.5S19.6 6.3 16 2.5Z" />
        </>
      )}
      {name === "bulb" && (
        <>
          <path d="M11.5 23.5c0-3.2-5.5-5.6-5.5-11.5a10 10 0 0 1 20 0c0 5.9-5.5 8.3-5.5 11.5Z" />
          <path d="M12 28.5h8" />
        </>
      )}
      {name === "briefcase" && (
        <>
          <rect x="2.5" y="9.5" width="27" height="19" rx="2.5" />
          <path d="M11 9.5V6.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
          <path d="M2.5 17.5h27" />
        </>
      )}
    </svg>
  );
}

/*
  Every size is the design's 1920 value times --u, as in the Contact form: 1px at 1920, scaling with
  the width from xl down to 1280, and fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

/**
 * "Client Overview" on the Case Study page, from Frame 2147239145.png. At 1920: a 1080px section on
 * sand, the text beside a 751x272.5 image (its rounded corners are in the file), then 60px below a
 * white 1560px panel (16px radius, 60px padding) holding six details in two 700px columns 40px apart:
 * a 64px #faeddc circle with the red icon, the label (navy) and its value (ink-muted), with a 1px
 * #efe9e5 line under every row but the last. Below lg the text, image and panel stack, and the panel
 * shows one column below md.
 */
export function CaseStudyOverview() {
  const { eyebrow, heading, description, image, details } = caseStudyOverview;

  return (
    <section id="case-study-overview" aria-labelledby="case-study-overview-heading" className={`bg-sand ${unit}`}>
      <Container className="py-12 md:py-16 lg:pt-[calc(var(--u)*100)] lg:pb-[calc(var(--u)*67)]">
        <Reveal
          each
          className="grid gap-8 lg:grid-cols-[minmax(0,809fr)_minmax(0,751fr)] lg:items-start lg:gap-0"
        >
          {/* Sits 1px above the image's top edge in the 942 reference. */}
          <div className="min-w-0 lg:-mt-[calc(var(--u)*1)]">
            <SectionEyebrow weight="bold" tracking="0.078em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="case-study-overview-heading"
              className="mt-2 text-[clamp(26px,7.4vw,48px)] leading-[1.111] font-semibold tracking-[-0.015em] text-navy lg:mt-[calc(var(--u)*7)] lg:text-[max(34px,calc(var(--u)*54))] lg:leading-[1.1667]"
            >
              {/* Two lines at every width, as in the design: each MaskLine is its own line. */}
              <MaskLine order={1}>{heading.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
            <p
              style={revealOrder(3)}
              className="ww-rise mt-6 max-w-[25em] text-[18px] leading-[1.45] text-navy lg:mt-[calc(var(--u)*32)] lg:max-w-[28em] lg:text-[max(16px,calc(var(--u)*22))] lg:leading-[1.4545]"
            >
              {description}
            </p>
          </div>

          <div
            style={revealOrder(2)}
            // From lg (942 frame, 2026-11-17, Frame 2147239024.png) the image is cropped to 750x246
            // (centred) with 14px corners and a faint 1px outline, as on the Contact Client Overview;
            // below lg the whole image shows, its corners baked into the file.
            className="ww-rise relative aspect-[1502/545] w-full lg:aspect-[751/246] lg:overflow-hidden lg:rounded-[calc(var(--u)*14)] lg:after:pointer-events-none lg:after:absolute lg:after:inset-0 lg:after:rounded-[inherit] lg:after:ring-1 lg:after:ring-black/8 lg:after:ring-inset"
          >
            <AssetImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1600px) 751px, (min-width: 1024px) 48vw, 100vw"
              className="object-contain lg:object-cover"
            />
          </div>
        </Reveal>

        <Reveal
          each
          className="mt-10 grid gap-y-[max(28px,calc(var(--u)*40))] rounded-[calc(var(--u)*15)] bg-white p-5 sm:p-8 md:grid-cols-2 md:gap-x-[calc(var(--u)*40)] lg:mt-[calc(var(--u)*59)] lg:px-[calc(var(--u)*60)] lg:pt-[calc(var(--u)*60)] lg:pb-[calc(var(--u)*55)]"
        >
          {details.map((detail, index) => (
            <div
              key={detail.label}
              style={revealOrder(index)}
              className="ww-rise flex items-center gap-[max(16px,calc(var(--u)*24))] border-b border-[#efe9e5] pb-[max(16px,calc(var(--u)*22))] last:border-b-0 last:pb-0 md:[&:nth-last-child(2)]:border-b-0 md:[&:nth-last-child(2)]:pb-0"
            >
              <span className="grid size-[max(52px,calc(var(--u)*64))] relative -top-[calc(var(--u)*2)] shrink-0 place-items-center rounded-full bg-[#faeddc] text-brand">
                <span className="block size-1/2">
                  <Icon name={detail.icon} />
                </span>
              </span>
              <div className="min-w-0">
                <h3 className="text-[max(20px,calc(var(--u)*28))] leading-[1.2] font-semibold tracking-[-0.01em] text-navy">
                  {detail.label}
                </h3>
                <p className="mt-[calc(var(--u)*14)] text-[max(16px,calc(var(--u)*20))] leading-[1.4] text-ink-muted">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
