import { assets } from "@/lib/assets";

/**
 * The FAQ page Hero, as written in its reference ("Hero Section (1).png", the FAQ version).
 * "Start Your Project" has no destination yet ("#"); "Contact Our Team" points at the existing
 * Contact Us page.
 */
export const faqHero = {
  eyebrow: "Frequently Asked Questions",
  heading: { first: "Have Questions?", accent: "We Have Answers." },
  description:
    "Find answers to common questions about our services, project process, pricing, and support. We're here to make things simple for you.",
  primaryAction: { label: "Start Your Project", href: "#" },
  secondaryAction: { label: "Contact Our Team", href: "/contact" },
  image: {
    src: assets.faqHero,
    width: 3840,
    height: 1614,
    alt: "A glossy red question mark on a marble table in a sunlit room, beside a potted plant on a stack of books",
  },
};

/**
 * The FAQ page's questions section (Frame 2147239138.png): a "Still have a question?" card beside
 * nine questions. The reference's first two questions are kept; the reference repeats the second as
 * a placeholder, so the other seven were written from the site's existing content (the Services
 * cards, Our Process steps, the Industries page, About Us offices and the Contact form). They make
 * no promises on price or timing that the site does not already make.
 */
export const faqQuestions = {
  heading: "Frequently Asked Questions",
  card: {
    title: "Still have a question?",
    description: "A brief conversation can help clarify your options and the most sensible next step.",
    action: { label: "Speak with our team", href: "/contact" },
  },
  items: [
    {
      question: "What types of projects do you design?",
      answer:
        "We design websites, iOS and Android apps, custom software and dashboards, for new products as well as redesigns of existing ones. Our UI/UX and product design work focuses on clean, modern and easy-to-use experiences, built around your users and your business goals.",
    },
    {
      question: "Do you also handle development?",
      answer:
        "Yes. Our team covers web development, mobile app development and custom software development, so the same team can take your project from design through development, testing and launch. If you already have designs or an existing product, we can join at the stage where you need us.",
    },
    {
      question: "Which industries do you work with?",
      answer:
        "We work with businesses across many sectors, including law firms, healthcare, real estate, construction, restaurants and retail. Every project starts by understanding how your industry works, so the solution fits the way your business actually runs.",
    },
    {
      question: "What does your project process look like?",
      answer:
        "We follow five clear stages: Discover, where we learn about your business, goals and users; Plan, where we agree a project plan, timeline and strategy; Design; Develop, where we build and test your solution; and Launch & Support, where we launch your product and help keep it running smoothly.",
    },
    {
      question: "Can you add AI or automation to our business?",
      answer:
        "Yes. Through our AI, Data & Automation service we build smart solutions that automate repetitive tasks, help you make better use of your data and save your team time. We start by reviewing your current workflows and recommend where automation can bring real value.",
    },
    {
      question: "Can you help our business grow online?",
      answer:
        "Yes. Our Branding & Digital Growth service helps businesses improve their online visibility through SEO, branding and digital marketing strategies, alongside a website or app that is built to attract and convert customers.",
    },
    {
      question: "Do you provide support after launch?",
      answer:
        "Yes. Launch is not the end of the project. We offer support and maintenance after launch, including fixes, updates and improvements, and agree the level of support with you based on what your product needs.",
    },
    {
      question: "How is the cost of a project decided?",
      answer:
        "Every project is scoped individually, because cost depends on the features, complexity and scale of what you need. Share your goals and an approximate budget range through our contact form, and we'll send a proposal outlining the work and its cost before anything starts.",
    },
    {
      question: "Where is your team based?",
      answer:
        "Our headquarters is in California, USA, and our development center is in Dubai, UAE, supported by an operations team working remotely and internationally. Together we work with businesses in the USA, the UAE and worldwide.",
    },
  ],
};
