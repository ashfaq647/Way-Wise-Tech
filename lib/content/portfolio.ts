import { assets } from "@/lib/assets";

/**
 * The Our Portfolio page Hero (components/portfolio/PortfolioHero.tsx), as written in its reference.
 * Moved out of the component unchanged; the image file, layout, gradient and animation stay there.
 * Both buttons are "#" placeholders until their destinations are confirmed.
 */
export const portfolioHero = {
  eyebrow: "Our Portfolio",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "Real Projects.", accent: "Real Results." },
  description:
    "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
  primaryAction: { label: "Start a Project", href: "#" },
  secondaryAction: { label: "Let’s Talk", href: "#" },
  imageAlt:
    "Laptop and phone on a sunlit desk showing property management, medical clinic, law firm and restaurant website designs",
};

/** One testimonial in the Our Portfolio testimonial carousel. Images follow the `{ src, width, height, alt }` shape. */
export type PortfolioTestimonial = {
  /** Stable key for the card. */
  id: string;
  /**
   * True while the entry is sample copy, not a verified client review. Not shown on the page; it
   * marks what must be replaced (or set to false once a real, approved testimonial is in place).
   */
  draft: boolean;
  /** The short line above the quote, animated in word by word. Optional. */
  headline?: string;
  name: string;
  role: string;
  quote: string;
  image: { src: string; width: number; height: number; alt: string };
  /** The star rating row, shown only where the design supplied one. */
  rating?: { value: number; label: string; reviews: string };
};

/**
 * The Our Portfolio page's testimonial section ("What Our Clients Say About Us"), shown since
 * 2026-11-15 as a testimonial carousel (components/sections/testimonials/TestimonialFlow.tsx): the first entry
 * is shown first, and Prev/Next step through them in this order.
 *
 * SAMPLE CONTENT, NOT VERIFIED REVIEWS (every entry has `draft: true`). Every quote and headline is
 * draft copy written for this build about one of WayWise's services; each headline only restates
 * its own quote. Replace them with real client testimonials before launch.
 * - Names: Amy Marie and her role are the reference's. The other first names are taken only from the
 *   supplied image file names (Brandon, jad, Morgan, Nichol); "Client Name" (Search.png) has no name.
 *   "Role, Company Name" is a placeholder: no role or company is known for them.
 * - Rating: only Amy Marie's card has one, the reference's "4.5/5" and "Based on +300 reviews",
 *   still provisional pending the owner's verification. No other rating or review count is given.
 * - Alt text describes what each photo shows, without guessing who the person is.
 */
