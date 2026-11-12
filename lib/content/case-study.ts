import { assets } from "@/lib/assets";

/**
 * The Case Study page Hero, from "Hero Section (1).png" (Case Study version). All wording is the
 * reference's. "Visit Live Website" has no destination yet (no URL was supplied), so it is "#";
 * "Discuss a Similar Project" goes to the existing Contact page, as the other inner-page Heroes'
 * project buttons do.
 */
export const caseStudyHero = {
  eyebrow: "Case Study",
  heading: { first: "Accident Law Firm Website", second: "That Drives", highlight: "Real Results." },
  description:
    "We create intuitive, user-focused designs that turn ideas into beautiful digital products and make every interaction simple and engaging.",
  primaryAction: { label: "Visit Live Website", href: "#" },
  secondaryAction: { label: "Discuss a Similar Project", href: "/contact" },
  image: {
    src: assets.caseStudyHero,
    width: 3840,
    height: 1616,
    alt: "A laptop showing a personal injury law firm website on a marble desk, beside a plant and brass scales",
  },
};

/** Icon names for the Client Overview details. The reference draws one icon for every detail. */
export type CaseStudyDetailIcon = "users";

/**
 * The Case Study "Client Overview" section, from Frame 2147239145.png. All wording is the
 * reference's, as drawn: every detail's value reads "Law Farm/Personal Injury" (a placeholder in the
 * design, spelling included) until the owner supplies the real project details.
 */
export const caseStudyOverview = {
  eyebrow: "Client Overview",
  heading: { first: "Client", second: "Overview" },
  description:
    "We combine creativity, user research, and business strategy to deliver designs that not only look great, but also drive results.",
  image: {
    src: assets.caseStudyOverview,
    width: 1502,
    height: 545,
    alt: "A laptop, phone and tablet on a sunlit stone plinth showing a property website design, with wireframe cards above",
  },
  details: [
    { label: "Industry", value: "Law Farm/Personal Injury", icon: "users" },
    { label: "Project Duration", value: "Law Farm/Personal Injury", icon: "users" },
    { label: "Location", value: "Law Farm/Personal Injury", icon: "users" },
    { label: "Website", value: "Law Farm/Personal Injury", icon: "users" },
    { label: "Solution", value: "Law Farm/Personal Injury", icon: "users" },
    { label: "Services", value: "Law Farm/Personal Injury", icon: "users" },
  ] satisfies { label: string; value: string; icon: CaseStudyDetailIcon }[],
};

/**
 * The Case Study "Challenge & Solution" section, from Frame 2147239025.png. All wording is the
 * reference's, with its two typos corrected by the owner (2026-11-12: "outdated", "performance").
 * The three repeated "On-page SEO and technical optimization" points are kept as drawn until the
 * owner supplies the intended copy. Points are in reading order: left then right, row by row.
 * A "\n" marks a line break the design sets by hand; it applies where the points use the
 * reference's two-column layout (from lg) and is an ordinary space elsewhere.
 */
export const caseStudyChallenges = {
  eyebrow: "The Challenge & Our Solution",
  heading: { first: "Turning Challenges", second: "Into Solutions" },
  description:
    "We understand business challenges and create smart digital solutions that improve performance, attract customers, and support business growth.",
  challenge: {
    eyebrow: "The Challenge",
    heading: { first: "Key", second: "Challenges" },
    points: [
      "Old and outdated website design",
      "Low online visibility and organic traffic",
      "Unclear messaging and service information",
      "Limited trust signals and case\nresults",
      "Low conversion rate from visitors to inquiries",
      "Not mobile-friendly and slow performance",
    ],
  },
  solution: {
    eyebrow: "Our Solution",
    heading: { first: "Our", second: "Approach" },
    points: [
      "Mobile responsive and fast-loading website",
      "Dedicated practice area pages",
      "On-page SEO and technical optimization",
      "On-page SEO and technical optimization",
      "On-page SEO and technical optimization",
      "Lead generation focused structure",
    ],
  },
};

