import { ClientLogos } from "@/components/home/ClientLogos";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { aboutHero } from "@/lib/content/about";

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

// Sizes from the reference at 1920: label to arrow 7px, 28px side padding. The outline button is
// 2px taller and 4px wider on its arrow side, as drawn.
const buttonBase =
  "gap-[7px] pl-7 text-[20px] lg:gap-[clamp(5px,0.365vw,7px)] lg:pl-[clamp(18px,1.458vw,28px)] lg:text-[clamp(16px,1.042vw,20px)]";
const primarySize = "h-[59px] pr-7 lg:h-[clamp(44px,3.073vw,59px)] lg:pr-[clamp(18px,1.458vw,28px)]";
const secondarySize = "h-[61px] pr-8 lg:h-[clamp(45px,3.177vw,61px)] lg:pr-[clamp(20px,1.667vw,32px)]";

/**
 * The About Us page Hero, from "Hero Section (1).png": the Hero and the Client Logo strip as one
 * section (owner, 2026-11-11), so they pin as one unit and the next section rises over both. The
 * artwork (3840x1614) is the whole 1920x807 Hero area with nothing drawn over it, so from lg it
 * fills an area of the same ratio, shown whole, with the text centred vertically on its left. Below
 * lg the text comes first and the whole artwork follows, its top edge faded, as on the Our
 * Portfolio and Contact Heroes. The frozen ClientLogos strip follows directly, reused unchanged.
 */
export function AboutHero() {
  const { eyebrow, heading, description, primaryAction, secondaryAction, highlights, image } = aboutHero;

  return (
    <section aria-labelledby="about-hero-heading" className="relative">
      <div className="relative overflow-hidden bg-[#e8d6c0] lg:flex lg:aspect-[3840/1614] lg:items-center">
        <div className="absolute inset-0 hidden lg:block">
          <AssetImage src={image.src} alt={image.alt} sizes="100vw" priority className="object-contain" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:py-0 xl:px-5">
          <SectionEyebrow
            weight="bold"
            tracking="0.095em"
            className={`${textEnter} lg:text-[clamp(14px,0.9375vw,18px)]`}
          >
            {eyebrow}
          </SectionEyebrow>

          <h1
            id="about-hero-heading"
            className="mt-[22px] text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-[630] tracking-[-0.008em] text-ink lg:mt-[clamp(14px,1.146vw,22px)] lg:text-[clamp(38px,3.75vw,72px)]"
          >
            <MaskLine onLoad order={1}>
              {heading.first}{" "}
            </MaskLine>
            <MaskLine onLoad order={2}>
              {heading.second} <span className="text-brand">{heading.accent}</span>
            </MaskLine>
          </h1>

          <p
            className={`${textEnter} mt-6 max-w-[26.3em] text-[18px] leading-[1.385] tracking-[0.021em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
          >
            {description}
          </p>

          <div
            className={`${textEnter} mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.25vw,24px)] lg:gap-x-[clamp(12px,1.042vw,20px)]`}
          >
            <ButtonLink href={primaryAction.href} className={`${buttonBase} ${primarySize}`}>
              {primaryAction.label}
              <Arrow />
            </ButtonLink>
            <ButtonLink
              href={secondaryAction.href}
              variant="secondary"
              // As in the other inner-page Heroes: the outline label is heavier than semibold in the
              // reference; an inline weight wins over ButtonLink's class. Outfit is variable.
              style={{ fontWeight: 650 }}
              className={`${buttonBase} ${secondarySize}`}
            >
              {secondaryAction.label}
              <Arrow />
            </ButtonLink>
          </div>

          <ul
            className={`${textEnter} mt-6 flex flex-wrap gap-x-[22px] gap-y-2 [animation-delay:420ms] lg:mt-[clamp(15px,1.25vw,24px)]`}
          >
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[18px] leading-5 tracking-[0.01em] text-ink lg:text-[clamp(15px,0.94vw,18px)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m2 8.5 4 4 8-9" stroke="#eb5a20" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Below lg: the whole artwork, centred in its box with no crop or zoom, top edge faded. */}
        <div className="relative aspect-[7/5] [mask-image:linear-gradient(to_bottom,transparent,black_48px)] md:aspect-[19/10] lg:hidden">
          <AssetImage src={image.src} alt={image.alt} sizes="100vw" className="object-contain" />
        </div>
      </div>

      {/* Attached to the Hero, inside the same section, so both pin together. */}
      <ClientLogos />
    </section>
  );
}
