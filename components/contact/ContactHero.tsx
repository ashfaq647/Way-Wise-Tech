import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { assets } from "@/lib/assets";
import { contactHero } from "@/lib/content/contact";

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";

const { eyebrow, heading, description, primaryAction, secondaryAction, imageAlt: heroImageAlt } =
  contactHero;

/**
 * The Contact Us page Hero (reference `Homepage.png`, 2026-11-17, which shows this page). From lg it
 * follows the Homepage Hero standard, as on About and FAQ: the Homepage Hero's grid, top and bottom
 * padding and an empty 760/562 right column, so the Hero is 842px at 1920 and the compact strip
 * completes the 942 frame. The artwork (3840x1614) and its light left fade cover the whole area,
 * with the text centred vertically on the left. Below lg the text comes first and the whole artwork
 * follows, its top edge faded, as on the Our Portfolio and Service Details Heroes.
 */
export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#f0ebe4]">
      <div className="absolute inset-0 hidden lg:block">
        <AssetImage src={assets.contactHero} alt={heroImageAlt} sizes="100vw" priority className="object-cover" />
        {/*
          The design's gradient layer, measured against the export at 1920: left to right, solid
          sand (#eae2dd) at the left edge, fading linearly to a transparent white at 88%, the same
          from top to bottom. Figma fades colour and opacity separately, so the colour lightens as
          it fades; CSS would keep it sand, so the in-between stops are spelled out. The image
          covers the section, so the fade spans the same width.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgb(234_226_221/1)_0%,rgb(239_233_230/0.75)_22%,rgb(245_241_238/0.5)_44%,rgb(250_248_247/0.25)_66%,rgb(255_255_255/0)_88%)]"
        />
      </div>

      {/* Below lg the text starts under the shared floating Navbar card, as on the Homepage Hero. */}
      <div className="relative mx-auto grid w-full max-w-[1600px] px-5 pt-[116px] pb-12 md:px-8 md:pt-[124px] md:pb-16 lg:grid-cols-[minmax(0,800fr)_minmax(0,760fr)] lg:items-center lg:pt-[calc(76px+clamp(40px,4.167vw,80px))] lg:pb-[clamp(56px,5.208vw,100px)] xl:px-5 xl:pt-[calc(100px+clamp(40px,4.167vw,80px))]">
        <div className="min-w-0">
        <SectionEyebrow
          weight="bold"
          tracking="0.05em"
          barClassName="-translate-y-px"
          className={`${textEnter} lg:text-[clamp(15px,1.042vw,20px)]`}
        >
          {eyebrow}
        </SectionEyebrow>

        <h1 className="mt-[23px] text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-[630] tracking-[-0.008em] text-ink lg:mt-[clamp(14px,1.2vw,23px)] lg:text-[clamp(38px,3.75vw,72px)]">
          <MaskLine onLoad order={1}>
            {heading.first}{" "}
          </MaskLine>
          <MaskLine onLoad order={2} className="text-brand">
            {heading.accent}
          </MaskLine>
        </h1>

        <p
          className={`${textEnter} mt-6 max-w-[25.6em] text-[18px] leading-[1.385] tracking-[0.015em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
        >
          {description}
        </p>

        <div
          className={`${textEnter} mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.25vw,24px)] lg:gap-x-[clamp(12px,1.042vw,20px)]`}
        >
          {/* No destinations in the design yet. */}
          <ButtonLink
            href={primaryAction.href}
            className="h-[59px] gap-2.5 px-7 text-[20px] lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(7px,0.521vw,10px)] lg:px-[clamp(18px,1.458vw,28px)] lg:text-[clamp(16px,1.042vw,20px)]"
          >
            {primaryAction.label}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M2 9h14M10.5 3.5 16 9l-5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonLink>
          <ButtonLink
            href={secondaryAction.href}
            variant="secondary"
            // As in the Industries and Our Portfolio Heroes: the outline label is heavier than
            // semibold in the reference; an inline weight wins over ButtonLink's class.
            style={{ fontWeight: 650 }}
            // Its long label would not fit a 320px screen at 20px, so it steps down below 360px.
            className="h-[59px] px-7 text-[20px] max-[359px]:px-5 max-[359px]:text-[18px] lg:h-[clamp(44px,3.073vw,59px)] lg:px-[clamp(18px,1.458vw,28px)] lg:text-[clamp(16px,1.042vw,20px)]"
          >
            {secondaryAction.label}
          </ButtonLink>
        </div>
        </div>

        {/* The Homepage photo grid's box (760x562 at 1920), left empty: the artwork shows through. */}
        <div aria-hidden="true" className="hidden aspect-[760/562] w-full lg:block" />
      </div>

      {/* Below lg: the whole artwork, centred in its box with no crop or zoom, top edge faded. */}
      <div className="relative aspect-[7/5] [mask-image:linear-gradient(to_bottom,transparent,black_48px)] md:aspect-[19/10] lg:hidden">
        <AssetImage src={assets.contactHero} alt={heroImageAlt} sizes="100vw" className="object-contain" />
      </div>
    </section>
  );
}
