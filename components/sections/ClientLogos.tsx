import type { CSSProperties } from "react";
import Image from "next/image";
import { clientLogos } from "@/lib/assets";
import { ClientLogosTiming } from "./ClientLogosTiming";
import "./client-logos.css";

/**
 * Nominal marquee speed, CSS px per second: the durations below are each set's exact width / SPEED.
 * ClientLogosTiming then scales them (--cl-rate) so the strip moves a whole number of device pixels
 * per frame on the actual screen (pixel ratio and refresh rate), which keeps the logos from shimmering.
 */
const SPEED = 60;

/** Logo height and gap per width (base, md, lg): the sizes used in client-logos.css. */
const sizes = [
  { height: 24, gap: 48 },
  { height: 28, gap: 64 },
  { height: 34, gap: 88 },
];

/**
 * One set's exact width: each logo's rendered width (its ratio at that height, rounded down to the
 * browser's 1/64px layout unit, as measured) plus one gap per logo. The animation moves the track by
 * exactly this distance, so its duration is distance / SPEED.
 */
function loopDistance(height: number, gap: number) {
  return clientLogos.reduce((sum, logo) => sum + Math.floor(((logo.width * height) / logo.height) * 64) / 64 + gap, 0);
}

const stripVars = Object.fromEntries(
  sizes.flatMap(({ height, gap }, index) => [
    [`--cl-h${index}`, `${height}px`],
    [`--cl-gap${index}`, `${gap}px`],
    [`--cl-duration${index}`, `${(loopDistance(height, gap) / SPEED).toFixed(4)}s`],
  ]),
) as CSSProperties;

/**
 * The strip's height from lg up. "default" is 132px (the original design, every inner page).
 * "compact" is 100px: the 2026-11-16 Homepage redesign, where the Hero and this strip fill one
 * 1920x942 frame (logos centred at y 875-908). Below lg the strip is 88px (100px from md).
 */
const heights = {
  default: "lg:h-[132px]",
  compact: "lg:h-[100px]",
};

type ClientLogosProps = {
  height?: keyof typeof heights;
};

type LogoSetProps = {
  /** The repeat copy that closes the loop: hidden from assistive technology, with empty alt text. */
  duplicate?: boolean;
};

function LogoSet({ duplicate = false }: LogoSetProps) {
  return (
    <ul className="cl-set flex shrink-0 items-center" aria-hidden={duplicate || undefined}>
      {clientLogos.map((logo) => (
        <li key={logo.name} className="cl-logo shrink-0">
          <Image
            src={logo.src}
            alt={duplicate ? "" : logo.name}
            width={logo.width}
            height={logo.height}
            className="h-(--cl-h) w-auto max-w-none"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * The shared Client Logo Strip: a continuous, seamless marquee of every client logo (motion and
 * reduced-motion behaviour in client-logos.css). Within the usual 1560px content frame.
 */
export function ClientLogos({ height = "default" }: ClientLogosProps) {
  return (
    <section aria-label="Our clients" className="bg-white">
      <div
        className={`cl-strip mx-auto flex h-[88px] w-full max-w-[1600px] items-center px-5 md:h-[100px] md:px-8 ${heights[height]} xl:px-5`}
        style={stripVars}
      >
        <ClientLogosTiming />
        <noscript>
          <style>{".cl-track{animation-play-state:running!important}"}</style>
        </noscript>
        <div className="cl-viewport w-full overflow-hidden">
          <div className="cl-track flex w-max">
            <LogoSet />
            <LogoSet duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
