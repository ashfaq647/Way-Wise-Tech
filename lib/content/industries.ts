import { assets } from "@/lib/assets";

/*
  Central industry lists. The Industries section (components/home/Industries.tsx) reads its carousel
  cards, header and pricing phases from here. The Footer (components/layout/SiteFooter.tsx) reads its
  Industries column labels from `footerIndustries`, in this order; its links stay "#" (set in the
  Footer, not here).

  UNRESOLVED: the carousel and the Footer list different industries. They are kept as two separate
  lists, unchanged, until the owner or designer confirms which set the Industry pages use.
*/

/** Same shape as `IndustryCard` in IndustryCarousel.tsx, so the lists are interchangeable. */
export type Industry = {
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Fade colour as space-separated RGB channels. */
  fade: string;
};

/** The Industries section carousel, in the approved order. Plumbers is the owner's own addition. */
export const industryCards: Industry[] = [
  {
    title: "Attorney & Lawyers",
    description:
      "Professional websites and digital tools that help law firms build trust, attract clients, and manage inquiries.",
    image: assets.industryAttorney,
    alt: "Attorney seated at a large desk in a wood-panelled office",
    fade: "46 62 86",
  },
  {
    title: "Restaurant",
    description:
      "Modern websites, online ordering systems, and digital tools that help restaurants serve more customers.",
    image: assets.industryRestaurant,
    alt: "Chef checking a tablet in a restaurant kitchen",
    fade: "134 100 61",
  },
  {
    title: "Retailers",
    description:
      "Online stores and business tools that make shopping easier and help retailers grow sales.",
    image: assets.industryRetailers,
    alt: "Smiling shop owner holding a product in a homeware store",
    fade: "169 102 100",
  },
  {
    title: "Doctor",
    description:
      "User-friendly websites, patient portals, and digital solutions that improve communication and patient experience.",
    image: assets.industryDoctor,
    alt: "Doctor examining a patient's knee in a clinic",
    fade: "61 97 94",
  },
  {
    title: "Plumbers",
    description:
      "Reliable websites, online booking, and digital tools that help plumbers attract customers and schedule more jobs.",
    image: assets.industryPlumbers,
    alt: "Plumber fitting copper pipes with tools laid out on the floor",
    fade: "134 69 33",
  },
];

/**
 * The Industries section header (components/home/Industries.tsx), shown on the Homepage and
 * /services. "View All Industries" is a "#" placeholder until its destination is confirmed.
 */
export const industriesSection = {
  eyebrow: "Industry We Serve",
  /** The first line is black; the second line is the red `accent`. */
  heading: { first: "Digital Solutions for", accent: "Every Industry" },
  intro:
    "We recognize that each business is unique. Our team creates digital solutions tailored to your industry's needs.",
  action: { label: "View All Industries", href: "#" },
};

/**
 * The three pricing phases under the Industries carousel, exactly as in the design. The prices are
 * kept as written, including their mixed hyphen and en dash formats. Their colours stay in the
 * component.
 */
export const industryPhases = [
  {
    phase: "PHASE 1",
    name: "Practice Launch",
    price: "$950-$2950",
    description: "Build your legal brand and establish a trusted and reliable online presence.",
    row: "Brand Identity",
  },
  {
    phase: "PHASE 2",
    name: "Client Management Platform",
    price: "$2975 – $6700",
    description: "Improve client communication and create a modern legal experience.",
    row: "Client Experience",
  },
  {
    phase: "PHASE 3",
    name: "Smart Legal Practice Management",
    price: "$6800-$19500",
    description:
      "Everything in Phase 1 & 2 plus transform your firm with a complete legal management system.",
    row: "Practice Management",
  },
];

/** The Footer's "Industries" column, in its order. A different set of categories from the carousel. */
export const footerIndustries = [
  "Healthcare & Medical",
  "Legal & Professional Services",
  "Real Estate & Construction",
  "Finance, Insurance & Accounting",
  "Retail, E-commerce & Logistics",
];

/**
 * The Industries page "Industries at a Glance" header (components/industries/IndustriesAtAGlance.tsx),
 * as written in its reference. Moved out of the component unchanged; layout and animation stay there.
 */
export const industriesAtAGlanceSection = {
  eyebrow: "Industries at a Glance",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "Digital Solutions for", accent: "All Types of Businesses" },
  description:
    "From local businesses to global brands, we design websites, apps, and digital products for a wide range of industries.",
};

/** The Industries page "Industries at a Glance" cards, in the design's order (left to right, top to bottom). */
export const industriesAtAGlance = [
  {
    title: "Law Firms",
    description:
      "Professional and trustworthy designs to attract clients and build a strong online presence.",
    image: assets.industryLawFirm,
    alt: "Two lawyers shaking hands across a desk with a gavel, scales of justice and signed documents",
  },
  {
    title: "Healthcare",
    description:
      "Clean and easy-to-use designs for doctors, clinics, hospitals and healthcare providers.",
    image: assets.industryHealthcare,
    alt: "Smiling team of doctors and nurses in scrubs and white coats in a clinic",
  },
  {
    title: "Real Estate",
    description: "Modern designs to showcase properties, build trust and generate more leads.",
    image: assets.industryRealEstate,
    alt: "Modern two-storey house with wood panelling, glass balconies and a pool at dusk",
  },
  {
    title: "Construction",
    description: "Practical and professional designs for construction companies and contractors.",
    image: assets.industryConstruction,
    alt: "High-rise building under construction with tower cranes and workers on a city site",
  },
];

