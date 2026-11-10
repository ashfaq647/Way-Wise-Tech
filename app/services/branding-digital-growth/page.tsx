import type { Metadata } from "next";
import { ServiceDetailsPage } from "@/components/service-details/ServiceDetailsPage";
import { brandingDigitalGrowth as service } from "@/lib/content/service-details";

export const metadata: Metadata = {
  title: `${service.title} | Way-Wise Tech`,
  description: service.metaDescription,
};

export default function BrandingDigitalGrowthPage() {
  return <ServiceDetailsPage service={service} />;
}
