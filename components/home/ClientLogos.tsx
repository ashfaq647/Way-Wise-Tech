import Image from "next/image";
import { clientLogos } from "@/lib/assets";

export function ClientLogos() {
  return (
    <section aria-label="Our clients" className="bg-white">
      <ul className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-center gap-x-10 gap-y-8 px-5 py-10 md:px-8 lg:h-[132px] lg:flex-nowrap lg:justify-between lg:gap-x-6 lg:py-0 xl:px-5">
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
