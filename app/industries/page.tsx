import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { FinalCta } from "@/components/home/FinalCta";
import { PinnedSection } from "@/components/home/PinnedSection";
import { IndustriesAtAGlance } from "@/components/industries/IndustriesAtAGlance";
import { IndustriesHero } from "@/components/industries/IndustriesHero";
import { IndustriesSolutions } from "@/components/industries/IndustriesSolutions";
import { IndustriesTrust } from "@/components/industries/IndustriesTrust";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Industries | Way-Wise Tech",
  description:
    "We create modern and user-friendly designs for different types of businesses. No matter your industry, we design digital experiences that fit your goals and help you grow.",
};

/*
  The Industries page. Built so far: Hero, Client Logo strip, Industries at a Glance, the trust
  section and Industry Solutions, then the shared Final CTA and Footer. As on the Homepage,
  the Hero holds while Client Logos rises over it.
*/
export default function IndustriesPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        <PinnedSection>
          <IndustriesHero />
        </PinnedSection>
        {/* Positioned so they paint over the pinned Hero. */}
        <div className="relative">
          <ClientLogos />
        </div>
        {/* Held while the trust section rises over it, as Services is on the Homepage. */}
        <PinnedSection>
          <IndustriesAtAGlance />
        </PinnedSection>
        {/*
          Held while Industry Solutions rises over it, after an extra 70svh of scrolling with the
          section fully visible, so the stats have time to roll.
        */}
        <PinnedSection hold="70svh">
          <IndustriesTrust />
        </PinnedSection>
        {/*
          Positioned so it paints over the pinned section above. Like the Homepage Our Work it is
          not pinned: its cards stay stacked while Final CTA rises over them.
        */}
        <div className="relative">
          <IndustriesSolutions />
        </div>
        {/* The Homepage section, reused exactly as it is, pinned as on the other pages. */}
        <PinnedSection>
          <FinalCta />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