/**
 * The Case Study "Technology Stack" section, from Frame 2147239147.png. The reference repeats Rank
 * Math in three cards; by the owner's decisions (2026-11-12) it appears once, and React and Next.js
 * are added after the reference's technologies, making twelve cards in a full 4 x 3 grid. The AWS
 * role is "Hosting" by the owner's decision (the reference repeats Google Analytics' "Tracking").
 * Everything else is the reference's wording; the two added roles were chosen for this build.
 *
 * Each logo's `size` is its box at 1920 (width, height in px), chosen so the logo's visible ink
 * matches the reference's (several files have transparent margins inside their viewBox).
 *
 * `frame` (optional) shows only part of an unedited file, as fractions of its width and height,
 * by CSS framing. Rank Math uses it (owner-approved 2026-11-12): its official SVG is the mark plus
 * the "RankMath" wordmark, and the reference shows the mark alone, the left 26.35% of the file.
 */
export type CaseStudyTechItem = {
  name: string;
  role: string;
  logo: string;
  size: [number, number];
  frame?: { x: number; y: number; w: number; h: number };
};

export const caseStudyTech = {
  eyebrow: "Technology Stack",
  heading: { first: "Technologies", second: "We Used" },
  description:
    "We used modern and reliable technologies to build a fast, secure and scalable website.",
  items: [
    { name: "Figma", role: "UI/UX Design", logo: assets.techFigma, size: [53, 53] },
    { name: "HTML5", role: "Markup", logo: assets.techHtml5, size: [53, 53] },
    { name: "CSS3", role: "Styling", logo: assets.techCss3, size: [53, 53] },
    { name: "JavaScript", role: "Functionality", logo: assets.techJavascript, size: [53, 53] },
    { name: "WordPress", role: "CMS", logo: assets.techWordpress, size: [53, 53] },
    { name: "PHP", role: "Backend", logo: assets.techPhp, size: [63, 34] },
    { name: "MySQL", role: "Database", logo: assets.techMysql, size: [53, 53] },
    { name: "AWS", role: "Hosting", logo: assets.techAws, size: [72, 72] },
    { name: "Google Analytics", role: "Tracking", logo: assets.techGoogleAnalytics, size: [58, 58] },
    {
      name: "Rank Math",
      role: "SEO",
      logo: assets.techRankMath,
      size: [54, 33],
      frame: { x: 0, y: 0, w: 0.26349, h: 1 },
    },
    { name: "React", role: "Frontend", logo: assets.techReact, size: [56, 56] },
    { name: "Next.js", role: "Framework", logo: assets.techNextjs, size: [53, 53] },
  ] satisfies CaseStudyTechItem[] as CaseStudyTechItem[],
};

/**
 * The Case Study trust section, "A Trusted Partner Across Industries", from Trust Section.png. All
 * wording is the reference's, as drawn: the four results and their shared line ("Significant
 * increase in case inquiries within 3 months.", repeated on every card) are the design's, to
 * confirm with the owner before launch. The logo row is the client logos without r&n, as drawn.
 *
 * Each logo's `size` is its box at 1920 (width, height in px), chosen so its visible ink matches
 * the reference. `blend` marks the two logos whose SVG wraps a JPEG with a white background: they
 * are drawn with mix-blend-mode: darken, so the white takes the section's colour, as in the design.
 */
export const caseStudyResults = {
  eyebrow: "Why Businesses Choose Us",
  heading: { first: "A Trusted Partner", second: "Across Industries" },
  description: "We understand different business needs and deliver designs that create real value.",
  results: [
    { value: "3.5x", label: "More Inquiries", text: "Significant increase in case inquiries within 3 months." },
    { value: "60%", label: "Lower Bounce Rate", text: "Significant increase in case inquiries within 3 months." },
    { value: "2x", label: "Organic Traffic", text: "Significant increase in case inquiries within 3 months." },
    { value: "High", label: "Client Satisfaction", text: "Significant increase in case inquiries within 3 months." },
  ],
  logos: [
    { name: "Seat Waves", size: [165, 46], blend: false },
    { name: "FileWyse", size: [185, 50], blend: true },
    { name: "FlyArzan", size: [200, 47], blend: true },
    { name: "PenWise", size: [238, 46], blend: false },
    { name: "Michael D. Finley", size: [230, 46], blend: false },
    { name: "Arizona Accidents Angels", size: [141, 46], blend: false },
  ] satisfies { name: string; size: [number, number]; blend: boolean }[],
};
