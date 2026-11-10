import { assets } from "@/lib/assets";

/*
  Content for the Service Details pages, one entry per service. Every page renders through
  components/service-details/ServiceDetailsPage.tsx, so a new service only needs an entry here, its
  image entries in lib/assets.ts and a page file. UI/UX & Product Design is the master design.
  Recent Projects is shared: every page shows the same section (`recentProjects` below).
*/

/** One headline line. `highlight` is the red part at the end of the line. */
export type HeadlineLine = {
  text: string;
  highlight?: string;
};

/** A hero image, always shown whole: never cropped or zoomed. */
export type HeroArtwork = {
  src: string;
  /** Size of the exported file in pixels, used for its aspect ratio. */
  width: number;
  height: number;
};

/** The "Why Choose" section: an image card beside a heading, a description and a checklist. */
export type WhyChooseContent = {
  eyebrow: string;
  /** The first line is ink, the second red. */
  heading: { first: string; second: string };
  description: string;
  points: string[];
  image: {
    src: string;
    /** Size of the file in pixels, used for its aspect ratio. Its rounded corners are in the file. */
    width: number;
    height: number;
    alt: string;
  };
};

/** One card in the Recent Projects carousel. */
export type ProjectCard = {
  title: string;
  tags: string[];
  /** 1008x1232 export, shown whole at the card's 504/616 ratio. */
  image: string;
  alt: string;
  /** Fade colour as space-separated RGB channels, as in the Industries carousel. */
  fade: string;
};

/** The "Recent Projects" section: heading and intro above a looping carousel of project cards. */
export type RecentProjectsContent = {
  eyebrow: string;
  /** The first line is ink, the second red. */
  heading: { first: string; second: string };
  intro: string;
  projects: ProjectCard[];
};

/** Icons drawn for the Why Choose Us cards. */
export type ReasonIcon = "lightbulb" | "team" | "laptop" | "chat-check";

/** The "Why Choose Us" section: heading, description and image above four reason cards. */
export type WhyChooseUsContent = {
  eyebrow: string;
  /** The first line is navy, the second red. */
  heading: { first: string; second: string };
  description: string;
  image: {
    src: string;
    /** Size of the file in pixels, used for its aspect ratio. Its rounded corners are in the file. */
    width: number;
    height: number;
    alt: string;
  };
  reasons: {
    /** Two lines, broken where the design breaks them. */
    title: [string, string];
    description: string;
    icon: ReasonIcon;
    /** Icon circle colour. */
    tone: string;
  }[];
};

export type ServiceDetails = {
  /** URL segment under /services. */
  slug: string;
  /** Matches the title in lib/content/services.ts. */
  title: string;
  /** Page description for search results. */
  metaDescription: string;
  hero: {
    /** The current page in the breadcrumb, after "Home". */
    breadcrumb: string;
    /** Exactly two lines, as in the design. */
    headline: [HeadlineLine, HeadlineLine];
    description: string;
    image: HeroArtwork;
  };
  whyChoose: WhyChooseContent;
  whyChooseUs: WhyChooseUsContent;
};

/** Recent Projects, identical on every Service Details page (owner decision). */
export const recentProjects: RecentProjectsContent = {
  eyebrow: "Real Examples",
  heading: { first: "Our Recent", second: "Design Projects" },
  intro:
    "Here are some of our recent UI/UX and product design projects. Each design is tailored to the business goals and user needs.",
  // Order, titles and tags confirmed by the owner. Card 4's text is cut off in the reference.
  projects: [
    {
      title: "Real Estate Website",
      tags: ["UI/UX Design", "Web Design"],
      image: assets.projectRealEstate,
      alt: "Laptop and phone showing a real estate website with featured property listings",
      fade: "46 62 86",
    },
    {
      title: "SaaS Dashboard",
      tags: ["UI/UX Design", "Dashboard"],
      image: assets.projectSaasDashboard,
      alt: "Laptop showing an analytics dashboard with revenue chart and activity panels",
      fade: "134 100 61",
    },
    {
      title: "Mobile App Design",
      tags: ["UI/UX Design", "Mobile App"],
      image: assets.projectMobileApp,
      alt: "Hands holding a tablet showing a property app, with a second screen behind",
      fade: "169 102 100",
    },
    {
      title: "Attorney Website",
      tags: ["UI/UX Design", "Mobile Design"],
      image: assets.projectAttorney,
      alt: "Attorney smiling at a large desk in a wood-panelled office",
      fade: "134 69 33",
    },
  ],
};

