import { ClientLogos } from "@/components/home/ClientLogos";
import { FinalCta } from "@/components/home/FinalCta";
import { PinnedSection } from "@/components/home/PinnedSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
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
  Process, Recent Projects, FAQ, Final CTA and the Footer are the same on every page. As on
  /services, each section holds while the next rises over it, ending with the Footer.
*/
export function ServiceDetailsPage({ service }: { service: ServiceDetails }) {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
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
        <PinnedSection>
          <Faq />
        </PinnedSection>
        {/* The Homepage section, reused exactly as it is, pinned as on /services. */}
        <PinnedSection>
          <FinalCta />
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
