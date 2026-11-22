import { ButtonLink } from "@/components/ui/ButtonLink";
import { industriesSection, industryCards, industryPhases } from "@/lib/content/industries";
import { IndustryCarousel } from "./IndustryCarousel";

const { eyebrow, heading, intro, action } = industriesSection;

// Colours for each pricing card, in the content's order: card background and text, the phase
// label, the price pill and the bottom rule. The phases' text comes from lib/content/industries.ts.
const phaseStyles = [
  {
    card: "bg-[#ebe4dc] text-ink",
    label: "text-[#c7776b]",
    pill: "bg-[#c7776b] text-[#ebe4dc]",
    rule: "border-white/50",
  },
  {
    card: "bg-[#64513a] text-white",
    label: "text-[#e4af68]",
    pill: "bg-[#e4af68] text-ink",
    rule: "border-white/50",
  },
  {
    card: "bg-[#3d4b43] text-white",
    label: "text-[#b5bfaa]",
    pill: "bg-[#b5bfaa] text-ink",
    rule: "border-white/50",
  },
];

const phases = industryPhases.map((phase, index) => ({ ...phase, ...phaseStyles[index] }));

/*
  Layout per variant. "default" holds the original strings (/services, with the Phase cards).
  "compact" is the 2026-11-16 Homepage redesign (reference 1920x942): no Phase cards, the eyebrow at
  y 87, a 53.5px heading with 63px lines, a narrower intro, and three 504x562 cards at y 295-857.
*/
const layouts = {
  default: {
    section:
      "overflow-hidden bg-[#d0d0c8] pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-[59px] lg:pb-[60px]",
    heading:
      "mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-black lg:text-[clamp(34px,2.71vw,52px)]",
    intro:
      "text-[18px] leading-[1.45] text-ink max-w-[28em] max-[1599px]:text-pretty lg:pt-[5px] lg:text-[clamp(17px,1.146vw,22px)]",
  },
  compact: {
    section:
      "overflow-hidden bg-[#d0d0c8] pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-[84px] lg:pb-[72.95px]",
    heading:
      "mt-1 text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] text-black lg:mt-[7px] lg:text-[clamp(34px,2.786vw,53.5px)] lg:leading-[1.178]",
    intro:
      "text-[18px] leading-[1.45] text-ink max-w-[28em] max-[1599px]:text-pretty lg:max-w-[25.5em] lg:pt-[7px] lg:text-[clamp(17px,1.146vw,22px)]",
  },
};

type IndustriesProps = {
  /** The carousel cards. Defaults to the shared `industryCards`. */
  cards?: typeof industryCards;
  /** "compact": the 2026-11-16 Homepage redesign (Homepage only). Default: the original design. */
  variant?: keyof typeof layouts;
};

export function Industries({ cards = industryCards, variant = "default" }: IndustriesProps) {
  const layout = layouts[variant];
  return (
    <section aria-labelledby="industries-heading" className={layout.section}>
      <IndustryCarousel
        cards={cards}
        variant={variant}
        heading={
          <>
            <p className="flex items-center gap-2 text-[16px] leading-5 font-semibold tracking-[0.078em] text-brand uppercase lg:text-[18px]">
              <span className="h-[3px] w-[22px] shrink-0 -translate-y-0.5 bg-brand" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="industries-heading" className={layout.heading}>
              {heading.first}
              <br />
              <span className="text-brand">{heading.accent}</span>
            </h2>
          </>
        }
        intro={<p className={layout.intro}>{intro}</p>}
        action={
          <ButtonLink href={action.href} variant="outline" className="h-[52px] px-4 text-[18px] sm:px-6 lg:text-[20px]">
            {action.label}
          </ButtonLink>
        }
      />

      {/* The Phase pricing cards belong to the original design only; the redesign removes them. */}
      {variant === "default" && (
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
      )}
    </section>
  );
}
