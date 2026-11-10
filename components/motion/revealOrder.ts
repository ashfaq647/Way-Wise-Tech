import type { CSSProperties } from "react";

/** Sets the position in a stagger for `.ww-rise` elements. Separate from Reveal so Server Components can call it. */
export function revealOrder(order: number) {
  return { "--ww-i": order } as CSSProperties;
}
