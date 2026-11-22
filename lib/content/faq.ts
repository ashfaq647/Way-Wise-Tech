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

/**
 * The shared FAQ section (components/sections/Faq.tsx), on /services, every Service Details page
 * and /contact. Moved out of the component unchanged; layout, the accordion and animation stay there. Separate from the /faq page's content above: the two sets of questions
 * are different and are not to be merged.
 *
 * Questions are from the design. Answers are drafts: confirm them before launch.
 *
 * `items` is in display order, one column (2026-11-17, Frame 2147239032.png): the reference's six
 * questions in its order, then the two it does not show.
 * "Contact Us" is a "#" placeholder until its destination is confirmed.
 */
export const servicesFaq = {
  eyebrow: "Frequently Asked Questions",
  /** The first line is navy; the second is the red `accent`. */
  heading: { first: "Common Questions", accent: "About Our Services" },
  description: "Still have questions? We’re here to help with answers and support whenever you need us.",
  action: { label: "Contact Us", href: "#" },
  items: [
    {
      question: "What industries do you work with?",
      answer:
        "We work with businesses across many sectors, including legal, healthcare, restaurants, retail, real estate, and home services. Every project starts with understanding your industry, so the solution fits how your business actually runs.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "It depends on the size and complexity of the project. We'll share a proposed timeline after discovery and keep you updated at each stage, so you always know where things stand.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes. We offer support and maintenance after launch, including fixes, updates, and improvements. The level of support is agreed with you based on what your product needs.",
    },
    {
      question: "Can you help with both design and development?",
      answer:
        "Yes. We can handle both, from UI/UX design through development and launch, or join at the stage where you need us. We tailor the work to your goals rather than using a one-size-fits-all approach.",
    },
    {
      question: "What is the cost of a project?",
      answer:
        "Cost depends on your project's scope, features, and complexity, so there is no single price. After we discuss your goals, we'll send a proposal outlining the work and its cost before anything starts.",
    },
    {
      question: "Do you work with startups and small businesses?",
      answer:
        "Yes. We work with businesses of different sizes. If you're just starting out, we can help you plan a focused first version and build on it as you grow.",
    },
    {
      question: "Will my website or app be mobile-friendly?",
      answer:
        "Yes. We design websites and apps to work well across phones, tablets, and desktops, and we check them on different screen sizes during development.",
    },
    {
      question: "Can you integrate third-party tools and APIs?",
      answer:
        "Yes. We can connect your product with third-party tools through their APIs, such as payment, CRM, or marketing platforms. We'll review what you use and confirm what's possible during planning.",
    },
  ],
};
