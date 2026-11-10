import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";

const features = ["Web Development", "Mobile Apps", "UI/UX Design", "AI & Automation"];

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";
const imageEnter = "animate-hero-image motion-reduce:animate-hero-fade";

const images = [
  {
    src: assets.heroAi,
    alt: "AI head made of circuitry in a city of data",
    className: "row-span-2 [animation-delay:150ms]",
    priority: true,
    sizes: "(min-width: 1024px) 23vw, 58vw",
  },
  {
    src: assets.heroStrategy,
    alt: "Businessman pointing at a rising bar chart",
    className: "[animation-delay:270ms]",
    priority: false,
    sizes: "(min-width: 1024px) 16vw, 40vw",
  },
  {
    src: assets.heroDashboard,
    alt: "Hand pointing at a dashboard on a desktop monitor",
    className: "[animation-delay:390ms]",
    priority: false,
    sizes: "(min-width: 1024px) 16vw, 40vw",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#dbc3ad]">
        {/* Below lg the section is much taller than the artwork, so cover scales it by height. */}
        <AssetImage
          src={assets.heroBackground}
          alt=""
          sizes="(max-width: 1023px) 600vw, 100vw"
          priority
          className="object-cover"
        />

        <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[minmax(0,800fr)_minmax(0,760fr)] lg:items-center lg:gap-0 lg:py-[clamp(56px,5.2vw,100px)] xl:px-5">
          <div className="min-w-0 lg:pr-6">
            <p
              className={`${textEnter} inline-flex items-center gap-1.5 rounded-full border border-black bg-white/10 px-3 py-[5px] text-[11px] leading-[19px] font-medium tracking-[0.078em] text-black uppercase sm:pr-[13px] sm:pl-3.5 sm:text-[14px]`}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              USA Strategy • Global Technology Delivery
            </p>

            <h1
              className={`${textEnter} mt-6 text-[clamp(28px,8.8vw,64px)] leading-[1.04] font-semibold tracking-[-0.005em] text-ink [animation-delay:80ms] lg:text-[clamp(38px,3.75vw,72px)]`}
            >
              Technology Built
              <br />
              Around <span className="text-brand">Your Business</span>
            </h1>

            <p
              className={`${textEnter} mt-[25px] max-w-[26.5em] text-[18px] leading-[1.385] text-ink [animation-delay:160ms] lg:text-[clamp(18px,1.354vw,26px)]`}
            >
              We design and develop high-performing websites, custom software, mobile apps, and
              AI-powered solutions that help businesses grow.
            </p>

            <div className={`${textEnter} mt-[23px] flex flex-wrap items-center gap-3 [animation-delay:240ms]`}>
              <ButtonLink href="#" className="h-[59px] px-6 pt-0.5 xl:min-w-[221px] text-[20px]">
                Explore Our Work
              </ButtonLink>
              <ButtonLink href="#" variant="secondary" className="h-[61px] px-6 pt-0.5 xl:min-w-[245px] text-[20px]">
                Discuss Your Project
              </ButtonLink>
            </div>

            <ul className={`${textEnter} mt-6 flex flex-wrap gap-x-[20.35px] gap-y-2 [animation-delay:320ms]`}>
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-[18px] leading-5 text-ink lg:text-[clamp(15px,0.94vw,18px)]">
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

          <div
            className="grid aspect-[760/608] w-full grid-cols-[440fr_300fr] grid-rows-2 gap-x-[2.63%] gap-y-[3.29%]"
          >
            {images.map((image) => (
              <div
                key={image.alt}
                className={`${imageEnter} relative overflow-hidden rounded-2xl ${image.className}`}
              >
                <AssetImage
                  src={image.src}
                  alt={image.alt}
                  sizes={image.sizes}
                  priority={image.priority}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
