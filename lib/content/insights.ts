import { assets } from "@/lib/assets";

/**
 * The Insights (Blog List) page Hero, as written in its reference ("Hero Section (1).png", the Blog
 * List version). Button labels set by the owner (2026-11-11): "Explore Insights" has no destination
 * yet ("#"), until the Insights content section exists; "Discuss a Project" opens the Contact Us page.
 */
export const insightsHero = {
  eyebrow: "Our Blog & Insights",
  heading: { first: "Fresh Ideas, Smarter", second: "Digital Solutions" },
  description:
    "Explore the latest trends, expert tips, and useful insights on technology, design, AI, and digital growth to help your business move forward.",
  primaryAction: { label: "Explore Insights", href: "#" },
  secondaryAction: { label: "Discuss a Project", href: "/contact" },
  image: {
    src: assets.insightsHero,
    width: 3840,
    height: 1614,
    alt: "A laptop and a phone showing a property website on a sunlit table beside a small potted plant",
  },
};

export type InsightsArticle = {
  slug: string;
  category: string;
  /** ISO date for <time>; shown as written in `dateLabel`. */
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  /** The first, latest article: its title is set larger, as in the reference. */
  featured?: boolean;
  image: { src: string; width: number; height: number; alt: string };
};

const articleImage = (src: string, alt: string) => ({ src, width: 978, height: 560, alt });

/** The article detail page for a slug. The pages themselves are not built yet. */
export const insightsArticleHref = (slug: string) => `/insights/${slug}`;

/**
 * The Insights article grid (Frame 2147239044.png, cards in Frame 2147239113.png). Titles,
 * categories and dates are the reference's. The reference's excerpts belonged to unrelated legal
 * copy, so by the owner's decision (2026-11-11) each excerpt was rewritten to fit its title from the
 * angle of the Finance, Insurance & Accounting industry the site lists and the services it offers
 * (custom software, apps, UI/UX, automation, websites), with no claims, figures or promises.
 * Excerpts show two lines with an ellipsis, as drawn; the full text stays in the page.
 */
export const insightsArticles: InsightsArticle[] = [
  {
    slug: "the-insiders-guide-to-credit-reports",
    category: "Our company",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "The Insider's Guide to Credit Reports",
    excerpt:
      "What a credit report contains, how lenders read it, and how clear digital dashboards can make that information easier for customers to understand.",
    featured: true,
    image: articleImage(assets.insightsArticle1, "A figure seated at a desk with two laptops in a glowing, data-filled room"),
  },
  {
    slug: "the-top-5-factors-that-affect-your-credit-score",
    category: "The app",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "The Top 5 Factors That Affect Your Credit Score",
    excerpt:
      "Payment history, credit usage and more: the factors behind a credit score, and how finance teams can present them clearly in apps and online portals.",
    image: articleImage(assets.insightsArticle2, "A man working on a laptop at a wooden desk surrounded by rocks and glowing embers"),
  },
  {
    slug: "understanding-the-different-types-of-credit",
    category: "Setting up",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "Understanding the Different Types of Credit",
    excerpt:
      "Revolving, instalment and open credit explained, with practical ideas for presenting different credit products clearly on a financial services website.",
    image: articleImage(assets.insightsArticle3, "A man in a suit typing on a laptop while clouds and spheres float above him"),
  },
  {
    slug: "the-pros-and-cons-of-different-credit-cards",
    category: "Start your business",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "The Pros and Cons of Different Credit Cards",
    excerpt:
      "Rewards, fees and interest compared side by side, and how a well-designed comparison page helps customers choose the right card with confidence.",
    image: articleImage(assets.insightsArticle4, "A man in a dark suit standing between walls of glowing server lights"),
  },
  {
    slug: "the-impact-of-late-payments-on-your-credit-score",
    category: "Setting up",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "The Impact of Late Payments on Your Credit Score",
    excerpt:
      "How late payments affect a credit score, and how automated reminders and timely notifications can help customers stay on track with every bill.",
    image: articleImage(assets.insightsArticle5, "A man at a computer desk in the middle of a red and blue circuit-board landscape"),
  },
  {
    slug: "how-to-build-a-strong-credit-history",
    category: "Fintech",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "How to Build a Strong Credit History",
    excerpt:
      "The habits behind a strong credit history, and how a simple, user-friendly mobile app can help people follow their progress over time.",
    image: articleImage(assets.insightsArticle6, "A long corridor lit in red and blue, reflected in a wet floor"),
  },
  {
    slug: "the-importance-of-monitoring-your-credit-report",
    category: "The app",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "The Importance of Monitoring Your Credit Report",
    excerpt:
      "Why regular credit monitoring matters, and how secure dashboards and timely alerts can make checking a credit report part of a customer's routine.",
    image: articleImage(assets.insightsArticle7, "A man working at a desk beside reflective water in warm golden light"),
  },
  {
    slug: "tips-for-improving-your-credit-score",
    category: "Our company",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "Tips for Improving Your Credit Score",
    excerpt:
      "Practical steps for improving a credit score, and how clear content and helpful tools on a finance website can guide customers through each one.",
    image: articleImage(assets.insightsArticle8, "An open laptop on rough ground in front of a fire and dark machinery"),
  },
  {
    slug: "how-to-choose-the-right-credit-card-for-your-needs",
    category: "The app",
    date: "2026-07-15",
    dateLabel: "Jul 15, 2026",
    title: "How to Choose the Right Credit Card for Your Needs.",
    excerpt:
      "Matching a credit card to real spending needs, and how thoughtful UX design turns complex product details into a clear and confident choice.",
    image: articleImage(assets.insightsArticle9, "A woman seated on rocks using a laptop, surrounded by floating documents"),
  },
];

/** The reference's pagination: four pages with the first current. Only one page of articles exists. */
export const insightsPagination = { current: 1, total: 4 };
