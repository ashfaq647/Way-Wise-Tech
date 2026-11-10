import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "border-2 tracking-[0.01em] border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark",
  secondary: "border-2 tracking-[0.01em] border-[#998775] text-ink hover:border-ink hover:bg-ink hover:text-white",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  /** The outline button on navy-toned sections, as in Our Work. */
  "navy-outline": "border border-navy text-navy hover:bg-navy hover:text-white",
};

/** Figma buttons use both weights. A prop avoids `font-medium!` overrides fighting the default. */
const weights = {
  medium: "font-medium",
  semibold: "font-semibold",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  weight?: keyof typeof weights;
};

export function ButtonLink({
  variant = "primary",
  weight = "semibold",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg ${weights[weight]} transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
