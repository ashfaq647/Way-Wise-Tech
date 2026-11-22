import { ClientLogos } from "@/components/sections/ClientLogos";
import { PinnedSection } from "@/components/motion/PinnedSection";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Faq } from "@/components/sections/Faq";
import { OurProcess } from "@/components/sections/our-process/OurProcess";
import { recentProjects, type ServiceDetails } from "@/lib/content/service-details";
import { RecentProjects } from "@/components/sections/recent-projects/RecentProjects";
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
          <ClientLogos height="compact" />
        </PinnedSection>
        {/* A 942 frame since 2026-11-17: it rests in view for 30svh before Our Process rises. */}
        <PinnedSection hold="30svh">
          <WhyChoose {...service.whyChoose} />
        </PinnedSection>
        {/* The /services section, reused exactly as it is, with the same 30svh rest in its 942 frame. */}
        <PinnedSection hold="var(--op-hold, 30svh)">
          <OurProcess />
        </PinnedSection>
        {/* A 942 frame since 2026-11-17: it rests in view for 30svh before the next section rises. */}
        <PinnedSection hold="30svh">
          <RecentProjects {...recentProjects} />
        </PinnedSection>
        {/* A 942 frame since 2026-11-17: it rests in view for 30svh before the FAQ rises. */}
        <PinnedSection hold="30svh">
          <WhyChooseUs {...service.whyChooseUs} />
        </PinnedSection>
        {/* The /services section, reused exactly as it is. */}
        {/* Capped at this page's Footer, so the FAQ pin never adds empty scrolling past it. */}
        <PinnedSection limitCoverTo={`main[data-service="${service.slug}"] + footer`} hold="30svh">
          <Faq />
        </PinnedSection>
      </main>
      {/* The shared combined Footer (Final CTA + footer). */}
      <Footer />
    </>
  );
}
