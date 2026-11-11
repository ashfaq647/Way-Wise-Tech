import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { FinalCta } from "@/components/home/FinalCta";
import { Industries } from "@/components/home/Industries";
import { PinnedSection } from "@/components/home/PinnedSection";
import { Services } from "@/components/home/Services";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Faq } from "@/components/services/Faq";
import { OurProcess } from "@/components/services/OurProcess";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Services | Way-Wise Tech",
  description:
    "We help businesses design, build, and grow with modern technology. Explore our services and find the right solution for your business.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader showBanner={false} />
      <main>
        {/* Hero + Client Logo strip standard: one combined section, pinned as one unit. */}
        <PinnedSection>
          <ServicesHero />
          <ClientLogos />
        </PinnedSection>
        <PinnedSection>
          <Services />
        </PinnedSection>
        <PinnedSection>
          <OurProcess />
        </PinnedSection>
        <PinnedSection>
          <Industries />
        </PinnedSection>
        <PinnedSection>
          <Faq />
        </PinnedSection>
        <PinnedSection>
          <FinalCta />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
