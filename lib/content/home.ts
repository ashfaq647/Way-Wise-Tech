import { assets } from "@/lib/assets";
import { allServiceCards, serviceCards } from "@/lib/content/services";
import { industryCards } from "@/lib/content/industries";

/*
  Homepage content, for sections used only on the Homepage. Moved out of the components unchanged
  (owner-approved, one section at a time, with before/after checks); the components keep all
  layout, styling and animation.
*/

/**
 * The Homepage Hero (components/home/Hero.tsx). Both buttons are "#" placeholders until their
 * destinations are confirmed. Image sizes are the exported files' pixel sizes.
 */
export const homeHero = {
  eyebrow: "USA Strategy • Global Technology Delivery",
  /** The first line is ink; the second line ends in the red `accent`. */
  heading: { first: "Technology Built", second: "Around", accent: "Your Business" },
  description:
    "We design and develop high-performing websites, custom software, mobile apps, and AI-powered solutions that help businesses grow.",
  primaryAction: { label: "Explore Our Work", href: "#" },
  secondaryAction: { label: "Discuss Your Project", href: "#" },
  features: ["Web Development", "Saas Programme", "Mobile Apps", "Custom Software Development", "UI/UX Design", "AI & Automation"],
  /** The photo grid, in order: the tall left image, then the top and bottom right images. */
  images: [
    { src: assets.heroAi, width: 880, height: 1216, alt: "AI head made of circuitry in a city of data" },
    { src: assets.heroStrategy, width: 600, height: 588, alt: "Businessman pointing at a rising bar chart" },
    { src: assets.heroDashboard, width: 600, height: 588, alt: "Hand pointing at a dashboard on a desktop monitor" },
  ],
};

/**
 * The Homepage Our Work section (components/home/OurWork.tsx). "View All Projects" is a "#"
 * placeholder until its destination is confirmed; the cards themselves are not links.
 *
 * UNVERIFIED CONTENT: every project and client detail below is copied exactly from the Figma
 * reference and has not been confirmed. Do not treat these as real clients or real project
 * records. Confirm or replace them before launch.
 *
 * `industryLabel`, `summary` and `details` are shown identically on every card, as in the design.
 * They are per-project facts with placeholder values, so they belong in each project once real
 * project data exists. Image sizes are the exported files' pixel sizes.
 */
export const homeOurWork = {
  eyebrow: "Our Work",
  /** `accent` ends the first line in red; the whole `second` line is red. */
  heading: { first: "Real Projects.", accent: "Real", second: "Digital Solutions." },
  description:
    "Explore some of the websites, apps, and software solutions we've designed and developed for different businesses.",
  action: { label: "View All Projects", href: "#" },
  industryLabel: "Industry",
  summary: "Our team of 10 highly skilled engineers excels in delivering innovative solutions.",
  details: [
    { label: "Project Scope", value: "Website Development" },
    { label: "Project Duration", value: "3 Month" },
  ],
  projects: [
    {
      number: "01",
      title: "Laravel Backend System",
      image: { src: assets.workLaravelBackend, width: 1367, height: 910, alt: "Laptop on a blue chair showing a medical website" },
      client: { name: "Marvin McKinney", role: "Nursing Assistant", photo: { src: assets.workClient1, width: 84, height: 84 } },
    },
    {
      number: "02",
      title: "Landing Page Dev Work",
      image: { src: assets.workLandingPage, width: 1367, height: 910, alt: "Laptop in a spotlight showing a dark green landing page" },
      client: { name: "Brooklyn Simmons", role: "Web Designer", photo: { src: assets.workClient2, width: 84, height: 84 } },
    },
    {
      number: "03",
      title: "Online Store Launch",
      image: { src: assets.workOnlineStore, width: 1367, height: 910, alt: "Laptop on a stone surface showing a furniture store" },
      client: { name: "Bessie Cooper", role: "Marketing Coordinator", photo: { src: assets.workClient3, width: 84, height: 84 } },
    },
    {
      number: "04",
      title: "React Dashboard Panel",
      image: { src: assets.workReactDashboard, width: 1367, height: 900, alt: "Tablet showing a medical dashboard on a pastel background" },
      client: { name: "Ronald Richards", role: "Medical Assistant", photo: { src: assets.workClient4, width: 84, height: 84 } },
    },
    {
      number: "05",
      title: "Mobile App UI Design",
      image: { src: assets.workMobileApp, width: 1367, height: 900, alt: "Hand holding a phone showing a medical appointment app" },
      client: { name: "Esther Howard", role: "President of Sales", photo: { src: assets.workClient5, width: 84, height: 84 } },
    },
  ],
};

/**
 * The Homepage Our Services cards (components/sections/Services.tsx, `variant="compact"`), from the
 * 2026-11-16 Figma redesign. The redesign shortened each card description; the owner approved the
 * new copy for the Homepage only (2026-11-16), so the shared `serviceCards` (used by /services and
 * the Navbar's Services dropdown) keep their descriptions. Titles, links and images are shared.
 *
 * Two descriptions keep a pair of words together with a non-breaking space (\u00a0), so their lines
 * break where the reference breaks them ("enhance / digital experiences", "apps for / easy
 * access"); Outfit is slightly narrower than the reference's face and would otherwise fit the
 * next word on the first line.
 */
