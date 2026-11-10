import { assets } from "@/lib/assets";
import { footerIndustries } from "./industries";
import { services } from "./services";

/*
  Navbar navigation, used by components/layout/SiteHeader.tsx. The dropdowns list the Footer's
  Services, Industries and Company columns with the Footer's labels. A link points at a page only
  where that page already exists on the site; every other "#" is a placeholder until real URLs are
  provided. Do not invent URLs.

  The Footer (components/layout/SiteFooter.tsx) still keeps its own copy of these labels, all "#",
  until the owner approves switching it over. Keep the labels in sync until then.
*/

export type NavLink = {
  label: string;
  href: string;
  /** Shown under the label in the Navbar dropdown: the service's Services-section card text. */
  description?: string;
};

/** A Navbar dropdown: one Footer column, ending in its action link. */
export type NavMenu = {
  title: string;
  links: NavLink[];
  action: NavLink;
};

export type NavItem = NavLink & {
  menu?: NavMenu;
  /** Draws the chevron on an item that has no dropdown yet ("Our Work", as in the design). */
  chevron?: boolean;
};

/** The Service Details pages, linked as the Services cards link them. */
const serviceRoutes: Record<string, string> = {
  "UI/UX & Product Design": "/services/ui-ux-product-design",
  "Custom Software Development": "/services/custom-software-development",
  "Web Development": "/services/web-development",
  "Mobile App Development": "/services/mobile-app-development",
  "AI, Data & Automation": "/services/ai-data-automation",
  "Branding & Digital Growth": "/services/branding-digital-growth",
};

export const servicesMenu: NavMenu = {
  title: "Services",
  links: services.map(({ title, card }) => ({
    label: title,
    href: serviceRoutes[title] ?? "#",
    description: card?.description,
  })),
  action: { label: "View All Services", href: "/services" },
};

export const industriesMenu: NavMenu = {
  title: "Industries",
  links: footerIndustries.map((label) => ({ label, href: "#" })),
  // Under Industries on purpose: the reference has it wrong (approved decision).
  action: { label: "View All Industries", href: "/industries" },
};

/** The Footer's "Company" column. "Our Work" is listed here, while the Navbar also has it at the top level. */
export const companyLinks: NavLink[] = [
  { label: "About Us", href: "#" },
  { label: "How We Work", href: "#" },
  { label: "Our Team", href: "#" },
  { label: "Global Delivery", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Insights", href: "#" },
  { label: "Our Work", href: "/our-work" },
];

export const companyMenu: NavMenu = {
  title: "Company",
  links: companyLinks,
  action: { label: "Contact Us", href: "/contact" },
};

/** The navy card in every Navbar dropdown: the Footer's introduction and regions, word for word. */
export const navBrandCard = {
  intro:
    "A global technology company designing and building digital products for ambitious businesses in the USA, UAE, and worldwide.",
  regions: "USA • UAE • Worldwide",
};

/** Navbar items, in order. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services", menu: servicesMenu },
  { label: "Industries", href: "#", menu: industriesMenu },
  { label: "Our Work", href: "#", chevron: true },
  { label: "Company", href: "#", menu: companyMenu },
  { label: "Contact", href: "/contact" },
];

/** The Footer's three link columns, each ending in its action link (the same lists as the dropdowns). */
export const footerColumns: NavMenu[] = [servicesMenu, industriesMenu, companyMenu];

export const legalLinks: NavLink[] = [
  { label: "Cookie Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

/** Twitter keeps the bird icon, not X (approved decision). */
export const socialLinks: (NavLink & { icon: string })[] = [
  { label: "LinkedIn", href: "#", icon: assets.footerLinkedin },
  { label: "Twitter", href: "#", icon: assets.footerTwitter },
  { label: "Instagram", href: "#", icon: assets.footerInstagram },
];
