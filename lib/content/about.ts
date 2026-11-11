import { assets } from "@/lib/assets";
import { industryStats } from "@/lib/content/industries";

/**
 * The About Us page Hero, as written in its reference ("Hero Section (1).png"). "Get a Free Quote"
 * has no destination yet ("#"); "Our Work" points at the existing Our Portfolio page.
 */
export const aboutHero = {
  eyebrow: "About Way Wise Tech",
  heading: { first: "A Team Passionate", second: "About", accent: "Technology" },
  description:
    "We are a global technology company helping businesses turn ideas into powerful digital products. From design to development, we build solutions that make work easier and support business growth.",
  primaryAction: { label: "Get a Free Quote", href: "#" },
  secondaryAction: { label: "Our Work", href: "/our-work" },
  highlights: ["Global Team", "Modern Solutions", "Real Business Impact"],
  image: {
    src: assets.aboutHero,
    width: 3840,
    height: 1614,
    alt: "Laptop and phone on a sunlit desk beside a potted plant, both showing a modern house on a property website",
  },
};

/**
 * "Our Story" on the About Us page, as written in its reference (Frame 2147239133.png). Each photo
 * card carries a location label; the first two both read "California, USA" in the reference and are
 * kept as drawn until the owner confirms them.
 */
export const aboutStory = {
  eyebrow: "Our Story",
  heading: { first: "From a Simple Idea", second: "to a", accent: "Global Company" },
  paragraphs: [
    "Way Wise Tech started with a simple goal: to help businesses grow with better technology.",
    "What began as a small team has grown into a global technology company serving businesses in the USA, UAE, and beyond.",
    "Today, our designers, developers, and technology experts work together to build websites, mobile apps, custom software, and AI-powered solutions that solve real business problems. We believe technology should be simple, useful, and built around the needs of every business.",
  ],
  locations: [
    {
      label: "California, USA",
      image: { src: assets.aboutStoryTeam, width: 706, height: 573, alt: "The Way Wise Tech team standing together in their office" },
    },
    {
      label: "California, USA",
      image: { src: assets.aboutStoryCalifornia, width: 706, height: 573, alt: "City skyline of high-rise towers at sunset across the water" },
    },
    {
      label: "Dubai, UAE",
      image: { src: assets.aboutStoryDubai, width: 706, height: 573, alt: "Dubai skyline with the Burj Khalifa under a blue sky" },
    },
    {
      label: "Dhaka, Bangladesh",
      image: { src: assets.aboutStoryDhaka, width: 706, height: 573, alt: "Aerial view of a dense city at dusk" },
    },
  ],
};

/**
 * The leadership messages on the About Us page, as written in their reference
 * (Frame 2147239134.png): the Chairman's and the CEO's message side by side, then the stats bar.
 * The stats are the Industries page figures (same values, labels and icons in the reference), so
 * they are shared rather than copied.
 */
export const aboutLeadership = {
  messages: [
    {
      eyebrow: "Chairman’s Message",
      heading: { first: "Building Solutions for", second: "a", accent: "Better Tomorrow" },
      paragraphs: [
        "At Way Wise Tech, we believe technology should make life easier and help businesses grow.",
        "Our goal is to understand our clients' needs and build digital solutions that bring real value. We focus on quality, clear communication, and long-term relationships.",
        "We are committed to helping businesses succeed through modern technology, creative ideas, and reliable service.",
      ],
      name: "Firoz Bari",
      role: "Chairman",
      company: "Way Wise Tech",
      image: {
        src: assets.aboutChairman,
        width: 480,
        height: 800,
        alt: "Firoz Bari, Chairman of Way Wise Tech, standing beside a Way-Wise Global sign",
      },
    },
    {
      eyebrow: "CEO’s Message",
      heading: { first: "People, Technology,", second: "and", accent: "Lasting Success" },
      paragraphs: [
        "At Way Wise Tech, our success comes from our people and the trust our clients place in us.",
        "We believe great digital products are built through teamwork, creativity, and a clear understanding of business needs.",
        "Our team works hard to deliver simple, modern, and reliable solutions that help businesses move forward.",
      ],
      name: "Seung Lee",
      role: "CEO",
      company: "Way Wise Tech",
      image: {
        src: assets.aboutCeo,
        width: 480,
        height: 800,
        alt: "Seung Lee, CEO of Way Wise Tech, seated at his desk with a laptop",
      },
    },
  ],
  stats: industryStats,
};

/** "Our Global Presence" on the About Us page, as written in its reference (Frame 2147239135.png). */
export const aboutPresence = {
  eyebrow: "Our Global Presence",
  heading: { first: "A Global Team", second: "Working as One" },
  description:
    "Our team works across different locations to provide reliable service, clear communication, and modern digital solutions for businesses worldwide.",
  operationsLabel: "Key Operations:",
  offices: [
    {
      title: "Headquarters",
      location: "Santa Clarita, CA 91351, USA",
      operations: ["Business Strategy", "Sales & Marketing", "Client Support", "Finance & Administration"],
      image: {
        src: assets.aboutOfficeUsa,
        width: 1008,
        height: 700,
        alt: "The Statue of Liberty in front of a waving US flag, with the New York skyline behind",
      },
    },
    {
      title: "Development Center",
      location: "Dubai, UAE",
      operations: ["UI/UX & Product Design", "Software Development", "Mobile App Development", "AI & Automation", "Cloud & DevOps"],
      image: {
        src: assets.aboutOfficeUae,
        width: 1008,
        height: 700,
        alt: "Dubai skyline at dusk with the Burj Khalifa at its centre",
      },
    },
    {
      title: "Operations Office",
      location: "Remote & International Support",
      operations: ["Project Coordination", "Quality Assurance", "SEO & Digital Marketing", "Technical Support"],
      image: {
        src: assets.aboutOfficeInternational,
        width: 1008,
        height: 700,
        alt: "City lights reflected in a river at night",
      },
    },
  ],
};
