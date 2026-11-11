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

  // The sheets are absolutely positioned from these measurements even while closed (closed sheets
  // are only invisible, so they still count towards the page's scrollable width). So they are
  // measured from the start and whenever the bar or nav changes size, not only while a menu is open:
  // unmeasured, a sheet would fall back to its static position beside its trigger at its full
  // width and widen the page. Until the first measurement the sheets are not laid out at all
  // (see data-measured below).
  useLayoutEffect(() => {
    const el = nav.current;
    const content = el?.parentElement;
    const bar = content?.parentElement;
    if (!el || !content || !bar) return;
    const place = () => {
      const styles = getComputedStyle(content);
      const box = content.getBoundingClientRect();
      const left = box.left + parseFloat(styles.paddingLeft);
      const right = box.right - parseFloat(styles.paddingRight);
      const origin = el.getBoundingClientRect();
      el.style.setProperty("--sheet-left", `${left - origin.left}px`);
      el.style.setProperty("--sheet-width", `${right - left}px`);
      const edge = bar.getBoundingClientRect().bottom - (compact ? 5 : 0);
      el.style.setProperty("--sheet-top", `${edge - origin.top}px`);
      el.style.setProperty("--dim-top", `${edge}px`);
      el.dataset.measured = "";
    };
    place();
    // Covers window resizes, a scrollbar appearing or going, and the nav first showing at xl.
    const observer = new ResizeObserver(place);
    observer.observe(content);
    observer.observe(el);
    return () => observer.disconnect();
  }, [compact]);

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
    <nav ref={nav} aria-label="Primary" className="group/nav relative -top-px hidden xl:block">
      {/*
        While a menu is open, the page below the bar is dimmed slightly, so the bar and its sheet
        read as one raised layer above the page. It never takes clicks: a click on the page still
        reaches it and closes the menu (see the pointerdown listener above).
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-[var(--dim-top,100%)] bottom-0 z-[5] bg-navy/20 transition-opacity duration-300 motion-reduce:transition-none ${
          anyOpen ? "opacity-100" : "opacity-0"
        }`}
      />
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
  // down across the bar and the 10px gap to the sheet.
  const bridge = `relative after:absolute after:inset-x-0 after:top-full after:h-[46px] ${
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
 * One dropdown: a floating ivory sheet 10px below the bar, so the bar and the menu read as two
 * layers. It has two parts.
 * - The body: the menu's red label above its main links, with hairline dividers, beside the navy
 *   brand card, which runs from the label's top to the last divider.
 * - The action bar along the bottom: the column's extra links on the left (smaller), and the red
 *   action button on the right, the same in every menu.
 * Each menu is laid out for its content. Services (links with descriptions) spans the bar's full
 * content width on three columns. Short lists are only as wide as their content and centred:
 * five links or fewer run down two columns (Industries), six on three columns of two rows
 * (Company).
 */
function DropdownSheet({ ref, id, menu, isOpen, switching, onNavigate, onKeyDown }: DropdownSheetProps) {
  const pathname = usePathname();
  const rich = menu.links.some((link) => link.description);
  const extra = menu.extra ?? [];
  const isCurrent = (href: string) => href !== "#" && href === pathname;

  // Short lists size their columns to their labels (plus room for the hover arrow), so the links
  // stay together instead of spreading across fixed-width columns.
  const columns = rich ? 3 : menu.links.length <= 5 ? 2 : 3;
  const list = rich
    ? "grid-cols-3"
    : columns === 2
      ? `grid-flow-col grid-cols-[repeat(2,clamp(290px,15.6vw,300px))] ${
          menu.links.length > 2 ? "grid-rows-3" : ""
        }`
      : "grid-cols-[repeat(3,minmax(152px,max-content))]";
  // The brand card is as tall as its own text. Beside a list taller than the card (Services,
  // Industries) it starts with the first row of links; beside a short list (Company) it runs from
  // the label so its foot meets the list's foot.
  const tallList = rich || Math.ceil(menu.links.length / columns) >= 3;
  const cardPlace = tallList ? "row-start-2 mt-4 self-start" : "row-span-2 row-start-1 self-start";

  // Opening fades the sheet in as it settles 8px; switching between menus swaps it in place.
  // Reduced motion shows and hides it at once.
  const motion = switching || !isOpen ? "duration-0" : `duration-300 ${settle}`;

  return (
    <div
      ref={ref}
      id={id}
      onKeyDown={onKeyDown}
      // Spans the bar's content width; the sheet inside is centred in it. Only the sheet takes the
      // pointer, so the empty space beside a narrow sheet does not keep a menu open.
      className={`pointer-events-none absolute top-[calc(var(--sheet-top)+10px)] left-[var(--sheet-left)] z-10 w-[var(--sheet-width)] ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/*
        The sheet: ivory (#fbf9f6) against the white bar, a fine warm border, a soft two-part navy
        shadow, and rounded on every corner, so it reads as its own layer below the bar.
      */}
      <div
        className={`overflow-hidden rounded-[20px] border border-[#e3dbd2] bg-[#fbf9f6] shadow-[0_28px_56px_-20px_rgb(13_29_68/0.34),0_6px_16px_-6px_rgb(13_29_68/0.12)] transition-[opacity,translate] motion-reduce:transition-none ${motion} ${
          rich ? "w-full" : "mx-auto w-fit"
        } ${isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        <div
          className={`grid grid-rows-[auto_1fr] gap-x-[clamp(28px,2.3vw,44px)] px-[clamp(28px,2vw,36px)] pt-[clamp(24px,1.7vw,30px)] pb-[clamp(24px,1.7vw,30px)] ${
            rich
              ? "grid-cols-[1fr_clamp(260px,16.2vw,310px)]"
              : // Short menus have width to spare, so the card keeps 300px, where its text
                // fits in four lines, and stays as tall as the label and list beside it.
                "grid-cols-[auto_300px]"
          }`}
        >
          <p
            aria-hidden="true"
            className="col-start-1 row-start-1 flex items-center gap-2.5 text-[14px] leading-[18px] font-semibold tracking-[0.078em] text-brand uppercase"
          >
            <span className="h-0.5 w-[22px] bg-brand" />
            {menu.title}
          </p>

          <ul
            className={`col-start-1 row-start-2 mt-4 grid gap-x-[clamp(20px,1.6vw,32px)] border-b border-[#e9e2da] ${list} ${
              rich ? "" : "self-start"
            }`}
          >
            {menu.links.map((link, index) => {
              const current = isCurrent(link.href);
              return (
                <li
                  key={link.label}
                  // Links rise in one after another as the sheet opens.
                  style={{ transitionDelay: isOpen ? `${80 + index * 30}ms` : "0ms" }}
                  className={`transition-[opacity,translate] duration-500 motion-reduce:transition-none ${settle} ${
                    isOpen ? "translate-y-0 opacity-100" : "opacity-0 motion-safe:translate-y-2"
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={`group/link relative flex h-full flex-col border-t border-[#e9e2da] text-ink outline-none before:absolute before:inset-x-0 before:-top-px before:h-0.5 before:origin-left before:bg-brand before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none ${
                      current ? "before:scale-x-100" : "before:scale-x-0"
                    } ${rich ? "pt-[18px] pb-5" : "justify-center py-4"}`}
                  >
                    <span
                      className={`block pr-[26px] leading-[26px] tracking-[-0.01em] transition-colors duration-200 group-hover/link:text-brand group-focus-visible/link:text-brand ${
                        current ? "text-brand" : ""
                      } ${
                        rich
                          ? "text-[clamp(17px,1vw,19px)] font-semibold"
                          : "text-[clamp(17px,0.94vw,18px)] font-medium"
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
                        rich ? "top-[23px]" : "top-1/2 -mt-2"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/*
            The brand card: the Footer's own introduction; two CSS glows echo the Footer's light
            beams. Placed per menu (see cardPlace).
          */}
          <div
            className={`relative isolate col-start-2 flex flex-col gap-3 overflow-hidden rounded-2xl bg-navy px-6 py-[22px] text-white ${cardPlace}`}
          >
            <span
              aria-hidden="true"
              className="absolute -inset-[40%] -z-10 bg-[radial-gradient(40%_35%_at_85%_15%,rgb(64_196_255/0.22),transparent_70%),radial-gradient(45%_40%_at_10%_100%,rgb(255_184_77/0.14),transparent_70%)]"
            />
            <p className="text-[15px] leading-[1.5] text-white/86">{navBrandCard.intro}</p>
            <p className="text-[12px] leading-4 tracking-[0.16em] text-white/50 uppercase">
              {navBrandCard.regions}
            </p>
          </div>
        </div>

        {/* The action bar: extra links on the left, the menu's action on the right. */}
        <div className="flex items-center gap-8 border-t border-[#e9e2da] bg-[#f4efe9] px-[clamp(28px,2vw,36px)] py-3.5">
          {extra.length > 0 && (
            <ul className="flex flex-wrap gap-x-8 gap-y-1">
              {extra.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="group/extra inline-flex items-center gap-2 rounded-sm text-[16px] leading-6 font-medium text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {link.label}
                    <Arrow className="text-brand opacity-0 transition-opacity duration-200 group-hover/extra:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={menu.action.href}
            onClick={onNavigate}
            aria-current={isCurrent(menu.action.href) ? "page" : undefined}
            className="group/action ml-auto flex h-11 shrink-0 items-center gap-3 rounded-[10px] bg-brand px-5 text-[15px] leading-6 font-semibold whitespace-nowrap text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
              {/* Main links then extras: the Footer column's full list, in its order. */}
              {[...item.menu.links, ...(item.menu.extra ?? [])].map((link) => (
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
