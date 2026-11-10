import { AssetImage } from "@/components/ui/AssetImage";
import { MaskLine } from "@/components/motion/MaskLine";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { contactLocations } from "@/lib/content/contact";

/**
 * "Have a Project Idea?" on the Contact Us page, from Frame 2147239130 (1).png. The map export
 * (3840x2160) is the whole 1920x1080 frame, sky included, so from lg it fills a section of the
 * same ratio and the centred text sits in its empty top band, every size scaling with the width
 * up to the 1920 values. Below lg the text comes first and the whole map follows, its top edge
 * faded into the sky colour, as on the Contact Hero.
 */
export function ContactLocations() {
  const { heading, description, image } = contactLocations;
  return (
    <section
      aria-labelledby="contact-locations-heading"
      // #dbeefd is the map's sky at the top centre, so the faded top edge meets it below lg.
      className="relative overflow-hidden bg-[#dbeefd] lg:aspect-[1920/1080]"
    >
      <div className="absolute inset-0 hidden lg:block">
        <AssetImage
          src={image.src}
          alt={image.alt}
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <Reveal
        each
        className="relative mx-auto w-full max-w-[1600px] px-5 pt-12 text-center md:px-8 md:pt-16 lg:pt-[clamp(53px,5.208vw,100px)] xl:px-5"
      >
        <h2
          id="contact-locations-heading"
          className="text-[clamp(28px,8.4vw,56px)] leading-[1.06] font-semibold tracking-[-0.01em] text-navy lg:text-[clamp(35px,3.4375vw,66px)]"
        >
          {/* Two lines at every width, as in the design: each MaskLine is its own line. */}
          <MaskLine order={1}>{heading.first} </MaskLine>
          <MaskLine order={2} className="text-brand">
            {heading.second}
          </MaskLine>
        </h2>
        <p
          style={revealOrder(3)}
          // The reference's description looks like Inter. Outfit is kept, spaced 0.04em so its
          // first line is as wide (745px at 1920) and breaks after the same word.
          className="ww-rise mx-auto mt-5 max-w-[34.4em] text-[18px] leading-[1.5] tracking-[0.04em] text-navy lg:mt-[clamp(10px,0.9375vw,18px)] lg:text-[clamp(16px,1.146vw,22px)]"
        >
          {description}
        </p>
      </Reveal>

      {/* Below lg: the whole map, no crop or zoom, its top edge faded into the section colour. */}
      <div
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        className="relative mt-4 [mask-image:linear-gradient(to_bottom,transparent,black_48px)] lg:hidden"
      >
        <AssetImage src={image.src} alt={image.alt} sizes="100vw" className="object-contain" />
      </div>
    </section>
  );
}
