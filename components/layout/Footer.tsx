import Image from "next/image";
import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { assets } from "@/lib/assets";
import { finalCta } from "@/lib/content/contact";
import { homeFooter } from "@/lib/content/home";
import { legalLinks, navBrandCard, socialLinks } from "@/lib/content/navigation";

/*
  The Homepage Footer (2026-11-16 redesign, reference `Frame 2147239202.png`): the Final CTA and
  the footer as one section, replacing FinalCta + SiteFooter on the Homepage only (inner pages keep
  those until their own redesign). Drawn 1920x922; built 942 by the owner's decision, with 10px
  more above the CTA content and 10px more below the footer's bottom row.

  At 1920: the CTA band (y 0-532) shows the existing CTA artwork, the heading, description, two
  promises and the red button on the left, and three 255x313 team cards on the right; the brown
  footer band (y 532-942) holds the logo, intro and social buttons, three link columns, a rule and
  the bottom row. Every size is the 1920 value times --u from xl; below xl the parts stack.
*/
const unit = "[--u:1px] xl:[--u:clamp(0.6667px,0.05208vw,1px)]";

// Each team photo's tile colour, in the content's order (as in the original Final CTA).
const teamTiles = ["bg-[#ffb8b0]", "bg-[#c6cfff]", "bg-[#ffeff2]"];

