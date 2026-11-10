import type { ReactNode } from "react";

/** Size from 1024px up. Below that every eyebrow is 16px. */
const sizes = {
  /** Service List Hero. */
  sm: "lg:text-[clamp(14px,0.833vw,16px)]",
  /** Services, Industries. */
  md: "lg:text-[18px]",
  /** Our Work, Our Process, FAQ. */
  lg: "lg:text-[clamp(16px,1.042vw,20px)]",
};

const weights = {
  semibold: "font-semibold",
  bold: "font-bold",
};

type SectionEyebrowProps = {
  children: ReactNode;
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
  /** The short red bar before the text. The Service List Hero label has none. */
  bar?: boolean;
  /** Extra classes for the bar, such as an optical nudge like `-translate-y-px`. */
  barClassName?: string;
  /**
   * Letter spacing. Figma sections use 0.078em (most), 0.09em (Our Process) and 0.066em (Service
   * List Hero). Set inline so it never conflicts with a class.
   */
  tracking?: string;
  /** Spacing and layout classes. */
  className?: string;
};

/** The small red uppercase label above a section heading. */
export function SectionEyebrow({
  children,
  size = "md",
  weight = "semibold",
  bar = true,
  barClassName = "",
  tracking = "0.078em",
  className = "",
}: SectionEyebrowProps) {
  return (
    <p
      style={{ letterSpacing: tracking }}
      className={`${bar ? "flex items-center gap-2" : ""} text-[16px] leading-5 ${weights[weight]} text-brand uppercase ${sizes[size]} ${className}`}
    >
      {bar && <span className={`h-[3px] w-[22px] shrink-0 bg-brand ${barClassName}`} aria-hidden="true" />}
      {children}
    </p>
  );
}