export const uiUxProductDesign: ServiceDetails = {
  slug: "ui-ux-product-design",
  title: "UI/UX & Product Design",
  metaDescription:
    "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
  hero: {
    breadcrumb: "UI/UX & Product Design",
    headline: [{ text: "Design Experiences" }, { text: "That", highlight: "People Love" }],
    description:
      "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
    // The complete Figma export, shown whole. At 3840x1616 it has the hero frame's exact ratio.
    image: {
      src: assets.serviceDetailsHero,
      width: 3840,
      height: 1616,
    },
  },
  whyChoose: {
    eyebrow: "Why Choose WayWise",
    heading: { first: "Why Businesses Choose", second: "WayWise for UI/UX" },
    description:
      "We design simple, modern, and easy-to-use digital products. As a Top Rated Seller on Upwork, our team has experience helping businesses turn ideas into designs that people enjoy using.",
    points: [
      "User Research & UX Strategy",
      "Wireframes & Prototypes",
      "Modern & Responsive UI Design",
      "Design Systems & Style Guides",
      "Collaboration With Our Development Team",
      "Ongoing Design Support",
    ],
    image: {
      src: assets.serviceDetailsWhyChoose,
      width: 1414,
      height: 1760,
      alt: "Laptop and phone showing a design workspace, with typography, colour palette, image and flow cards floating above",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: { first: "Designs That Make a", second: "Real Difference" },
    description:
      "We combine creativity, user research, and business strategy to deliver designs that not only look great, but also drive results.",
    image: {
      src: assets.serviceDetailsDifference,
      width: 1500,
      height: 625,
      alt: "Laptop, phone and tablet showing a design project, with typography, colour and flow cards above",
    },
    reasons: [
      {
        title: ["User-Focused", "Approach"],
        description: "We design with your users in mind to create meaningful experiences.",
        icon: "lightbulb",
        tone: "#ecd4ba",
      },
      {
        title: ["Experienced", "Design Team"],
        description: "Skilled UI/UX designers with experience across different industries.",
        icon: "team",
        tone: "#c0d0fe",
      },
      {
        title: ["Modern &", "Scalable Designs"],
        description: "Clear, modern, and easy to scale for future growth and success.",
        icon: "laptop",
        tone: "#fedcdd",
      },
      {
        title: ["From Idea to", "Final Design"],
        description: "Complete design support from concept to final delivery.",
        icon: "chat-check",
        tone: "#cef3e4",
      },
    ],
  },
};

/*
  Custom Software Development. Copy written for this page (no Figma design yet). Images are the
  UI/UX ones for now, through this service's own entries in lib/assets.ts, so alt text describes
  what those images show. Headline and heading lines are no wider than the UI/UX ones, so the
  master layout holds at every width.
*/
export const customSoftwareDevelopment: ServiceDetails = {
  slug: "custom-software-development",
  title: "Custom Software Development",
  metaDescription:
    "We plan, design, and build custom software that simplifies your operations, connects your tools, and grows with your business.",
  hero: {
    breadcrumb: "Custom Software Development",
    headline: [{ text: "Software Built for" }, { text: "The Way", highlight: "You Work" }],
    description:
      "We plan, design, and build custom software that simplifies your operations, connects your tools, and grows with your business.",
    image: {
      src: assets.customSoftwareHero,
      width: 3840,
      height: 1616,
    },
  },
  whyChoose: {
    eyebrow: "Why Choose WayWise",
    heading: { first: "Why Businesses Choose", second: "WayWise for Software" },
    description:
      "We turn complex processes into reliable, easy-to-use software. Our team works closely with you from planning to launch, building solutions that solve real problems for your team and your customers.",
    points: [
      "Requirements Discovery & Planning",
      "Custom Web & Business Applications",
      "Integrations With Your Existing Tools",
      "Secure, Scalable Architecture",
      "Testing & Quality Assurance",
      "Ongoing Support & Improvements",
    ],
    image: {
      src: assets.customSoftwareWhyChoose,
      width: 1414,
      height: 1760,
      alt: "Laptop and phone showing a design workspace, with typography, colour palette, image and flow cards floating above",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: { first: "Software Built to", second: "Grow With You" },
    description:
      "We combine technical expertise with a clear understanding of your goals to build software that is dependable, easy to use, and ready to scale.",
    image: {
      src: assets.customSoftwareWhyChooseUs,
      width: 1500,
      height: 625,
      alt: "Laptop, phone and tablet showing a design project, with typography, colour and flow cards above",
    },
    reasons: [
      {
        title: ["Built Around", "Your Workflow"],
        description: "Software shaped around your processes and the way your team already works.",
        icon: "lightbulb",
        tone: "#ecd4ba",
      },
      {
        title: ["Experienced", "Development Team"],
        description: "Skilled developers who write clean, reliable, and maintainable code.",
        icon: "team",
        tone: "#c0d0fe",
      },
      {
        title: ["Secure &", "Scalable Systems"],
        description: "Built to protect your data and handle more users as you grow.",
        icon: "laptop",
        tone: "#fedcdd",
      },
      {
        title: ["From Planning", "to Launch"],
        description: "Full support from requirements and development to deployment.",
        icon: "chat-check",
        tone: "#cef3e4",
      },
    ],
  },
};

/*
  Web Development. Copy written for this page (no Figma design yet), in line with the Web
  Development card in the Services section. Images are the UI/UX ones for now, through this
  service's own entries in lib/assets.ts, so alt text describes what those images show. Headline and
  heading lines are no wider than the UI/UX ones, so the master layout holds at every width.
*/
export const webDevelopment: ServiceDetails = {
  slug: "web-development",
  title: "Web Development",
  metaDescription:
    "We design and develop fast, secure, and responsive websites that attract customers, build trust, and grow with your business.",
  hero: {
    breadcrumb: "Web Development",
    headline: [{ text: "Websites Built to" }, { text: "Help", highlight: "You Grow" }],
    description:
      "We design and develop fast, secure, and responsive websites that attract customers, build trust, and grow with your business.",
    image: {
      src: assets.webDevelopmentHero,
      width: 3840,
      height: 1616,
    },
  },
  whyChoose: {
    eyebrow: "Why Choose WayWise",
    heading: { first: "Why Businesses Choose", second: "WayWise for Web" },
    description:
      "We build websites that are fast, easy to use, and simple to manage. Our team handles everything from planning and design to launch, so your website works for you.",
    points: [
      "Responsive Design for Every Device",
      "Custom Websites & Web Applications",
      "Easy-to-Manage Content",
      "Speed & Performance Optimization",
      "SEO-Friendly Website Structure",
      "Ongoing Maintenance & Support",
    ],
    image: {
      src: assets.webDevelopmentWhyChoose,
      width: 1414,
      height: 1760,
      alt: "Laptop and phone showing a design workspace, with typography, colour palette, image and flow cards floating above",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: { first: "Websites That Build", second: "Trust and Growth" },
    description:
      "We combine thoughtful design with clean, reliable development to build websites that load quickly and work on every device.",
    image: {
      src: assets.webDevelopmentWhyChooseUs,
      width: 1500,
      height: 625,
      alt: "Laptop, phone and tablet showing a design project, with typography, colour and flow cards above",
    },
    reasons: [
      {
        title: ["Built Around", "Your Goals"],
        description: "We plan every website around your business and its goals.",
        icon: "lightbulb",
        tone: "#ecd4ba",
      },
      {
        title: ["Experienced", "Web Team"],
        description: "Skilled designers and developers who build reliable websites.",
        icon: "team",
        tone: "#c0d0fe",
      },
      {
        title: ["Fast &", "Responsive Sites"],
        description: "Fast-loading websites that work smoothly on every screen.",
        icon: "laptop",
        tone: "#fedcdd",
      },
      {
        title: ["Support After", "Launch"],
        description: "Ongoing updates and fixes after your site goes live.",
        icon: "chat-check",
        tone: "#cef3e4",
      },
    ],
  },
};

/*
  Mobile App Development. Copy written for this page (no Figma design yet), in line with the Mobile
  App Development card in the Services section. Images are the UI/UX ones for now, through this
  service's own entries in lib/assets.ts, so alt text describes what those images show. Headline and
  heading lines are no wider than the UI/UX ones, so the master layout holds at every width.
*/
export const mobileAppDevelopment: ServiceDetails = {
  slug: "mobile-app-development",
  title: "Mobile App Development",
  metaDescription:
    "We design and build user-friendly iOS and Android apps that make your services easy to access, simple to use, and ready to grow.",
  hero: {
    breadcrumb: "Mobile App Development",
    headline: [{ text: "Mobile Apps Built" }, { text: "for", highlight: "Your Customers" }],
    description:
      "We design and build user-friendly iOS and Android apps that make your services easy to access, simple to use, and ready to grow.",
    image: {
      src: assets.mobileAppHero,
      width: 3840,
      height: 1616,
    },
  },
  whyChoose: {
    eyebrow: "Why Choose WayWise",
    heading: { first: "Why Businesses Choose", second: "WayWise for Apps" },
    description:
      "We build mobile apps that are fast, reliable, and easy to use. Our team guides you from idea and design to launch, so your app is ready for real users.",
    points: [
      "iOS & Android App Development",
      "User-Friendly App Design",
      "API & Third-Party Integrations",
      "Testing Across Devices",
      "App Store & Google Play Launch",
      "Ongoing Updates & Maintenance",
    ],
    image: {
      src: assets.mobileAppWhyChoose,
      width: 1414,
      height: 1760,
      alt: "Laptop and phone showing a design workspace, with typography, colour palette, image and flow cards floating above",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: { first: "Apps Designed for", second: "Everyday Use" },
    description:
      "We combine clear design with reliable development to build mobile apps that feel natural and perform well on every device.",
    image: {
      src: assets.mobileAppWhyChooseUs,
      width: 1500,
      height: 625,
      alt: "Laptop, phone and tablet showing a design project, with typography, colour and flow cards above",
    },
    reasons: [
      {
        title: ["User-First", "App Design"],
        description: "Every screen is designed to be clear and easy to use.",
        icon: "lightbulb",
        tone: "#ecd4ba",
      },
      {
        title: ["Experienced", "Mobile Team"],
        description: "Skilled designers and developers for iOS and Android.",
        icon: "team",
        tone: "#c0d0fe",
      },
      {
        title: ["Fast &", "Reliable Apps"],
        description: "Smooth performance across phones and tablets.",
        icon: "laptop",
        tone: "#fedcdd",
      },
      {
        title: ["From Idea to", "App Store"],
        description: "Full support from planning to app store release.",
        icon: "chat-check",
        tone: "#cef3e4",
      },
    ],
  },
};

/*
  AI, Data & Automation. Copy written for this page (no Figma design yet), in line with the AI, Data
  & Automation card in the Services section. Images are the UI/UX ones for now, through this
  service's own entries in lib/assets.ts, so alt text describes what those images show. Headline and
  heading lines are no wider than the UI/UX ones, so the master layout holds at every width.
*/
export const aiDataAutomation: ServiceDetails = {
  slug: "ai-data-automation",
  title: "AI, Data & Automation",
  metaDescription:
    "We build practical AI, data, and automation solutions that save your team time, reduce manual work, and support better decisions.",
  hero: {
    breadcrumb: "AI, Data & Automation",
    headline: [{ text: "Save Time With" }, { text: "AI &", highlight: "Automation" }],
    description:
      "We build practical AI, data, and automation solutions that save your team time, reduce manual work, and support better decisions.",
    image: {
      src: assets.aiDataAutomationHero,
      width: 3840,
      height: 1616,
    },
  },
  whyChoose: {
    eyebrow: "Why Choose WayWise",
    heading: { first: "Why Businesses Choose", second: "WayWise for AI" },
    description:
      "We help businesses use AI and automation in practical ways. Our team learns how you work, then builds solutions that fit your tools, data, and goals.",
    points: [
      "Workflow & Process Automation",
      "AI Chatbots & Virtual Assistants",
      "Data Dashboards & Reporting",
      "AI Integration With Your Tools",
      "Secure Handling of Your Data",
      "Ongoing Monitoring & Improvements",
    ],
    image: {
      src: assets.aiDataAutomationWhyChoose,
      width: 1414,
      height: 1760,
      alt: "Laptop and phone showing a design workspace, with typography, colour palette, image and flow cards floating above",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: { first: "Automation That", second: "Saves You Time" },
    description:
      "We combine practical AI with reliable development to build tools that cut manual work and help your team focus.",
    image: {
      src: assets.aiDataAutomationWhyChooseUs,
      width: 1500,
      height: 625,
      alt: "Laptop, phone and tablet showing a design project, with typography, colour and flow cards above",
    },
    reasons: [
      {
        title: ["Practical", "AI Solutions"],
        description: "AI built around real tasks in your business.",
        icon: "lightbulb",
        tone: "#ecd4ba",
      },
      {
        title: ["Experienced", "AI & Data Team"],
        description: "Skilled developers who work with AI, data, and automation.",
        icon: "team",
        tone: "#c0d0fe",
      },
      {
        title: ["Secure &", "Reliable Systems"],
        description: "Built to protect your data and run dependably.",
        icon: "laptop",
        tone: "#fedcdd",
      },
      {
        title: ["From Planning", "to Rollout"],
        description: "Support from the first idea to launch and beyond.",
        icon: "chat-check",
        tone: "#cef3e4",
      },
    ],
  },
};

/*
  Branding & Digital Growth. Copy written for this page (no Figma design yet), in line with the
  Branding & Digital Growth card in the Services section. Images are the UI/UX ones for now, through
  this service's own entries in lib/assets.ts, so alt text describes what those images show.
  Headline and heading lines are no wider than the UI/UX ones, so the master layout holds at every
  width.
*/
export const brandingDigitalGrowth: ServiceDetails = {
  slug: "branding-digital-growth",
  title: "Branding & Digital Growth",
  metaDescription:
    "We help businesses build a clear, consistent brand and grow their online visibility through SEO, content, and digital marketing.",
  hero: {
    breadcrumb: "Branding & Digital Growth",
    headline: [{ text: "Build a Brand" }, { text: "People", highlight: "Remember" }],
    description:
      "We help businesses build a clear, consistent brand and grow their online visibility through SEO, content, and digital marketing.",
    image: {
      src: assets.brandingDigitalGrowthHero,
      width: 3840,
      height: 1616,
    },
  },
  whyChoose: {
    eyebrow: "Why Choose WayWise",
    heading: { first: "Why Businesses Choose", second: "WayWise for Growth" },
    description:
      "We help businesses look professional and get found online. Our team shapes your brand and builds a growth plan that fits your audience and goals.",
    points: [
      "Brand Identity & Logo Design",
      "Brand Guidelines & Style Guides",
      "Search Engine Optimization (SEO)",
      "Content & Social Media Strategy",
      "Digital Marketing Campaigns",
      "Performance Tracking & Reporting",
    ],
    image: {
      src: assets.brandingDigitalGrowthWhyChoose,
      width: 1414,
      height: 1760,
      alt: "Laptop and phone showing a design workspace, with typography, colour palette, image and flow cards floating above",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: { first: "A Brand That", second: "Gets Noticed" },
    description:
      "We combine thoughtful branding with practical marketing to help your business build trust and reach the right customers.",
    image: {
      src: assets.brandingDigitalGrowthWhyChooseUs,
      width: 1500,
      height: 625,
      alt: "Laptop, phone and tablet showing a design project, with typography, colour and flow cards above",
    },
    reasons: [
      {
        title: ["Strategy-Led", "Branding"],
        description: "Every brand decision starts with your goals and audience.",
        icon: "lightbulb",
        tone: "#ecd4ba",
      },
      {
        title: ["Experienced", "Creative Team"],
        description: "Skilled designers and marketers focused on growth.",
        icon: "team",
        tone: "#c0d0fe",
      },
      {
        title: ["Consistent", "Brand Presence"],
        description: "One clear look and voice across every channel.",
        icon: "laptop",
        tone: "#fedcdd",
      },
      {
        title: ["Clear", "Reporting"],
        description: "Simple updates that show how your plan is working.",
        icon: "chat-check",
        tone: "#cef3e4",
      },
    ],
  },
};
