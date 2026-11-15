import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { StaggerText } from "@/components/motion/StaggerText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";
import { footerIndustries } from "@/lib/content/industries";
import {
  aboutUsLink,
  companyLinks,
  legalLinks,
  navBrandCard,
  socialLinks,
} from "@/lib/content/navigation";
import { services } from "@/lib/content/services";
import { FooterBackground } from "./FooterBackground";

/*
  Destinations for column links that have a page: About Us and Insights so far (owner, 2026-11-11),
  read from the Navbar's navigation data so each URL lives in one place. Every other link stays a
  "#" placeholder until the owner provides or approves its destination.
*/
const insightsLink = companyLinks.find((link) => link.label === "Insights");
const linkHrefs: Record<string, string> = {
  [aboutUsLink.label]: aboutUsLink.href,
  ...(insightsLink && { [insightsLink.label]: insightsLink.href }),
};

/*
  Column labels come from the shared content lists, in their order. Only the labels are reused: each
  link's destination still comes from `linkHrefs` above, so the Footer's links stay exactly as they
  are (the Navbar data has more real routes, which the Footer does not use yet).
*/
const columns = [
  {
    title: "Services",
    links: services.map((service) => service.title),
    action: "View All Services",
  },
  {
    title: "Industries",
    links: footerIndustries,
    action: "View All Industries",
  },
  {
    title: "Company",
    links: companyLinks.map((link) => link.label),
    action: "Contact Us",
  },
];

// Labels and icons are shared; the social and legal links below stay "#" placeholders.
const legal = legalLinks.map((link) => link.label);

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// One tight shadow keeps text legible where the light beams cross bright knots in the artwork.
// Stacking more layers makes the type look hazy.
const textShadow = "[text-shadow:0_1px_2px_rgb(0_10_30/0.75)]";

export function SiteFooter() {
  return (
    // Fills the screen when motion is allowed, so it fully covers the pinned Final CTA as it rises.
    <footer className="relative overflow-hidden bg-[linear-gradient(to_bottom,#011530_50%,#00122b_50%)] text-white motion-safe:flex motion-safe:min-h-svh motion-safe:flex-col motion-safe:justify-center">
      <FooterBackground />

      <Reveal
        each
        className="relative mx-auto w-full max-w-[1600px] px-5 pt-12 pb-10 md:px-8 md:pt-16 xl:px-5 xl:pt-[98px] xl:pb-[59px]"
      >
        <div className="flex flex-col gap-12 xl:flex-row xl:justify-between xl:gap-10">
          <div className="min-w-0 xl:max-w-[586px] xl:flex-1 xl:pt-6">
            <Link href="/" className={`ww-rise inline-block ${focusRing}`}>
              <Image
                src={assets.footerLogo}
                alt="Way-Wise Tech"
                width={190}
                height={40}
                className="h-10 w-[190px]"
              />
            </Link>

            <p
              style={revealOrder(0.5)}
              className={`ww-rise mt-[23px] text-[16px] leading-[22px] text-pretty ${textShadow}`}
            >
              {navBrandCard.intro}
            </p>

            <ul style={revealOrder(1)} className="ww-rise mt-[29px] flex gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href="#"
                    aria-label={social.label}
                    className={`block size-9 transition-opacity duration-200 hover:opacity-70 ${focusRing}`}
                  >
                    <Image src={social.icon} alt="" width={36} height={36} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Animated itself, not through a parent: a parent's opacity would interrupt the blur. */}
            <div
              style={revealOrder(1.5)}
              className="ww-rise mt-[52px] max-w-[586px] rounded-lg border border-white/20 bg-white/10 px-[19px] pt-[19px] pb-[19px] backdrop-blur-sm"
            >
              <p className={`text-[16px] leading-5 ${textShadow}`}>Start a Conversation</p>
              <ButtonLink href="#" className="mt-[13px] h-[49px] w-full text-[21px] font-medium!">
                <StaggerText text="Get in Touch" />
              </ButtonLink>
            </div>
          </div>

          <div
            className={`grid gap-10 sm:grid-cols-[278fr_288fr_minmax(max-content,107fr)] sm:gap-x-6 xl:w-[clamp(600px,35.05vw,673px)] xl:shrink-0 xl:gap-x-0 ${textShadow}`}
          >
            {columns.map((column, index) => (
              <nav
                key={column.title}
                aria-labelledby={`footer-${column.title}`}
                style={revealOrder(2 + index * 0.5)}
                className="ww-rise"
              >
                <h2 id={`footer-${column.title}`} className="text-[22px] leading-7 font-semibold">
                  {column.title}
                </h2>
                <ul className="mt-[27px] space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={linkHrefs[link] ?? "#"}
                        className={`inline-block text-[16px] leading-6 transition-opacity duration-200 hover:opacity-70 ${focusRing}`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`mt-[29px] inline-block text-[16px] leading-6 font-semibold transition-opacity duration-200 hover:opacity-70 ${focusRing}`}
                >
                  {column.action}
                </Link>
              </nav>
            ))}
          </div>
        </div>

        <div
          style={revealOrder(3.5)}
          className="ww-rise mt-10 flex flex-col gap-3 border-t border-[#757575] pt-[19px] text-[16px] leading-6 text-[#b8b8b8] md:flex-row md:flex-wrap md:items-center md:justify-between"
        >
          <p>© 2026 Way Wise Tech. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-[30px] gap-y-2">
              {legal.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={`inline-block transition-colors duration-200 hover:text-white ${focusRing}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>{navBrandCard.regions}</p>
        </div>
      </Reveal>
    </footer>
  );
}