function Check() {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="none"
      aria-hidden="true"
      className="size-[max(19px,calc(var(--u)*21))] shrink-0 text-[#067717]"
    >
      <circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="m6.5 10.8 2.8 2.8 5.2-5.6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  const { heading, description, promises, team } = finalCta;
  const { cta, columns, copyright, teamRoles } = homeFooter;

  return (
    <footer aria-labelledby="footer-cta-heading" className={`${unit} relative`}>
      {/* The CTA band. From xl the artwork is framed as drawn (117.5% wide, left-aligned, its top
          20vw above the band); below xl it simply covers the band. */}
      <div className="relative overflow-hidden bg-[#f2e6d6]">
        <div
          aria-hidden="true"
          className="absolute inset-0 xl:inset-auto xl:-top-[20vw] xl:left-0 xl:aspect-[3840/2160] xl:w-[117.5%]"
        >
          <AssetImage src={assets.ctaBackground} alt="" sizes="(min-width: 1280px) 118vw, 300vw" className="object-cover" />
        </div>

        <Reveal each>
          <Container className="relative grid gap-10 py-12 md:py-16 xl:grid-cols-[minmax(0,761fr)_minmax(0,799fr)] xl:gap-0 xl:pt-[calc(var(--u)*70)] xl:pb-[calc(var(--u)*59.5)]">
            <div className="min-w-0 xl:-mt-[calc(var(--u)*2.4)]">
              <h2
                id="footer-cta-heading"
                className="ww-rise text-[clamp(32px,8.6vw,56px)] leading-[1.11] font-semibold text-navy xl:text-[max(40px,calc(var(--u)*64))]"
              >
                {heading.first}
                <br />
                <span className="text-brand">{heading.second}</span>
              </h2>
              <p
                style={revealOrder(1)}
                className="ww-rise mt-4 text-[18px] leading-[1.5] text-navy xl:mt-[calc(var(--u)*19)] xl:max-w-[calc(var(--u)*720)] xl:text-[max(17px,calc(var(--u)*22))] xl:tracking-[0.04em]"
              >
                {description}
              </p>
              <ul style={revealOrder(2)} className="ww-rise mt-4 xl:mt-[calc(var(--u)*11.4)]">
                {promises.map((promise) => (
                  <li
                    key={promise}
                    className="flex items-center gap-[max(10px,calc(var(--u)*12))] text-[17px] leading-[1.8] text-navy-muted xl:text-[max(17px,calc(var(--u)*22))] xl:leading-[calc(var(--u)*40)] xl:tracking-[0.04em]"
                  >
                    <Check />
                    {promise}
                  </li>
                ))}
              </ul>
              <Link
                href={cta.href}
                style={revealOrder(3)}
                className="ww-rise mt-6 flex w-fit h-[max(56px,calc(var(--u)*72))] items-center justify-center rounded-[max(10px,calc(var(--u)*12))] bg-brand px-[max(20px,calc(var(--u)*24))] text-[max(16px,calc(var(--u)*20))] leading-none font-semibold text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink xl:mt-[calc(var(--u)*15)]"
              >
                {cta.label}
              </Link>
            </div>

            <ul className="grid grid-cols-3 gap-2 sm:gap-[17px] xl:gap-[calc(var(--u)*17)]">
              {team.map((person, index) => (
                <li
                  key={person.name}
                  style={revealOrder(index + 2)}
                  className="ww-rise self-start rounded-lg bg-white p-2 sm:p-4 xl:pt-[calc(var(--u)*16)] xl:pr-[calc(var(--u)*15)] xl:pb-[calc(var(--u)*15)] xl:pl-[calc(var(--u)*16)]"
                >
                  <div className={`relative aspect-[224/219] overflow-hidden rounded-lg ${teamTiles[index]}`}>
                    <AssetImage
                      src={person.photo.src}
                      alt={person.name}
                      sizes="(min-width: 1280px) 12vw, 28vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <p className="mt-3 text-[15px] leading-6 font-medium text-navy-muted sm:text-[20px] xl:mt-[calc(var(--u)*15)] xl:text-[max(18px,calc(var(--u)*21))] xl:leading-[calc(var(--u)*24)]">
                    {person.name}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-[22px] text-steel sm:text-[16px] xl:mt-[calc(var(--u)*2)] xl:leading-[calc(var(--u)*22)]">
                    {teamRoles[index] ?? person.role}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Reveal>
      </div>

      {/* The footer band. */}
      <div className="bg-[#57432d] text-white">
        <Container className="pt-12 pb-10 xl:pt-[calc(var(--u)*60.5)] xl:pb-[calc(var(--u)*43.15)]">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,889fr)_minmax(0,671fr)] xl:gap-0">
            <div>
              <Link href="/" className="relative block h-10 w-[190px] xl:h-[calc(var(--u)*40)] xl:w-[calc(var(--u)*190)]">
                <AssetImage src={assets.footerLogo} alt="Way-Wise Tech" sizes="190px" className="object-contain object-left" />
              </Link>
              <p className="mt-6 max-w-[30em] text-[17px] leading-[1.3] xl:mt-[calc(var(--u)*30)] xl:max-w-[calc(var(--u)*460)] xl:text-[max(16px,calc(var(--u)*18))] xl:leading-[calc(var(--u)*22)]">
                {navBrandCard.intro}
              </p>
              <ul className="mt-6 flex gap-[9px] xl:mt-[calc(var(--u)*29.3)]">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="block size-9 rounded-[5px] transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Image src={social.icon} alt="" width={36} height={36} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-10 sm:grid-cols-[minmax(0,247fr)_minmax(0,312fr)_minmax(max-content,112fr)] sm:gap-x-6 xl:gap-x-0">
              {columns.map((column) => (
                <nav key={column.title} aria-labelledby={`footer-col-${column.title}`}>
                  <h3
                    id={`footer-col-${column.title}`}
                    className="text-[19px] leading-6 font-semibold xl:text-[max(18px,calc(var(--u)*20))] xl:leading-[calc(var(--u)*24)]"
                  >
                    {column.title}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 xl:mt-[calc(var(--u)*20)] xl:gap-[calc(var(--u)*16)]">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="block w-fit text-[17px] leading-[22px] transition-colors duration-200 hover:text-[#f5c98f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:text-[max(16px,calc(var(--u)*17.6))] xl:leading-[calc(var(--u)*22)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={column.action.href}
                    className="mt-5 block w-fit text-[17px] leading-[22px] font-semibold transition-colors duration-200 hover:text-[#f5c98f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:mt-[calc(var(--u)*21)] xl:text-[max(16px,calc(var(--u)*17.6))] xl:leading-[calc(var(--u)*22)]"
                  >
                    {column.action.label}
                  </Link>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/95 pt-5 xl:mt-[calc(var(--u)*40.5)] xl:pt-[calc(var(--u)*19.5)]">
            <div className="flex flex-col gap-4 text-[16px] leading-[22px] text-[#f3f3f3] md:flex-row md:items-center md:justify-between xl:text-[max(15px,calc(var(--u)*17.6))] xl:leading-[calc(var(--u)*22)]">
              <p>{copyright}</p>
              <nav aria-label="Legal">
                <ul className="flex flex-wrap gap-x-8 gap-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p>{navBrandCard.regions}</p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
