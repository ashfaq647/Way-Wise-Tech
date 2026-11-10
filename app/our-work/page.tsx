import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PinnedSection } from "@/components/home/PinnedSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";

export const metadata: Metadata = {
  title: "Our Portfolio | Way-Wise Tech",
  description:
    "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
};

/*
  The Our Portfolio page, at the Navbar's "Our Work" item. Built from "our protfolio.png", which shows
  the Hero and the Client Logo strip only; further sections wait for their references. As on the
  other pages, the Hero holds while Client Logos rises over it.
*/
export default function OurPortfolioPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        <PinnedSection>
          <PortfolioHero />
        </PinnedSection>
        {/* Positioned so it paints over the pinned Hero. Not pinned: it is the last section so far. */}
        <div className="relative">
          <ClientLogos />
        </div>
      </main>
    </>
  );
}
