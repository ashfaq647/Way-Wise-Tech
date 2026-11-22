import type { Metadata } from "next";
import { PinnedSection } from "@/components/motion/PinnedSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

/*
  The site's 404 page (Phase A, 2026-11-14; copy approved by the owner). The root not-found file
  handles every unmatched URL. Next.js returns the 404 status and adds <meta name="robots"
  content="noindex"> itself.

  Built only from existing parts: the inner-page header (no red banner), one sand section pinned
  while the shared Footer rises over it (as on /faq), the shared eyebrow, heading and buttons, and
  the CSS-only Hero text entrance (a plain fade with reduced motion). No images, no new colours.
*/

export const metadata: Metadata = {
  title: "Page Not Found | Way-Wise Tech",
};

// Entrance animations are CSS only, so content never depends on JavaScript to appear.
const textEnter = "animate-hero-text motion-reduce:animate-hero-fade";

// The inner-page Hero button sizes (FAQ and Insights Heroes).
const buttonText = "text-[20px] lg:text-[clamp(16px,1.042vw,20px)]";
const primarySize =
  "h-[59px] gap-[7px] px-7 lg:h-[clamp(44px,3.073vw,59px)] lg:gap-[clamp(5px,0.365vw,7px)] lg:pl-[clamp(18px,1.458vw,28px)] lg:pr-[clamp(20px,1.563vw,30px)]";
const secondarySize = "h-[61px] px-[27px] lg:h-[clamp(45px,3.177vw,61px)] lg:px-[clamp(17px,1.406vw,27px)]";

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="size-[1em] shrink-0">
      <path
        d="M2 9h14M10.5 3.5 16 9l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        {/* The section holds while the Footer rises over it, as on every other page. */}
        <PinnedSection>
          <section
            aria-labelledby="not-found-heading"
            className="flex min-h-[calc(100svh-72px)] items-center bg-sand py-16 md:py-24 xl:min-h-[calc(100svh-90px)]"
          >
            <Container className="flex flex-col items-center text-center">
              <SectionEyebrow weight="bold" className={textEnter}>
                404 Error
              </SectionEyebrow>

              <SectionHeading
                as="h1"
                id="not-found-heading"
                className={`${textEnter} mt-5 [animation-delay:120ms] lg:mt-6`}
              >
                Sorry, This Page <br />
                <span className="text-brand">Doesn&rsquo;t Exist</span>
              </SectionHeading>

              <p
                className={`${textEnter} mt-5 max-w-[34em] text-[18px] leading-[1.5] text-ink-muted [animation-delay:240ms] lg:mt-6 lg:text-[clamp(18px,1.146vw,22px)]`}
              >
                The page you&rsquo;re looking for may have been moved, renamed or never existed. Head back
                to the homepage or get in touch with our team.
              </p>

              <div
                className={`${textEnter} mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 [animation-delay:340ms] lg:mt-10`}
              >
                <ButtonLink href="/" className={`${buttonText} ${primarySize}`}>
                  Back to Home
                  <Arrow />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" className={`${buttonText} ${secondarySize}`}>
                  Contact Us
                </ButtonLink>
              </div>
            </Container>
          </section>
        </PinnedSection>
      </main>
      <SiteFooter />
    </>
  );
}
