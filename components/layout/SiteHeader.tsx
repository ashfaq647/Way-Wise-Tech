"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { assets } from "@/lib/assets";
import { primaryNav } from "@/lib/content/navigation";
import { DesktopNav, MobileNavItem } from "./NavMenus";

type ProfileCardProps = {
  showThumbnail?: boolean;
  /** "small": the floating bar's 48px card (2026-11-16 redesign). "default": the original 60px card. */
  size?: "default" | "small";
};

function ProfileCard({ showThumbnail = true, size = "default" }: ProfileCardProps) {
  const small = size === "small";
  return (
    <Link
      href="#"
      className={`flex shrink-0 items-center bg-[#fdf3f2] shadow-[inset_0_0_0_1.5px_var(--color-brand)] transition-colors duration-200 hover:bg-[#fbe4e2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        small
          ? "h-12 gap-3 rounded-lg px-[14px] min-[1440px]:w-[192px]"
          : "h-[60px] gap-3 rounded-[10px] px-[16.5px] min-[1440px]:w-[234px]"
      }`}
    >
      {showThumbnail && (
        <span
          className={`relative hidden shrink-0 min-[1440px]:block ${small ? "h-[33px] w-[46px]" : "h-[42px] w-[59px]"}`}
        >
          {/* The export includes shadow padding around the thumbnail (59x42 in the original card). */}
          <span
            className={`absolute ${small ? "-inset-x-[3.3px] -top-[2.35px] -bottom-[3.9px]" : "-inset-x-[4.25px] -top-[3px] -bottom-[5px]"}`}
          >
            <AssetImage
              src={assets.profileThumbnail}
              alt=""
              sizes="68px"
              className="object-contain"
            />
          </span>
        </span>
      )}
      <span className={`flex items-center ${small ? "gap-1.5" : "gap-1"}`}>
        <span className={`relative shrink-0 ${small ? "size-[31px]" : "size-8"}`}>
          <AssetImage src={assets.pdfIcon} alt="" sizes="32px" className="object-contain" />
        </span>
        <span className="flex flex-col">
          <span
            className={`font-medium text-black ${small ? "text-[14px] leading-[17px]" : "text-[18px] leading-[21px]"}`}
          >
            Our Profile
          </span>
          <span
            className={`text-[#626262] ${small ? "mt-px text-[11.5px] leading-[14px]" : "mt-[3px] text-[14px] leading-[18px]"}`}
          >
            View PDF
          </span>
        </span>
      </span>
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={open ? "m6 6 12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Within this many px of the top of the page the bar is always shown. */
const TOP_ZONE = 120;
/** How long the bar stays after a reveal by scrolling up, before it slides away on its own. */
const AUTO_HIDE_MS = 2500;

type SiteHeaderProps = {
  /** Pages without the red banner keep an invisible marker, so the navbar still shrinks on scroll. */
  showBanner?: boolean;
  /**
   * "bar": the original full-width white bar, in the page flow (every inner page).
   * "floating": the 2026-11-16 Homepage redesign. A rounded translucent card floats over the top of
   * the first section (which starts at the top of the page, under it) and stays pinned while the
   * page scrolls.
   */
  variant?: "bar" | "floating";
};

export function SiteHeader({ showBanner = true, variant = "bar" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  // The open desktop dropdown's label. The bar turns solid while one is open.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const banner = useRef<HTMLParagraphElement>(null);
  const floating = variant === "floating";
  // Smart hide: the bar slides out of view while scrolling down and back in on any scroll up.
  const [hidden, setHidden] = useState(false);
  // While a dropdown or the mobile menu is open the bar never hides (read by the scroll handler).
  const menuOpen = useRef(false);
  // Timed visibility window: once revealed by scrolling up, the bar slides away again after
  // AUTO_HIDE_MS without further upward scrolling. One pending timeout at most; every new reveal
  // replaces it, and scrolling down, reaching the top or opening a menu cancels it.
  const autoHide = useRef<number | undefined>(undefined);
  // A mouse resting on the bar (or its open sheet) is about to use it: the timer does not hide it then.
  const pointerInside = useRef(false);
  const stopAutoHide = useCallback(() => {
    window.clearTimeout(autoHide.current);
    autoHide.current = undefined;
  }, []);
  const startAutoHide = useCallback(() => {
    window.clearTimeout(autoHide.current);
    autoHide.current = window.setTimeout(() => {
      autoHide.current = undefined;
      // Checked when it fires, so a timer can never act on a state that changed after it started.
      // Keyboard focus inside the bar keeps it on screen through CSS (has-[:focus-visible]) even so.
      if (window.scrollY > TOP_ZONE && !menuOpen.current && !pointerInside.current) setHidden(true);
    }, AUTO_HIDE_MS);
  }, []);
  useEffect(() => {
    menuOpen.current = open || openMenu !== null;
    // A menu holds the bar open; once it closes, the visibility window starts again.
    if (menuOpen.current) stopAutoHide();
    else if (window.scrollY > TOP_ZONE) startAutoHide();
  }, [open, openMenu, startAutoHide, stopAutoHide]);
  useEffect(() => stopAutoHide, [stopAutoHide]);
  const pointerProps = {
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === "mouse") pointerInside.current = true;
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerInside.current = false;
      if (window.scrollY > TOP_ZONE) startAutoHide();
    },
  };
  // An open menu always shows the bar. Keyboard focus inside it does too (CSS, has-[:focus-visible]),
  // instantly: mid-slide the focused link would still be off screen and the browser would scroll the
  // page to reveal it.
  const concealed = hidden && !open && openMenu === null;
  /*
    The transition belongs to the state being entered, so hiding and showing move differently:
    - Hide: a gentle start (standard ease, 420ms), so the bar glides away instead of snapping.
    - Show: a quick start that settles softly (360ms), so it returns promptly when wanted.
    The distance only just clears the bar and its shadow (104px; 124px from xl, where the floating
    card sits 20px down): extra distance is travelled off screen, where it only shortens the
    visible part of the movement.
  */
  const hideClass = `transition-[translate] motion-reduce:transition-none has-[:focus-visible]:translate-none has-[:focus-visible]:transition-none ${
    concealed
      ? "-translate-y-[104px] duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] xl:-translate-y-[124px]"
      : "duration-[360ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
  }`;

  // Compact starts once the banner has scrolled away, which is when the bar actually sticks.
  useEffect(() => {
    if (!banner.current) return;
    const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    observer.observe(banner.current);
    return () => observer.disconnect();
  }, []);

  /*
    Hide on scroll down, show on scroll up. Direction comes from one passive scroll listener,
    throttled to one reading per frame; the page scroll itself is untouched (no wheel or touch
    handling). To avoid flicker, a direction only counts once the page has moved far enough since
    that direction began: HIDE_AFTER px down to hide, SHOW_AFTER px up to show. Near the top of the
    page (TOP_ZONE) the bar is always shown. Each upward reading (re)starts the visibility window.
  */
  useEffect(() => {
    const HIDE_AFTER = 12;
    const SHOW_AFTER = 4;
    let last = window.scrollY;
    let anchor = last;
    let direction = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const step = y - last;
      if (step !== 0) {
        const now = step > 0 ? 1 : -1;
        if (now !== direction) {
          direction = now;
          anchor = last;
        }
      }
      last = y;
      if (y <= TOP_ZONE || menuOpen.current) {
        stopAutoHide();
        setHidden(false);
      } else if (direction > 0 && y - anchor >= HIDE_AFTER) {
        stopAutoHide();
        setHidden(true);
      } else if (direction < 0 && anchor - y >= SHOW_AFTER) {
        setHidden(false);
        startAutoHide();
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [startAutoHide, stopAutoHide]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const menuButton = (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={() => setOpen((value) => !value)}
      className="flex size-11 items-center justify-center rounded-lg text-ink focus-visible:outline-2 focus-visible:outline-ink xl:hidden"
    >
      <MenuIcon open={open} />
    </button>
  );

  const mobileNav = (cta: string) => (
    <nav
      aria-label="Mobile"
      className={`flex flex-col gap-4 overflow-y-auto px-5 py-5 ${
        floating ? "max-h-[calc(100dvh-6rem)] md:px-6" : "max-h-[calc(100dvh-5rem)] md:px-8"
      }`}
    >
      <ul>
        {primaryNav.map((item) => (
          <MobileNavItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
        ))}
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ProfileCard showThumbnail={false} />
        <ButtonLink href="#" onClick={() => setOpen(false)} className={cta}>
          Start a Project
        </ButtonLink>
      </div>
    </nav>
  );

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

        {floating ? (
          /*
            Floating bar (Homepage redesign, reference 1920x942): a 1560x80 card 20px from the top,
            over the Hero. The sticky wrapper's negative margin takes it out of the page flow, so the
            Hero starts at the top of the page underneath it. The card's look is a separate layer
            behind its content: a backdrop-filter on an ancestor would trap the dropdown's fixed
            page dim inside the card.
          */
          <div
            data-nav-hidden={concealed || undefined}
            className={`pointer-events-none sticky top-0 z-30 -mb-[76px] h-[76px] xl:-mb-[100px] xl:h-[100px] ${hideClass}`}
          >
            <div className="mx-auto h-full w-full max-w-[1600px] px-3 pt-3 sm:px-5 md:px-8 xl:px-5 xl:pt-5">
              <div className="pointer-events-auto relative h-16 xl:h-20" {...pointerProps}>
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-[14px] border border-[#e7e0d5] transition-[background-color,box-shadow] duration-[350ms] ease-in-out motion-reduce:transition-none ${
                    open || openMenu
                      ? "bg-white shadow-[0_10px_24px_-14px_rgb(13_29_68/0.28)]"
                      : compact
                        ? "bg-white/90 shadow-[0_8px_24px_-12px_rgb(13_29_68/0.22)] backdrop-blur-md"
                        : "bg-white/60 shadow-[0_1.5px_2.5px_rgb(35_31_32/0.16)] backdrop-blur-sm"
                  }`}
                />
                <div className="relative flex h-full items-center justify-between gap-4 pr-2 pl-4 md:pl-5 xl:px-8">
                  <Link
                    href="/"
                    className="relative block h-9 w-[171px] shrink-0 xl:h-[42px] xl:w-[199px]"
                  >
                    <AssetImage
                      src={assets.logo}
                      alt="Way-Wise Tech"
                      sizes="199px"
                      priority
                      className="object-contain object-left"
                    />
                  </Link>

                  <DesktopNav
                    items={primaryNav}
                    openMenu={openMenu}
                    onOpenMenuChange={setOpenMenu}
                    compact={false}
                    gapClassName="min-[1440px]:gap-[18px]"
                  />

                  <div className="hidden items-center gap-3 xl:flex min-[1440px]:gap-[17px]">
                    <ProfileCard size="small" />
                    <ButtonLink
                      href="#"
                      className="h-12 px-5 text-[17.5px] leading-[21px] min-[1440px]:w-[159px] min-[1440px]:px-0"
                    >
                      Start a Project
                    </ButtonLink>
                  </div>

                  {menuButton}
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id="mobile-menu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-[14px] border border-[#e7e0d5] bg-white shadow-lg xl:hidden"
                    >
                      {mobileNav("h-[60px] text-[20px] sm:flex-1")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          /*
            The wrapper keeps its full height in the page flow, so nothing below it moves. It sticks
            slightly above the viewport, so the content ends up centred in the compact bar without
            ever being animated. Only the background layer transitions.
          */
          <div
            data-nav-hidden={concealed || undefined}
            className={`pointer-events-none sticky -top-1 z-30 h-20 xl:-top-[5px] xl:h-[100px] ${hideClass}`}
          >
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
            <div className="pointer-events-auto relative h-full" {...pointerProps}>
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

                {menuButton}
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
                    {mobileNav("h-[60px] text-[20px] sm:flex-1")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </header>
    </MotionConfig>
  );
}