const homeServiceDescriptions: Record<string, string> = {
  "UI/UX & Product Design":
    "We design clean, modern interfaces that enhance digital\u00a0experiences for businesses.",
  "Custom Software Development":
    "We develop custom software that streamlines work and boosts efficiency for your business.",
  "Web Development": "We create fast, secure websites that attract customers and drive online growth.",
  "Mobile App Development":
    "We design user-friendly iOS and Android apps for easy\u00a0access to your services.",
  "AI, Data & Automation": "We build smart AI solutions that automate tasks and save businesses time.",
  "Branding & Digital Growth":
    "We enhance online visibility through SEO, branding, and digital marketing.",
};

export const homeServiceCards = serviceCards.map((card) => ({
  ...card,
  description: homeServiceDescriptions[card.title] ?? card.description,
}));

/**
 * The /services page's Services section (2026-11-16 reference `Section.png`, 1920x942, the same
 * compact layout as the Homepage): all eight cards, with the reference's short descriptions for the
 * six it shows. Cloud, API & DevOps and Support & Maintenance (the third row, below the frame) keep
 * their shared descriptions.
 */
export const servicesPageCards = allServiceCards.map((card) => ({
  ...card,
  description: homeServiceDescriptions[card.title] ?? card.description,
}));

/**
 * The Homepage Mission & Vision section (components/home/MissionVision.tsx), transcribed from the
 * 2026-11-16 reference (`Frame 2147239025.png`) exactly as drawn.
 *
 * TO CONFIRM WITH THE OWNER: the eyebrow and heading repeat the Case Study's "The Challenge & Our
 * Solution" / "Turning Challenges Into Solutions" wording rather than naming Mission & Vision, and
 * both card texts are Lorem Ipsum placeholder. Kept as drawn until the owner supplies the copy.
 */
export const homeMissionVision = {
  eyebrow: "The Challenge & Our Solution",
  /** Line one ends in the red `accent`; the whole second line is red. */
  heading: { first: "Turning Challenges", accent: "Into", second: "Solutions" },
  description:
    "We understand business challenges and create smart digital solutions that improve performance, attract customers, and support business growth.",
  image: {
    src: assets.missionVision,
    width: 1500,
    height: 863,
    alt: "A smiling man seated at his desk in a wood-panelled office lined with bookshelves",
  },
  /** Each title is navy `first` and red `accent`. PLACEHOLDER text, as drawn. */
  cards: [
    {
      title: { first: "Our", accent: "Mission" },
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle.",
    },
    {
      title: { first: "Our", accent: "Vision" },
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    },
  ],
};

/**
 * The Homepage Industries cards (components/sections/industries/Industries.tsx, `variant="compact"`), from the
 * 2026-11-16 reference (`Frame 2147239126.png`). The reference shortens the three cards it shows;
 * that copy is used on the Homepage only (as for Services), so the shared `industryCards` (also on
 * /services) are unchanged. Doctor and Plumbers are not in the reference and keep their shared
 * descriptions (to confirm with the owner).
 */
const homeIndustryDescriptions: Record<string, string> = {
  "Attorney & Lawyers": "Websites and digital tools that help law firms build trust and attract clients.",
  Restaurant: "Websites and online systems that help restaurants serve more customers.",
  Retailers: "Online stores and tools that simplify shopping and boost retail sales.",
};

export const homeIndustryCards = industryCards.map((card) => ({
  ...card,
  description: homeIndustryDescriptions[card.title] ?? card.description,
}));

/**
 * The Homepage combined Footer (components/layout/Footer.tsx: the Final CTA and the footer as one
 * section), from the 2026-11-16 reference (`Frame 2147239202.png`, 1920x922; built to 942 by the
 * owner's decision). The CTA text and team come from `finalCta` (lib/content/contact.ts); the
 * intro, regions, legal and social links from lib/content/navigation.ts. Only what is new is here.
 *
 * Links (owner, 2026-11-16): a label links only where its page already exists; the rest stay "#".
 * Fixed as an obvious slip: the reference's Industries column ends "View All Services".
 */
export const homeFooter = {
  /** The owner's exact button text (the reference reads "Start Our Free Consultation"). */
  cta: { label: "START YOUR FREE CONSULTATION", href: "/contact" },
  columns: [
    {
      title: "Services",
      links: [
        { label: "UI/UX & Product Design", href: "/services/ui-ux-product-design" },
        { label: "Custom Software", href: "/services/custom-software-development" },
        { label: "Web & Mobile Apps", href: "#" },
        { label: "AI & Cloud DevOps", href: "#" },
      ],
      action: { label: "View All Services", href: "/services" },
    },
    {
      title: "Industries",
      links: [
        { label: "Healthcare & Medical", href: "#" },
        { label: "Legal & Professional Services", href: "#" },
        { label: "Real Estate & Construction", href: "#" },
        { label: "Finance, Insurance & Accounting", href: "#" },
      ],
      action: { label: "View All Industries", href: "/industries" },
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "How We Work", href: "#" },
        { label: "Our Team", href: "#" },
        { label: "Our Work", href: "/our-work" },
      ],
      action: { label: "Contact Us", href: "/contact" },
    },
  ],
  copyright: "© 2026 Way Wise Tech. All rights reserved.",
  /**
   * Homepage-only designations (owner, 2026-11-16), in the team's order (Firoz Bari, Seung Lee,
   * Fiona Bari). The shared `finalCta.team` roles stay unchanged for the inner pages' Final CTA.
   */
  teamRoles: ["CEO Founding Partner", "CTO Founding Partner", "CFO"],
};
