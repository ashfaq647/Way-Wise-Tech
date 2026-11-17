import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { assets } from "@/lib/assets";
import { industriesHero } from "@/lib/content/industries";

const { eyebrow, heading, description, primaryAction, secondaryAction, features, imageAlts } =
  industriesHero;

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";
const imageEnter = "animate-hero-image motion-reduce:animate-hero-fade";

/** The right column, top to bottom. Each is cropped to its 300x162 frame (the files are 300x176). */
const sidePhotos = [
  {
    src: assets.industryHeroLaw,
    alt: imageAlts.law,
    delay: "[animation-delay:270ms]",
  },
  {
    src: assets.industryHeroDental,
    alt: imageAlts.dental,
    delay: "[animation-delay:390ms]",
  },
  {
    src: assets.industryHeroRestaurant,
    alt: imageAlts.restaurant,
    delay: "[animation-delay:510ms]",
  },
];

/** The reference's photo corners: about 8px at 1920. */
const photoFrame = "relative overflow-hidden rounded-[clamp(6px,0.417vw,8px)]";

/**
 * The Industries page Hero, on the Homepage Hero standard (2026-11-17, reference `Homepage.png`,
 * which shows this page): the Homepage Hero's grid, padding and floating-Navbar clearance, so the
 * Hero is 842px at 1920 and the shared compact logo strip completes the 942 frame. The content,
 * text styles and photo arrangement are this page's own: a 640x527 grid at 1920 (a 320px column
 * beside three 300x162 photos, 20px gaps), right-aligned and centred in the Homepage's 760x562
 * image area. Below lg the text comes first and the grid follows.
 */
export function IndustriesHero() {
  return (
    <section className="relative overflow-hidden bg-[#e8d5c0]">
      <AssetImage
        src={assets.industryHeroBackground}
        alt={imageAlts.background}
        sizes="(max-width: 1023px) 300vw, 100vw"
        priority
        className="object-cover"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 px-5 pt-[116px] pb-12 md:px-8 md:pt-[124px] md:pb-16 lg:grid-cols-[minmax(0,800fr)_minmax(0,760fr)] lg:items-center lg:gap-0 lg:pt-[calc(76px+clamp(40px,4.167vw,80px))] lg:pb-[clamp(56px,5.208vw,100px)] xl:px-5 xl:pt-[calc(100px+clamp(40px,4.167vw,80px))]">
        {/* No right padding: the description's first line needs 784px of the 800 (as drawn, breaking after "types of"). */}
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
            className={`${textEnter} mt-6 max-w-[31em] text-[18px] leading-[1.385] tracking-[0.015em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
          >
            {description}
          </p>

          <div
            className={`${textEnter} mt-6 flex flex-wrap items-center gap-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.25vw,24px)]`}
          >
            {/* No destinations in the design yet. */}
            <ButtonLink
              href={primaryAction.href}
              className="h-[59px] px-[26.5px] text-[20px] lg:h-[clamp(44px,3.073vw,59px)] lg:px-[clamp(17px,1.38vw,26.5px)] lg:text-[clamp(16px,1.042vw,20px)]"
            >
              {primaryAction.label}
            </ButtonLink>
            <ButtonLink
              href={secondaryAction.href}
              variant="secondary"
              // Heavier than semibold in the reference: 650 matched its text width within 1px and its
              // ink within 3% at 1920 (700 was 7% heavier). ButtonLink has no option for this, and an
              // inline weight wins over its font-semibold class without !important. Outfit is variable.
              style={{ fontWeight: 650 }}
              className="h-[61px] px-[27.5px] text-[20px] lg:h-[clamp(46px,3.177vw,61px)] lg:px-[clamp(17px,1.432vw,27.5px)] lg:text-[clamp(16px,1.042vw,20px)]"
            >
              {secondaryAction.label}
            </ButtonLink>
          </div>

          <ul
            className={`${textEnter} mt-6 flex flex-wrap gap-x-[22px] gap-y-2 [animation-delay:420ms] lg:mt-[clamp(16px,1.25vw,24px)] lg:gap-x-[clamp(14px,1.146vw,22px)]`}
          >
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-[18px] leading-5 tracking-[0.015em] text-ink lg:text-[clamp(15px,0.94vw,18px)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="m2 8.5 4 4 8-9"
                    stroke="#eb5a20"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* The Homepage's 760x562 image area (so the Hero has its height), holding this page's grid. */}
        <div className="lg:flex lg:aspect-[760/562] lg:items-center lg:justify-end">
          {/* 640x527 at 1920: a 320px and a 300px column 20px apart; three 162px photos 20px apart. */}
          <div className="grid aspect-[640/527] w-full max-w-[640px] grid-cols-[320fr_300fr] grid-rows-3 gap-x-[3.125%] gap-y-[3.795%] lg:w-[84.211%] lg:max-w-none">
            <div className={`${imageEnter} ${photoFrame} row-span-3 [animation-delay:150ms]`}>
              <AssetImage
                src={assets.industryHeroLaundry}
                alt={imageAlts.laundry}
                sizes="(min-width: 1024px) 17vw, 50vw"
                priority
                className="object-cover object-[50%_31%]"
              />
            </div>
            {sidePhotos.map((photo) => (
              <div key={photo.src} className={`${imageEnter} ${photoFrame} ${photo.delay}`}>
                <AssetImage
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
