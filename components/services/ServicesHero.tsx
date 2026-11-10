import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MaskLine } from "@/components/motion/MaskLine";
import { StaggerText } from "@/components/motion/StaggerText";
import { assets } from "@/lib/assets";

const features = ["Custom Solutions", "Experienced Team", "Modern Technology"];

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#eedac2] lg:flex lg:aspect-[3840/1614] lg:items-center">
      {/* From lg the artwork fills the section. Below that it sits under the text, cropped to the devices. */}
      <div className="absolute inset-0 hidden lg:block">
        <AssetImage
          src={assets.serviceListHero}
          alt=""
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[38px] lg:pb-10 xl:px-5">
        <p
          className={`${textEnter} text-[16px] leading-5 font-bold tracking-[0.066em] text-brand uppercase lg:text-[clamp(14px,0.833vw,16px)]`}
        >
          Our Services
        </p>

        <h1
          className="mt-[23px] text-[min(calc((100vw-40px)/10.3),64px)] leading-[1.04] font-[660] tracking-[-0.0096em] text-ink lg:text-[clamp(38px,3.75vw,72px)]"
        >
          <MaskLine onLoad order={1}>
            Smart Digital Solutions
          </MaskLine>{" "}
          <MaskLine onLoad order={2} className="text-brand">
            for Your Business
          </MaskLine>
        </h1>

        <p
          className={`${textEnter} mt-[25px] max-w-[26.5em] text-[18px] leading-[1.367] text-ink [animation-delay:260ms] lg:text-[clamp(18px,1.354vw,26px)]`}
        >
          We help businesses design, build, and grow with modern technology. Explore our services
          and find the right solution for your business.
        </p>

        <div
          className={`${textEnter} mt-6 flex flex-wrap items-center gap-3 [animation-delay:340ms]`}
        >
          {/* No destinations in the design yet. */}
          <ButtonLink href="#" className="h-[60px] px-6 pt-px text-[20px] font-medium! lg:h-[clamp(48px,3.125vw,60px)] lg:px-[clamp(16px,1.25vw,24px)] lg:text-[clamp(16px,1.042vw,20px)] gap-2.5 lg:gap-[clamp(7px,0.521vw,10px)] lg:min-w-[min(12.97vw,249px)]">
            <StaggerText text="Start Your Project" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mr-0.5">
              <path
                d="M2 9h14M10.5 3.5 16 9l-5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonLink>
          <ButtonLink href="#" variant="secondary" className="h-[60px] px-6 pt-0.5 text-[20px] font-semibold! tracking-[-0.001em]! lg:h-[clamp(48px,3.125vw,60px)] lg:px-[clamp(16px,1.25vw,24px)] lg:text-[clamp(16px,1.042vw,20px)] border-[#a59788]! hover:border-ink! lg:min-w-[min(12.92vw,248px)]">
            <StaggerText text="Explore Our Services" />
          </ButtonLink>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-[22.35px] gap-y-2">
          {features.map((feature, index) => (
            <li
              key={feature}
              style={{ animationDelay: `${420 + index * 70}ms` }}
              className={`${textEnter} flex items-center gap-2 text-[18px] leading-5 text-ink xl:gap-1.5 xl:first:gap-[11px] lg:text-[clamp(15px,0.94vw,18px)]`}
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

      <div className="relative aspect-[6/5] [mask-image:linear-gradient(to_bottom,transparent,black_48px)] md:aspect-[2/1] lg:hidden">
        <AssetImage
          src={assets.serviceListHero}
          alt=""
          sizes="(min-width: 768px) 100vw, 200vw"
          className="object-cover object-right"
        />
      </div>
    </section>
  );
}
