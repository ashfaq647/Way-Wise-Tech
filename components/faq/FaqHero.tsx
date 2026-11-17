import { ClientLogos } from "@/components/home/ClientLogos";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { faqHero } from "@/lib/content/faq";

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

// Sizes from the reference at 1920: the red button 252x59 with its arrow, the outline button
// 228x61 with no arrow, 20px apart.
const buttonText = "text-[20px] lg:text-[clamp(16px,1.042vw,20px)]";
const primarySize =
  "h-[59px] gap-[7px] pl-7 pr-7 lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(5px,0.365vw,7px)] lg:pl-[clamp(18px,1.458vw,28px)] lg:pr-[clamp(20px,1.563vw,30px)]";
const secondarySize = "h-[61px] px-[27px] lg:h-[clamp(45px,3.177vw,61px)] lg:px-[clamp(17px,1.406vw,27px)]";

/**
 * The FAQ page Hero (reference `Homepage.png`, 2026-11-17, which shows this page): the Hero and the
 * Client Logo strip as one section, so they pin as one unit and the next section rises over both. From
 * lg it follows the Homepage Hero standard (842px at 1920 with the compact 100px strip), with the
 * artwork (3840x1614) covering the Hero area behind the text, centred vertically on its left. Below lg the text comes first and the whole artwork follows, its top edge faded, as on the
 * About Us, Our Portfolio and Contact Heroes. The frozen ClientLogos strip follows, reused unchanged.
 */
export function FaqHero() {
  const { eyebrow, heading, description, primaryAction, secondaryAction, image } = faqHero;

  return (
    <section aria-labelledby="faq-hero-heading" className="relative">
      {/*
        Homepage Hero standard (owner, 2026-11-17), as on About: the Homepage Hero's grid, top padding
        (bar height plus clamp(40px, 4.167vw, 80px)) and bottom padding, with an empty 760/562 right
        column, so the Hero is 842px at 1920 and the compact strip completes the 942 frame. The
        artwork covers the whole area behind the content.
      */}
      <div className="relative overflow-hidden bg-[#ecd9c9]">
        <div className="absolute inset-0 hidden lg:block">
          <AssetImage src={image.src} alt={image.alt} sizes="100vw" priority className="object-cover" />
        </div>

        {/* Below lg the text starts under the shared floating Navbar card, as on the Homepage Hero. */}
        <div className="relative mx-auto grid w-full max-w-[1600px] px-5 pt-[116px] pb-12 md:px-8 md:pt-[124px] md:pb-16 lg:grid-cols-[minmax(0,800fr)_minmax(0,760fr)] lg:items-center lg:pt-[calc(76px+clamp(40px,4.167vw,80px))] lg:pb-[clamp(56px,5.208vw,100px)] xl:px-5 xl:pt-[calc(100px+clamp(40px,4.167vw,80px))]">
          <div className="min-w-0">
          <SectionEyebrow
            weight="bold"
            tracking="0.07em"
            className={`${textEnter} lg:text-[clamp(14px,0.9375vw,18px)]`}
          >
            {eyebrow}
          </SectionEyebrow>

          <h1
            id="faq-hero-heading"
            className="mt-[22px] text-[clamp(28px,8.8vw,64px)] leading-[1.052] font-[630] tracking-[-0.008em] text-ink lg:mt-[clamp(14px,1.094vw,21px)] lg:text-[clamp(38px,3.75vw,72px)]"
          >
            <MaskLine onLoad order={1}>
              {heading.first}{" "}
            </MaskLine>
            <MaskLine onLoad order={2} className="text-brand">
              {heading.accent}
            </MaskLine>
          </h1>

          <p
            className={`${textEnter} mt-6 max-w-[25.5em] text-[18px] leading-[1.385] tracking-[0.021em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
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
