import type { Metadata } from "next";
import { ServiceDetailsPage } from "@/components/service-details/ServiceDetailsPage";
import { customSoftwareDevelopment as service } from "@/lib/content/service-details";

export const metadata: Metadata = {
  title: `${service.title} | Way-Wise Tech`,
  description: service.metaDescription,
};

export default function CustomSoftwareDevelopmentPage() {
  return <ServiceDetailsPage service={service} />;
}
