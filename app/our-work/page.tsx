import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PinnedSection } from "@/components/home/PinnedSection";
import { IndustriesTrust } from "@/components/industries/IndustriesTrust";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioShowcase } from "@/components/portfolio/PortfolioShowcase";
import { PortfolioTestimonials } from "@/components/portfolio/PortfolioTestimonials";
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
  "our protfolio.png") form one combined section. Then the project showcase (PortfolioShowcase, from
  Frame 2147239009.png), then shared sections, reused exactly with their existing data and
  animations: Recent Projects (the shared `recentProjects`), the Industries trust section, Our
  Process, then the testimonial carousel (PortfolioTestimonials, redesigned 2026-11-15), then Final CTA
  and the Footer.
*/
export default function OurPortfolioPage() {
  return (
    <>
      {/* The shared floating Homepage Navbar. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/* Hero + Client Logo strip, one combined section, pinned as one unit. */}
        <PinnedSection>
          <PortfolioHero />
          {/* The Homepage's 100px strip: Hero (842) + strip fill the 1920x942 frame. */}
          <ClientLogos height="compact" />
        </PinnedSection>
        {/* Held while Recent Projects rises over it, like every other section here. */}
        {/* A 942 frame since 2026-11-17 (82 / 68px padding): it rests in view for 30svh before Recent Projects rises. */}
        <PinnedSection hold="30svh">
          <PortfolioShowcase />
        </PinnedSection>
        {/* A 942 frame since 2026-11-17: it rests in view for 30svh before the trust section rises. */}
        <PinnedSection hold="30svh">
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
        {/* Held while the testimonials rise over it; since the shared 942 frame (2026-11-17) it first rests for 30svh. */}
        <PinnedSection hold="30svh">
          <OurProcess />
        </PinnedSection>
        {/*
          The testimonial carousel, held while the shared Footer rises over it. As on /case-study it first
          rests fully in view for 30svh (it is shorter than the frame, 873px at 1920). Capped
          at this page's Footer (942px at 1920, shorter than this pin on tall screens), as on /faq,
          /contact and /insights.
        */}
        <PinnedSection limitCoverTo="main:has(#portfolio-showcase) + footer" hold="30svh">
          <PortfolioTestimonials />
        </PinnedSection>
      </main>
      {/* The shared Footer (Final CTA + footer), as on the Homepage. */}
      <Footer />
    </>
  );
}
