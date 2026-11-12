import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { FinalCta } from "@/components/home/FinalCta";
import { PinnedSection } from "@/components/home/PinnedSection";
import { IndustriesTrust } from "@/components/industries/IndustriesTrust";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { RecentProjects } from "@/components/service-details/RecentProjects";
import { OurProcess } from "@/components/services/OurProcess";
import { recentProjects } from "@/lib/content/service-details";

export const metadata: Metadata = {
  title: "Our Portfolio | Way-Wise Tech",
  description:
    "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
};

/*
  The Our Portfolio page, at the Navbar's "Our Work" item. The Hero and Client Logo strip (from
  "our protfolio.png") form one combined section. Then shared sections, reused exactly with their
  existing data and animations: Recent Projects (the shared `recentProjects`), the Industries trust
  section, Our Process and Final CTA, then the Footer. The section planned between the Hero and
  Recent Projects is still being designed and is skipped for now. The testimonial stack
  (PortfolioTestimonials) is on hold by the owner's decision and is not on the page.
*/
export default function OurPortfolioPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        {/* Hero + Client Logo strip, one combined section, pinned as one unit. */}
        <PinnedSection>
          <PortfolioHero />
          <ClientLogos />
        </PinnedSection>
        <PinnedSection>
          <RecentProjects {...recentProjects} />
        </PinnedSection>
        {/*
          As on the Industries page: held for an extra 70svh so its stats finish rolling. Capped at
          Our Process's height: on tall screens the held section is a full screen tall (1440px at
          2560x1440) against Our Process's 1080px, which left 360px of scrolling at the page end.
          Our Process's heading id also exists on other pages that stay mounted once visited, so the
          selector only matches inside a main that also holds the Industries trust section, i.e.
          this page.
        */}
        <PinnedSection
          hold="70svh"
          limitCoverTo='main:has([aria-labelledby="industries-trust-heading"]) [aria-labelledby="our-process-heading"]'
        >
          <IndustriesTrust />
        </PinnedSection>
        {/* Held while Final CTA rises over it. */}
        <PinnedSection>
          <OurProcess />
        </PinnedSection>
        {/*
          As on /services and the Service Details pages: held while the Footer rises over it, with no
          cap. The Footer is at least one screen tall when motion is allowed, so the pin never
          outlasts it.
        */}
        <PinnedSection>
          <FinalCta />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
