import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { PinnedSection } from "@/components/home/PinnedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { ContactOverview } from "@/components/contact/ContactOverview";
import { Footer } from "@/components/layout/Footer";
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
      {/* The shared floating Homepage Navbar. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/*
          Hero + Client Logo strip standard: one combined section, pinned as one unit, held while
          Client Overview rises over both.
        */}
        <PinnedSection>
          <ContactHero />
          {/* The Homepage's 100px strip: Hero (842) + strip fill the 1920x942 frame. */}
          <ClientLogos height="compact" />
        </PinnedSection>
        {/*
          Held while "Have a Project Idea?" rises over it, capped at that section's height (it can be
          shorter than this one's pin: 802px against 842px at 1440x900). The cap was needed while
          that section ended the page; with sections after it, it only shortens the hold slightly.
          Since its 942 frame fit (2026-11-17) it first rests fully in view for 30svh.
          Only one Contact page is ever mounted, so the selector finds the visible section.
        */}
        <PinnedSection limitCoverTo='[aria-labelledby="contact-locations-heading"]' hold="30svh">
          <ContactOverview />
        </PinnedSection>
        {/*
          Held while the form and offices section rises over it, capped at that section's height. The
          cap was needed while that section ended the page (1080px against 1431px at 2560x1440); with
          sections after it, it only shortens the hold on wide screens.
        */}
        {/* A 942 frame since 2026-11-17: it rests fully in view for 30svh before the form section rises. */}
        <PinnedSection limitCoverTo="#contact-form" hold="30svh">
          <ContactLocations />
        </PinnedSection>
        {/* Held while the FAQ rises over it; a 942 frame since 2026-11-17, so it first rests for 30svh. */}
        <PinnedSection hold="30svh">
          <ContactForm />
        </PinnedSection>
        {/*
          Held while the shared Footer rises over it. The shared Footer (942px at 1920) can be shorter
          than this pin on tall screens, so the pin is capped at this page's Footer, as on /services,
          /about and /faq.
        */}
        <PinnedSection limitCoverTo="main:has(#contact-form) + footer" hold="30svh">
          <Faq />
        </PinnedSection>
      </main>
      {/* The shared Footer (Final CTA + footer), as on the Homepage. */}
      <Footer />
    </>
  );
}
