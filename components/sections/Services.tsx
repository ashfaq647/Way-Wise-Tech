import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { serviceCards, servicesSection } from "@/lib/content/services";

const { eyebrow, heading, description } = servicesSection;

/*
  Layout per variant. "default" is the original design (/services; these strings are unchanged).
  "compact" is the 2026-11-16 Homepage redesign: the whole section fits one 1920x942 frame (eyebrow
  at y 62, cards 493x302 at y 251-880, the section ends at 941.97), the header text sits on the
  heading's bottom line, cards have 5px corners, a 493x192 image and a 24px body with a 20px title
  and a two-line 17px description.
*/
const styles = {
  default: {
    frame: "mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[60px] lg:pb-[63px] xl:px-5",
    header: "grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:gap-0",
    heading:
      "mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink lg:text-[clamp(34px,2.71vw,52px)]",
    aside: "lg:pt-3.5",
    button: "mt-4 h-[51px] px-6 text-[18px] lg:text-[20px]",
    list: "mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-y-[25px] xl:gap-x-10",
    card: "rounded-2xl",
    link: "after:rounded-2xl",
    image: "aspect-[987/400]",
    body: "px-6 pt-5 pb-6 xl:px-10",
    title: "text-[20px] leading-[1.286] font-semibold text-ink lg:text-[clamp(20px,1.458vw,28px)]",
    text: "mt-1 text-[17px] leading-[1.5] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(15px,1.042vw,20px)]",
  },
  compact: {
    // pb 61.75px, not 62: the fractional heading lines (2 x 61.74px) and images (192.13px at the
    // 493.33px card width) would otherwise end the section at 942.2px, past the 942 frame.
    frame: "mx-auto w-full max-w-[1600px] px-5 py-12 md:px-8 md:py-16 lg:pt-[59px] lg:pb-[61.75px] xl:px-5",
    header: "grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:items-end lg:gap-0",
    heading:
      "mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-ink lg:mt-[9px] lg:text-[clamp(34px,2.786vw,53.5px)]",
    aside: "",
    button: "mt-4 h-12 px-6 text-[18px]",
    list: "mt-8 grid gap-5 md:grid-cols-2 lg:mt-[39.5px] lg:grid-cols-3 lg:gap-y-[25px] xl:gap-x-10",
    card: "rounded-[5px]",
    link: "after:rounded-[5px]",
    image: "aspect-[493/192]",
    body: "px-6 pt-[17px] pb-[18px]",
    title: "text-[20px] leading-[26px] font-semibold text-ink",
    text: "mt-[5px] text-[16px] leading-[22px] tracking-[0.025em] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(15px,0.885vw,17px)]",
  },
};

type ServicesProps = {
  /** The cards to show. Defaults to the six featured cards (the Homepage design). */
  services?: typeof serviceCards;
  /** The header button. Defaults to the Homepage's "View All Services". */
  action?: { label: string; href: string };
  /** "compact": the 2026-11-16 Homepage redesign (Homepage only). Default: the original design. */
  variant?: keyof typeof styles;
};

export function Services({
  services = serviceCards,
  action = servicesSection.action,
  variant = "default",
}: ServicesProps) {
  const s = styles[variant];
  return (
    <section aria-labelledby="services-heading" className="bg-[#eae2dd]">
      <div className={s.frame}>
        <div className={s.header}>
          <div>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[18px]">
              <span className="h-[3px] w-[22px] shrink-0 bg-brand" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="services-heading" className={s.heading}>
              {heading.first}
              <br />
              {/* One text node ("Scalable "), as before: a separate " " node shifts the red words' sub-pixel rendering. */}
              {`${heading.second} `}
              <span className="text-brand">{heading.accent}</span>
            </h2>
          </div>

          <div className={s.aside || undefined}>
            <p className="text-[18px] leading-[1.45] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
              {description}
            </p>
            <ButtonLink href={action.href} variant="outline" className={s.button}>
              {action.label}
            </ButtonLink>
          </div>
        </div>

        <ul className={s.list}>
          {services.map((service) => (
            <li key={service.title}>
              <article
                className={`relative flex h-full flex-col overflow-hidden ${s.card} bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.18)] transition-[translate,box-shadow] duration-300 ease-out focus-within:shadow-[0_8px_20px_rgba(35,31,32,0.1)] hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:focus-within:-translate-y-1 motion-safe:hover:-translate-y-1`}
              >
                <div className={`relative ${s.image}`}>
                  <AssetImage
                    src={service.image}
                    alt={service.alt}
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className={s.body}>
                  <h3 className={s.title}>
                    {/*
                      The title is the link; its ::after covers the whole card, so the card is
                      clickable while the article and its focus-within lift stay as they were.
                    */}
                    <Link
                      href={service.href}
                      className={`outline-none after:absolute after:inset-0 ${s.link} after:outline-offset-[-3px] focus-visible:after:outline-2 focus-visible:after:outline-ink`}
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className={s.text}>{service.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
