import type { Metadata } from "next";
import { ServiceDetailsPage } from "@/components/service-details/ServiceDetailsPage";
import { uiUxProductDesign as service } from "@/lib/content/service-details";

export const metadata: Metadata = {
  title: `${service.title} | Way-Wise Tech`,
  description: service.metaDescription,
};

/** The master Service Details page. The layout lives in ServiceDetailsPage. */
export default function UiUxProductDesignPage() {
  return <ServiceDetailsPage service={service} />;
}
