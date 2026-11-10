import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { assets } from "@/lib/assets";

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";

const heroImageAlt =
  "Two business people in suits shaking hands over a desk with documents, a pen and a laptop, a city skyline behind";

/**
 * The Contact Us page Hero, from "Hero Section (1).png". The artwork (3840x1614) carries its own
 * light fade on the left, so from lg it fills a section of the same ratio, shown whole, with the
 * text centred vertically on that side. Below lg the text comes first and the whole artwork
 * follows, its top edge faded, as on the Our Portfolio and Service Details Heroes.
 */
export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#f0ebe4] lg:flex lg:aspect-[3840/1614] lg:items-center">
      <div className="absolute inset-0 hidden lg:block">
        <AssetImage src={assets.contactHero} alt={heroImageAlt} sizes="100vw" priority className="object-contain" />
        {/*
          The design's gradient layer, measured against the export at 1920: left to right, solid
          sand (#eae2dd) at the left edge, fading linearly to a transparent white at 88%, the same
          from top to bottom. Figma fades colour and opacity separately, so the colour lightens as
          it fades; CSS would keep it sand, so the in-between stops are spelled out. The image
          fills the section exactly, so percentages line up.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgb(234_226_221/1)_0%,rgb(239_233_230/0.75)_22%,rgb(245_241_238/0.5)_44%,rgb(250_248_247/0.25)_66%,rgb(255_255_255/0)_88%)]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:py-0 xl:px-5">
        <SectionEyebrow
          weight="bold"
          tracking="0.078em"
          barClassName="-translate-y-px"
          className={`${textEnter} lg:text-[clamp(14px,0.9375vw,18px)]`}
        >
          Case Study
        </SectionEyebrow>

        <h1 className="mt-[23px] text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-[630] tracking-[-0.008em] text-ink lg:mt-[clamp(14px,1.2vw,23px)] lg:text-[clamp(38px,3.75vw,72px)]">
          <MaskLine onLoad order={1}>
            Let&rsquo;s Discuss Your{" "}
          </MaskLine>
          <MaskLine onLoad order={2} className="text-brand">
            Next Project
          </MaskLine>
        </h1>

        <p
          className={`${textEnter} mt-6 max-w-[25.6em] text-[18px] leading-[1.385] tracking-[0.015em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
        >
          Have a project idea or need expert advice? Our team is here to help. Get in touch and
          let&apos;s build something amazing together.
        </p>

        <div
          className={`${textEnter} mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.25vw,24px)] lg:gap-x-[clamp(12px,1.042vw,20px)]`}
        >
          {/* No destinations in the design yet. */}
          <ButtonLink
            href="#"
            className="h-[59px] gap-2.5 px-7 text-[20px] lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(7px,0.521vw,10px)] lg:px-[clamp(18px,1.458vw,28px)] lg:text-[clamp(16px,1.042vw,20px)]"
          >
            Visit Live Website
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
            href="#"
            variant="secondary"
            // As in the Industries and Our Portfolio Heroes: the outline label is heavier than
            // semibold in the reference; an inline weight wins over ButtonLink's class.
            style={{ fontWeight: 650 }}
            // Its long label would not fit a 320px screen at 20px, so it steps down below 360px.
            className="h-[59px] px-7 text-[20px] max-[359px]:px-5 max-[359px]:text-[18px] lg:h-[clamp(44px,3.073vw,59px)] lg:px-[clamp(18px,1.458vw,28px)] lg:text-[clamp(16px,1.042vw,20px)]"
          >
            Discuss a Similar Project
          </ButtonLink>
        </div>
      </div>

      {/* Below lg: the whole artwork, centred in its box with no crop or zoom, top edge faded. */}
      <div className="relative aspect-[7/5] [mask-image:linear-gradient(to_bottom,transparent,black_48px)] md:aspect-[19/10] lg:hidden">
        <AssetImage src={assets.contactHero} alt={heroImageAlt} sizes="100vw" className="object-contain" />
      </div>
    </section>
  );
}
