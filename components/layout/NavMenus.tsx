"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type Ref,
} from "react";
import { navBrandCard, type NavItem, type NavMenu } from "@/lib/content/navigation";

/** Delay before a hover-opened dropdown closes, so the pointer can cross small gaps. */
const CLOSE_DELAY = 140;

export function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path
        d="m5.5 7.75 4.5 4.5 4.5-4.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M3 8h9.5M8.75 4 12.75 8l-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const itemClass =
  "flex h-[37px] items-center gap-1 rounded-md px-3 text-[18px] leading-[21px] font-medium transition-colors duration-200 hover:text-brand";
const focusClass = "focus-visible:outline-2 focus-visible:outline-ink";
/** The site's easing for reveals: a quick start that settles gently. */
const settle = "ease-[cubic-bezier(0.2,0.7,0.2,1)]";

type DesktopNavProps = {
  items: NavItem[];
  /** The open dropdown's label, or null. Held by SiteHeader so the bar turns solid while one is open. */
  openMenu: string | null;
  onOpenMenuChange: (label: string | null) => void;
  /** The bar's compact (scrolled) state: its visible lower edge then sits 5px higher. */
  compact: boolean;
};

/**
 * The desktop Navbar items. Items with a menu open a dropdown sheet on mouse hover, on click or tap
 * of their trigger, and from the keyboard (Enter, Space or ArrowDown; Escape closes and returns
 * focus). A sheet closes when the pointer leaves it, focus leaves it, a link in it is chosen, or the
 * page is clicked elsewhere. Disclosure pattern: a button with aria-expanded controls each sheet.
 *
 * The sheet hangs from the bar's visible lower edge and spans the bar's content width, from the
 * logo's left edge to the "Start a Project" button's right edge. Those positions are measured from
 * the bar's content box and written to CSS variables on the nav, with no re-render.
 */
