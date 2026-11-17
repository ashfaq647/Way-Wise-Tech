import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PinnedSection } from "@/components/home/PinnedSection";
import { IndustriesAtAGlance } from "@/components/industries/IndustriesAtAGlance";
import { IndustriesHero } from "@/components/industries/IndustriesHero";
import { IndustriesSolutions } from "@/components/industries/IndustriesSolutions";
import { IndustriesTrust } from "@/components/industries/IndustriesTrust";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Industries | Way-Wise Tech",
  description:
    "We create modern and user-friendly designs for different types of businesses. No matter your industry, we design digital experiences that fit your goals and help you grow.",
};

/*
  The Industries page. Built so far: Hero, Client Logo strip, Industries at a Glance, the trust
  section and Industry Solutions, then the shared Final CTA and Footer. The Hero and Client Logo
  strip form one combined section that holds while Industries at a Glance rises over it.
*/
export default function IndustriesPage() {
  return (
    <>
      {/* The shared Homepage Navbar (floating over the Hero), as on every redesigned page. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/*
          Hero + Client Logo strip standard: one combined section, pinned as one unit, so Industries
          at a Glance rises over both. The Homepage's 100px strip: Hero (842) + strip fill the
          1920x942 frame, as on the Homepage.
        */}
        <PinnedSection>
          <IndustriesHero />
          <ClientLogos height="compact" />
        </PinnedSection>
        {/* Held while the trust section rises over it, as Services is on the Homepage. */}
        {/* A 942 frame since 2026-11-17: it rests fully in view for 30svh before the trust section rises. */}
        <PinnedSection hold="30svh">
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
          not pinned: its cards stay stacked while the Footer rises over them.
        */}
        <div className="relative">
          <IndustriesSolutions />
        </div>
      </main>
      {/*
        The shared Footer (Final CTA + footer, as on the Homepage). It ends the page, so it is not
        pinned; it is positioned, so it rises over the Industry Solutions stack.
      */}
      <Footer />
    </>
  );
}
