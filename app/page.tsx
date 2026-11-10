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
        <PinnedSection>
          <Hero />
        </PinnedSection>
        {/* Positioned so each paints over the pinned section above it. Client Logos never pins. */}
        <div className="relative">
          <ClientLogos />
        </div>
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
