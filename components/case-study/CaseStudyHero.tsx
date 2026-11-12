import { ClientLogos } from "@/components/home/ClientLogos";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { caseStudyHero } from "@/lib/content/case-study";

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

// Sizes from the reference at 1920, the same as the Insights Hero: the red button 251x59 with its
// arrow, the outline button 284x61 with no arrow, 20px apart.
const buttonText = "text-[20px] lg:text-[clamp(16px,1.042vw,20px)]";
const primarySize =
  "h-[59px] gap-[7px] pl-7 pr-7 lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(5px,0.365vw,7px)] lg:pl-[clamp(18px,1.458vw,28px)] lg:pr-[clamp(20px,1.563vw,30px)]";
// Its long label would not fit a 320px screen at 20px, so it steps down below 360px.
const secondarySize =
  "h-[61px] px-[27px] max-[359px]:px-5 max-[359px]:text-[18px] lg:h-[clamp(45px,3.177vw,61px)] lg:px-[clamp(17px,1.406vw,27px)]";

/*
  The reference's gradient layer over the artwork's left side, measured against the export at 1920:
  rgb(255 239 211) at 80% from the left edge to x 759 (39.53%), fading evenly to nothing at x 1189
  (61.93%). It does not change from top to bottom. The right side is the artwork untouched.
*/
const leftWash =
  "bg-[linear-gradient(to_right,rgb(255_239_211/0.8)_0%,rgb(255_239_211/0.8)_39.53%,rgb(255_239_211/0)_61.93%)]";

/**
 * The Case Study page Hero, from "Hero Section (1).png" (Case Study version): the Hero and the
 * Client Logo strip as one section (the project-wide standard), so they pin as one unit once the
 * next section is added. The artwork (3840x1616) is the whole 1920x808 Hero area, so from lg it
 * fills an area of the same ratio, shown whole, under the reference's left gradient, with the text
 * centred vertically on its left. Below lg the text comes first on the gradient's colour behind the
 * text (#f9e9d0) and the whole artwork follows, its top edge faded, as on the other inner-page
 * Heroes. The frozen ClientLogos strip follows, reused unchanged.
 */
export function CaseStudyHero() {
  const { eyebrow, heading, description, primaryAction, secondaryAction, image } = caseStudyHero;

  return (
    <section aria-labelledby="case-study-hero-heading" className="relative">
      <div className="relative overflow-hidden bg-[#f9e9d0] lg:flex lg:aspect-[3840/1616] lg:items-center">
        <div className="absolute inset-0 hidden lg:block">
          <AssetImage src={image.src} alt={image.alt} sizes="100vw" priority className="object-contain" />
          <div aria-hidden="true" className={`absolute inset-0 ${leftWash}`} />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:py-0 xl:px-5">
          <SectionEyebrow
            weight="bold"
            tracking="0.104em"
            className={`${textEnter} lg:text-[clamp(14px,0.9375vw,18px)]`}
          >
            {eyebrow}
          </SectionEyebrow>

          {/*
            Below lg each of the two lines is too long for the screen and wraps; balancing splits it
            evenly ("Accident Law / Firm Website") instead of leaving one word alone. From lg each
            line fits, so nothing changes there.
          */}
          <h1
            id="case-study-hero-heading"
            className="mt-[22px] text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-[630] tracking-[-0.007em] text-ink max-lg:text-balance lg:mt-[clamp(14px,1.094vw,21px)] lg:text-[clamp(38px,3.75vw,72px)]"
          >
            <MaskLine onLoad order={1}>
              {heading.first}{" "}
            </MaskLine>
            <MaskLine onLoad order={2}>
              {heading.second} <span className="text-brand">{heading.highlight}</span>
            </MaskLine>
          </h1>

          <p
            className={`${textEnter} mt-6 max-w-[24.5em] text-[18px] leading-[1.385] tracking-[0.0155em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
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
              // The outline label is heavier than semibold in the reference; inline styles win over
              // ButtonLink's classes, and Outfit is variable. 720 matches this reference's strokes
              // (ink and stem width measured at 1920); its spacing drops from ButtonLink's 0.01em
              // to 0 so the label keeps the reference's 223px width and the button its size.
              style={{ fontWeight: 720, letterSpacing: "0em" }}
              className={`${buttonText} ${secondarySize}`}
            >
              {secondaryAction.label}
            </ButtonLink>
          </div>
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
