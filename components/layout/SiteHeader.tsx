"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";
import { primaryNav } from "@/lib/content/navigation";
import { DesktopNav, MobileNavItem } from "./NavMenus";

function ProfileCard({ showThumbnail = true }: { showThumbnail?: boolean }) {
  return (
    <Link
      href="#"
      className="flex h-[60px] shrink-0 items-center gap-3 rounded-[10px] min-[1440px]:w-[234px] bg-[#fdf3f2] px-[16.5px] shadow-[inset_0_0_0_1.5px_var(--color-brand)] transition-colors duration-200 hover:bg-[#fbe4e2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {showThumbnail && (
        <span className="relative hidden h-[42px] w-[59px] shrink-0 min-[1440px]:block">
          {/* The export includes shadow padding around the 59x42 thumbnail. */}
          <span className="absolute -inset-x-[4.25px] -top-[3px] -bottom-[5px]">
            <AssetImage
              src={assets.profileThumbnail}
              alt=""
              sizes="68px"
              className="object-contain"
            />
          </span>
        </span>
      )}
      <span className="flex items-center gap-1">
        <span className="relative size-8 shrink-0">
          <AssetImage src={assets.pdfIcon} alt="" sizes="32px" className="object-contain" />
        </span>
        <span className="flex flex-col">
          <span className="text-[18px] leading-[21px] font-medium text-black">Our Profile</span>
          <span className="mt-[3px] text-[14px] leading-[18px] text-[#626262]">View PDF</span>
        </span>
      </span>
    </Link>
  );
}

type SiteHeaderProps = {
  /** Pages without the red banner keep an invisible marker, so the navbar still shrinks on scroll. */
  showBanner?: boolean;
};

export function SiteHeader({ showBanner = true }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  // The open desktop dropdown's label. The bar turns solid while one is open.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const banner = useRef<HTMLParagraphElement>(null);

  // Compact starts once the banner has scrolled away, which is when the bar actually sticks.
  useEffect(() => {
    if (!banner.current) return;
    const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    observer.observe(banner.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="contents">
        {showBanner ? (
          <p
            ref={banner}
            className="min-h-10 bg-brand px-4 py-2.5 text-center text-[13px] leading-5 font-light tracking-[0.014em] text-white sm:text-[13.5px]"
          >
            <span className="hidden sm:inline">✨ </span>
            Unlock Faster Online Growth With AI-Powered Solutions
            <span className="hidden sm:inline"> ✨</span>
          </p>
        ) : (
          <p ref={banner} aria-hidden="true" />
        )}

        {/*
          The wrapper keeps its full height in the page flow, so nothing below it moves. It sticks
          slightly above the viewport, so the content ends up centred in the compact bar without
          ever being animated. Only the background layer transitions.
        */}
        <div className="pointer-events-none sticky -top-1 z-30 h-20 xl:-top-[5px] xl:h-[100px]">
          <div
            aria-hidden="true"
            className={`absolute inset-0 transition-[translate,background-color,box-shadow,backdrop-filter] duration-[350ms] ease-in-out motion-reduce:transition-none ${
              compact
                ? `-translate-y-1 shadow-[0_1px_8px_rgba(35,31,32,0.06)] xl:-translate-y-[5px] ${open || openMenu ? "bg-white" : "bg-white/92 backdrop-blur-sm"}`
                : "bg-white"
            } ${
              // While a desktop menu is open the bar gets its own edge (a warm hairline and a soft
              // shadow), so it reads as a separate layer above the floating dropdown sheet.
              openMenu ? "xl:shadow-[0_1px_0_#e3dbd2,0_10px_24px_-14px_rgb(13_29_68/0.28)]" : ""
            }`}
          />
          <div className="pointer-events-auto relative h-full">
            <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between gap-4 px-5 md:px-8 xl:px-5">
              <Link
                href="/"
                className="relative block h-10 w-[190px] shrink-0 min-[1440px]:h-[50px] min-[1440px]:w-[237px]"
              >
                <AssetImage
                  src={assets.logo}
                  alt="Way-Wise Tech"
                  sizes="237px"
                  priority
                  className="object-contain object-left"
                />
              </Link>

              <DesktopNav
                items={primaryNav}
                openMenu={openMenu}
                onOpenMenuChange={setOpenMenu}
                compact={compact}
              />

              <div className="hidden items-center gap-3 xl:flex min-[1440px]:gap-6">
                <ProfileCard />
                <ButtonLink
                  href="#"
                  className="h-[59px] w-[165px] text-[20px] leading-[23px] min-[1440px]:w-[191px]"
                >
                  Start a Project
                </ButtonLink>
              </div>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
                className="flex size-11 items-center justify-center rounded-lg text-ink focus-visible:outline-2 focus-visible:outline-ink xl:hidden"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d={open ? "m6 6 12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id="mobile-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`absolute inset-x-0 overflow-hidden border-t border-ink/10 bg-white shadow-lg xl:hidden ${compact ? "top-[calc(100%-4px)]" : "top-full"}`}
                >
                  <nav
                    aria-label="Mobile"
                    className="flex max-h-[calc(100dvh-5rem)] flex-col gap-4 overflow-y-auto px-5 py-5 md:px-8"
                  >
                    <ul>
                      {primaryNav.map((item) => (
                        <MobileNavItem
                          key={item.label}
                          item={item}
                          onNavigate={() => setOpen(false)}
                        />
                      ))}
                    </ul>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <ProfileCard showThumbnail={false} />
                      <ButtonLink
                        href="#"
                        onClick={() => setOpen(false)}
                        className="h-[60px] text-[20px] sm:flex-1"
                      >
                        Start a Project
                      </ButtonLink>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}
