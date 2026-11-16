import Image from "next/image";
import { clientLogos } from "@/lib/assets";

/**
 * The strip's height from lg up. "default" is 132px (the original design, every inner page).
 * "compact" is 100px: the 2026-11-16 Homepage redesign, where the Hero and this strip fill one
 * 1920x942 frame (logos centred at y 875-908). Below lg both are the same wrapping layout.
 */
const heights = {
  default: "lg:h-[132px]",
  compact: "lg:h-[100px]",
};

type ClientLogosProps = {
  height?: keyof typeof heights;
};

export function ClientLogos({ height = "default" }: ClientLogosProps) {
  return (
    <section aria-label="Our clients" className="bg-white">
      <ul
        className={`mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-center gap-x-10 gap-y-8 px-5 py-10 md:px-8 ${heights[height]} lg:flex-nowrap lg:justify-between lg:gap-x-6 lg:py-0 xl:px-5`}
      >
        {clientLogos.map((logo) => (
          <li key={logo.name} className="min-w-0 lg:shrink" style={{ flexBasis: logo.width }}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-auto w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
