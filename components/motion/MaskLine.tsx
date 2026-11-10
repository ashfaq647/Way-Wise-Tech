import type { ReactNode } from "react";
import { revealOrder } from "./revealOrder";
import "./motion.css";

type MaskLineProps = {
  children: ReactNode;
  /** Position in the stagger. */
  order?: number;
  /** Colour or other classes for the line's text. */
  className?: string;
  /** Plays on page load using CSS alone. Otherwise it plays with the surrounding Reveal. */
  onLoad?: boolean;
};

/** One headline line that rises from behind a mask. Add a space between lines for screen readers. */
export function MaskLine({ children, order = 0, className = "", onLoad = false }: MaskLineProps) {
  return (
    <span className={`ww-line ${onLoad ? "ww-line--load" : ""}`}>
      <span className={`ww-line__text ${className}`} style={revealOrder(order)}>
        {children}
      </span>
    </span>
  );
}
