import { ClientLogos } from "@/components/home/ClientLogos";
import { PinnedSection } from "@/components/home/PinnedSection";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Faq } from "@/components/services/Faq";
import { OurProcess } from "@/components/services/OurProcess";
import { recentProjects, type ServiceDetails } from "@/lib/content/service-details";
import { RecentProjects } from "./RecentProjects";
import { ServiceDetailsHero } from "./ServiceDetailsHero";
import { WhyChoose } from "./WhyChoose";
import { WhyChooseUs } from "./WhyChooseUs";

/*
  The Service Details layout, shared by every service page; the UI/UX & Product Design page is its
  master design. Hero, Why Choose and Why Choose Us take the service's content. Client Logos, Our
  Process, Recent Projects, FAQ and the Footer are the same on every page. As on /services, each
  section holds while the next rises over it, ending with the Footer.

  Global rule (owner, 2026-11-16): the same shared Navbar and Footer as the Homepage: the floating
  Navbar, and the combined Footer (Final CTA + footer), which replaces FinalCta + SiteFooter.
*/
export function ServiceDetailsPage({ service }: { service: ServiceDetails }) {
  return (
    <>
      <SiteHeader showBanner={false} variant="floating" />
      {/* data-service makes the FAQ cap below unique to this route (visited pages stay mounted). */}
      <main data-service={service.slug}>
        {/* Hero + Client Logo strip standard: one combined section, pinned as one unit. */}
        <PinnedSection>
          <ServiceDetailsHero {...service.hero} />
          <ClientLogos />
        </PinnedSection>
        <PinnedSection>
          <WhyChoose {...service.whyChoose} />
        </PinnedSection>
        {/* The /services section, reused exactly as it is. */}
        <PinnedSection>
          <OurProcess />
        </PinnedSection>
        <PinnedSection>
          <RecentProjects {...recentProjects} />
        </PinnedSection>
        <PinnedSection>
          <WhyChooseUs {...service.whyChooseUs} />
        </PinnedSection>
        {/* The /services section, reused exactly as it is. */}
        {/* Capped at this page's Footer, so the FAQ pin never adds empty scrolling past it. */}
        <PinnedSection limitCoverTo={`main[data-service="${service.slug}"] + footer`}>
          <Faq />
        </PinnedSection>
      </main>
      {/* The shared combined Footer (Final CTA + footer). */}
      <Footer />
    </>
  );
}
