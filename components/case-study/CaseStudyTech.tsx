import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { caseStudyTech } from "@/lib/content/case-study";

/*
  Every size is the design's 1920 value times --u, as in the other Case Study sections: 1px at 1920,
  scaling with the width from xl down to 1280, and fixed below. Fonts keep minimums.
*/
const unit = "[--u:0.8px] md:[--u:0.9px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

/**
 * "Technologies We Used" on the Case Study page, from Frame 2147239147.png. At 1920: a 1080px
 * section on #d0d0c8, the heading on the left and the description on the right, then 375x198 white
 * cards (15px radius) 20px apart, four across. Each card centres a brand logo in a 53px band, the
 * technology (18px medium navy) and its role (16px ink-muted). Twelve technologies (the reference's
 * repeated Rank Math cards replaced by React and Next.js, by the owner's decision), so the grid is a
 * full 4 x 3 from lg. Below lg the header stacks and the cards show two across.
 */
export function CaseStudyTech() {
  const { eyebrow, heading, description, items } = caseStudyTech;

  return (
    <section id="case-study-tech" aria-labelledby="case-study-tech-heading" className={`bg-[#d0d0c8] ${unit}`}>
      <Container className="py-12 md:py-16 lg:pt-[calc(var(--u)*97)] lg:pb-[calc(var(--u)*101)]">
        <Reveal
          each
          className="grid gap-6 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:items-end lg:gap-0"
        >
          <div className="min-w-0">
            <SectionEyebrow size="lg" weight="bold" tracking="0.078em" className="ww-rise">
              {eyebrow}
            </SectionEyebrow>
            <h2
              id="case-study-tech-heading"
              className="mt-2 text-[clamp(30px,8.4vw,56px)] leading-[1.09] font-semibold tracking-[-0.007em] text-navy lg:mt-[calc(var(--u)*14)] lg:text-[max(40px,calc(var(--u)*64))]"
            >
              <MaskLine order={1}>{heading.first} </MaskLine>
              <MaskLine order={2} className="text-brand">
                {heading.second}
              </MaskLine>
            </h2>
          </div>
          <p
            style={revealOrder(3)}
            className="ww-rise max-w-[30em] text-[18px] leading-[1.45] text-navy lg:-mb-[calc(var(--u)*15)] lg:max-w-[calc(var(--u)*560)] lg:text-[max(16px,calc(var(--u)*24))] lg:leading-[1.3333]"
          >
            {description}
          </p>
        </Reveal>

        <Reveal
          each
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-[calc(var(--u)*75)] lg:grid-cols-4 lg:gap-[calc(var(--u)*20)]"
        >
          {items.map((item, index) => (
            <article
              key={item.name}
              style={revealOrder(index)}
              className="ww-rise flex flex-col items-center justify-center rounded-[calc(var(--u)*15)] bg-white px-3 py-7 text-center lg:h-[calc(var(--u)*198)] lg:p-0"
            >
              {/* A fixed band, so every name lines up whatever the logo's shape. */}
              <div className="relative flex h-[calc(var(--u)*53)] w-full items-center justify-center">
                {/* Never wider than the card. */}
                <div
                  className={`relative max-w-full shrink-0 ${item.frame ? "overflow-hidden" : ""}`}
                  style={{
                    width: `calc(var(--u) * ${item.size[0]})`,
                    aspectRatio: `${item.size[0]} / ${item.size[1]}`,
                  }}
                >
                  {item.frame ? (
                    /*
                      CSS framing of the unedited file: the whole logo is scaled so its framed part
                      fills this box, and the box clips the rest.
                    */
                    <div
                      className="absolute"
                      style={{
                        left: `${(-item.frame.x / item.frame.w) * 100}%`,
                        top: `${(-item.frame.y / item.frame.h) * 100}%`,
                        width: `${100 / item.frame.w}%`,
                        height: `${100 / item.frame.h}%`,
                      }}
                    >
                      {/* Decorative: the technology's name follows. */}
                      <AssetImage src={item.logo} alt="" sizes="210px" className="object-fill" />
                    </div>
                  ) : (
                    <AssetImage src={item.logo} alt="" sizes="210px" className="object-contain" />
                  )}
                </div>
              </div>
              <h3 className="mt-[calc(var(--u)*15)] text-[max(16px,calc(var(--u)*18))] leading-[1.2] font-medium tracking-[-0.025em] text-navy">
                {item.name}
              </h3>
              <p className="mt-[calc(var(--u)*5)] text-[max(14px,calc(var(--u)*16))] leading-[1.375] text-ink-muted">
                {item.role}
              </p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
