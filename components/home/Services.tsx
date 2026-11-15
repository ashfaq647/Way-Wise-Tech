import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { serviceCards, servicesSection } from "@/lib/content/services";

const { eyebrow, heading, description } = servicesSection;

type ServicesProps = {
  /** The cards to show. Defaults to the six featured cards (the Homepage design). */
  services?: typeof serviceCards;
  /** The header button. Defaults to the Homepage's "View All Services". */
  action?: { label: string; href: string };
};

export function Services({ services = serviceCards, action = servicesSection.action }: ServicesProps) {
  return (
    <section aria-labelledby="services-heading" className="bg-[#eae2dd]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[60px] lg:pb-[63px] xl:px-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:gap-0">
          <div>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[18px]">
              <span className="h-[3px] w-[22px] shrink-0 bg-brand" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink lg:text-[clamp(34px,2.71vw,52px)]"
            >
              {heading.first}
              <br />
              {/* One text node ("Scalable "), as before: a separate " " node shifts the red words' sub-pixel rendering. */}
              {`${heading.second} `}
              <span className="text-brand">{heading.accent}</span>
            </h2>
          </div>

          <div className="lg:pt-3.5">
            <p className="text-[18px] leading-[1.45] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
              {description}
            </p>
            <ButtonLink
              href={action.href}
              variant="outline"
              className="mt-4 h-[51px] px-6 text-[18px] lg:text-[20px]"
            >
              {action.label}
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-y-[25px] xl:gap-x-10">
          {services.map((service) => (
            <li key={service.title}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.18)] transition-[translate,box-shadow] duration-300 ease-out focus-within:shadow-[0_8px_20px_rgba(35,31,32,0.1)] hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:focus-within:-translate-y-1 motion-safe:hover:-translate-y-1">
                <div className="relative aspect-[987/400]">
                  <AssetImage
                    src={service.image}
                    alt={service.alt}
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pt-5 pb-6 xl:px-10">
                  <h3 className="text-[20px] leading-[1.286] font-semibold text-ink lg:text-[clamp(20px,1.458vw,28px)]">
                    {/*
                      The title is the link; its ::after covers the whole card, so the card is
                      clickable while the article and its focus-within lift stay as they were.
                    */}
                    <Link
                      href={service.href}
                      className="outline-none after:absolute after:inset-0 after:rounded-2xl after:outline-offset-[-3px] focus-visible:after:outline-2 focus-visible:after:outline-ink"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[17px] leading-[1.5] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(15px,1.042vw,20px)]">
                    {service.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
