import type { ComponentProps } from "react";

const widths = {
  /** The site's content width: 1560px between x=180 and x=1740 at 1920. */
  wide: "max-w-[1600px]",
  /** Final CTA's narrower frame: 1304px between x=308 and x=1612 at 1920. */
  narrow: "max-w-[1344px]",
};

type ContainerProps = ComponentProps<"div"> & {
  width?: keyof typeof widths;
};

/**
 * The horizontal page frame used by every section. Vertical padding is left to each section,
 * because it differs from design to design.
 */
export function Container({ width = "wide", className = "", ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${widths[width]} px-5 md:px-8 xl:px-5 ${className}`} {...props} />
  );
}
