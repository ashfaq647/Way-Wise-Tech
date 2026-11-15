import { assets } from "@/lib/assets";
import { serviceCards } from "@/lib/content/services";

/**
 * The Contact Us page Hero (components/contact/ContactHero.tsx), as written in its reference. Moved
 * out of the component unchanged; the image file, layout, gradient and animation stay there. Both
 * buttons are "#" placeholders. The eyebrow and button labels are Portfolio-style wording, kept
 * until the owner confirms the copy.
 */
export const contactHero = {
  eyebrow: "Case Study",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "Let’s Discuss Your", accent: "Next Project" },
  description:
    "Have a project idea or need expert advice? Our team is here to help. Get in touch and let's build something amazing together.",
  primaryAction: { label: "Visit Live Website", href: "#" },
  secondaryAction: { label: "Discuss a Similar Project", href: "#" },
  imageAlt:
    "Two business people in suits shaking hands over a desk with documents, a pen and a laptop, a city skyline behind",
};

export type ContactOverviewIcon = "lightbulb" | "team" | "laptop" | "chat-check";

/**
 * "Client Overview" on the Contact Us page, as written in its reference (Frame 2147239128.png).
 * The card descriptions repeat the Service Details "Why Choose Us" text word for word; kept as
 * drawn until the owner confirms the copy.
 */
export const contactOverview = {
  eyebrow: "Client Overview",
  heading: { first: "Client", second: "Overview" },
  description:
    "We combine creativity, user research, and business strategy to deliver designs that not only look great, but also drive results.",
  image: {
    src: assets.contactClientOverview,
    width: 1500,
    height: 545,
    alt: "Laptop, phone and tablet on stone blocks showing a property website design, with wireframe cards above",
  },
  channels: [
    {
      title: "Call Us",
      description: "We design with your users in mind to create meaningful experiences.",
      icon: "lightbulb",
      tone: "#ecd4ba",
    },
    {
      title: "Email Us",
      description: "Skilled UI/UX designers with experience across different industries.",
      icon: "team",
      tone: "#c0d0fe",
    },
    {
      title: "Live Chat",
      description: "Clear, modern, and easy to scale for future growth and success.",
      icon: "laptop",
      tone: "#fedcdd",
    },
    {
      title: "Meeting",
      description: "Complete design support from concept to final delivery.",
      icon: "chat-check",
      tone: "#cef3e4",
    },
  ] satisfies { title: string; description: string; icon: ContactOverviewIcon; tone: string }[],
};

/**
 * "Have a Project Idea?" on the Contact Us page, as written in its reference
 * (Frame 2147239130 (1).png). The three office pins and their labels are part of the map image.
 */
export const contactLocations = {
  heading: { first: "Have a Project Idea?", second: "Let’s get started" },
  description:
    "We'll schedule a call to discuss your idea. After discovery sessions, we'll send a proposal, and upon approval, we'll get started.",
  image: {
    src: assets.contactMap,
    width: 3840,
    height: 2160,
    alt: "World map with office locations pinned in Los Angeles, USA; Dubai, UAE; and Dhaka, Bangladesh",
  },
};

export type ContactField = {
  name: string;
  label: string;
  required: boolean;
  placeholder: string;
  /** Plain inputs; "select" and "textarea" are drawn separately. */
  type: "text" | "email" | "tel" | "select" | "textarea";
  autoComplete?: string;
  /** Options for a select, after its placeholder. */
  options?: readonly string[];
};

/**
 * "Send Us a Message" on the Contact Us page, as written in its reference (section.png). Project
 * Type lists the six services and Budget Range the owner's generic budget bands, both by the
 * owner's instruction.
 */
