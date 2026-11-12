import { assets } from "@/lib/assets";

/**
 * The Our Portfolio page's testimonial section ("What Our Clients Say About Us"), from
 * Frame 2147239021.png. The design stacks four cards; only the front card has content, and the three
 * behind it are blank by the owner's decision (2026-11-12). All wording is the reference's, kept as
 * provisional content pending final verification by the owner, including the testimonial itself and
 * "Based on +300 reviews".
 */
export const portfolioTestimonials = {
  eyebrow: "Why Choose WayWise",
  heading: { first: "What Our Clients", second: "Say About Us" },
  description: "We design simple, modern, and easy-to-use digital products.",
  /** Blank cards drawn behind the front card, as in the reference. */
  backCards: 3,
  testimonial: {
    name: "Amy Marie",
    role: "CEO & Marketing Manager",
    quote:
      "“Im half way through my 3rd bottle, this has been a life changer for me!! I feel so much better and I have lost almost 10 lbs. Definitely has made a huge difference in my mood, stress and anxiety as well. Highly recommend for anyone struggling with this and looking for relief”",
    rating: 4.5,
    ratingLabel: "4.5/5",
    reviews: "Based on +300 reviews",
    image: {
      src: assets.portfolioTestimonialAmy,
      width: 600,
      height: 674,
      alt: "Portrait of Amy Marie in a navy blazer over a polka-dot blouse",
    },
  },
};
