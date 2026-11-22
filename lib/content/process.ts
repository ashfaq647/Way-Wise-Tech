/*
  The Our Process section (components/sections/our-process/OurProcess.tsx), shared by /services, every Service
  Details page, /about, /case-study and /our-work. Moved out of the component unchanged; the
  component keeps the layout, styling, icons, colours and animation.
*/

/**
 * The section's text, exactly as in the design. The steps are in display order; their icons and
 * circle colours stay in the component, matched to these steps by position. Step 04's description
 * has no full stop, as in the reference.
 */
export const ourProcess = {
  eyebrow: "Our Process",
  /** The first line is navy; the second is the red `accent`. */
  heading: { first: "A Simple Process", accent: "Real Results" },
  description:
    "We follow a clear and collaborative process to turn your ideas into successful digital products.",
  steps: [
    {
      title: "Discover",
      description: "We learn about your business, goals, users, and project requirements.",
    },
    {
      title: "Plan",
      description: "We create a clear project plan, timeline, and development strategy.",
    },
    {
      title: "Design & Develop",
      description: "We design modern, simple, and user-friendly digital experiences.",
    },
    {
      title: "Develop",
      description: "Our developers build, test, and improve your digital solution",
    },
    {
      title: "Launch & Support",
      description: "We launch your product and provide support to keep it running smoothly.",
    },
  ],
};