export const portfolioTestimonials = {
  eyebrow: "Why Choose WayWise",
  heading: { first: "What Our Clients", second: "Say About Us" },
  description: "We design simple, modern, and easy-to-use digital products.",
  /** Display order: the first is shown first. */
  testimonials: [
    {
      id: "brandon",
      draft: true,
      headline: "A website our team can finally run.",
      name: "Brandon",
      role: "Role, Company Name",
      quote:
        "“WayWise rebuilt our website from the ground up. The new pages are clearer, quicker to load and much easier for our own team to update, and they kept us informed at every step.”",
      image: {
        src: assets.portfolioTestimonialBrandon,
        width: 667,
        height: 1000,
        alt: "Portrait of a man in a navy blazer, white shirt and tan trousers",
      },
    },
    {
      id: "jad",
      draft: true,
      headline: "From a rough idea to an app people enjoy.",
      name: "Jad",
      role: "Role, Company Name",
      quote:
        "“We came to WayWise with only a rough idea for a mobile app. They helped us shape it, reviewed every screen with us, and delivered an app our customers find genuinely easy to use.”",
      image: {
        src: assets.portfolioTestimonialJad,
        width: 667,
        height: 1000,
        alt: "Portrait of a man in sunglasses and a light blue shirt, holding a laptop on a city street",
      },
    },
    {
      id: "morgan",
      draft: true,
      headline: "Software built around how we work.",
      name: "Morgan",
      role: "Role, Company Name",
      quote:
        "“Our old internal tools were slowing everyone down. WayWise took the time to understand how we actually work and built software around it, so everyday tasks finally feel straightforward.”",
      image: {
        src: assets.portfolioTestimonialMorgan,
        width: 668,
        height: 1000,
        alt: "Portrait of a man in glasses and a dark blazer, arms folded, in front of a building entrance",
      },
    },
    {
      id: "client-name",
      draft: true,
      headline: "Automation that made sense for us.",
      name: "Client Name",
      role: "Role, Company Name",
      quote:
        "“WayWise helped us automate the reporting we used to put together by hand. They explained each option in plain language and only automated what genuinely made sense for our business.”",
      image: {
        src: assets.portfolioTestimonialSearch,
        width: 668,
        height: 1000,
        alt: "Portrait of a grey-haired man in a charcoal blazer, seated with his hand to his chin",
      },
    },
    {
      id: "nichol",
      draft: true,
      headline: "A brand with one confident voice.",
      name: "Nichol",
      role: "Role, Company Name",
      quote:
        "“From our new logo to our launch campaign, WayWise gave our brand a consistent, confident voice. Working with them felt like having a creative team in-house.”",
      image: {
        src: assets.portfolioTestimonialNichol,
        width: 300,
        height: 400,
        alt: "Portrait of a smiling woman in a navy blazer and striped shirt, giving a thumbs up",
      },
    },
    {
      id: "amy-marie",
      draft: true,
      headline: "A dashboard that explains itself.",
      name: "Amy Marie",
      role: "CEO & Marketing Manager",
      quote:
        "“WayWise redesigned our product dashboard around how people really use it. The interface feels calm and intuitive now, and new users find their way around without needing help.”",
      image: {
        src: assets.portfolioTestimonialAmy,
        width: 600,
        height: 674,
        alt: "Portrait of Amy Marie in a navy blazer over a polka-dot blouse",
      },
      rating: { value: 4.5, label: "4.5/5", reviews: "Based on +300 reviews" },
    },
  ] satisfies PortfolioTestimonial[],
};

/** One project card in the Our Portfolio showcase. Images follow the `{ src, width, height, alt }` shape. */
export type PortfolioProject = {
  /** Stable key for the card. */
  id: string;
  title: string;
  description: string;
  /** The pills above the title. */
  tags: string[];
  image: { src: string; width: number; height: number; alt: string };
};

/**
 * The single project card drawn in the reference (Frame 2147239009.png), word for word. The real
 * projects are not supplied yet, so every card repeats it (owner, 2026-11-15). Replace each entry,
 * including its image, when the owner supplies the projects. No card links anywhere yet.
 */
const referenceProject: Omit<PortfolioProject, "id"> = {
  title: "Property Management Platform",
  description:
    "Interfaces that are intuitive, elegant, and conversion-focused — from wireframes to pixel-perfect production.",
  tags: ["Mobile App", "eCommerce"],
  image: {
    src: assets.portfolioProperty,
    width: 1026,
    height: 840,
    alt: "Laptop and wall screens showing a property management dashboard with occupancy, rent collection and tenant details",
  },
};

/**
 * The Our Portfolio section between the Hero and Recent Projects (components/portfolio/
 * PortfolioShowcase.tsx), from Frame 2147239009.png. The wording is the reference's. `categories`
 * are the seven labels under the description: plain labels, not filters (owner, 2026-11-15).
 */
export const portfolioShowcase = {
  eyebrow: "Why Choose WayWise",
  /** Three lines: "Why Businesses" / "Choose" + red "WayWise" / red "for UI/UX". */
  heading: { first: "Why Businesses", second: "Choose", accent: "WayWise", third: "for UI/UX" },
  description: "We design simple, modern, and easy-to-use digital products.",
  categories: [
    "Websites",
    "Mobile Apps",
    "SaaS Platforms",
    "Custom Software",
    "UI/UX Design",
    "eCommerce",
    "Branding",
  ],
  /** Accessible name of the scrolling card list. */
  listLabel: "Projects",
  projects: Array.from({ length: 6 }, (_, index) => ({
    id: `project-${index + 1}`,
    ...referenceProject,
  })) satisfies PortfolioProject[],
};
