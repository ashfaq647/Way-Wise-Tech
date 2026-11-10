import { assets } from "@/lib/assets";

/*
  Central service list for new pages. Copied exactly from the current sections; those sections still
  use their own copies (components/home/Services.tsx, components/layout/SiteFooter.tsx) until the owner
  approves switching them over. Keep the copies in sync until then.
*/

export type Service = {
  title: string;
  /** Card content. Only the six services shown in the Services section have it. */
  card?: {
    description: string;
    image: string;
    alt: string;
  };
};

/**
 * Every service, in the Footer's order. The first six are the Services section cards, in the same
 * order. "Cloud, API & DevOps" and "Support & Maintenance" appear only in the Footer: no description
 * or image exists for them yet.
 */
export const services: Service[] = [
  {
    title: "UI/UX & Product Design",
    card: {
      description:
        "We create clean, modern, and easy-to-use designs that help businesses deliver better digital experiences.",
      image: assets.serviceUiUx,
      alt: "Tablet and desktop monitor showing interface designs",
    },
  },
  {
    title: "Custom Software Development",
    card: {
      description:
        "We build custom software that simplifies daily work, improves efficiency, and supports your business growth.",
      image: assets.serviceCustomSoftware,
      alt: "Monitor, laptop and phone showing code and software screens beside a server stack",
    },
  },
  {
    title: "Web Development",
    card: {
      description:
        "We develop fast, secure, and responsive websites that help businesses attract customers and grow online.",
      image: assets.serviceWeb,
      alt: "Desktop monitor showing a website beside a code editor",
    },
  },
  {
    title: "Mobile App Development",
    card: {
      description:
        "We build user-friendly iOS and Android apps that make your services easy to access anywhere.",
      image: assets.serviceMobile,
      alt: "Two phones showing a property app with app store icons",
    },
  },
  {
    title: "AI, Data & Automation",
    card: {
      description:
        "We create smart AI solutions that automate tasks, improve decisions, and help businesses save time.",
      image: assets.serviceAi,
      alt: "Laptop showing a data dashboard beside a small robot",
    },
  },
  {
    title: "Branding & Digital Growth",
    card: {
      description:
        "We help businesses improve their online visibility through SEO, branding, and digital marketing strategies.",
      image: assets.serviceBranding,
      alt: "Laptop and phone showing a brand website with a camera and marketing icons",
    },
  },
  { title: "Cloud, API & DevOps" },
  { title: "Support & Maintenance" },
];

/** The six Services section cards, in the same shape as the section's own data. */
export const serviceCards = services.flatMap(({ title, card }) => (card ? [{ title, ...card }] : []));
