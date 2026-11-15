import { assets } from "@/lib/assets";

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
  features: ["Web Development", "Mobile Apps", "UI/UX Design", "AI & Automation"],
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
