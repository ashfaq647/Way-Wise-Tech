import type { Metadata } from "next";
import { FaqHero } from "@/components/faq/FaqHero";
import { FaqQuestions } from "@/components/faq/FaqQuestions";
import { PinnedSection } from "@/components/home/PinnedSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { faqHero } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "FAQ | Way-Wise Tech",
  description: faqHero.description,
};

/*
  The FAQ page, built one section at a time. So far: the combined Hero + Client Logo strip (one
  section, FaqHero), the questions section, then the shared Footer.
*/
export default function FaqPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        {/*
          The whole Hero + logos section holds while the questions section rises over it, capped at
          that section's height: on wide screens it can be shorter than this pin (1080px against
          about 1208px at 2560). Only one FAQ page is ever mounted, so the selector finds the visible
          section.
        */}
        <PinnedSection limitCoverTo="#faq-questions">
          <FaqHero />
        </PinnedSection>
        {/*
          The questions section holds while the shared Footer rises over it. No limitCoverTo, as on
          /contact and /services: the Footer is at least one screen tall when motion is allowed, so
          this pin never outlasts it. The hold is the FAQ timeline's (FaqQuestions.tsx measures it
          and sets --wf-hold on this wrapper): the section stays fully in view, pinned, while the
          timeline line runs down the rest of the list, and only then does the Footer rise. 0px
          below md and with reduced motion.
        */}
        <PinnedSection hold="var(--wf-hold, 0px)">
          <FaqQuestions />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
