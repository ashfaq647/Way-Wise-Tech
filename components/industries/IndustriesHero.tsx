import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { assets } from "@/lib/assets";

const features = ["Web Development", "Mobile Apps", "UI/UX Design", "AI & Automation"];

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";
const imageEnter = "animate-hero-image motion-reduce:animate-hero-fade";

/** The right column, top to bottom. Each export is twice its 300px design width, so none is cropped. */
const sidePhotos = [
  {
    src: assets.industryHeroLaw,
    alt: "Gavel and scales of justice on a desk while two lawyers shake hands",
    delay: "[animation-delay:270ms]",
  },
  {
    src: assets.industryHeroDental,
    alt: "Dentist in a mask examining a smiling patient in a dental chair",
    delay: "[animation-delay:390ms]",
  },
  {
    src: assets.industryHeroRestaurant,
    alt: "Waiter serving diners in a bright restaurant with tall windows",
    delay: "[animation-delay:510ms]",
  },
];

/**
 * The Industries page Hero, from industry.png. At 1920 the section is 808px tall, the background
 * export's ratio, with the text and a 620x567 photo grid centred in it. The photos' rounded corners
 * are in the files. Below lg the text comes first and the grid follows at full width.
 */
export function IndustriesHero() {
  return (
    <section className="relative overflow-hidden bg-[#e8d5c0] lg:flex lg:min-h-[42.083vw] lg:items-center">
      <AssetImage
        src={assets.industryHeroBackground}
        alt="Soft beige background with golden light streaks"
        sizes="(max-width: 1023px) 300vw, 100vw"
        priority
        className="object-cover"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[minmax(0,852fr)_minmax(0,620fr)_minmax(0,88fr)] lg:items-center lg:gap-0 lg:py-[clamp(40px,4vw,76px)] xl:px-5">
        <div className="min-w-0 lg:pr-[clamp(24px,2.5vw,48px)]">
          <SectionEyebrow
            weight="bold"
            tracking="0.078em"
            barClassName="-translate-y-px"
            className={`${textEnter} lg:text-[clamp(14px,0.9375vw,18px)]`}
          >
            Industries
          </SectionEyebrow>

          <h1 className="mt-[23px] text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-[630] tracking-[-0.008em] text-ink lg:mt-[clamp(14px,1.2vw,23px)] lg:text-[clamp(38px,3.75vw,72px)]">
            <MaskLine onLoad order={1}>
              We Design for{" "}
            </MaskLine>
            <MaskLine onLoad order={2} className="text-brand">
              Every Industry
            </MaskLine>
          </h1>

          <p
            className={`${textEnter} mt-6 max-w-[31em] text-[18px] leading-[1.385] tracking-[0.015em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
          >
            We create modern and user-friendly designs for different types of businesses. No
            matter your industry, we design digital experiences that fit your goals and help you
            grow.
          </p>

          <div
            className={`${textEnter} mt-6 flex flex-wrap items-center gap-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.25vw,24px)]`}
          >
            {/* No destinations in the design yet. */}
            <ButtonLink
              href="#"
              className="h-[59px] px-[26.5px] text-[20px] lg:h-[clamp(44px,3.073vw,59px)] lg:px-[clamp(17px,1.38vw,26.5px)] lg:text-[clamp(16px,1.042vw,20px)]"
            >
              Discuss Your Project
            </ButtonLink>
            <ButtonLink
              href="#"
              variant="secondary"
              // Heavier than semibold in the reference: 650 matched its text width within 1px and its
              // ink within 3% at 1920 (700 was 7% heavier). ButtonLink has no option for this, and an
              // inline weight wins over its font-semibold class without !important. Outfit is variable.
              style={{ fontWeight: 650 }}
              className="h-[59px] px-[27.5px] text-[20px] lg:h-[clamp(44px,3.073vw,59px)] lg:px-[clamp(17px,1.432vw,27.5px)] lg:text-[clamp(16px,1.042vw,20px)]"
            >
              Explore Our Work
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

        {/* 620x567 at 1920: two 300px columns 20px apart; three 176px photos 19.5px apart. */}
        <div className="grid aspect-[620/567] w-full max-w-[620px] grid-cols-2 grid-rows-3 gap-x-[3.226%] gap-y-[3.439%] lg:max-w-none">
          <div className={`${imageEnter} relative row-span-3 [animation-delay:150ms]`}>
            <AssetImage
              src={assets.industryHeroLaundry}
              alt="Technician repairing a washing machine in a laundry room while a smiling homeowner watches"
              sizes="(min-width: 1024px) 16vw, 50vw"
              priority
              className="object-contain"
            />
          </div>
          {sidePhotos.map((photo) => (
            <div key={photo.src} className={`${imageEnter} relative ${photo.delay}`}>
              <AssetImage
                src={photo.src}
                alt={photo.alt}
                sizes="(min-width: 1024px) 16vw, 50vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
