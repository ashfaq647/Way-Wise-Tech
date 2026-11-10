import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";
import { IndustryCarousel, type IndustryCard } from "./IndustryCarousel";

const industries: IndustryCard[] = [
  {
    title: "Attorney & Lawyers",
    description:
      "Professional websites and digital tools that help law firms build trust, attract clients, and manage inquiries.",
    image: assets.industryAttorney,
    alt: "Attorney seated at a large desk in a wood-panelled office",
    fade: "46 62 86",
  },
  {
    title: "Restaurant",
    description:
      "Modern websites, online ordering systems, and digital tools that help restaurants serve more customers.",
    image: assets.industryRestaurant,
    alt: "Chef checking a tablet in a restaurant kitchen",
    fade: "134 100 61",
  },
  {
    title: "Retailers",
    description:
      "Online stores and business tools that make shopping easier and help retailers grow sales.",
    image: assets.industryRetailers,
    alt: "Smiling shop owner holding a product in a homeware store",
    fade: "169 102 100",
  },
  {
    title: "Doctor",
    description:
      "User-friendly websites, patient portals, and digital solutions that improve communication and patient experience.",
    image: assets.industryDoctor,
    alt: "Doctor examining a patient's knee in a clinic",
    fade: "61 97 94",
  },
  {
    title: "Plumbers",
    description:
      "Reliable websites, online booking, and digital tools that help plumbers attract customers and schedule more jobs.",
    image: assets.industryPlumbers,
    alt: "Plumber fitting copper pipes with tools laid out on the floor",
    fade: "134 69 33",
  },
];

const phases = [
  {
    phase: "PHASE 1",
    name: "Practice Launch",
    price: "$950-$2950",
    description: "Build your legal brand and establish a trusted and reliable online presence.",
    row: "Brand Identity",
    card: "bg-[#ebe4dc] text-ink",
    label: "text-[#c7776b]",
    pill: "bg-[#c7776b] text-[#ebe4dc]",
    rule: "border-white/50",
  },
  {
    phase: "PHASE 2",
    name: "Client Management Platform",
    price: "$2975 – $6700",
    description: "Improve client communication and create a modern legal experience.",
    row: "Client Experience",
    card: "bg-[#64513a] text-white",
    label: "text-[#e4af68]",
    pill: "bg-[#e4af68] text-ink",
    rule: "border-white/50",
  },
  {
    phase: "PHASE 3",
    name: "Smart Legal Practice Management",
    price: "$6800-$19500",
    description:
      "Everything in Phase 1 & 2 plus transform your firm with a complete legal management system.",
    row: "Practice Management",
    card: "bg-[#3d4b43] text-white",
    label: "text-[#b5bfaa]",
    pill: "bg-[#b5bfaa] text-ink",
    rule: "border-white/50",
  },
];

export function Industries() {
  return (
    <section aria-labelledby="industries-heading" className="overflow-hidden bg-[#d0d0c8] pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-[59px] lg:pb-[60px]">
      <IndustryCarousel
        cards={industries}
        heading={
          <>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[18px]">
              <span className="h-[3px] w-[22px] shrink-0 -translate-y-0.5 bg-brand" aria-hidden="true" />
              Industry We Serve
            </p>
            <h2
              id="industries-heading"
              className="mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-black lg:text-[clamp(34px,2.71vw,52px)]"
            >
              Digital Solutions for
              <br />
              <span className="text-brand">Every Industry</span>
            </h2>
          </>
        }
        intro={
          <p className="text-[18px] leading-[1.45] text-ink max-w-[28em] max-[1599px]:text-pretty lg:pt-[5px] lg:text-[clamp(17px,1.146vw,22px)]">
            We recognize that each business is unique. Our team creates digital solutions tailored
            to your industry&apos;s needs.
          </p>
        }
        action={
          <ButtonLink href="#" variant="outline" className="h-[52px] px-4 text-[18px] sm:px-6 lg:text-[20px]">
            View All Industries
          </ButtonLink>
        }
      />

      <div className="mx-auto mt-[27px] w-full max-w-[1600px] px-5 md:px-8 xl:px-5">
        <hr className="border-0 border-t border-[#adada6]" />

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase) => (
            <li key={phase.phase} className={`flex flex-col items-start rounded-2xl px-5 pt-4 pb-6 sm:px-[30px] lg:px-[clamp(20px,1.5625vw,30px)] ${phase.card}`}>
              <p className={`text-[28px] leading-[1.25] font-semibold lg:text-[clamp(24px,1.667vw,32px)] ${phase.label}`}>
                {phase.phase}
              </p>
              <h3 className="mt-[11px] text-[18px] leading-[1.25] font-bold lg:text-[20px]">
                {phase.name}
              </h3>
              <p
                className={`mt-5 inline-block rounded-lg px-[13px] py-[6px] text-[26px] leading-10 font-bold whitespace-nowrap sm:text-[28px] lg:text-[clamp(24px,1.667vw,32px)] ${phase.pill}`}
              >
                {phase.price}
              </p>
              <p className="mt-[21px] text-[17px] leading-[26px] lg:text-[18px]">
                {phase.description}
              </p>
              <div
                className={`mt-auto flex w-full items-center justify-between border-b pt-[30px] pb-[15px] text-[16px] leading-5 font-medium ${phase.rule}`}
              >
                {phase.row}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="m5.75 8 5.25 5 5.25-5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
