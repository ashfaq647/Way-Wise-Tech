import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";

export const metadata: Metadata = {
  title: "Our Portfolio | Way-Wise Tech",
  description:
    "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
};

/*
  The Our Portfolio page, at the Navbar's "Our Work" item. Built from "our protfolio.png", which shows
  the Hero and the Client Logo strip only; further sections wait for their references. The Hero and
  Client Logo strip form one combined section (the project-wide standard). It ends the page for now,
  so under the last-section rule it is not pinned; once the next section is added, wrap the combined
  section in one PinnedSection and put the new section in the relative wrapper.
*/
export default function OurPortfolioPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        {/* Hero + Client Logo strip, one combined section. Not pinned: it is the last section so far. */}
        <div className="relative">
          <PortfolioHero />
          <ClientLogos />
        </div>
      </main>
    </>
  );
}
