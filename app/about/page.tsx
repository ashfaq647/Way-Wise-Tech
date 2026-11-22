import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutPresence } from "@/components/about/AboutPresence";
import { AboutStory } from "@/components/about/AboutStory";
import { PinnedSection } from "@/components/motion/PinnedSection";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OurProcess } from "@/components/sections/our-process/OurProcess";
import { aboutHero } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About Us | Way-Wise Tech",
  description: aboutHero.description,
};

/*
  The About Us page: the combined Hero + Client Logo strip (one section, AboutHero), Our Story, the
  leadership messages with the stats bar and Our Global Presence, then the shared Our Process and
  Final CTA, reused unchanged, and the shared Footer. Each section holds while the next rises over
  it, ending with the Footer, as on /services and the Service Details pages.
*/
export default function AboutPage() {
  return (
    <>
      {/* Global rule (owner, 2026-11-16): the same shared Navbar and Footer as the Homepage. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/*
          The whole Hero + logos section holds while Our Story rises over it, capped at Our Story's
          height: on wide screens Our Story is shorter than this pin (1080px against about 1208px at
          2560x1440). Only one About page is ever mounted, so the selectors find the visible section.
        */}
        <PinnedSection limitCoverTo='[aria-labelledby="about-story-heading"]'>
          <AboutHero />
        </PinnedSection>
        {/*
          Our Story holds while the leadership section rises over it, capped at that section's height
          (it can be shorter than this pin on some screens). Since the 942 frame fit (2026-11-17) it
          rests fully in view for 30svh before that section rises, as the Homepage sections do.
        */}
        <PinnedSection limitCoverTo="#about-leadership" hold="30svh">
          <AboutStory />
        </PinnedSection>
        {/*
          The leadership section (frozen, reused unchanged) holds while Our Global Presence rises over
          it. The cap at Our Global Presence's height was needed while that section ended the page;
          with sections after it, it only shortens the hold on some screens. Since its 942 frame fit
          (2026-11-17) it rests fully in view for 30svh before Our Global Presence rises.
        */}
        <PinnedSection limitCoverTo="#about-presence" hold="30svh">
          <AboutLeadership />
        </PinnedSection>
        {/*
          Our Global Presence holds while Our Process rises over it. Since its 942 frame fit
          (2026-11-17) it first rests fully in view for 30svh, as the sections above do.
        */}
        <PinnedSection hold="30svh">
          <AboutPresence />
        </PinnedSection>
        {/*
          The shared /services section, reused exactly as it is: the last section, held while the shared
          Footer rises over it, capped at this page's Footer so the pin never adds empty scrolling.
          Since 2026-11-17 (Frame 2147239038.png, 1920x942) it uses the existing compact 942-frame
          layout from /services, and rests fully in view for 30svh before the Footer rises.
        */}
        <PinnedSection limitCoverTo="main:has(#about-presence) + footer" hold="var(--op-hold, 30svh)">
          <OurProcess />
        </PinnedSection>
      </main>
      {/* The shared combined Footer (Final CTA + footer) replaces FinalCta + SiteFooter. */}
      <Footer />
    </>
  );
}
