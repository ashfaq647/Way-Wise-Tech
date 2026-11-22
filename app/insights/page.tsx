import type { Metadata } from "next";
import { PinnedSection } from "@/components/motion/PinnedSection";
import { InsightsArticles } from "@/components/insights/InsightsArticles";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { insightsHero } from "@/lib/content/insights";

export const metadata: Metadata = {
  title: "Insights | Way-Wise Tech",
  description: insightsHero.description,
};

/*
  The Insights page (the Blog List design), built one section at a time. So far: the combined Hero +
  Client Logo strip (one section, InsightsHero), then the article grid. Reached from the Navbar's
  Company → Insights link and the Footer.
*/
export default function InsightsPage() {
  return (
    <>
      {/* The shared floating Homepage Navbar. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/*
          The whole Hero + logos section holds while the article grid rises over it. No limitCoverTo:
          the grid is taller than the Hero unit at every width, so the pin cannot outlast it.
        */}
        <PinnedSection>
          <InsightsHero />
        </PinnedSection>
        {/*
          The article grid holds while the shared Footer rises over it, capped at this page's Footer
          (942px at 1920, shorter than this pin on tall screens), as on /faq and /contact.
        */}
        <PinnedSection limitCoverTo="main:has(#insights-articles) + footer">
          <InsightsArticles />
        </PinnedSection>
      </main>
      {/* The shared Footer (Final CTA + footer), as on the Homepage. */}
      <Footer />
    </>
  );
}
