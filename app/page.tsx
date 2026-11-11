import { ClientLogos } from "@/components/home/ClientLogos";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { OurWork } from "@/components/home/OurWork";
import { PinnedSection } from "@/components/home/PinnedSection";
import { Services } from "@/components/home/Services";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/*
          Hero + Client Logo strip standard: the strip is attached beneath the Hero and both pin as
          one unit, so Services rises over the whole combined section.
        */}
        <PinnedSection>
          <Hero />
          <ClientLogos />
        </PinnedSection>
        {/* Each section after this is positioned, so it paints over the pinned section above it. */}
        <PinnedSection>
          <Services />
        </PinnedSection>
        <PinnedSection>
          <Industries />
        </PinnedSection>
        <div className="relative">
          <OurWork />
        </div>
        <PinnedSection limitCoverTo="footer">
          <FinalCta />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
