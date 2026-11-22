import { ClientLogos } from "@/components/sections/ClientLogos";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/sections/industries/Industries";
import { MissionVision } from "@/components/home/MissionVision";
import { OurWork } from "@/components/home/OurWork";
import { PinnedSection } from "@/components/motion/PinnedSection";
import { Services } from "@/components/sections/Services";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { homeIndustryCards, homeServiceCards } from "@/lib/content/home";

export default function Home() {
  return (
    <>
      {/* Homepage redesign (2026-11-16): no red banner; the floating bar overlays the Hero. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/*
          Hero + Client Logo strip standard: the strip is attached beneath the Hero and both pin as
          one unit, so Services rises over the whole combined section.
        */}
        <PinnedSection>
          <Hero />
          {/* 100px strip: Hero (842) + strip fill the redesign's 1920x942 frame exactly. */}
          <ClientLogos height="compact" />
        </PinnedSection>
        {/* Each section after this is positioned, so it paints over the pinned section above it. */}
        {/*
          The hold keeps Services pinned and fully in view for 30svh of scrolling before Industries
          starts to rise. Without it, Services would cover the screen at exactly one scroll position
          (942 at 1920x942) and Industries would rise from the next pixel on, so with ~100px wheel
          steps it always peeked in at the bottom (58px at y 1000). The Hero has its rest at the top
          of the page; this gives Services one too.
        */}
        <PinnedSection hold="30svh">
          {/* 2026-11-16 redesign: one 1920x942 frame, Homepage-only card copy. */}
          <Services variant="compact" services={homeServiceCards} />
        </PinnedSection>
        {/* Same 30svh hold as Services, so Industries does not peek into its 1920x942 frame. */}
        <PinnedSection hold="30svh">
          <MissionVision />
        </PinnedSection>
        {/* 2026-11-16 redesign (three cards in view, no Phase cards); hold as above, for Our Work. */}
        <PinnedSection hold="30svh">
          <Industries variant="compact" cards={homeIndustryCards} />
        </PinnedSection>
        <div className="relative">
          <OurWork />
        </div>
      </main>
      {/*
        2026-11-16 redesign: the Final CTA and the footer as one section (Homepage only). It ends the
        page, so it is not pinned; it is positioned, so it rises over the Our Work stack.
      */}
      <Footer />
    </>
  );
}
