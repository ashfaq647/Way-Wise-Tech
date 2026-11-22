// Plain module (not "use client"), so Server Components get the class strings themselves:
// a constant imported from a client file reaches a Server Component as a client reference.

/**
 * The shared sticky header for a card stack (Homepage Our Work, Industries Industry Solutions). Put
 * it on the header that comes first in the stack's parent, above the list. From lg, with motion
 * allowed, the header stays at its arrival position (the parent's top padding, --stack-head, set by
 * CardStack) while the cards stack below it; the parent is its containing block, so it leaves with
 * the section. Until CardStack has measured, `top` is invalid and the header scrolls normally.
 */
export const stackHeader = "lg:motion-safe:sticky lg:top-(--stack-head)";

/**
 * The shared stacked card (each <li>; set `--i` to its index). Plain CSS stacking: each card pins
 * 16px lower than the last and later cards paint on top, so every earlier card stays visible as a
 * 16px edge; scrolling up reverses it. --t is the first card's pin: below lg the compact navbar plus
 * a gap; from lg the list's own arrival position under the sticky header (--stack-top, measured by
 * CardStack), so card 1 pins where it arrives and the stack never covers the header. A card too tall
 * for its pin stops 12px above the screen bottom. Sticky only with motion allowed; until CardStack
 * has measured, `top` is invalid and the cards scroll normally.
 */
export const stackCard = [
  "motion-safe:sticky",
  "top-[min(calc(var(--t)+var(--i)*16px),calc(100svh-var(--card-height)-12px))]",
  "[--t:88px] md:[--t:96px] lg:[--t:var(--stack-top)]",
].join(" ");