export function DesktopNav({ items, openMenu, onOpenMenuChange, compact }: DesktopNavProps) {
  const nav = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // Moving straight from one open menu to another swaps the sheet in place instead of unfolding it.
  const [switching, setSwitching] = useState(false);
  const anyOpen = openMenu !== null;

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useLayoutEffect(() => {
    const el = nav.current;
    const content = el?.parentElement;
    const bar = content?.parentElement;
    if (!anyOpen || !el || !content || !bar) return;
    const place = () => {
      const styles = getComputedStyle(content);
      const box = content.getBoundingClientRect();
      const left = box.left + parseFloat(styles.paddingLeft);
      const right = box.right - parseFloat(styles.paddingRight);
      const origin = el.getBoundingClientRect();
      el.style.setProperty("--sheet-left", `${left - origin.left}px`);
      el.style.setProperty("--sheet-width", `${right - left}px`);
      el.style.setProperty(
        "--sheet-top",
        `${bar.getBoundingClientRect().bottom - origin.top - (compact ? 5 : 0)}px`,
      );
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [anyOpen, compact]);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) onOpenMenuChange(null);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const hadFocus = nav.current?.contains(document.activeElement);
      onOpenMenuChange(null);
      if (hadFocus) {
        nav.current
          ?.querySelector<HTMLElement>(`[data-menu-trigger="${CSS.escape(openMenu)}"]`)
          ?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu, onOpenMenuChange]);

  const controls = {
    open: (label: string) => {
      window.clearTimeout(closeTimer.current);
      setSwitching(openMenu !== null && openMenu !== label);
      onOpenMenuChange(label);
    },
    scheduleClose: () => {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(() => {
        setSwitching(false);
        onOpenMenuChange(null);
      }, CLOSE_DELAY);
    },
    close: () => {
      window.clearTimeout(closeTimer.current);
      setSwitching(false);
      onOpenMenuChange(null);
    },
  };

  return (
    <nav ref={nav} aria-label="Primary" className="relative -top-px hidden xl:block">
      <ul className="flex items-center min-[1440px]:gap-4">
        {items.map((item) =>
          item.menu ? (
            <DesktopMenuItem
              key={item.label}
              item={item}
              menu={item.menu}
              isOpen={openMenu === item.label}
              switching={switching}
              {...controls}
            />
          ) : (
            <li key={item.label}>
              <Link href={item.href} className={`${itemClass} ${focusClass} text-black`}>
                {item.label}
                {item.chevron && <Chevron />}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

type DesktopMenuItemProps = {
  item: NavItem;
  menu: NavMenu;
  isOpen: boolean;
  switching: boolean;
  open: (label: string) => void;
  scheduleClose: () => void;
  close: () => void;
};

function DesktopMenuItem({
  item,
  menu,
  isOpen,
  switching,
  open,
  scheduleClose,
  close,
}: DesktopMenuItemProps) {
  const panelId = useId();
  const panel = useRef<HTMLDivElement>(null);
  // A mouse click on a trigger the pointer has just opened keeps it open instead of toggling it shut.
  const openedByHover = useRef(false);

  const panelLinks = () => Array.from(panel.current?.querySelectorAll<HTMLElement>("a") ?? []);

  const focusLink = (index: number) => {
    // The panel becomes visible on this render, so focus on the next frame.
    requestAnimationFrame(() => {
      const links = panelLinks();
      links[(index + links.length) % links.length]?.focus();
    });
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    if (!isOpen) openedByHover.current = true;
    open(item.label);
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") scheduleClose();
  };

  const onTriggerClick = () => {
    if (isOpen && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    if (isOpen) close();
    else open(item.label);
  };

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    openedByHover.current = false;
    open(item.label);
    focusLink(0);
  };

  const onPanelKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const links = panelLinks();
    const current = links.indexOf(document.activeElement as HTMLElement);
    focusLink(current + (event.key === "ArrowDown" ? 1 : -1));
  };

  const onBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (isOpen && !event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  };

  const onNavigate = () => {
    openedByHover.current = false;
    close();
  };

  const triggerProps = {
    type: "button" as const,
    "data-menu-trigger": item.label,
    "aria-expanded": isOpen,
    "aria-controls": panelId,
    onClick: onTriggerClick,
    onKeyDown: onTriggerKeyDown,
  };

  // While open, an invisible strip below the trigger keeps the pointer inside this item on its way
  // down across the bar to the sheet.
  const bridge = `relative after:absolute after:inset-x-0 after:top-full after:h-[34px] ${
    isOpen ? "after:block" : "after:hidden"
  }`;

  return (
    <li onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
      {item.href !== "#" ? (
        // An item with its own page: the label is the link and the chevron opens the dropdown.
        <div className={`${itemClass} ${bridge} ${isOpen ? "text-brand" : "text-black"}`}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {item.label}
          </Link>
          <button
            {...triggerProps}
            aria-label={`${item.label} menu`}
            className="flex cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-ink"
          >
            <Chevron open={isOpen} />
          </button>
        </div>
      ) : (
        <button
          {...triggerProps}
          className={`${itemClass} ${focusClass} ${bridge} cursor-pointer ${isOpen ? "text-brand" : "text-black"}`}
        >
          {item.label}
          <Chevron open={isOpen} />
        </button>
      )}

      <DropdownSheet
        ref={panel}
        id={panelId}
        menu={menu}
        isOpen={isOpen}
        switching={switching}
        onNavigate={onNavigate}
        onKeyDown={onPanelKeyDown}
      />
    </li>
  );
}

type DropdownSheetProps = {
  ref: Ref<HTMLDivElement>;
  id: string;
  menu: NavMenu;
  isOpen: boolean;
  switching: boolean;
  onNavigate: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
};

/**
 * One dropdown: a white sheet attached to the bar, its links on a 12-column grid with hairline
 * dividers, and the navy brand card on the right holding the menu's action. Links with a
 * description (the six main services) show it; the others sit in a quieter row underneath. Menus
 * without descriptions use larger single-line links on aligned columns (three, or four for more
 * than six links), leaving the last cells open rather than stretching a row.
 */
function DropdownSheet({ ref, id, menu, isOpen, switching, onNavigate, onKeyDown }: DropdownSheetProps) {
  const pathname = usePathname();
  const rich = menu.links.some((link) => link.description);
  const gridLinks = rich ? menu.links.filter((link) => link.description) : menu.links;
  const extraLinks = rich ? menu.links.filter((link) => !link.description) : [];
  const span = rich || menu.links.length <= 6 ? "col-span-4" : "col-span-3";
  // Opening unfolds the sheet down from the bar (a clip, as in the headline reveals); switching
  // between menus swaps it in place. Reduced motion shows and hides it at once.
  const unfold = switching || !isOpen ? "duration-0" : `duration-[450ms] ${settle}`;
  const focusRing =
    "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div
      ref={ref}
      id={id}
      onKeyDown={onKeyDown}
      className={`absolute top-[var(--sheet-top)] left-[var(--sheet-left)] z-10 w-[var(--sheet-width)] ${
        isOpen ? "visible" : "pointer-events-none invisible"
      }`}
    >
      <div
        className={`grid grid-cols-[1fr_clamp(260px,17.7vw,340px)] gap-[clamp(28px,2.5vw,48px)] rounded-b-[24px] border border-[#e6dfd8] border-t-[#efe9e3] bg-white py-[clamp(28px,2vw,36px)] pr-[clamp(28px,2vw,36px)] pl-[clamp(32px,2.3vw,44px)] transition-[clip-path] motion-reduce:transition-none ${unfold} ${
          isOpen
            ? "[clip-path:inset(0_0_0_0_round_0_0_24px_24px)]"
            : "[clip-path:inset(0_0_100%_0_round_0_0_24px_24px)]"
        }`}
      >
        <div>
          <p
            aria-hidden="true"
            className="flex items-center gap-2.5 text-[14px] leading-[18px] font-semibold tracking-[0.078em] text-brand uppercase"
          >
            <span className="h-0.5 w-[22px] bg-brand" />
            {menu.title}
          </p>

          <ul className="mt-5 grid grid-cols-12 gap-x-[clamp(20px,1.6vw,32px)] border-b border-[#ebe5df]">
            {gridLinks.map((link, index) => {
              const current = link.href !== "#" && link.href === pathname;
              return (
                <li
                  key={link.label}
                  // Links rise in one after another as the sheet opens.
                  style={{ transitionDelay: isOpen ? `${120 + index * 35}ms` : "0ms" }}
                  className={`${span} transition-[opacity,translate] duration-500 motion-reduce:transition-none ${settle} ${
                    isOpen ? "translate-y-0 opacity-100" : "opacity-0 motion-safe:translate-y-2.5"
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={`group/link relative block h-full border-t border-[#ebe5df] text-ink outline-none before:absolute before:inset-x-0 before:-top-px before:h-0.5 before:origin-left before:bg-brand before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none ${
                      current ? "before:scale-x-100" : "before:scale-x-0"
                    } ${rich ? "pt-[18px] pb-5" : "pt-[26px] pb-7"}`}
                  >
                    <span
                      className={`block pr-[26px] leading-[26px] tracking-[-0.01em] transition-colors duration-200 group-hover/link:text-brand group-focus-visible/link:text-brand ${
                        current ? "text-brand" : ""
                      } ${
                        rich
                          ? "text-[clamp(17px,1vw,19px)] font-semibold"
                          : "text-[clamp(17px,1.04vw,20px)] font-medium"
                      }`}
                    >
                      {link.label}
                    </span>
                    {link.description && (
                      <span className="mt-1.5 block text-[clamp(14px,0.78vw,15px)] leading-[1.47] text-pretty text-ink-muted">
                        {link.description}
                      </span>
                    )}
                    <Arrow
                      className={`absolute right-0 -translate-x-1.5 text-brand opacity-0 transition-[opacity,translate] duration-[250ms] group-hover/link:translate-x-0 group-hover/link:opacity-100 group-focus-visible/link:translate-x-0 group-focus-visible/link:opacity-100 motion-reduce:transition-none ${
                        rich ? "top-[23px]" : "top-[31px]"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {extraLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-9 gap-y-2 pt-4">
              {extraLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={link.href !== "#" && link.href === pathname ? "page" : undefined}
                    className={`inline-flex text-[16px] leading-6 font-medium text-ink transition-colors duration-200 hover:text-brand ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* The brand card: the Footer's own introduction, and the menu's action as its one button. */}
        <div className="relative isolate flex flex-col overflow-hidden rounded-[18px] bg-navy p-[clamp(22px,1.4vw,28px)] text-white">
          {/* Two soft glows echo the Footer's cyan and gold light beams. CSS only, no image. */}
          <span
            aria-hidden="true"
            className="absolute -inset-[40%] -z-10 bg-[radial-gradient(40%_35%_at_85%_15%,rgb(64_196_255/0.22),transparent_70%),radial-gradient(45%_40%_at_10%_100%,rgb(255_184_77/0.14),transparent_70%)]"
          />
          <p className="text-[clamp(15px,0.84vw,16px)] leading-[1.5] text-white/86">
            {navBrandCard.intro}
          </p>
          <p className="mt-3 text-[12px] leading-4 tracking-[0.16em] text-white/50 uppercase">
            {navBrandCard.regions}
          </p>
          <span aria-hidden="true" className="min-h-6 flex-1" />
          <Link
            href={menu.action.href}
            onClick={onNavigate}
            aria-current={menu.action.href === pathname ? "page" : undefined}
            className="group/action flex h-[50px] items-center justify-between gap-3 rounded-xl bg-brand px-5 text-[16px] leading-6 font-semibold text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {menu.action.label}
            <Arrow className="transition-[translate] duration-200 group-hover/action:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover/action:translate-x-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const mobileRowClass =
  "flex min-h-11 items-center justify-between text-[18px] text-black transition-colors duration-200 hover:text-brand";

/**
 * One item in the mobile menu. Items with a dropdown expand in place (an accordion): the label
 * still links to its page where it has one, and the chevron button expands the list.
 */
export function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  if (!item.menu) {
    return (
      <li>
        <Link href={item.href} onClick={onNavigate} className={mobileRowClass}>
          {item.label}
          {item.chevron && <Chevron />}
        </Link>
      </li>
    );
  }

  const toggleProps = {
    type: "button" as const,
    "aria-expanded": expanded,
    "aria-controls": listId,
    onClick: () => setExpanded((value) => !value),
  };

  return (
    <li>
      {item.href !== "#" ? (
        <div className="flex min-h-11 items-center justify-between text-[18px] text-black">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="flex min-h-11 flex-1 items-center transition-colors duration-200 hover:text-brand"
          >
            {item.label}
          </Link>
          {/* 44px touch target; the negative margin keeps the chevron where it always was. */}
          <button
            {...toggleProps}
            aria-label={`${item.label} menu`}
            className={`-mr-3 flex size-11 cursor-pointer items-center justify-center transition-colors duration-200 hover:text-brand ${expanded ? "text-brand" : ""}`}
          >
            <Chevron open={expanded} />
          </button>
        </div>
      ) : (
        <button
          {...toggleProps}
          className={`${mobileRowClass} w-full cursor-pointer ${expanded ? "text-brand" : ""}`}
        >
          {item.label}
          <Chevron open={expanded} />
        </button>
      )}

      {/* Height animates through grid rows, as in the FAQ, with no measuring. */}
      <div
        id={listId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!expanded}>
          <div className="mt-1 mb-3 rounded-2xl border border-ink/[0.07] bg-[linear-gradient(160deg,#f8f3ee,#fdf3f2)] p-1.5">
            <ul>
              {item.menu.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="flex min-h-11 items-center rounded-xl px-3.5 text-[16px] text-ink transition-colors duration-200 hover:bg-white hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={item.menu.action.href}
              onClick={onNavigate}
              className="mt-0.5 flex min-h-11 items-center gap-2.5 rounded-xl px-3.5 text-[16px] font-semibold text-brand transition-colors duration-200 hover:bg-white"
            >
              {item.menu.action.label}
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
