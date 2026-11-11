import type { Metadata } from "next";
import { PinnedSection } from "@/components/home/PinnedSection";
import { InsightsArticles } from "@/components/insights/InsightsArticles";
import { InsightsHero } from "@/components/insights/InsightsHero";
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
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        {/*
          The whole Hero + logos section holds while the article grid rises over it. No limitCoverTo:
          the grid is taller than the Hero unit at every width, so the pin cannot outlast it.
        */}
        <PinnedSection>
          <InsightsHero />
        </PinnedSection>
        {/*
          The article grid is the last built section, so under the last-section rule it is not pinned
          yet. When the next section is added, wrap it in PinnedSection and put the new section in
          this relative wrapper.
        */}
        <div className="relative">
          <InsightsArticles />
        </div>
      </main>
    </>
  );
}
