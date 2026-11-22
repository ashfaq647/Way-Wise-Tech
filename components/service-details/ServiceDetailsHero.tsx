import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MaskLine } from "@/components/motion/MaskLine";
import { StaggerText } from "@/components/motion/StaggerText";
import type { ServiceDetails } from "@/lib/content/service-details";

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";

type ServiceDetailsHeroProps = ServiceDetails["hero"];

/**
 * The Service Details hero, shared by every Details page.
 * From lg it follows the Homepage Hero standard (owner, 2026-11-18): the frame of
 * components/home/Hero.tsx, as on the other inner pages. The content sits in the Homepage's
 * two-column grid with its top padding (bar height plus clamp(40px, 4.167vw, 80px)) and bottom
 * padding (clamp(56px, 5.208vw, 100px)); the right column is an empty 760/562 box in place of the
 * Homepage photo grid, so the Hero is 842px at 1920 with the text centred against it, and the image
 * covers the whole area (object-cover; about 40px of its 3840x1616 export is trimmed at each side at
 * 1920). Below lg the text comes first and the whole image sits underneath (object-contain).
 */
export function ServiceDetailsHero({ breadcrumb, headline, description, image }: ServiceDetailsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#ebe0d8]">
      <div className="absolute inset-0 hidden lg:block">
        <AssetImage src={image.src} alt="" sizes="100vw" priority className="object-cover" />
      </div>

      {/* Below lg the text starts under the shared floating Navbar card (76px), as on the Homepage Hero. */}
      <div className="relative mx-auto grid w-full max-w-[1600px] px-5 pt-[116px] pb-12 md:px-8 md:pt-[124px] md:pb-16 lg:grid-cols-[minmax(0,800fr)_minmax(0,760fr)] lg:items-center lg:pt-[calc(76px+clamp(40px,4.167vw,80px))] lg:pb-[clamp(56px,5.208vw,100px)] xl:px-5 xl:pt-[calc(100px+clamp(40px,4.167vw,80px))]">
        <div className="min-w-0 lg:pr-6">
        <nav aria-label="Breadcrumb" className={textEnter}>
          <ol className="flex flex-wrap items-center gap-x-[0.3em] text-[16px] leading-5 font-semibold tracking-[0.003em] text-brand uppercase lg:text-[clamp(14px,0.9375vw,18px)]">
            <li>
              <Link
                href="/"
                className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">•</li>
            <li aria-current="page">{breadcrumb}</li>
          </ol>
        </nav>

        <h1 className="mt-[23px] text-[min(calc((100vw-40px)/8.9),64px)] leading-[1.04] font-[630] tracking-[-0.008em] text-ink lg:mt-[clamp(14px,1.2vw,23px)] lg:text-[clamp(38px,3.75vw,72px)] lg:whitespace-nowrap">
          {headline.map((line, index) => (
            <MaskLine key={line.text} onLoad order={index + 1}>
              {line.text}
              {line.highlight && (
                <>
                  {" "}
                  <span className="text-brand">{line.highlight}</span>
                </>
              )}
              {/* A space between lines for screen readers. */}
              {index === 0 && " "}
            </MaskLine>
          ))}
        </h1>

        <p
          className={`${textEnter} mt-6 max-w-[24.5em] text-[18px] leading-[1.385] tracking-[0.022em] text-ink [animation-delay:260ms] lg:mt-[clamp(14px,1.25vw,24px)] lg:text-[clamp(16px,1.354vw,26px)]`}
        >
          {description}
        </p>

        <div
          className={`${textEnter} mt-6 flex flex-wrap items-center gap-x-[22px] gap-y-3 [animation-delay:340ms] lg:mt-[clamp(16px,1.25vw,24px)] lg:gap-x-[clamp(14px,1.146vw,22px)]`}
        >
          {/* No destination in the design yet. */}
          <ButtonLink
            href="#"
            className="h-[59px] gap-2.5 px-7 text-[20px] lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(7px,0.521vw,10px)] lg:px-[clamp(18px,1.458vw,28px)] lg:text-[clamp(16px,1.042vw,20px)]"
          >
            <StaggerText text="Get Started" />
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

          {/* No video or destination exists yet, so this stays a placeholder link like the rest of the site. */}
          <Link
            href="#"
            className="inline-flex h-[60px] items-center gap-2.5 rounded-lg text-[20px] font-semibold whitespace-nowrap text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:h-[clamp(44px,3.125vw,60px)] lg:gap-[clamp(7px,0.521vw,10px)] lg:text-[clamp(16px,1.042vw,20px)]"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="size-5 shrink-0 text-brand lg:size-[clamp(16px,1.042vw,20px)]"
            >
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8.2 6.6v6.8l5.2-3.4-5.2-3.4Z" fill="currentColor" />
            </svg>
            <StaggerText text="Watch Our Work" />
          </Link>
        </div>
        </div>

        {/* The Homepage photo grid's box (760x562 at 1920), left empty: the image shows through. */}
        <div aria-hidden="true" className="hidden aspect-[760/562] w-full lg:block" />
      </div>

      {/* The approved image box. The whole image shows inside it, centred, with no crop or zoom. */}
      <div className="relative aspect-[7/5] [mask-image:linear-gradient(to_bottom,transparent,black_48px)] md:aspect-[19/10] lg:hidden">
        <AssetImage src={image.src} alt="" sizes="100vw" className="object-contain" />
      </div>
    </section>
  );
}
