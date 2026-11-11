import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutPresence } from "@/components/about/AboutPresence";
import { AboutStory } from "@/components/about/AboutStory";
import { FinalCta } from "@/components/home/FinalCta";
import { PinnedSection } from "@/components/home/PinnedSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OurProcess } from "@/components/services/OurProcess";
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
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
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
          (it can be shorter than this pin on some screens).
        */}
        <PinnedSection limitCoverTo="#about-leadership">
          <AboutStory />
        </PinnedSection>
        {/*
          The leadership section (frozen, reused unchanged) holds while Our Global Presence rises over
          it. The cap at Our Global Presence's height was needed while that section ended the page;
          with sections after it, it only shortens the hold on some screens.
        */}
        <PinnedSection limitCoverTo="#about-presence">
          <AboutLeadership />
        </PinnedSection>
        {/* Our Global Presence (frozen, reused unchanged) holds while Our Process rises over it. */}
        <PinnedSection>
          <AboutPresence />
        </PinnedSection>
        {/* The shared /services section, reused exactly as it is. Holds while Final CTA rises over it. */}
        <PinnedSection>
          <OurProcess />
        </PinnedSection>
        {/*
          The shared Final CTA, reused exactly as it is. Holds while the Footer rises over it. No
          limitCoverTo, as on /services: the Footer is at least one screen tall when motion is
          allowed, so this pin never outlasts it.
        */}
        <PinnedSection>
          <FinalCta />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
