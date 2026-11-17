import type { Metadata } from "next";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Industries } from "@/components/home/Industries";
import { PinnedSection } from "@/components/home/PinnedSection";
import { Services } from "@/components/home/Services";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Faq } from "@/components/services/Faq";
import { OurProcess } from "@/components/services/OurProcess";
import { ServicesHero } from "@/components/services/ServicesHero";
import { homeIndustryCards, servicesPageCards } from "@/lib/content/home";
import { servicesSection } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services | Way-Wise Tech",
  description:
    "We help businesses design, build, and grow with modern technology. Explore our services and find the right solution for your business.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Global rule (owner, 2026-11-16): the same shared Navbar and Footer as the Homepage. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main>
        {/* Hero + Client Logo strip standard: one combined section, pinned as one unit. */}
        <PinnedSection>
          <ServicesHero />
          <ClientLogos />
        </PinnedSection>
        {/*
          The hold keeps Services still, fully revealed, for 30svh of scrolling before Our Process starts
          to rise. Without it the hand-off began at the exact scroll position where the third row
          finished revealing, so with ~100px wheel steps Our Process was already sliding in (9px at
          1920x942) before Services had come to rest. Same fix as the Homepage sections.
        */}
        <PinnedSection hold="30svh">
          {/* All eight services in the compact layout (Section.png, 2026-11-16): two rows fill the 942 frame,
              the third row follows in normal scrolling. The header button leads to /contact. */}
          <Services variant="compact" services={servicesPageCards} action={servicesSection.pageAction} />
        </PinnedSection>
        {/* Hold as for Services: Our Process rests in its 942 frame before Industries rises. */}
        <PinnedSection hold="30svh">
          {/* 2026-11-16 redesign (Frame 2147238780.png): the 942 frame. Other pages keep the default. */}
          <OurProcess />
        </PinnedSection>
        {/*
          The Homepage Industries section exactly (owner, 2026-11-16): same variant and cards, so the two
          are identical. Hold as above, so FAQ does not peek into its 942 frame.
        */}
        <PinnedSection hold="30svh">
          <Industries variant="compact" cards={homeIndustryCards} />
        </PinnedSection>
        {/* Capped at this page's Footer (942px at 1920), so the FAQ pin never adds empty scrolling past it. */}
        <PinnedSection limitCoverTo="main:has(#services-hero) + footer" hold="30svh">
          {/* The 1920x942 frame (frame adjustment only, 2026-11-16). Other pages keep the default. */}
          <Faq />
        </PinnedSection>
      </main>
      {/* The shared combined Footer (Final CTA + footer) replaces FinalCta + SiteFooter. */}
      <Footer />
    </>
  );
}