/**
 * The "A Trusted Partner Across Industries" header and image alt text
 * (components/industries/IndustriesTrust.tsx, on /industries and /our-work), as written in its
 * reference. Moved out of the component unchanged; the image file, layout, stats bar and animation
 * stay there. The Case Study trust section has the same header wording but its own content
 * (`caseStudyResults` in case-study.ts); the two are kept separate.
 */
export const industriesTrustSection = {
  eyebrow: "Why Businesses Choose Us",
  /** The first line is navy; the second is the red `accent`. */
  heading: { first: "A Trusted Partner", accent: "Across Industries" },
  description: "We understand different business needs and deliver designs that create real value.",
  imageAlt: "Phone, laptop and tablet on stone blocks, each showing a property website design",
};

/** Icons drawn for the Industries page trust stats. */
export type IndustryStatIcon = "users" | "building" | "star" | "growth";

/**
 * The Industries page "A Trusted Partner Across Industries" stats, exactly as in the design
 * (Trust Section.png). The figures are the design's own and still need the owner's confirmation.
 */
export const industryStats: { value: string; label: string; icon: IndustryStatIcon }[] = [
  { value: "100+", label: "Businesses Served", icon: "users" },
  { value: "6+", label: "Industries", icon: "building" },
  { value: "98%", label: "Client Satisfaction", icon: "star" },
  { value: "2x", label: "Avg. Online Growth", icon: "growth" },
];

/**
 * The Industries page "Industry Solutions" header (components/industries/IndustriesSolutions.tsx), as
 * written in its reference. Moved out of the component unchanged; layout, card stacking and animation
 * stay there.
 */
export const industrySolutionsSection = {
  eyebrow: "Industry Solutions",
  /** The first line is navy; the second line is `second` in navy, then the red `accent`. */
  heading: { first: "Complete Digital Solutions", second: "for", accent: "Your Industry" },
  description:
    "From website design to custom software, we provide everything you need to grow your business online.",
};

/**
 * The Industries page "Industry Solutions" cards, exactly as in the design (Frame 2147238556.png).
 * `tone` is the number circle's colour.
 */
export const industrySolutions = [
  {
    number: "01",
    title: "Website Design & Development",
    description: "Modern, responsive and user-friendly websites tailored for your industry and business goals",
    tags: ["Business Websites", "Landing Page", "Custom Development"],
    image: assets.industrySolutionWeb,
    alt: "Laptop on a blue stand showing the Aria Home online store with featured products",
    tone: "#d7bf9e",
  },
  {
    number: "02",
    title: "Mobile App Development",
    description: "Powerful and easy-to-use mobile apps for iOS and Android to help you reach more customers.",
    tags: ["Business Websites", "Cross-Platform", "Custom Features"],
    image: assets.industrySolutionMobile,
    alt: "Hand holding a phone showing the QuickFix home services app",
    tone: "#b3bba1",
  },
  {
    number: "03",
    title: "Custom Software Development",
    description: "Scalable and secure software solutions to streamline your operations and improve efficiency.",
    tags: ["Web Applications", "SaaS Platforms", "Business Automation"],
    image: assets.industrySolutionSoftware,
    alt: "Laptop showing a dark analytics dashboard with revenue figures and a sales chart",
    tone: "#b7a7d3",
  },
  {
    number: "04",
    title: "UI/UX & Product Design",
    description: "Beautiful and user-friendly designs that improve customer experience and engagement.",
    tags: ["UI/UX Design", "Wireframes", "Prototypes"],
    image: assets.industrySolutionDesign,
    alt: "Laptop showing the Noodle Lab restaurant website with a ramen bowl and menu",
    tone: "#7eb2ed",
  },
];

/**
 * The Industries page Hero (components/industries/IndustriesHero.tsx), as written in its reference.
 * Moved out of the component unchanged; the image files, layout, animation and per-photo delays
 * stay there. Both buttons are "#" placeholders: the design has no destinations yet.
 */
export const industriesHero = {
  eyebrow: "Industries",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "We Design for", accent: "Every Industry" },
  description:
    "We create modern and user-friendly designs for different types of businesses. No matter your industry, we design digital experiences that fit your goals and help you grow.",
  primaryAction: { label: "Discuss Your Project", href: "#" },
  secondaryAction: { label: "Explore Our Work", href: "#" },
  features: ["Web Development", "Mobile Apps", "UI/UX Design", "AI & Automation"],
  /** Alt text for each Hero image, by the image it describes. */
  imageAlts: {
    background: "Soft beige background with golden light streaks",
    laundry:
      "Technician repairing a washing machine in a laundry room while a smiling homeowner watches",
    law: "Gavel and scales of justice on a desk while two lawyers shake hands",
    dental: "Dentist in a mask examining a smiling patient in a dental chair",
    restaurant: "Waiter serving diners in a bright restaurant with tall windows",
  },
};
