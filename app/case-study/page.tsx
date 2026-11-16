import type { Metadata } from "next";
import { CaseStudyChallenges } from "@/components/case-study/CaseStudyChallenges";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyOverview } from "@/components/case-study/CaseStudyOverview";
import { CaseStudyResults } from "@/components/case-study/CaseStudyResults";
import { CaseStudyTech } from "@/components/case-study/CaseStudyTech";
import { PinnedSection } from "@/components/home/PinnedSection";
import { PortfolioTestimonials } from "@/components/portfolio/PortfolioTestimonials";
import { Footer } from "@/components/layout/Footer";
import { RecentProjects } from "@/components/service-details/RecentProjects";
import { OurProcess } from "@/components/services/OurProcess";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { caseStudyHero } from "@/lib/content/case-study";
import { recentProjects } from "@/lib/content/service-details";

export const metadata: Metadata = {
  title: "Case Study | Way-Wise Tech",
  description: caseStudyHero.description,
};

/*
  The Case Study page, complete: the combined Hero + Client Logo strip (one section, CaseStudyHero),
  Client Overview, The Challenge & Our Solution, Technologies We Used, the trust section ("A Trusted
  Partner Across Industries"), then the shared Our Process and Recent Projects, and the Footer. Not
  linked from anywhere yet.
*/
export default function CaseStudyPage() {
  return (
    <>
      {/* Global rule (owner, 2026-11-16): the same shared Navbar and Footer as the Homepage. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/*
          The whole Hero + logos section holds while Client Overview rises over it. Capped at Client
          Overview's height: on wide screens that section (1080px) is shorter than the Hero unit
          (about 1208px at 2560), and the pin would otherwise leave empty scrolling at the page end.
          The id is unique to this route, so the lookup is safe with kept-mounted pages.
        */}
        <PinnedSection limitCoverTo="#case-study-overview">
          <CaseStudyHero />
        </PinnedSection>
        {/*
          Client Overview holds while the Challenge & Solution section rises over it. Capped at that
          section's height: it can be shorter than Client Overview (810 against 851px at 1440), and
          the pin would otherwise leave empty scrolling at the page end. The id is unique to this
          route, so the lookup is safe with kept-mounted pages.
        */}
        <PinnedSection limitCoverTo="#case-study-challenges">
          <CaseStudyOverview />
        </PinnedSection>
        {/*
          The Challenge & Our Solution (approved; the component is unchanged) holds while Technologies
          We Used rises over it. Capped at that section's height in case it is the shorter one, so the
          pin never leaves empty scrolling at the page end; the id is unique to this route.
        */}
        <PinnedSection limitCoverTo="#case-study-tech">
          <CaseStudyChallenges />
        </PinnedSection>
        {/*
          Technologies We Used (approved grid; the component is unchanged) holds while the trust
          section rises over it, capped at that section's height so the pin never leaves empty
          scrolling at the page end; the id is unique to this route.
        */}
        <PinnedSection limitCoverTo="#case-study-results">
          <CaseStudyTech />
        </PinnedSection>
        {/*
          The trust section (approved; the component is unchanged) holds while Our Process rises over
          it. From here on the page ends as the Service Details pages do: the shared Our Process and
          Recent Projects, reused exactly, then the shared Footer.
        */}
        <PinnedSection>
          <CaseStudyResults />
        </PinnedSection>
        <PinnedSection>
          <OurProcess />
        </PinnedSection>
        {/* 30svh holds here and below: each section rests in its 942 frame before the next rises. */}
        <PinnedSection hold="30svh">
          <RecentProjects {...recentProjects} />
        </PinnedSection>
        {/*
          The testimonial carousel from /our-work, reused exactly (owner, 2026-11-16), as the last
          section before the shared Footer. Capped at this page's Footer, so the pin never adds
          empty scrolling past it.
        */}
        <PinnedSection limitCoverTo="main:has(#case-study-overview) + footer" hold="30svh">
          <PortfolioTestimonials />
        </PinnedSection>
      </main>
      {/* The shared combined Footer (Final CTA + footer) replaces SiteFooter. */}
      <Footer />
    </>
  );
}