export const contactMessage = {
  eyebrow: "Send Us a Message",
  heading: { first: "Tell Us About", second: "Your Project" },
  description: "Fill out the form below and our team will get back to you shortly.",
  fields: [
    { name: "name", label: "Full Name", required: true, placeholder: "David Michel", type: "text", autoComplete: "name" },
    { name: "company", label: "Your Company", required: false, placeholder: "Your Company", type: "text", autoComplete: "organization" },
    { name: "email", label: "Email Address", required: true, placeholder: "john@company.com", type: "email", autoComplete: "email" },
    { name: "phone", label: "Phone Number", required: true, placeholder: "+1 201 456 789", type: "tel", autoComplete: "tel" },
    {
      name: "projectType",
      label: "Project Type",
      required: true,
      placeholder: "Select a service",
      type: "select",
      options: serviceCards.map((service) => service.title),
    },
    {
      name: "budget",
      label: "Budget Range",
      required: true,
      placeholder: "Select budget range",
      type: "select",
      // Generic budget bands supplied by the owner (2026-11-10), exactly as written.
      options: [
        "Under $1,000",
        "$1,000 – $3,000",
        "$3,000 – $5,000",
        "$5,000 – $10,000",
        "$10,000 – $25,000",
        "$25,000+",
        "Not sure yet",
      ],
    },
    {
      name: "details",
      label: "Project Details",
      required: true,
      placeholder: "Tell us about your project, goals, and requirements...",
      type: "textarea",
    },
  ] satisfies ContactField[],
  submitLabel: "Send Message",
};

/** "Our Offices" on the Contact Us page, as written in its reference (section.png). */
export const contactOffices = {
  eyebrow: "Our Offices",
  heading: { first: "We’re Global,", accent: "Always", second: "Close to You" },
  description:
    "With offices in the USA and UAE, our team is available across multiple time zones to support your business.",
  offices: [
    {
      name: "Los Angeles Office",
      address: "Saddleback Ridge rd, Santa Clarita, California, USA",
      phone: "+1 (310) 528-6170",
      hours: "Mon – Fri: 9 AM – 5 PM",
      image: { src: assets.contactOfficeLosAngeles, width: 302, height: 300, alt: "Downtown Los Angeles skyscrapers and freeways" },
    },
    {
      name: "Dubai Office",
      address: "Arzoo Building, 3rd floor (306-14), 171 Al Nahda St, Al Qusais 2, Dubai",
      phone: "+971 52 144-2416",
      hours: "Mon – Fri: 9 AM – 5 PM",
      image: { src: assets.contactOfficeDubai, width: 300, height: 300, alt: "Dubai skyline with the Burj Khalifa" },
    },
    {
      name: "Dhaka Office",
      address: "House: B/148, Road: 22, Mohakhali DOHS, Dhaka, Bangladesh, 1212",
      phone: "+880 1748-771945",
      hours: "Sun – Thu: 9 AM – 5 PM",
      image: { src: assets.contactOfficeDhaka, width: 300, height: 300, alt: "Aerial view of Dhaka" },
    },
  ],
};

/**
 * The Final CTA section (components/home/FinalCta.tsx), shared by the Homepage, /services, every
 * Service Details page, /industries, /about and /our-work. Its heading and description repeat
 * `contactLocations` above word for word; the two are kept separate (that section is approved and
 * frozen). The form is visual only: nothing is submitted until a backend exists.
 */
export const finalCta = {
  /** The first line is navy; the whole `second` line is red. */
  heading: { first: "Have a Project Idea?", second: "Let’s get started" },
  description:
    "We'll schedule a call to discuss your idea. After discovery sessions, we'll send a proposal, and upon approval, we'll get started.",
  promises: ["We will respond to you within 24 hrs", "We’ll sign an NDA if requested."],
  /** Photos are 330x358. Each photo's alt text is the person's name (set in the component). */
  team: [
    { name: "Firoz Bari", role: "Chairman", photo: { src: assets.ctaChairman, width: 330, height: 358 } },
    { name: "Seung Lee", role: "CEO", photo: { src: assets.ctaCeo, width: 330, height: 358 } },
    { name: "Fiona Bari", role: "CFO", photo: { src: assets.ctaCfo, width: 330, height: 358 } },
  ],
  form: {
    /** Two lines, broken where the design breaks them. */
    heading: ["Lets Talk About Your Next", "Project with Expert"],
    description: "Provide your project details, and we'll contact you shortly.",
    /** As in contactMessage: each label is also the input's placeholder and aria-label. */
    fields: [
      { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
      { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
      { name: "email", label: "Email Address", type: "email", autoComplete: "email" },
    ],
    detailsLabel: "Project Details",
    submitLabel: "Start Our Free Consultation",
  },
};
