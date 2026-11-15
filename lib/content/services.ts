import { assets } from "@/lib/assets";

/*
  Central service list. The Services section (components/home/Services.tsx) reads its cards and
  header from here. The Footer (components/layout/SiteFooter.tsx) reads its Services column labels
  from `services`, in this order; its links stay "#" (set in the Footer, not here).
*/

export type Service = {
  title: string;
  /**
   * One of the six services on the Homepage Services section and the Navbar's main Services links.
   * The others appear only on /services (all eight cards) and as Navbar and Footer extras.
   */
  featured?: boolean;
  /** Card content: description and image for the Services section, and the Details page link. */
  card?: {
    /** The service's Details page. The card title links here. */
    href: string;
    description: string;
    image: string;
    alt: string;
  };
};

/**
 * Every service, in the Footer's order. The six `featured` ones are the Homepage Services cards, in
 * the same order. "Cloud, API & DevOps" and "Support & Maintenance" follow them on /services only.
 */
export const services: Service[] = [
  {
    title: "UI/UX & Product Design",
    featured: true,
    card: {
      href: "/services/ui-ux-product-design",
      description:
        "We create clean, modern, and easy-to-use designs that help businesses deliver better digital experiences.",
      image: assets.serviceUiUx,
      alt: "Tablet and desktop monitor showing interface designs",
    },
  },
  {
    title: "Custom Software Development",
    featured: true,
    card: {
      href: "/services/custom-software-development",
      description:
        "We build custom software that simplifies daily work, improves efficiency, and supports your business growth.",
      image: assets.serviceCustomSoftware,
      alt: "Monitor, laptop and phone showing code and software screens beside a server stack",
    },
  },
  {
    title: "Web Development",
    featured: true,
    card: {
      href: "/services/web-development",
      description:
        "We develop fast, secure, and responsive websites that help businesses attract customers and grow online.",
      image: assets.serviceWeb,
      alt: "Desktop monitor showing a website beside a code editor",
    },
  },
  {
    title: "Mobile App Development",
    featured: true,
    card: {
      href: "/services/mobile-app-development",
      description:
        "We build user-friendly iOS and Android apps that make your services easy to access anywhere.",
      image: assets.serviceMobile,
      alt: "Two phones showing a property app with app store icons",
    },
  },
  {
    title: "AI, Data & Automation",
    featured: true,
    card: {
      href: "/services/ai-data-automation",
      description:
        "We create smart AI solutions that automate tasks, improve decisions, and help businesses save time.",
      image: assets.serviceAi,
      alt: "Laptop showing a data dashboard beside a small robot",
    },
  },
  {
    title: "Branding & Digital Growth",
    featured: true,
    card: {
      href: "/services/branding-digital-growth",
      description:
        "We help businesses improve their online visibility through SEO, branding, and digital marketing strategies.",
      image: assets.serviceBranding,
      alt: "Laptop and phone showing a brand website with a camera and marketing icons",
    },
  },
  {
    title: "Cloud, API & DevOps",
    card: {
      href: "/services/cloud-api-devops",
      description:
        "We build secure cloud setups, reliable APIs, and automated deployments that keep your systems running smoothly.",
      image: assets.serviceCloud,
      alt: "Glowing cloud linked to API, data and deployment icons above a desk with a server stack",
    },
  },
  {
    title: "Support & Maintenance",
    card: {
      href: "/services/support-maintenance",
      description:
        "We keep your websites and software secure, up to date, and running smoothly with ongoing support.",
      image: assets.serviceSupport,
      alt: "Interlocking gears linked to tool, performance, security and support icons above a desk",
    },
  },
];

type ServiceCard = NonNullable<Service["card"]> & { title: string };

/** Every service with a card (all eight), in order: the /services page's Services section. */
export const allServiceCards: ServiceCard[] = services.flatMap(({ title, card }) =>
  card ? [{ title, ...card }] : [],
);

/**
 * The six featured cards, in order: the Homepage Services section (approved design, exactly six)
 * and the Contact form's Project Type options.
 */
export const serviceCards: ServiceCard[] = services.flatMap(({ title, featured, card }) =>
  featured && card ? [{ title, ...card }] : [],
);

/**
 * The Services section header (components/home/Services.tsx), shown on the Homepage and /services.
 * `action` is the Homepage button; /services, which already shows every service, uses `pageAction`.
 */
export const servicesSection = {
  eyebrow: "Our Services",
  /** The first line is ink; the second line ends in the red `accent`. */
  heading: { first: "From First Idea to", second: "Scalable", accent: "Digital Product" },
  description:
    "From design and development to AI and digital growth, we help businesses build better digital products.",
  action: { label: "View All Services", href: "/services" },
  pageAction: { label: "Discuss Your Project", href: "/contact" },
};

/**
 * The /services page Hero (components/services/ServicesHero.tsx), as written in its reference.
 * Moved out of the component unchanged; the artwork (decorative, so it has no alt text), layout,
 * animation and the button labels' letter roll stay there. Both buttons are "#" placeholders: the
 * design has no destinations yet.
 */
export const servicesHero = {
  eyebrow: "Our Services",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "Smart Digital Solutions", accent: "for Your Business" },
  description:
    "We help businesses design, build, and grow with modern technology. Explore our services and find the right solution for your business.",
  primaryAction: { label: "Start Your Project", href: "#" },
  secondaryAction: { label: "Explore Our Services", href: "#" },
  features: ["Custom Solutions", "Experienced Team", "Modern Technology"],
};
