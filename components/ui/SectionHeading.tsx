import type { ComponentProps } from "react";

const tones = {
  /** Services. */
  ink: "text-ink",
  /** Our Work, Our Process, FAQ. */
  navy: "text-navy",
  /** Industries. */
  black: "text-black",
};

type SectionHeadingProps = ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
  tone?: keyof typeof tones;
};

/**
 * The section title used under an eyebrow: 26–48px on small screens, 34–52px from 1024px.
 * Put the red part in `<span className="text-brand">`, and use `<br />` or `MaskLine` for line breaks.
 * To change line height or letter spacing for one design, use `style`: a conflicting class would
 * not reliably win over the built-in one.
 */
export function SectionHeading({ as: Tag = "h2", tone = "ink", className = "", ...props }: SectionHeadingProps) {
  return (
    <Tag
      className={`text-[clamp(26px,7.4vw,48px)] leading-[1.154] font-semibold tracking-[-0.015em] ${tones[tone]} lg:text-[clamp(34px,2.71vw,52px)] ${className}`}
      {...props}
    />
  );
}
