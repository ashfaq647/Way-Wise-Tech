import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PinnedSection } from "@/components/home/PinnedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { ContactOverview } from "@/components/contact/ContactOverview";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Faq } from "@/components/services/Faq";

export const metadata: Metadata = {
  title: "Contact Us | Way-Wise Tech",
  description:
    "Have a project idea or need expert advice? Our team is here to help. Get in touch and let's build something amazing together.",
};

/*
  The Contact Us page, at the Navbar's "Contact" item. Sections: the Hero, the Client Logo strip,
  Client Overview, the world map ("Have a Project Idea?"), the form with the offices ("Send Us a
  Message" and "Our Offices"), then the shared FAQ and Footer, reused unchanged as on /services and
  the Details pages. Each section holds while the next rises over it, ending with the Footer.
*/
export default function ContactPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        <PinnedSection>
          <ContactHero />
        </PinnedSection>
        {/* Held while Client Overview rises over it, as on /services and the Details pages. */}
        <PinnedSection>
          <ClientLogos />
        </PinnedSection>
        {/*
          Held while "Have a Project Idea?" rises over it, capped at that section's height (it can be
          shorter than this one's pin: 802px against 842px at 1440x900). The cap was needed while
          that section ended the page; with sections after it, it only shortens the hold slightly.
          Only one Contact page is ever mounted, so the selector finds the visible section.
        */}
        <PinnedSection limitCoverTo='[aria-labelledby="contact-locations-heading"]'>
          <ContactOverview />
        </PinnedSection>
        {/*
          Held while the form and offices section rises over it, capped at that section's height. The
          cap was needed while that section ended the page (1080px against 1431px at 2560x1440); with
          sections after it, it only shortens the hold on wide screens.
        */}
        <PinnedSection limitCoverTo="#contact-form">
          <ContactLocations />
        </PinnedSection>
        {/* Held while the FAQ rises over it. */}
        <PinnedSection>
          <ContactForm />
        </PinnedSection>
        {/*
          Held while the Footer rises over it. No limitCoverTo, as on /services: the Footer is at least
          one screen tall when motion is allowed, so this pin never outlasts it.
        */}
        <PinnedSection>
          <Faq />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
