import { ClientLogos } from "@/components/home/ClientLogos";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { insightsHero } from "@/lib/content/insights";

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="size-[1em] shrink-0">
      <path
        d="M2 9h14M10.5 3.5 16 9l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sizes from the reference at 1920: the red button 251x59 with its arrow, the outline button
// 284x61 with no arrow, 20px apart.
const buttonText = "text-[20px] lg:text-[clamp(16px,1.042vw,20px)]";
const primarySize =
  "h-[59px] gap-[7px] pl-7 pr-7 lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(5px,0.365vw,7px)] lg:pl-[clamp(18px,1.458vw,28px)] lg:pr-[clamp(20px,1.563vw,30px)]";
// Its long label would not fit a 320px screen at 20px, so it steps down below 360px.
const secondarySize =
  "h-[61px] px-[27px] max-[359px]:px-5 max-[359px]:text-[18px] lg:h-[clamp(45px,3.177vw,61px)] lg:px-[clamp(17px,1.406vw,27px)]";

/**
 * The Insights (Blog) page Hero (reference `Homepage.png`, 2026-11-17, which shows this page): the Hero
 * and the Client Logo strip as one section, pinned as one unit. From lg it follows the Homepage Hero
 * standard, as on About, FAQ and Contact (842px at 1920 with the compact 100px strip), with the
 * artwork (3840x1614) covering the Hero area behind the text, centred vertically on its left. Below lg the text comes first and the whole artwork follows, its top edge
 * faded, as on the FAQ and About Us Heroes. The frozen ClientLogos strip follows, reused unchanged.
 */
export function InsightsHero() {
  const { eyebrow, heading, description, primaryAction, secondaryAction, image } = insightsHero;

  return (
    <section aria-labelledby="insights-hero-heading" className="relative">
      {/* Homepage Hero standard: the Homepage grid and padding, with an empty 760/562 right column. */}
      <div className="relative overflow-hidden bg-[#ecd8c1]">
        <div className="absolute inset-0 hidden lg:block">
          <AssetImage src={image.src} alt={image.alt} sizes="100vw" priority className="object-cover" />
        </div>

        {/* Below lg the text starts under the shared floating Navbar card, as on the Homepage Hero. */}
        <div className="relative mx-auto grid w-full max-w-[1600px] px-5 pt-[116px] pb-12 md:px-8 md:pt-[124px] md:pb-16 lg:grid-cols-[minmax(0,800fr)_minmax(0,760fr)] lg:items-center lg:pt-[calc(76px+clamp(40px,4.167vw,80px))] lg:pb-[clamp(56px,5.208vw,100px)] xl:px-5 xl:pt-[calc(100px+clamp(40px,4.167vw,80px))]">
          <div className="min-w-0">
          <SectionEyebrow
            weight="bold"
            tracking="0.082em"
            className={`${textEnter} lg:text-[clamp(14px,0.9375vw,18px)]`}
          >
            {eyebrow}
          </SectionEyebrow>

          <h1
            id="insights-hero-heading"
            className="mt-[22px] text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-[630] tracking-[-0.0155em] text-ink lg:mt-[clamp(15px,1.198vw,23px)] lg:text-[clamp(38px,3.75vw,72px)]"
          >
            <MaskLine onLoad order={1}>
              {heading.first}{" "}
            </MaskLine>
            <MaskLine onLoad order={2}>
              {heading.second}
            </MaskLine>
          </h1>

          <p
            className={`${textEnter} mt-6 max-w-[26em] text-[18px] leading-[1.385] tracking-[0.0155em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
          >
            {description}
          </p>

          <div
            className={`${textEnter} mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.198vw,23px)] lg:gap-x-[clamp(12px,1.042vw,20px)]`}
          >
            <ButtonLink href={primaryAction.href} className={`${buttonText} ${primarySize}`}>
              {primaryAction.label}
              <Arrow />
            </ButtonLink>
            <ButtonLink
              href={secondaryAction.href}
              variant="secondary"
              // As in the other inner-page Heroes: the outline label is heavier than semibold in the
              // reference; an inline weight wins over ButtonLink's class. Outfit is variable.
              style={{ fontWeight: 650 }}
              className={`${buttonText} ${secondarySize}`}
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
          <AssetImage src={image.src} alt={image.alt} sizes="100vw" className="object-contain" />
        </div>
      </div>

      {/* Attached to the Hero, inside the same section, so both pin together: the Homepage's compact
          100px strip, as on the Homepage. */}
      <ClientLogos height="compact" />
    </section>
  );
}
