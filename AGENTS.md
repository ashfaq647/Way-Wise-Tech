<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

# Way Wise Tech website: project handoff

Last updated 2026-11-10. Read this before changing anything. Details were verified in Chrome only, unless noted. The 2026-11-09 update came from a full read-only inspection of the project. The 2026-11-10 update came from a read-only audit of this file against the code, and records the Industries, Our Portfolio and Contact Us pages, the three newer Service Details pages and the approved Services card links. A later 2026-11-10 update records the Contact "Send Us a Message / Our Offices" section, the restored World Map description spacing and the Navbar's Contact link, plus the project roadmap and the folder-structure audit (see "Roadmap and architecture"). The last 2026-11-10 update records the shared FAQ and Footer on `/contact` and the Navbar dropdown menus (see "Navbar dropdown menus"), which were being reviewed by the owner when work stopped for the day.

## Roadmap and architecture (owner, 2026-11-10)

### Roadmap

1. **Complete the full frontend.**
2. **Finish visual reviews and approvals** of every page and section.
3. **Develop the backend and CMS together**, in one phase. The backend is not built first with the CMS integrated separately afterwards.
4. **Integrate the completed frontend with the backend/CMS.**

No CMS, database or backend technology has been selected. Do not assume one.

### Folder structure

- **Keep the current architecture:** the Next.js setup, folder organisation, routes, components, content files and asset folders all stay as they are.
- **No restructuring for the CMS:** do not move folders, rename files or add layers only to prepare for it.

### Frontend phase guidelines

These add to "Working rules" and "Conventions for new pages"; they do not replace them.
- **Content separate from presentation:** put new page and section content in `lib/content/*`, where practical. Store images as `{ src, width, height, alt }` and icons as names, with no CSS classes or colours in the data.
- **Reuse:** reuse existing components and the established patterns, such as the Service Details template driven by one typed entry.
- **Duplication:** reduce it only when it is safe and useful, and never inside frozen or protected sections without the owner's approval.
- **No premature infrastructure:** avoid unnecessary abstractions and any CMS or backend infrastructure, packages or code.

### Deferred to the backend/CMS phase

These will be handled together in steps 3–4:
- **Dynamic routes:** CMS-driven routes, including a possible `app/services/[slug]` and Industry category pages.
- **Backend:** backend APIs and form handling (Final CTA and Contact "Send Message").
- **Data:** CMS data fetching, caching and revalidation.
- **Media:** media management, including CMS-hosted images and `images.remotePatterns`.
- **SEO and site-wide settings:** SEO metadata and site-wide SEO files.
- **Navigation and publishing:** CMS-managed navigation, publishing, drafts and visibility.

The six static Service Details route files stay unchanged for now. Any future folder structure proposed in an audit is a reference only, not an instruction to create it now.

### Folder-structure audit findings (read-only, 2026-11-10)

**Strengths (preserve):**
- **Routes:** `app/` has one folder per route, with thin page files that only put sections together.
- **Service Details:** one template, `ServiceDetailsPage`, driven by a typed entry, with metadata built from that entry. This is the pattern the rest of the site can follow.
- **Folder separation:** `lib/content/` is separate from components, and `components/ui/` holds shared building blocks with no content. `components/motion/` is isolated.
- **Images:** every image goes through `AssetImage`.
- **Content shapes:** the newer sections store images as `{src,width,height,alt}` and icons as names.

**Confirmed structural issues (recorded, not to be fixed without the owner's instruction):**
- **Folder names are misleading.** Several shared parts live in page folders:
  - In `components/home/`: `PinnedSection` (every page), `ClientLogos` (every page), `FinalCta`, `CardStack` (also `/industries`), `Services` and `Industries` (also `/services`).
  - In `components/services/`: `Faq` and `OurProcess`, which are used by other pages too.
  
  They are not to be moved: moving them would touch frozen files for clarity only.
- **Content inside components:** the older, mostly frozen components still hold their own text (see "Central content").
- **Duplicated data:**
  - Navigation existed three times: `navigation.ts`, `SiteHeader.tsx` and `SiteFooter.tsx`. Update 2026-11-10: `navigation.ts` is now the Navbar's single source; the Footer still keeps its own copy.
  - Service and industry lists are duplicated (see "Central content").
- **Styling in data:** Contact Overview stores hex colours, and the Homepage pricing cards in `Industries.tsx` store Tailwind classes.
- **Mixed assets:** `lib/assets.ts` mixes design artwork with content images, and image sizes are spread across files.
- **Static Details routes:** the six Service Details pages are separate static route files, not one dynamic route.
- **No site-wide SEO setup:** no `metadataBase`, `title.template`, sitemap or robots file (see "Known limitations").
- **Header and Footer per page:** each page renders `SiteHeader` and `SiteFooter` itself, not in a layout.

**Recommendations, frontend phase** (each needs the owner's approval where it touches frozen, protected or under-review files):
- **New sections:** follow the content-separation guidelines above.
- **Navigation source:** done for the Navbar on 2026-11-10 (`navigation.ts` drives it). The Footer still has its own copy; switch it only on the owner's instruction.
- **Owner decisions needed:** the main industry list and the brand-name spelling.
- **Frozen text:** optionally move frozen sections' text into `lib/content/`, one section at a time, with before/after pixel checks.

**Recommendations, backend/CMS phase:**
- The items under "Deferred to the backend/CMS phase" above.
- Separating design artwork from content images in `lib/assets.ts`.

**Not needed:**
- Restructuring the folders.
- Renaming asset folders or files.
- Repository, service or adapter layers, a page builder, route groups, a central `types/` folder, or internationalisation folders.
- Choosing CMS packages now.

No CMS-readiness score is recorded: any percentage would be a subjective estimate, not a measurement.

## Working rules (from the project owner)

- **No Git operations without permission.** There is currently **no `.git` repository** in the project folder, so there is no commit history and no starter commit. Do not run `git init`, create commits or run any other Git command unless the owner explicitly asks. All work so far exists only as files on disk.
- **Workflow, one section at a time:** inspect references and assets → explain your understanding → implement that section only → visual QA → freeze. Wait for approval between sections. After a task, report and wait for the owner's instructions.
- **Read-only means read-only.** When a task is an inspection or report, do not edit, create, delete or rename files, and do not run formatting or build commands unless asked.
- **Do not stop or restart the development server.** Avoid `next build` while it runs, because both write to `.next/`. For checks, `npx --no-install tsc --noEmit --incremental false` and `npx --no-install eslint .` write no files.
- If an asset is missing or unclear, stop and ask. Do not use placeholders, crop assets from a reference, generate, recreate or substitute replacements, or invent content or URLs. See "Figma references and exported assets".
- Inspect real file contents, not filenames. Example: a supplied `logo.svg` was a copy of the dark logo, two "SVG" logos wrap JPEGs, and `industry page/construction.png` is a JPEG.
- **Red announcement banner: Homepage only.** Every inner page renders `<SiteHeader showBanner={false} />`. New pages must do the same.
- **Every new section follows the overlapping pinned scroll** (see "Pinned sections"), including the last-section rule, and must keep working with reduced motion.
- Do not add packages or edit global styles unless necessary.
- Keep changes to the files the task names. Do not refactor, restyle or "tidy up" anything else.

## Hero + Client Logo Strip standard (owner, 2026-11-11)

Project-wide, for **every page including the Homepage**. The reference implementation is the About Us Hero (`components/about/AboutHero.tsx`, see "About Us page").

**Status: implemented on every page 2026-11-11 (owner-authorised); awaiting the owner's visual review.** About Us nests `ClientLogos` inside `AboutHero`'s own `<section>`. Every other page groups the two at page level: `<PinnedSection><Hero /><ClientLogos /></PinnedSection>` in `app/page.tsx`, `app/services/page.tsx`, `ServiceDetailsPage.tsx` (all six Details pages), `app/industries/page.tsx` and `app/contact/page.tsx`. `/our-work` uses a `relative` wrapper, because the combined section ends that page (last-section rule). No Hero component and no `ClientLogos` file was changed.

- **One section:** the main Hero and the Client Logo strip form one continuous section, with the strip attached directly beneath the Hero content: no gap, no separate section boundary.
- **One pin:** they are pinned as one unit (one `PinnedSection` around both), never as two separate pinned sections. The next section rises over the whole combined section.
- **Consistency:** keep the same design, positioning, spacing, alignment and responsive behaviour on every page. Each page keeps its own Hero content, imagery and visual identity. Reuse the frozen `ClientLogos` unchanged.
- **New pages:** build the Hero and Client Logo strip as one combined section from the start, pinned as one unit (or in a `relative` wrapper while it ends the page).
- **QA 2026-11-11** (Chrome, same-origin iframes at 1920×1080, 1280×720 and 390×844, on `/`, `/services`, UI/UX and AI Details, `/industries`, `/our-work`, `/contact`, `/about`): 0px between Hero and strip everywhere. Both sit in the same unit, which holds still while the next section rises over it 1:1. No horizontal overflow from these sections (the 1280/1440 sideways scroll is the Navbar issue under "About Us page"). Reduced-motion behaviour needed no change: the pin CSS is unchanged, and grouped sections still fall back to normal flow.

## Global Content & SEO Policy (owner, 2026-11-09)

Applies to the whole project: Homepage, `/services`, all Service Details pages, Navbar, Footer, shared sections and future pages.

- **All current content is approved for now.** This includes copy that code comments or older notes call a draft or "to confirm" (FAQ answers, Service Details copy, Our Work and Final CTA text).
- **Never change existing content or SEO elements without the owner's explicit instruction.** This covers copy, headings, alt text, page titles, meta descriptions and any other metadata. Do not edit them on the side while doing other work.
- **Future content and SEO updates may apply to any part of the project**, including copywriting, keyword improvements and metadata. Make them only when asked.
- **Content must stay easy to update without affecting approved designs or functionality.** Change only text or data, preferably in `lib/content/*`, and check that layout, animation, responsiveness and behaviour are unchanged.
- New content must be professional, relevant and naturally SEO-friendly. Avoid keyword stuffing and unsupported claims, such as invented prices, guarantees, statistics or client results.
- Content is flexible; approved visual designs and functionality stay protected unless the owner explicitly authorises changes.

## Routes

| Route | Page file | Status |
|---|---|---|
| `/` | `app/page.tsx` | Sections as listed below |
| `/services` | `app/services/page.tsx` | Built; sections awaiting review as listed below |
| `/services/ui-ux-product-design` | `app/services/ui-ux-product-design/page.tsx` | **Complete** (master Service Details page) |
| `/services/custom-software-development` | `app/services/custom-software-development/page.tsx` | Built; **awaiting owner review**; temporary images |
| `/services/web-development` | `app/services/web-development/page.tsx` | **Implemented** 2026-11-09; reviewed by the owner, content kept as is for now; temporary images |
| `/services/mobile-app-development` | `app/services/mobile-app-development/page.tsx` | **Implemented** 2026-11-09; **awaiting owner review**; temporary images |
| `/services/ai-data-automation` | `app/services/ai-data-automation/page.tsx` | **Implemented** 2026-11-09; **awaiting owner review**; temporary images |
| `/services/branding-digital-growth` | `app/services/branding-digital-growth/page.tsx` | **Implemented** 2026-11-09; **awaiting owner review**; temporary images |
| `/industries` | `app/industries/page.tsx` | Built 2026-11-09, section by section; **awaiting owner review**. See "Industries page" |
| `/our-work` | `app/our-work/page.tsx` | "Our Portfolio". Hero and Client Logos built 2026-11-09; **second section ON HOLD** pending Figma team feedback. See "Our Portfolio page" |
| `/contact` | `app/contact/page.tsx` | "Contact Us". In progress, section by section: five sections built 2026-11-09 to 2026-11-10. See "Contact Us page" |
| `/about` | `app/about/page.tsx` | "About Us". Started 2026-11-11, one section at a time: the combined Hero + Client Logo section, Our Story, the leadership messages and Our Global Presence are built, followed by the shared Our Process, Final CTA and Footer (reused unchanged, 2026-11-11). The leadership messages and Our Global Presence are **approved and frozen** (2026-11-11); the Hero + logos and Our Story are **awaiting the owner's visual review**. Linked since 2026-11-11 from every existing About Us link (Navbar Company dropdown, mobile menu, Footer). See "About Us page" |
| `/faq` | `app/faq/page.tsx` | "FAQ". Started 2026-11-11, one section at a time: the combined Hero + Client Logo section and the questions section (accordion and animated question mark), both **awaiting the owner's visual review**, then the shared Footer (reused unchanged, 2026-11-11). Not linked from anywhere yet. See "FAQ page" |
| `/insights` | `app/insights/page.tsx` | "Insights" (the Blog List design). Started 2026-11-11, one section at a time: the combined Hero + Client Logo section and the article grid (with the approved "3D Stacked Editorial" motion), both **awaiting the owner's visual review**. Linked from the Navbar Company dropdown and the mobile menu (Insights). See "Insights page" |

These 13 are the only routes. Nothing links to `/faq` yet; the Navbar's Company → Insights links to `/insights` (2026-11-11), and so does the Footer's Insights (2026-11-11). **How they are reached today:** the six Services cards (Homepage and `/services`) link to the six Details pages (approved, see "Approved decisions"); the Navbar's Services item links to `/services` and its Contact item to `/contact` (approved 2026-11-10); the logo and the Details breadcrumb link to `/`. Nothing links to `/industries` or `/our-work` yet: the Navbar's Industries, Our Work and Company items are still `#`, and every Footer link except the logo and About Us is `#`. Since 2026-11-11 every existing About Us link goes to `/about` (see "About Us links").

## Section status

**Do not modify any section below without the owner's permission.** This includes shared files they rely on: `components/ui/*`, `lib/assets.ts` (adding entries is fine) and `app/globals.css`.

### Approved and frozen

| Section | Component | Notes |
|---|---|---|
| Hero | `components/home/Hero.tsx` | **Approved and frozen** |
| Client Logo Strip | `components/home/ClientLogos.tsx` | **Approved and frozen**. Used on every page |
| Contact Us "Have a Project Idea?" (world map) | `components/contact/ContactLocations.tsx`, `contactLocations` in `lib/content/contact.ts` | **APPROVED** by the owner 2026-11-10, with permission to proceed to the next Contact section. Its Navbar overlap on near-16:9 screens is an accepted known limitation (see "Contact Us page") |
| Services | `components/home/Services.tsx` | **Approved and frozen**. Used on `/` and `/services`. Changed once after freezing (2026-11-09): each of the six cards now links to its Service Details page. The owner **approved this permanently** on 2026-11-10: the links must stay and must not be reverted. Everything else in the section stays frozen |
| Industries | `components/home/Industries.tsx`, `IndustryCarousel.tsx` | **Frozen** (the owner listed it as approved and frozen). Used on `/` and `/services` |
| FAQ | `components/services/Faq.tsx` | **Frozen** by the owner with the UI/UX Details page (2026-11-08). Shared by `/services` and every Details page |
| Final CTA | `components/home/FinalCta.tsx` | **Frozen** by the owner with the UI/UX Details page (2026-11-08). Shared by `/`, `/services`, every Details page, `/industries` and `/about` (added 2026-11-11); not yet on `/our-work` or `/contact` |
| UI/UX Details page | `app/services/ui-ux-product-design/page.tsx` and the `components/service-details/*` sections it renders | **Complete** (owner, 2026-11-08). The master Service Details design: any change to the shared template must keep this page pixel-identical |
| About Us Our Global Presence | `components/about/AboutPresence.tsx`, `aboutPresence` in `lib/content/about.ts`, office photo entries `aboutOfficeUsa`/`aboutOfficeUae`/`aboutOfficeInternational` in `lib/assets.ts` | **Approved and frozen** by the owner 2026-11-11, including its tablet layout. The final implementation and QA, and the accepted 320px location wrapping and shorter third tablet card, are under "About Us page" |
| About Us Leadership messages + stats bar | `components/about/AboutLeadership.tsx`, `aboutLeadership` in `lib/content/about.ts`, portrait entries `aboutChairman`/`aboutCeo` in `lib/assets.ts` | **Approved and frozen** by the owner 2026-11-11. Final implementation, QA and the accepted minor heading font-rendering difference are under "About Us page". Its stats bar repeats the Industries trust bar, so a change to either needs the owner's approval and must keep the two in step |

### Protected, not explicitly approved

| Section | Component | Notes |
|---|---|---|
| Navbar | `components/layout/SiteHeader.tsx` | Was frozen, reopened by the owner for sticky behaviour; later requests say not to modify it. Final version not explicitly re-approved. One change since, **approved** by the owner 2026-11-10: the Contact item links to `/contact` (see "Approved decisions"). Later on 2026-11-10 the owner asked for dropdown menus: these are built and **awaiting the owner's review** (see "Navbar dropdown menus"). The bar's own layout, logo, sizes, sticky/shrink behaviour and Contact link are unchanged. Make no further Navbar changes without the owner's instruction |
| Our Work | `components/home/OurWork.tsx`, `CardStack.tsx` | Protected by later requests. `OurWork` is Homepage only; `CardStack` is also imported by Industry Solutions on `/industries`, so a change to it affects both |

### Implemented, awaiting owner review

| Section | Component | Notes |
|---|---|---|
| Footer | `components/layout/SiteFooter.tsx`, `FooterBackground.tsx`, `footer-background.css` | Built; **awaiting owner review**. On every page except `/our-work` so far (added to `/contact` 2026-11-10, `/faq` 2026-11-11 and `/about` 2026-11-11) |
| Service List Hero (`/services`) | `components/services/ServicesHero.tsx` | Built; **awaiting owner visual review**. Responsive layout is not final until reviewed |
| Our Process | `components/services/OurProcess.tsx` | Built; **awaiting owner visual review**. Shared by `/services` and every Details page |
| Section motion | `components/motion/*` | Built 2026-11-06; **awaiting owner review** |
| Overlapping scroll | `components/home/PinnedSection.tsx`, `pinned-section.css` | Built; **awaiting comprehensive QA and owner approval** |
| Custom Software Development page | `app/services/custom-software-development/page.tsx`, its entry in `lib/content/service-details.ts` | Built 2026-11-08 from the master template; **awaiting owner review**. Images are temporary |
| Web Development page | `app/services/web-development/page.tsx`, `webDevelopment` in `lib/content/service-details.ts` | **Implemented** 2026-11-09 from the master template. Reviewed by the owner: content kept unchanged for now (project-wide content and SEO pass planned later). Images are temporary |
| Mobile App Development, AI Data & Automation, Branding & Digital Growth pages | their `app/services/<slug>/page.tsx` and entries in `lib/content/service-details.ts` | **Implemented** 2026-11-09 from the master template; **awaiting owner review**. Copy written without dedicated Figma designs, accepted for now under the Content & SEO policy. Images are temporary |
| Industries page (all five page sections) | `app/industries/page.tsx`, `components/industries/*`, `components/motion/RollingNumber.tsx`, `rolling-number.css` | Built 2026-11-09; **awaiting owner review**. No approval or freeze recorded |
| Our Portfolio Hero | `components/portfolio/PortfolioHero.tsx` | Built 2026-11-09. No explicit approval or freeze recorded |
| Contact Us Hero, Client Overview | `components/contact/ContactHero.tsx`, `ContactOverview.tsx` | Built 2026-11-09. No explicit approval or freeze recorded |
| Contact Us "Send Us a Message / Our Offices" | `components/contact/ContactForm.tsx`, `contactMessage` and `contactOffices` in `lib/content/contact.ts` | Built 2026-11-10; implementation and QA complete; **awaiting the owner's visual review**. Not approved or frozen |

### On hold

| Item | Notes |
|---|---|
| Our Portfolio, second section | **ON HOLD** pending feedback from the Figma team. Do not build, stub or approximate it until the owner releases it |

### Incomplete or temporary

- All five non-UI/UX Service Details pages use the UI/UX images (see "Service Details pages").
- `/industries` and `/our-work` are not linked from the Navbar or Footer yet; `/contact` is linked from the Navbar only (see Routes).
- `/our-work` has no Final CTA or Footer yet and ends on its last built section. `/contact` ends with the shared FAQ and Footer (no Final CTA).
- Pages behind the other Navbar and Footer links (Company, About Us, Careers, Insights, legal pages, Industry categories) do not exist.
- The Final CTA form has no backend. The Navbar dropdowns (Services, Industries, Company) are built and awaiting review; "Our Work" keeps its chevron with no dropdown.
- Full list under "Known limitations and pending tasks".

## Stack and structure

- Next.js 16.4.5 App Router, React 19.3, TypeScript, Tailwind CSS v4 (configured in `app/globals.css`, no config file), font Outfit via `next/font` in `app/layout.tsx`.
- Dependencies: `next`, `react`, `react-dom` and `motion`. Dev: Tailwind (`@tailwindcss/turbopack`), TypeScript, ESLint 9 with `eslint-config-next`. `motion` is used only for the mobile menu; section animations use CSS and `IntersectionObserver`. GSAP is not installed.
- `next.config.ts`: `cacheComponents: true` (see "Visited pages stay mounted"), `partialPrefetching: true`, `experimental.agentFeedback: true`, and a Turbopack `*.css` rule (see "CSS Modules do not work here").
- `app/layout.tsx`: root metadata (title "Way-Wise Tech" and a description), `scroll-pt-[110px]` on `<html>`, `overflow-x: clip` on `body` (in `globals.css`).
- `app/page.tsx` order: `SiteHeader`, then `<main>` with Hero, ClientLogos, Services, Industries, OurWork, FinalCta, then `SiteFooter`. See "Pinned sections" for which are pinned.
- `app/services/page.tsx` order: `SiteHeader showBanner={false}`, then `<main>` with `ServicesHero`, `ClientLogos`, `Services`, `OurProcess`, `Industries`, `Faq` and `FinalCta`, then `SiteFooter`. `Services`, `Industries`, `ClientLogos` and `FinalCta` are the Homepage components, reused unchanged. Do not invent further sections. The Homepage `OurWork` is not on this page: the owner withdrew that request. If it is added before a section other than the tall Footer, recheck its card spacer, which overflows the section by about 690px from 1024 and 970px below, and could add scrolling past a short Footer.
- Service Details pages: see "Service Details pages". Industries, Our Portfolio and Contact Us: see their own sections below.
- Folders:
  - `components/home/`: Homepage sections, `PinnedSection` and `pinned-section.css`, `CardStack`.
  - `components/services/`: `ServicesHero`, `OurProcess`, `Faq`.
  - `components/service-details/`: the Details template.
  - `components/industries/`: `IndustriesHero`, `IndustriesAtAGlance`, `IndustriesTrust`, `IndustriesSolutions`, `industries-solutions.css`.
  - `components/portfolio/`: `PortfolioHero`.
  - `components/contact/`: `ContactHero`, `ContactOverview`, `ContactLocations`, `ContactForm`.
  - `components/layout/`: Navbar, Footer, Footer background.
  - `components/motion/`: `MaskLine`, `Reveal`, `revealOrder`, `StaggerText`, `RollingNumber`, `motion.css`, `rolling-number.css`.
  - `components/ui/`: shared parts.
  - `lib/assets.ts`: image paths and client logos. `lib/content/`: content data.
- Shared: `components/ui/AssetImage.tsx`, `components/ui/ButtonLink.tsx` (details under "Shared UI components"), `lib/assets.ts`.
- Content width: 1560px at 1920 (x=180 to 1740). Final CTA is the exception, x=308 to 1612.
- Page metadata: each page exports `metadata` with a `title` and `description` only. Service Details pages build theirs from `title` and `metaDescription` in their content entry.

## Service Details pages

Every service page renders one shared template. The UI/UX & Product Design page is the master design.

### Files

- `components/service-details/ServiceDetailsPage.tsx`: the template. It takes one `service: ServiceDetails` prop and renders `SiteHeader showBanner={false}`, then in `<main>`, each in its own `PinnedSection` (except `ServiceDetailsHero` and `ClientLogos`, which share one as the combined Hero section): `ServiceDetailsHero`, `ClientLogos`, `WhyChoose`, `OurProcess`, `RecentProjects`, `WhyChooseUs`, `Faq`, `FinalCta`; then `SiteFooter`.
- `ServiceDetailsHero.tsx`: breadcrumb (Home • service), two-line `h1`, description, "Get Started" and "Watch Our Work" (both `#`), and the hero artwork shown whole (`object-contain`). From `lg` the artwork fills a 1920/808 section with the text on top; below `lg` the text comes first and the artwork sits underneath with its top edge faded.
- `WhyChoose.tsx`: image card beside eyebrow, heading, description and checklist. Uses `Container`, `SectionEyebrow`, `MaskLine`, `Reveal`.
- `RecentProjects.tsx` and `ProjectCarousel.tsx`: heading and intro above a looping project carousel. `ProjectCarousel` repeats the frozen `IndustryCarousel`'s scrolling logic rather than sharing it; keep the two in step if one changes.
- `WhyChooseUs.tsx`: heading, description and image above four reason cards with drawn icons (`lightbulb`, `team`, `laptop`, `chat-check`).
- Reused unchanged: `ClientLogos`, `OurProcess`, `Faq`, `FinalCta`, `SiteHeader`, `SiteFooter`, `PinnedSection`.

### Content and assets

- `lib/content/service-details.ts`: the `ServiceDetails` type and one export per service: `uiUxProductDesign`, `customSoftwareDevelopment`, `webDevelopment`, `mobileAppDevelopment`, `aiDataAutomation`, `brandingDigitalGrowth`. Each holds `slug`, `title`, `metaDescription`, `hero`, `whyChoose` and `whyChooseUs`. `recentProjects` in the same file is shared by every Details page (owner decision).
- `lib/assets.ts`: image paths. UI/UX uses `serviceDetailsHero`, `serviceDetailsWhyChoose`, `serviceDetailsDifference`; Recent Projects uses `projectRealEstate`, `projectSaasDashboard`, `projectMobileApp`, `projectAttorney`.
- **Temporary images:** each of the five other services has its own three entries, and all 15 **temporarily point at the UI/UX files**. Their alt text therefore describes the UI/UX images. Kept on purpose until the owner supplies each service's own files; then only the path changes, to `/images/service%20details/<slug>/{hero,why-choose,why-choose-us}.png`.

  | Service | Hero key | Why Choose key | Why Choose Us key |
  |---|---|---|---|
  | Custom Software Development | `customSoftwareHero` | `customSoftwareWhyChoose` | `customSoftwareWhyChooseUs` |
  | Web Development | `webDevelopmentHero` | `webDevelopmentWhyChoose` | `webDevelopmentWhyChooseUs` |
  | Mobile App Development | `mobileAppHero` | `mobileAppWhyChoose` | `mobileAppWhyChooseUs` |
  | AI, Data & Automation | `aiDataAutomationHero` | `aiDataAutomationWhyChoose` | `aiDataAutomationWhyChooseUs` |
  | Branding & Digital Growth | `brandingDigitalGrowthHero` | `brandingDigitalGrowthWhyChoose` | `brandingDigitalGrowthWhyChooseUs` |
  | **Current file (all rows)** | `service details/service details hero.png` | `service details/why business choose.png` | `service details/real difference.png` |

- Image sizes used for aspect ratios: hero 3840×1616, Why Choose 1414×1760, Why Choose Us 1500×625.

### Status per page (2026-11-10)

| Page | Content | Status |
|---|---|---|
| UI/UX & Product Design | From its Figma design | **Complete**, master design |
| Custom Software Development | Written without a Figma design | Reviewed by the owner 2026-11-09: kept unchanged with temporary images; phone breadcrumb and 320px card-title wrapping accepted. Not formally frozen |
| Web Development | Written without a Figma design | Reviewed by the owner 2026-11-09: content kept as is for now. Not formally frozen |
| Mobile App Development | Written without a Figma design, in line with its Services card | **Awaiting owner review** |
| AI, Data & Automation | Written without a Figma design, in line with its Services card | **Awaiting owner review** |
| Branding & Digital Growth | Written without a Figma design, in line with its Services card | **Awaiting owner review** |

All copy on the five non-UI/UX pages is accepted for now under the Content & SEO policy. Outstanding for all five: dedicated images (none of the `<slug>` asset folders exists), and browser scroll QA (none recorded).

### Owner decisions (2026-11-08)

- Per service, only Hero, Why Choose and Why Choose Us content change. Client Logos, Our Process, Recent Projects (same content, images and carousel), FAQ, Final CTA and Footer stay identical on every page.
- URLs under `/services/`: `custom-software-development`, `web-development`, `mobile-app-development`, `ai-data-automation`, `branding-digital-growth`. Build order: Custom Software Development, then Web Development, then the others one at a time. All five are built.
- Asset folders: `public/images/service details/<slug>/hero.png`, `why-choose.png`, `why-choose-us.png`. None exists yet. Until the owner supplies them, the pages reuse the UI/UX images through their own `lib/assets.ts` entries, so each path can be swapped later.
- Owner decisions 2026-11-09, after reviewing Custom Software: Recent Projects stays shared on all Details pages; the UI/UX master is preserved exactly, including its three-line mobile headline; the duplicate section ids (see "Visited pages stay mounted") are not to be fixed now.
- The Hero may gain settings (such as mobile background colour or headline size) only if the UI/UX Hero stays pixel-identical, proven with before/after comparisons.
- The UI/UX page and its assets stay untouched. Never invent copy or images; wait for the owner's content or instruction.

### Creating a new service page

1. Add the service's image entries to `lib/assets.ts` (new entries only; existing ones stay).
2. Add an export of type `ServiceDetails` to `lib/content/service-details.ts`, with content the owner supplied or approved. Keep headline and heading lines no wider than the UI/UX ones, or the master layout can break at some widths.
3. Create `app/services/<slug>/page.tsx` like the existing ones: export `metadata` from the entry's `title` and `metaDescription`, and render `<ServiceDetailsPage service={entry} />`.
4. Do not change the template or its sections for one page. If a change is unavoidable, it needs the owner's approval and proof that the UI/UX page is unchanged.
5. Run `tsc` and ESLint (see "Working rules"), then check the page and the UI/UX page in the browser at the usual widths.

## Industries page (`/industries`)

Built 2026-11-09, section by section; **awaiting owner review**, with no approval or freeze recorded. Page structure: `SiteHeader showBanner={false}`, then `<main>` with the five sections below plus the shared `FinalCta`, then `SiteFooter`. Pins are under "Pinned sections".

| Section | File | Notes |
|---|---|---|
| Hero | `components/industries/IndustriesHero.tsx` | 808px section at 1920, the background export's ratio, with the text and a 620×567 photo grid centred in it. The photos' rounded corners are in the files. Below `lg` the text comes first and the grid follows at full width |
| Client Logos | `components/home/ClientLogos.tsx` | The frozen shared strip |
| Industries at a Glance | `components/industries/IndustriesAtAGlance.tsx` | At 1920 the text sits in the left 610px and four 459px cards fill the right 950px, 32px apart, centred in a 1080px section. Cards share the Services card styles, including the hover lift. Two across from `md`, one below |
| Trust ("A Trusted Partner Across Industries") | `components/industries/IndustriesTrust.tsx` | Wide image (`Trusted partner.png`, 3120×931) and a bar of four stats from `industryStats`, each a `RollingNumber`. Pinned with `hold="70svh"` so the stats have time to roll |
| Industry Solutions | `components/industries/IndustriesSolutions.tsx`, `industries-solutions.css` | Four 1560×360 cards at 1920 (number circle, text, 660×280 image), 30px apart; image on top below `lg` |
| Final CTA, Footer | shared | Unchanged |

**Custom motion on this page:**
- **`RollingNumber`** (`components/motion/RollingNumber.tsx`, `rolling-number.css`): an odometer roll, once per stat.
  - **Trigger:** each digit rolls through one full turn onto its final digit when the number reaches the same trigger line as `Reveal`, including when it is already on screen at load.
  - **Timing:** all digits share one timing, `translate` over 2.8s after a 600ms delay so the stats bar's Reveal fade finishes first.
  - **Before it is reached:** the number is invisible, but its space is kept.
  - **Fallbacks:** the server renders the final value, so it shows without JavaScript and with reduced motion (no transition). Screen readers get the final value only.
- **Industry Solutions stacking:**
  - **Sticky stack:** the Homepage Our Work stacking, repeated here because that section is protected and keeps it private. The page imports the protected `CardStack` for `--card-height`. Each card pins 16px lower than the last, and the first pin is 88px, 96px from `md`, 114px from `xl`, and 148px at 1280 and up on screens 820px or taller. A card too tall for its pin stops 12px above the screen bottom.
  - **Scroll-driven layering** (`industries-solutions.css`), using CSS `animation-timeline: view()` with no scroll listeners, so scrolling up reverses it exactly. The incoming card leans back slightly and flattens, and its image settles from a gentle zoom. The card underneath recedes (scale and a small tilt) and dims, keeping its top edge visible. Only transform, scale and opacity animate.
  - **Fallbacks:** the layering runs only inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`; otherwise the plain sticky stack shows. The sticky itself is motion-safe, and without JavaScript the cards scroll normally.
- **Trust hold:** see `hold` under "Pinned sections".

The owner gave this page its own animation and hold requirements while it was built, and they are implemented as above. Only the code is recorded here, not the original wording of those requests.

## Our Portfolio page (`/our-work`)

Labelled "Our Portfolio" (title "Our Portfolio | Way-Wise Tech"), at the URL of the Navbar's "Our Work" item. The Navbar item itself is still `#`.

- Built 2026-11-09 from `our protfolio.png`, which shows only the Hero and the Client Logo strip:
  - **Hero:** `components/portfolio/PortfolioHero.tsx`. The artwork (`our portfolio/Hero bg.png`, 3840×1616) fills a 1920/808 section from `lg`, shown whole, with the text vertically centred on its left. Below `lg` the text comes first and the whole artwork follows with its top edge faded. Buttons are `#`.
  - **Client Logos:** the frozen shared strip.
- No explicit approval or freeze is recorded for the Hero.
- **Second section: ON HOLD** pending Figma team feedback. Do not build, stub or approximate it until the owner releases it.
- The page has no Final CTA or Footer yet. Client Logos is its last section (see the last-section rule).

## Contact Us page (`/contact`)

Being built section by section; the owner approves each one before the next starts. Ends with the shared FAQ and Footer (added 2026-11-10, no Final CTA). Reached from the Navbar's Contact item (desktop and mobile) and the Company dropdown's "Contact Us" button.

| # | Section | File | Status |
|---|---|---|---|
| 1 | Hero | `components/contact/ContactHero.tsx` | Built 2026-11-09. Handshake artwork (`contact us/contact.png`, 3840×1614) with the design's sand-to-transparent gradient on the left, text vertically centred. Below `lg` the text comes first, then the whole artwork with a faded top. Eyebrow "Case Study", headline "Let's Discuss Your Next Project", buttons "Visit Live Website" and "Discuss a Similar Project" (both `#`). No explicit approval recorded |
| 2 | Client Logos | `components/home/ClientLogos.tsx` | Frozen shared strip, pinned here |
| 3 | Client Overview | `components/contact/ContactOverview.tsx`, `contactOverview` in `lib/content/contact.ts` | Built 2026-11-09 from `Frame 2147239128.png`. Text beside a 750×272 image, then four contact cards (Call Us, Email Us, Live Chat, Meeting), two across. The card icons repeat the Why Choose Us paths (keep them in step), and the card descriptions repeat the Why Choose Us text word for word, as drawn. No explicit approval recorded |
| 4 | "Have a Project Idea? / Let's get started" (world map) | `components/contact/ContactLocations.tsx`, `contactLocations` in `lib/content/contact.ts` | Built 2026-11-10 from `Frame 2147239130 (1).png`. QA done; **APPROVED** by the owner 2026-11-10 |
| 5 | "Send Us a Message / Our Offices" | `components/contact/ContactForm.tsx`, `contactMessage` and `contactOffices` in `lib/content/contact.ts` | Built 2026-11-10 from `section.png` (project root). Implementation and QA complete; **awaiting the owner's visual review**, not approved or frozen. `section.png` is no longer in the project root |
| 6 | FAQ (shared) | `components/services/Faq.tsx` | Added 2026-11-10 by the owner's instruction, reused unchanged (frozen component). Pinned over the form section; accordion checked on this page. **Awaiting the owner's visual review** |
| 7 | Footer (shared) | `components/layout/SiteFooter.tsx` | Added 2026-11-10, reused unchanged. Rises over the pinned FAQ. **Awaiting the owner's visual review** |

**World map section:**
- **Layout:**
  - `contact us/map.png` (3840×2160) is the whole 1920×1080 frame: sky, map and the three pins with their labels (Los Angeles, Dubai, Dhaka). It matches the reference outside the text to 0.21/255.
  - From `lg` the section is 16:9 with the map filling it and the centred text in its empty top band, everything scaling with the width up to the 1920 sizes.
  - Below `lg` the text comes first on `#dbeefd` (the map's top sky colour), then the whole map with its top 48px faded.
- **Typography at 1920:** heading 66px semibold, navy and brand red, with baselines matching the reference exactly (159 and 229px). The description is 22px with 33px line spacing in Outfit at 0.04em, so its first line matches the reference's 745px width and line break. The reference's description looks like Inter.
- **Description spacing (restored 2026-11-10, owner-authorised):** its top margin is `lg:mt-[clamp(10px,0.9375vw,18px)]` (18px at 1920). An earlier QA pass had wrongly cut it to 7px, after measuring while the `Reveal` rise (12px) was still running, which put the description 12px high. Browser-verified after the restore at 1920×1080: baselines about 281.9px and 314.9px against the reference's about 282 and 315 (ink rows 266–285 and 299–318 against 267–287 and 300–320). **Measure only after `Reveal` has finished**: a `.ww-rise` element sits 12px low until its transition ends.
- **QA (2026-11-10):**
  - **Widths:** checked at 2560, 1920, 1440, 1280, 1024, 768, 390 and 320px. No horizontal overflow, the heading stays on two lines everywhere, and no console errors.
  - **Overlap:** Client Overview holds still while the map section rises 1:1 with scroll, and reverses cleanly.
  - **Reduced motion:** **verified**: pinning off and both sections in normal document flow, as in "Pinned sections".
  - **End of page:** **verified**, with no meaningful gap at 1440×900 or 1280×720 (±0.5px rounding).
- **Accepted known limitation (owner, 2026-11-10). Do not fix without the owner's explicit authorisation:** on screens almost exactly as tall as the section (near 16:9), the heading's top sits behind the sticky Navbar at the end of the page.

  | Screen | Heading top vs Navbar bottom |
  |---|---|
  | 1024×576 | 9.4px behind |
  | 1152×648 | 1.5px behind |
  | 1280×720 | 9.1px behind |
  | 1366×768 | 3.5px behind |
  | 1536×864 | 6.5px clear |
  | 1600×900 | about 5px clear |

  A full fix would change the Figma spacing: at 1024×576 the description would hit the map (Greenland) with only about 13px of room. Normal browser windows, being shorter than 16:9, are not affected.
- **While pinned (since 2026-11-10):** the map section is now pinned while the form section rises over it. On a screen taller than the map section, it holds at `top: 0`, so its heading sits under the Navbar during that hold (81px against 90px at 1440×900). Left as it is, consistent with the accepted limitation above; the owner has not ruled on this case separately.

**"Send Us a Message / Our Offices" section (built 2026-11-10, awaiting the owner's visual review):**
- **Layout at 1920:** a 1080px section on `#f4f0e9`, with two white cards 885px tall, 40px apart, filling the 1560px content width:
  - **Form card:** 878px wide, 16px radius, no border, 48px side padding.
  - **Offices card:** 642px wide, 16px radius, 1px `#d0d8e0` border.
  - Every size is the 1920 value times `--u` (1px at 1920, `clamp(0.6667px,0.05208vw,1px)` from `xl`). Fonts and inputs have minimums (inputs at least 16px, so phones do not zoom on focus).
- **Typography (Outfit, fitted to the reference's line widths):**
  - **Headings:** 48px semibold at -0.02em, 58px line spacing.
  - **Eyebrows:** `SectionEyebrow` at 18px bold, 0.06em.
  - **Descriptions:** 22px `ink-muted`.
  - **Labels:** 24px medium, black, with a red `*` on required fields.
  - **Field text:** 19px; placeholders `steel`.
  - **Office names:** 24px semibold `#043461`.
  - **Office details:** 20px `ink-muted`.
  - **Button:** 17px semibold at 0.035em.
  - The reference's labels and field text look like Inter.
- **Form fields** (in `contactMessage`, two columns from `sm`):
  - Full Name*, Your Company, Email Address*, Phone Number*, Project Type*, Budget Range*, Project Details* (textarea, full width).
  - **Fields:** 55px tall (textarea 153px), 8px radius, 1px `#c7cdd9` border, turning navy on focus.
  - **Button:** red "Send Message", 56px tall, 12px radius.
- **Full Name placeholder:** "David Michel", changed by the owner. The reference shows "John Doe".
- **Frontend only:** there is no backend or destination. The button is `type="button"`, as in the Final CTA form, so nothing is submitted or sent.
- **Project Type:** the six service names, from `serviceCards` in `lib/content/services.ts`.
- **Budget Range:** generic project budget bands supplied by the owner (2026-11-10). They are not confirmed service prices and are separate from the Homepage pricing cards. Exactly: Under $1,000 · $1,000 – $3,000 · $3,000 – $5,000 · $5,000 – $10,000 · $10,000 – $25,000 · $25,000+ · Not sure yet.
- **Dropdown placeholders:** both dropdowns open on a disabled placeholder ("Select a service", "Select budget range").
- **Offices** (in `contactOffices`): Los Angeles, Dubai and Dhaka, each with a photo, address, phone and hours, with icons (pin, phone, clock) as inline SVGs, approved by the owner.
  - **Photos:** `contact us/usa.png` (302×300, shown in a 151px frame as in the design), `dubai.png` and `dhaka.png` (300×300). Their rounded corners are in the files, and they are shown whole.
  - **Row spacing:** 191px at 1920 (150px photo, 20px, 1px `#e1e1e1` divider, 20px). Each text block has a -0.8u bottom margin so the rows are spaced by the photo alone.
  - **Photo framing:** the owner's `usa.png` is framed slightly wider than the reference's thumbnail; it is used as supplied. The photos replaced earlier letterboxed exports, which were not used.
- **Responsive:**
  - **From `xl`:** the two cards sit side by side with equal heights.
  - **Below `xl`:** they stack.
  - **Fields:** two across from `sm`, one below.
  - **Office photos:** stay beside their details (88px on phones).
  - **Headings:** wrap on narrow phones ("We're Global, Always" takes three lines at 320px).
- **QA (2026-11-10):**
  - **1920 match:** every heading, label, field, photo, office name and office line within about 1px of the reference; office addresses wrap at the same words. Mean pixel difference 5.6/255 on the form card's top half and 7.8/255 on the offices list (which includes the differently framed LA photo).
  - **Widths:** 2560, 1920, 1440, 1280, 1024, 768, 390 and 320px. No horizontal overflow and no console errors.
  - **Overlap:** the map holds while this section rises 1:1 with scroll, and reverses cleanly.
  - **End of page:** no gap (±0.5px).
  - **Reduced motion:** verified at 1440×900, 1280×720 and 390×844: all pins static, sections in normal flow, text shown.

## About Us page (`/about`)

Started 2026-11-11, one section at a time; the owner reviews each before the next starts.

- **Hero** (`components/about/AboutHero.tsx`, `aboutHero` in `lib/content/about.ts`, asset `aboutHero` → `about us/Hero Image.png`, 3840×1614): built from `Hero Section (1).png` (project root). **Awaiting the owner's visual review**; not approved or frozen.
  - The artwork is the whole 1920×807 section and matches the reference's background exactly, so nothing is drawn over it. From `lg` it fills a 3840/1614 section, text vertically centred on the left; below `lg` the text comes first on `#e8d6c0`, then the whole artwork with its top 48px faded (the Portfolio/Contact Hero pattern).
  - Type at 1920: eyebrow 18px bold at 0.095em; headline 72px, weight 630; description 26px, line height 1.385, 0.021em; buttons 59px (primary) and 61px (outline, 4px more padding on its arrow side), label-to-arrow 7px; checklist 18px at 0.01em with the Homepage Hero's orange checks.
  - QA 2026-11-11 (headless Chrome at 1920×1080 against the reference): every text line and both buttons within 0–2px; description line breaks identical; mean pixel difference 4.1/255 over the section. Widths 2560, 1920, 1440, 1280, 1024, 768, 390 and 320 checked: no overflow from the Hero.
  - Content: all copy is the reference's wording. "Get a Free Quote" is `#`; "Our Work" links to the existing `/our-work`.
  - **Hero + Client Logo strip are ONE section (owner, 2026-11-11):** `AboutHero` renders one `<section aria-labelledby="about-hero-heading">` holding the Hero area and, directly beneath it, the frozen `ClientLogos` (reused unchanged, nested inside). There is no separate `PinnedSection` or `relative` wrapper for the logos. At 1920 the strip sits at y 907–1038 (132px), logos within 1–2px of the reference, mean difference 2.05/255.
  - **Pinning:** the combined section is the page's only section, so under the last-section rule it is not pinned yet and sits in a `relative` wrapper. When the next section is added, wrap `AboutHero` as one unit in `PinnedSection` (never the logos separately), so the next section rises over the whole Hero + logos section.
- **Our Story** (`components/about/AboutStory.tsx`, `aboutStory` in `lib/content/about.ts`): built 2026-11-11 from `Frame 2147239133.png` (project root). **Awaiting the owner's visual review**; not approved or frozen.
  - **Layout at 1920:** a 1080px section on `bg-sand`, laid out as `minmax(0,830fr)_minmax(0,730fr)`.
    - **Text:** `SectionEyebrow` "Our Story" (bold, 0.095em); `SectionHeading` (52/60px); three 22px paragraphs with 29px line spacing, 29px apart.
    - **Cards:** a 2×2 grid of 353×286.5 photo cards, 24px apart.
    - **Location labels:** white, 35px tall, 8px radius, 10px from the top-right corner, with an outlined red pin and 16px medium navy text. They are drawn in code; the photos have no labels.
  - **Assets** (`lib/assets.ts`, mapped by pixel comparison): `team.png` → top-left, `california.png` → top-right, `dubai.png` → bottom-left, `dhaka.png` → bottom-right. Each is 706×573, with rounded corners in the file.
  - **Content to confirm:** the reference labels both top cards "California, USA" (the first is the team photo), and it leaves a double-width gap before "Global Company". Both are kept as drawn.
  - **Responsive:** below `lg` the text comes first, then the cards (two across from `sm`, one below). The labels scale down with the width (minimum 14px text).
  - **QA 2026-11-11:**
    - **1920:** every text line within 0–1px of the reference, with identical line breaks; cards and labels exact or within 1px; mean difference 1.92/255.
    - **Other sizes:** 2560, 1920, 1440, 1280, 1024, 768, 390 and 320 checked. No overflow, no end gap, labels inside the cards, and the Hero + logos unit holds while Our Story rises over it.
  - **Card hover (owner-approved 2026-11-11):** on hover, only the photo zooms to 1.03× over 0.5s ease-out. The photo sits in a frame clipped to the files' own baked corners (26px in each 706×573 file, so `rounded-[3.683%_/_4.538%]`, exact at any size). There is no card lift, shadow, border or label animation.
    - **Conditions:** the rule applies only inside `(hover: hover)` and `(prefers-reduced-motion: no-preference)`, so touch-only devices and reduced motion get no zoom. The entrance reveal is unchanged.
    - **Verified:** at rest, the cards are pixel-identical to before (mean difference 0.001). A real mouse hover zooms only the hovered photo; card size, label and the other cards are unchanged, and the corners stay clean.
  - **Pinning:** `AboutHero` is now in a `PinnedSection` with `limitCoverTo='[aria-labelledby="about-story-heading"]'`, because Our Story (1080px) is shorter than the Hero unit at 2560 (about 1208px). Our Story is the last section, so it sits in a `relative` wrapper. Recheck the cap when the next section is added.
- **Leadership messages + stats bar** (`components/about/AboutLeadership.tsx`, `aboutLeadership` in `lib/content/about.ts`, `id="about-leadership"`): built 2026-11-11 from `Frame 2147239134.png` (project root). **Approved and frozen by the owner 2026-11-11** after visual review. Do not modify it without the owner's permission.
  - **Final QA status at approval:** 1920 match within 0–2px on every text line, with identical line breaks; portraits and stats bar exact. Responsive layout checked at 2560, 1920, 1440, 1280, 1024, 768, 390 and 320: no overflow, no end gap, the pin hand-over from Our Story works and the numbers roll in. Reduced motion verified (details below). The one accepted difference is the heading font rendering noted under "Remaining difference".
  - **Layout at 1920:** a 1080px section on `#f4f0e9`, with two 750px `article`s 60px apart.
    - **Each message:** a 240×400 portrait (12px CSS corners; `chairman.png` and `ceo.png` are 480×800 with square corners), 40px, then a 470px text column. The text is an eyebrow (18px bold, 0.095em), an `h2` (46px with 53px line spacing), three 22px paragraphs (28px line spacing, 11px apart), the name (26px semibold), then role and company (26px `ink-muted`).
    - **Text overrun:** the text column runs 4px into the gap, so "long-" ends its line as in the reference.
  - **Stats bar:** 78px below; it is the Industries trust bar repeated, because `IndustriesTrust` keeps its markup private (keep the two in step). It uses the shared `industryStats` and `RollingNumber`, and has `overflow-clip` (see below).
  - **Responsive:** from `xl` the messages sit side by side, scaling with the width. Below `xl` they stack; the portrait sits beside the text from `md` and above it (max 240px) below `md`. The stats bar keeps the Industries behaviour.
  - **QA 2026-11-11:**
    - **1920:** the left message is within 1–2px on every line, with identical line breaks. Portraits and the stats bar are exact; mean difference 5.32/255 with the numbers not yet rolled.
    - **Other sizes:** 2560, 1920, 1440, 1280, 1024, 768, 390 and 320 checked. No overflow, no end gap, Our Story holds while this section rises, and the numbers roll in.
  - **Paragraph gaps (owner, 2026-11-11):** per message from `xl`, as in the reference: 11px for the Chairman and 15px for the CEO (`paragraphGap` in the component, by message order). Both columns are now within 0–2px on every line; mean difference 3.65/255.
  - **Reduced motion (verified 2026-11-11, Chrome `--force-prefers-reduced-motion`):**
    - **Layout:** identical to the normal render.
    - **Numbers:** the stats show their final values at once, with no roll (`RollingNumber` checks the media query).
    - **No animation:** there is no reveal or rise, because those rules are motion-safe only.
    - **No pinning:** the page ends exactly at the sum of its sections (3200px at 1920).
  - **Remaining difference:**
    - **Heading red words:** they render up to about 13px wider or narrower than the reference ("Tomorrow" wider, "Success" narrower), which looks like font rendering in the reference.
- **Our Global Presence** (`components/about/AboutPresence.tsx`, `aboutPresence` in `lib/content/about.ts`, `id="about-presence"`): built 2026-11-11 from `Frame 2147239135.png` (project root). **Approved and frozen by the owner 2026-11-11** after visual review, including the tablet layout. Do not modify it without the owner's permission.
  - **Final QA status at approval:**
    - **Desktop (`lg` and up):** three cards across; at 1920, 504px cards, 24px gaps and 739px equal heights, with every text line within 0–2px vertically and 0–3px in width of the reference (mean difference 3.00/255).
    - **Tablet (`md` to `lg`):** two across with the third card centred at the same width.
    - **Mobile (below `md`):** one card per row.
    - **Pinned scroll:** the leadership section holds while this section rises, with no end gap.
    - **Overflow:** none, horizontally or inside the cards, at 2560, 1920, 1440, 1280, 1024, 1023, 900, 768, 767, 390 and 320.
    - **Accepted minor points:** at 320 two location lines wrap to a second line; on tablet the third card is shorter than the first two (four operations against five).
  - **Layout at 1920:** a 1080px section on `#d0d0c8`.
    - **Header:** the Industries trust pattern. The eyebrow and a navy `SectionHeading` ("A Global Team" / red "Working as One") sit on the left; the 22px `ink-muted` description, max 26.9em, sits on the right; the two share a bottom line.
    - **Cards:** 40px below, three 504px cards, 24px apart and 739px tall (equal heights). Each is white, 16px radius, with a 504×350 photo whose top corners are rounded in the file.
    - **Card body:** 32px side padding. The title is 28px semibold, the location 22px `ink-muted`, and "Key Operations:" 22px medium `#2a2a2a`. Below that is a list in `steel` at 20px and 0.03em (the reference's list looks like Inter), rows 42px apart, each with a 24px `#faeddc` circle holding a red arrow.
  - **Assets** (mapped by pixel comparison): `usa.png` → Headquarters, `uae.png` → Development Center, `international.png` → Operations Office. Each is 1008×700.
  - **Responsive:**
    - **Below `lg`:** the header stacks.
    - **Tablet, `md` to `lg` (owner, 2026-11-11):** two cards across on a four-track grid, each card spanning two tracks. The third card starts on track two, so it is centred on its own row at the same width. Verified at 768, 900 and 1023 (third card centred within 1px); the first row's cards match in height, and the third has its natural height.
    - **Below `md`:** one card per row.
    - **From `lg`:** three across, unchanged at 1920 (504px cards, 24px gaps, 739px tall).
  - **QA 2026-11-11:**
    - **1920:** every text line within 0–2px vertically and 0–3px in width; cards exact; mean difference 3.00/255.
    - **Other sizes:** 2560, 1920, 1440, 1280, 1024, 768, 390 and 320 checked. No overflow, no end gap, no text overflow, and the leadership section holds while this one rises. At 320 two locations wrap to two lines.
  - **Card animation, "Split convergence with subtle depth" (owner-approved concept 2026-11-11, after the freeze; replaced the earlier rise-and-cascade animation):** in `components/about/about-presence.css`. It is CSS scroll-driven (`animation-timeline`), with no JavaScript and no scroll listeners.
    - **Hooks:** `.wp-presence-row` on the card list, `.wp-presence-card` on each card, `.wp-presence-card__media` on each photo frame. The section has `overflow-x-clip`, so side-entering cards never widen the page.
    - **Desktop (`lg`+):** one shared row timeline (`--wp-row`) inside a shared `perspective: 1800px`.
      - **Left card:** from `translateX(-22%) rotateY(10deg) scale(0.96)` (-14% from 1024 to 1279, where the gutters are narrow).
      - **Right card:** the mirror of the left card.
      - **Centre card:** stays in place, coming forward from `translateY(28px) translateZ(-90px)`.
      - **Finish:** all three start at opacity 0.55 and converge to no transform and opacity 1 over the row's full range (see "Range and easing").
    - **Tablet (`md`):** per-card timelines (`--wp-card`): card 1 from the left (-12%, 9deg), card 2 from the right, the centred third card from depth.
    - **Mobile:** depth only per card, with its own `perspective()`; no sideways movement.
    - **Photos:** settle from `translate(±3% against the card, 4%) scale(1.1)` on the card's timeline.
    - **Range and easing (slowed by the owner's request, 2026-11-11):** the cards and photos share one range and one curve, so the tilt, depth and photo parallax stay in step.
      - **Range:** `entry 0%` → `entry calc(100% + min(40px, 2.5vw))`, the longest window the layout allows, from the row's first appearance to just after it is fully on screen.
      - **Easing:** a gentle ease-out sine, `cubic-bezier(0.39, 0.575, 0.565, 1)`; it replaced the front-loaded ease-out cubic.
      - **Effect:** at the same scroll point, desktop progress went from 0.398 to 0.341.
    - **Settling before the pin:** the end margin (at most 40px) is always smaller than the section's bottom padding (at least about 53px), which lies below the row, so the cards are settled before the section pins. While pinned they do not move against the screen, so they hold still. Verified 1px before the pin at 1920×945, 1280×720 (the tightest margin), 768×1024 and 390×844: every card and photo at progress 1, identity transform, opacity 1. It is identical deeper into the pin, and reversal reproduces the mid-entry values exactly.
    - **Reveal:** where this runs, the cards' one-time Reveal rise is switched off (`translate: none !important`), so the two never stack.
    - **Gotchas:**
      - **Single `transform`:** keep motion in a single `transform`; separate `translate` and `scale` beside `transform` were dropped from compiled keyframes.
      - **Named timeline:** the photo frame (`overflow-hidden`) is a scroll container, so photos must use the named card or row timeline, not `view()`.
      - **No typed division:** the rotation uses its own `--wp-turn`, because dividing a percentage by a percentage in `calc()` is not reliably supported.
    - **Verified 2026-11-11:**
      - **Chrome, desktop (1920×945 window), tablet (768×1024) and mobile (390×844):**
        - **Mid-entry:** the desktop cards share one progress value (0.398) with the side shift, turn and centre depth applied; tablet and mobile behave as designed.
        - **Settled before the pin:** at the scroll position where the section pins, every card and photo has an identity transform and opacity 1.
        - **Stable while pinned:** deeper into the pin the values are identical.
        - **Reversal:** scrolling back up gives exactly the mid-entry values.
        - **Overflow:** none (scroll width equals client width).
      - **Reduced motion** (Chrome `--force-prefers-reduced-motion`): the cards sit static in the exact design layout (x 180–683 / 708–1211 / 1236–1739, y 262–1000 at 1920).
      - **Fallback:** without `animation-timeline` support the one-time Reveal applies.
    - **Testing note:** in a background tab or hidden iframe, scroll-timeline values in `getComputedStyle` go stale; force a frame (for example a screenshot) before reading them.
  - **Pinning:** the frozen `AboutLeadership` is wrapped (on the page only, component unchanged) in `PinnedSection` with `limitCoverTo="#about-presence"`. That cap was needed while Our Global Presence ended the page; it now only shortens that hold on some screens. Since 2026-11-11 Our Global Presence is itself in a `PinnedSection` (no cap), held while Our Process rises.
- **Shared Our Process, Final CTA and Footer (added 2026-11-11, owner's instruction):** `OurProcess` (`components/services/OurProcess.tsx`), `FinalCta` (`components/home/FinalCta.tsx`) and `SiteFooter` are reused exactly as on `/services`. None takes props, and none was modified.
  - **Pinning:** Our Process and Final CTA are each in a `PinnedSection` with no `limitCoverTo`, as on `/services`. The Footer follows `<main>` and is at least one screen tall when motion is allowed, so the Final CTA pin never outlasts it.
  - **Verified** (Chrome, same-origin iframes at 1920×1080, 1440×900, 1280×720, 768×1024 and 390×844): the section order is Hero + logos → Our Story → leadership → Our Global Presence → Our Process → Final CTA → Footer. For Presence→Process, Process→CTA and CTA→Footer, the lower section holds while the next rises 1:1. There is no horizontal overflow, and the page ends exactly at the Footer (no end gap).
  - **Not run:** pixel comparison of the reused sections on this page (they are unchanged components) and a separate reduced-motion pass. The pin CSS is unchanged, so reduced motion falls back to normal flow as on the other pages.
  - **Known effect:** the shared `our-process-heading` and `final-cta-heading` ids now also exist on `/about`, so they can appear twice in the DOM once `/services` or a Details page has been visited (see "Visited pages stay mounted").
- **`RollingNumber` scroll overflow (found 2026-11-11, not fixed in the shared component):** each digit's 0–9 strip is hidden by `clip-path`, but it still counts towards the page's scrollable height. With a stats bar at the end of a page, phones got up to about 560px of blank scrolling. Fixed locally with `overflow-clip` on the About bar. On `/industries` content follows the bar, so it is masked there; a shared fix (`overflow: clip` on `.ww-roll__digit` with an `overflow-clip-margin`) needs the owner's approval.
- **Navbar overflow seen during this QA: fixed 2026-11-11** (see "Navbar dropdown menus", "Overflow fix").

## FAQ page (`/faq`)

Started 2026-11-11, one section at a time; the owner reviews each before the next starts.

- **Hero + Client Logos** (`components/faq/FaqHero.tsx`, `faqHero` in `lib/content/faq.ts`, asset `faqHero` → `faq/Hero Image.png`, 3840×1614): built 2026-11-11 from `Hero Section (1).png` in the project root (the file now holds the FAQ reference; the About Us reference of the same name was replaced). **Awaiting the owner's visual review**; not approved or frozen.
  - **Structure:** the About Us Hero pattern. One `<section aria-labelledby="faq-hero-heading">` holds the Hero area and the frozen `ClientLogos`, reused unchanged. The artwork matches the reference's Hero area exactly (mean difference 0.38/255), so nothing is drawn over it. From `lg` it fills a 3840/1614 area with the text vertically centred on the left; below `lg` the text comes first on `#ecd9c9` (the artwork's average colour behind the text), then the whole artwork with its top 48px faded.
  - **Type at 1920:** eyebrow 18px bold at 0.07em; headline 72px, weight 630, line height 1.052, second line red; description 26px, line height 1.385, 0.021em, max 25.5em; red button 252×59 with arrow, outline button 228×61 with no arrow, 20px apart.
  - **Content:** the reference's wording. "Start Your Project" is `#`; "Contact Our Team" links to the existing `/contact`.
  - **QA 2026-11-11 (headless Chrome, 1920×1080, against the reference):** every text line and both buttons within 0–2px vertically; widths within 0–1px except the description's second line (about 9px wider) and first line (about 5px narrower), the same font-rendering kind of difference as on other pages. Mean difference 4.42/255 over the Hero and logos. Spot checks at 1280, 1024, 768 and a narrow phone window; full responsive and scroll QA not run yet (owner's instruction).
  - **Pinning:** since the questions section was added, `FaqHero` is pinned as one unit (`PinnedSection limitCoverTo="#faq-questions"`, because the questions section, 1080px, is shorter than the Hero unit on wide screens, about 1208px at 2560). Reference file note: `Hero Section (1).png` is no longer in the project root.
- **Questions section** (`components/faq/FaqQuestions.tsx`, `FaqQuestionMark.tsx`, `faq-questions.css`, `faqQuestions` in `lib/content/faq.ts`, `id="faq-questions"`): built 2026-11-11 from `Frame 2147239138.png` (project root). **Awaiting the owner's visual review**; not approved or frozen.
  - **Layout at 1920:** 1080px on `#f4f0e9`, content x 200–1720 (`max-w-[1560px]` with 20px padding, narrower than the usual 1560px content width, as drawn). A 428×433 card (`#4b2524`, 12px radius) 76px from nine 1016×72 white rows (since the FAQ timeline, owner-approved 2026-11-11; the reference drew 24px and 1068px) (10px radius, 16px apart), both starting at y 152. Card: the question mark, "Still have a question?" (30px light), a left-aligned 16px line in a centred block, and a 348×46 gold (`#ce9d43`) button "Speak with our team" → `/contact`. Rows: 22px medium black questions, an 18px plus. Below `lg` the card comes first, then the list.
  - **Question mark:** no asset was supplied; the owner approved drawing it as an inline SVG (2026-11-11). Traced from the reference: the gold glyph (`#bb9b62`), its loose pale outline offset up-left (dark where it crosses the gold, via a clip path) and 22 thin rays.
  - **Animation** (`faq-questions.css`, motion-safe only; static drawing with reduced motion or without JavaScript): on reveal (the card's `data-reveal`), the glyph pops up from a small tilted state with an overshoot and the rays draw outwards clockwise. Then an idle loop: the glyph floats and tilts (5.2s) while its outline drifts against the gold, a light sheen crosses the gold every 6s, and a shimmer sweeps round the rays (3.6s), each brightening and stretching outward in turn. Card hover (hover-capable pointers) opens the rays out slightly. Only transform, opacity and stroke-dashoffset animate.
  - **Accordion:** items open independently (as in the shared FAQ). Real `<button>`s in `<h3>`s with `aria-expanded`/`aria-controls`; panels are `role="region"` labelled by their button, `invisible` when closed. The answer opens via `grid-template-rows` 0fr→1fr (500ms, ease-out-expo-like curve) while its text fades in and settles 6px after a 100ms delay; closing fades the text out in 200ms. The plus's vertical bar turns flat into a minus; the icon turns red on hover. Reduced motion: instant. A `noscript` style shows all answers.
  - **Content:** the reference's first two questions kept ("What types of projects do you design?", "Do you also handle development?"); its other seven rows repeat a placeholder, so seven questions were written from existing site content (industries, the five Our Process steps, AI & automation, Branding & Digital Growth, support after launch, how cost is decided, where the team is based). No prices, timelines or guarantees.
  - **QA 2026-11-11:** 1920×1080 against the reference (reduced-motion render): every row, question and plus within 0px; card text, illustration and button within 0–2px; mean difference 2.39/255 (card 5.56, mostly the hand-traced drawing). Chrome at 1920×945: the Hero + logos unit holds at top 0 while this section rises 1:1, no end gap; all animations running; mouse, Enter and Space toggle items. Full responsive QA not run (owner's instruction).
  - **Pinning:** since the Footer was added (2026-11-11) this section is in a `PinnedSection` with no `limitCoverTo`, as on `/contact` and `/services`: the Footer is at least one screen tall when motion is allowed, so the pin never outlasts it. Since the FAQ timeline (2026-11-11) it also has `hold="var(--wf-hold, 0px)"`, a measured hold during which the timeline line finishes (see "FAQ timeline + sticky card").
  - **Responsive QA 2026-11-11** (Chrome, same-origin iframes at 1920×1080, 1440×900, 1280×720, 1024×768, 768×1024, 390×844 and 320×640):
    - **Layout:** no horizontal overflow and no clipped text anywhere. Below 1600 the content uses the usual 20px/32px gutters. From `lg` the card sits beside the list (card 266px wide at 1024, so its line wraps to three lines); below `lg` the card is full width above the list. Questions wrap to two or three lines at 390/320 and stay readable.
    - **Accordion:** all nine answers open together and independently at every width, each to its full height, with no row overlap. Repeated rapid toggling settles correctly. Hover turns the icon red; Tab, Enter and Space work, with a visible focus ring.
    - **Pin and page end:** the Hero + logos unit holds at its expected top (0, or `100svh - height` when taller than the screen) while this section rises 1:1, the reverse scroll is identical, and the page ends exactly at the section bottom, with answers closed or all open.
    - **Reduced motion** (no-preference rules removed in the frame): no SVG animation, a static full drawing, instant open and close, pins off, and the page equals the sum of its sections.
    - **Fixes:**
      - `overflow: visible` on the SVG: the rays' shimmer plus the card-hover scale pushed ray tips up to about 4 units past the SVG box, where they were clipped.
      - Below `lg`, the card line is centred and balanced (it wrapped left-aligned under the centred title, ending on a lone "step."). From `lg` it is unchanged.
      - The 1920 render is unchanged (mean difference 2.39/255).
    - **Testing note:** answer-height transitions do not progress in throttled background iframes; force frames (screenshots) before measuring.
  - **FAQ timeline + sticky card (owner-approved plan 2026-11-11; built, awaiting the owner's visual review):**
    - **Sources (behaviour and geometry only, WayWise colours):**
      - **Recording:** `2026-11-11 16-36-29.mp4` in the project root (20.3s, 1920×1080). ffmpeg is not installed, so frames were extracted with headless Chrome.
      - **Live site:** the one the recording shows, inspected in Chrome with programmatic and real wheel scrolling, both directions.
    - **Reference measurements (1920 wide):**
      - **Left column:** heading plus card, 588×574, `position: sticky; top: 110px`.
      - **Track:** 2px, full list height. The question content starts 34px right of the line's left edge, and the left column ends 109px left of it.
      - **Fill:** a full-height accent bar scaled from the top, with a 12px glow. Its end holds on a fixed line 551px from the viewport top (a fixed pixel value: unchanged at 945px and 889px viewport heights) and is limited to the list.
      - **The reference fill is spring-smoothed:** it fell about 90px behind on a quick scroll and settled over 0.6–0.8s.
      - **Points:** 12px circles, 36px below each row's top.
        - **Inactive:** section background with a 2px inset ring in the track colour.
        - **Active:** accent fill, 2px dark ring, `scale: 1.15`.
        - **Switching:** a boolean flag is set when the line reaches the point's centre and removed on the way back. The colour and ring change over 0.4s, and the size over 0.5s with `cubic-bezier(.34,1.56,.64,1)`.
    - **Owner decisions:** spacing option A (76px gap: 40px card→line, 34px line→rows); the measured pin hold; strict 1:1 line sync (the reference's spring lag dropped); the reference's timed point pop kept.
    - **Layout change (approved):** from `lg` the grid is `minmax(0,428fr)_minmax(0,1016fr)` with a `clamp(52px,3.958vw,76px)` gap (was `1068fr`, 24px). So the rows are 1016px wide at 1920, 52px narrower. The card stays 428×433 at 1920. Typography, row height, content and accordion are unchanged.
    - **Geometry, checked in Chrome at 1920:**
      - **Positions:** card x 200–628; line 668–670; rows from 704.
      - **Points:** 12px, centred on the line at the middle of each question row (`top: 50%` of its `h3`), so they stay aligned when answers open or close.
      - **Smaller sizes:** from `lg` the line's centre sits `--wf-x: clamp(24px,1.823vw,35px)` left of the rows, with points `clamp(10px,0.625vw,12px)`. At `md` the line sits in the 32px gutter (16px). Below `md` it is hidden.
    - **Styling:**
      - **Line:** track `#ddd3c7`; fill brand red with a `0 0 12px rgb(215 25 32 / .55)` glow.
      - **Inactive point:** `#f4f0e9` centre with a 2px `#ddd3c7` ring.
      - **Active point:** brand-red fill, 2px `#4b2524` (card maroon) ring, `scale(1.15)`.
    - **Sticky card:** `lg:motion-safe:sticky`, at 110px from `xl` (the reference value) and 96px at `lg`, where the Navbar is shorter. It lets go at the bottom of the list.
    - **How it works** (`useFaqTimeline` in `FaqQuestions.tsx`, the "FAQ timeline" block in `faq-questions.css`):
      - **Fill:** a full-height bar animated by `scaleY` only. It's a CSS scroll-driven animation on the FAQ `PinnedSection` wrapper's view timeline: `.pin-wrapper:has(> .pin-body > #faq-questions) { view-timeline: --wf-line }`, styled from the FAQ CSS only, with no change to `PinnedSection`.
      - **Why the wrapper:** it is never sticky, so it moves 1:1 with the scroll even while the section inside is pinned.
      - **Range:** `cover var(--wf-a)` to `cover var(--wf-b)`. Fill length always equals the scroll past its start, so the line is exactly 1:1 in both directions, including the hold.
      - **Fixed line:** the fill's end holds at `min(551px, 60% of the screen height)` while the list moves (551px at 1920×1080 and 1440×900, 432px at 1280×720).
      - **Pin hold:** `app/faq/page.tsx` passes `hold="var(--wf-hold, 0px)"` to the FAQ `PinnedSection`, and the hook sets `--wf-hold` on that wrapper. The value is the remaining line length once the section pins: `max(0, start + list height − pin start)`. During the hold the section stays fully in view and the fill runs down the still list at scroll speed, reaching the end of the list exactly as the Footer starts rising.
      - **Measured holds:** 377px (1920×1080), 242 (1440×900), 186 (1280×720), 212 (1024×768), 393 (768×1024). With answers open they're recomputed: 246 (1440×900), 377 (1920×1080). The hold is 0 below `md` and with reduced motion.
      - **Points:** one passive scroll listener compares the scroll position with precomputed point offsets. It toggles `data-hit` on a point only when it crosses. There are no layout reads, no React state and no wheel handling on scroll.
      - **Measuring:** only when sizes change (a `ResizeObserver` on the list, the section and `<html>`, plus window resize and a media-query change). It uses layout offsets (`offsetTop` chains), so the pin's sticky shift and the rows' reveal translate never skew it.
      - **Fallback:** without `animation-timeline` support, the scroll listener sets the fill's `scaleY` instead.
    - **Reduced motion:** a static track with inactive points; no fill, hold, sticky card or point transitions. The pins are off as usual.
    - **QA 2026-11-11** (headless Chrome, 37px steps, down then back up; 4–9px steps at 768):
      - **Sizes:** 1920×1080, 1440×900, 1280×720, 1024×768 and 768×1024, plus 1440×900 and 1920×1080 with three answers open.
      - **Sync:** the fill's end moved within 0.10px of 1:1 with the scroll at every step while it was neither empty nor full.
      - **Points:** the state matched the fill position (point centre at or above the fill end) at every step in every run. Two early mismatches were probe artefacts: rows still in their 12px reveal rise, and a 0.75px probe tolerance.
      - **Hand-off:** the fill completed at the same step the Footer began rising at every size (within about 2px at 768 with 4px steps). Reversing gave identical values.
      - **Card:** held at 110px from 1280×720 while the list scrolled past.
      - **General:** no horizontal overflow. 390×844: line hidden, hold 0.
      - **Reduced motion** (`--force-prefers-reduced-motion`, 1440×900): no pin, no hold, no fill, inactive points; page length is the sum of the sections.
      - **Checks:** `tsc` and `eslint .` pass.
    - **Not checked:** Safari, Firefox (it would use the scroll-listener fill), real devices and trackpads, the 2560 width, and a pixel comparison of the new 1016px row layout (no 1920 reference for it; the earlier one is no longer on disk).
- **Footer (shared, added 2026-11-11, owner's instruction):** `SiteFooter` reused exactly as on other pages, after `<main>`; not modified.
  - **Page assembly:** `SiteHeader showBanner={false}` → `<main>`: `PinnedSection limitCoverTo="#faq-questions"` around `FaqHero` → `PinnedSection` (no cap) around `FaqQuestions` → `</main>` → `SiteFooter`. The page is complete as specified; no Final CTA (not in the request).
  - **Verified** (Chrome, one same-origin iframe at a time, at 1920×1080, 1440×900, 1280×720, 768×1024, 390×844 and 320×640):
    - **Handoff:** the questions section holds at its expected top (0, or `100svh - height` when taller than the screen: -151 at 1280×720, -322 at 768×1024, -530 at 390×844, -821 at 320×640) while the Footer rises 1:1. Reverse scrolling gives identical positions.
    - **Page end:** the page ends exactly at the Footer bottom, with no gap and no horizontal overflow.
    - **All answers open:** at 390×844, with all nine answers open (section 3381px), the hold and the page end are still correct.
    - **Reduced motion** (no-preference rules removed in the frame): pins static, the Footer at its normal height (639px at 1440), and the page height equal to the Navbar plus the three sections.
  - **Known behaviour, as on `/services` FAQ:** opening an answer while the Footer is already rising grows the pinned section, which re-anchors to the screen bottom, so content above moves up by the answer's height. Before the Footer starts rising nothing moves.
  - **Testing note:** six iframes with the Footer's animations froze the test tab; test one width at a time.

## Insights page (`/insights`)

The Blog List design, called "Insights" on the site (owner, 2026-11-11). Started 2026-11-11, one section at a time; the owner reviews each before the next starts.

- **Route and navigation:** `/insights`, the only route for this page (no `/blog-list`). The existing "Insights" entry in `companyLinks` (`lib/content/navigation.ts`) now points at it, so the desktop Company dropdown and the mobile menu's Company list both open it (verified in Chrome: from `/services` at 1440 and from `/` at 390, client-side navigation). No navigation entry was added. The Footer's Insights link also points at it (owner, 2026-11-11): `SiteFooter.tsx` looks it up from `companyLinks` in its `linkHrefs` map, beside About Us; every other Footer link stays `#`. Verified in Chrome: clicking it from `/`, `/contact` and `/faq` opens `/insights` with client-side navigation (no reload).
- **Hero + Client Logos** (`components/insights/InsightsHero.tsx`, `insightsHero` in `lib/content/insights.ts`, asset `insightsHero` → `Blog List/Hero Image.png`, 3840×1614): built 2026-11-11 from `Hero Section (1).png` in the project root (the file now holds the Blog List reference). **Awaiting the owner's visual review**; not approved or frozen.
  - **Structure:** the FAQ/About Us Hero pattern. One `<section aria-labelledby="insights-hero-heading">` holds the Hero area and the frozen `ClientLogos`, reused unchanged. The artwork matches the reference's Hero area exactly (mean difference 0.90/255), so nothing is drawn over it. Below `lg` the text comes first on `#ecd8c1` (the artwork's average colour behind the text), then the whole artwork with its top 48px faded.
  - **Type at 1920:** eyebrow 18px bold at 0.082em; headline 72px, weight 630, line height 1.04, -0.0155em, both lines ink; description 26px, line height 1.385, 0.0155em, max 26em; red button 251×59 with arrow, outline button 284×61 with no arrow (18px label below 360px so it fits a 320 screen).
  - **Content:** the reference's wording, except the buttons, renamed by the owner (2026-11-11): "Explore Insights" (`#` until the Insights content section exists) and "Discuss a Project" → `/contact`. Styling and padding unchanged; each button's width follows its label.
  - **QA 2026-11-11 (headless Chrome, 1920×1080, against the reference):** every text line and both buttons within 0–1px vertically, with identical line breaks; widths within 0–1px except the description's second line (about 7px wider, font rendering). Mean difference 5.21/255. Chrome spot checks at 1440, 1024, 390 and 320: no horizontal overflow, headline on two lines. Full QA not run (owner's instruction).
  - **Pinning (updated 2026-11-11):** since the article grid was added, `InsightsHero` is pinned as one unit in `PinnedSection` with no `limitCoverTo` (the grid is taller than the Hero unit at every width), and the grid sits in a `relative` wrapper as the last section.
  - **No Footer** yet.
- **Article grid** (`components/insights/InsightsArticles.tsx`, `ArticleTiltGrid.tsx`, `insights-articles.css`, `insightsArticles` and `insightsPagination` in `lib/content/insights.ts`, `id="insights-articles"`): built 2026-11-11 from `Frame 2147239044.png` (1920×1080) and `Frame 2147239113.png` (1520×1844, the nine cards and pagination, transparent background), both in the project root. Nine whole-card links (the title's link `::after` covers the card) in three columns from `lg` (489px cards at 1920, x 200–1720, 25.5px column and 24px row gaps), two from `md` (ninth card centred), one below; pagination with only page 1 real (other pages and arrows disabled, owner decision). Its build notes were not recorded here at the time; the layout itself is described in the comments of the two files. Not approved or frozen.
  - **Motion, "3D Stacked Editorial" (owner-approved 2026-11-11, refining the earlier "Editorial cascade"):** all of it is inside `prefers-reduced-motion: no-preference`.
    - **Entrance (one-time, never replayed or reversed):** each card is revealed by the shared `Reveal each` when reached. The card plane rises out of depth on its own `perspective(1600px)` and settles to `transform: none`. From `lg` it starts 32px low, 70px back and tipped back 6° about its bottom edge, over 900ms. From `md`: 28px, 60px, 4°, 900ms. Below `md`: 24px, 50px, no tip, 700ms. Because it starts further back, the card is 96–98.5% of its cell's width at its smallest, so it never reaches a gap or a neighbour.
    - **Wave:** delay `(column + row) × 70ms` (`--wi-col`, `--wi-row`, `--wi-d`): rows 1–3 count from `lg`, rows 1–2 at `md`, and there is no delay below `md`. The longest delay is 280ms.
    - **Photo and text:** the approved photo uncover and 1.08× settle at +120ms, then meta, title, excerpt and "Read More" 60ms apart from +320ms.
    - **Scroll drift:** the scroll-linked photo drift (`wi-drift`, `animation-timeline`) is unchanged and reverses exactly with scroll.
    - **Pointer tilt** (`ArticleTiltGrid.tsx`, a client `<ul>`): runs only with `(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)` and mouse pointer events. Touch, smaller screens and reduced motion never run it.
      - **Hover target:** found from the cards' layout boxes (`offsetLeft`/`offsetTop`; the grid is `position: relative` for this), not from the tilted hit-box, so hover cannot flicker at the edges.
      - **Motion:** one rAF loop eases each card (0.14 per 60fps frame) towards a 4px lift, at most 2.5° sideways (`rotateY`) and 2° vertically (`rotateX`), on its own `perspective(1400px)`. The point under the pointer presses slightly away, and the photo shifts up to 4px/3px against the tilt.
      - **Markers:** the hovered card gets `data-hover` (soft two-layer navy shadow, 1.04× photo zoom, underline, arrow slide). While moving it has `data-tilt` and `--wi-rx`, `--wi-ry`, `--wi-lift`, `--wi-ix`, `--wi-iy`. When it has eased back, all of these are removed, so the resting card has no transform, no inline variables and no shadow. The grid gets `data-tilt-ready` while the tilt is active.
      - **Not during the entrance:** cards still playing their entrance are skipped until the transform transition ends.
      - **Scrolling:** a passive scroll listener (active only while the tilt runs) and `pointerover` re-check the card under a still pointer.
    - **Other hover and keyboard focus:** with a mouse below `lg` (or wherever the tilt is off), `:hover` gives the 4px lift (`translate`), the shadow, the zoom, the underline and the arrow slide, as before. Keyboard focus (`:focus-visible` on the card link) gives the same lift, shadow, underline and arrow. Entrance and tilt use `transform`; the simple lift uses `translate`, so their timings never mix.
    - **Reduced motion:** cards are shown at once with no entrance, tilt or drift. The underline and shadow still appear on hover and focus, because they are not movement.
  - **QA 2026-11-11:**
    - **Checks:** `tsc` and `eslint .` pass. No console errors.
    - **Resting match at 1920** (headless Chrome against `Frame 2147239113.png` flattened onto `#f4f0e9`):
      - **Final styles:** every card ends at `transform: none`, `translate: none`, `box-shadow: none`, opacity 1.
      - **Positions:** x 200 / 715.2 / 1230.3; rows at 100, 699.3 and 1287.7 from the section top; cards 489.7 wide.
      - **Card bodies:** mean difference 4.65/255, excluding the excerpt lines, whose wording differs from the reference's placeholder text (approved content).
      - **Photos:** 6.99/255 with the scroll drift paused.
    - **Entrance:** sampled frame by frame (63 frames): it moves steadily towards the final position, never backwards, and lands on `transform: none` with no jump.
    - **Widths:** 1920, 1440, 1280, 1024, 768, 390 and 320 checked, scrolling through the whole grid:
      - **Overflow:** no horizontal overflow.
      - **Overhang:** no overhang during the entrance. A hovered tilted card overhangs its cell by at most 1.3px (1024).
      - **Tilt:** on only from 1024.
      - **Wave delays:** as specified.
    - **Real mouse** (Chrome):
      - **Tilt direction:** follows the pointer.
      - **No flicker:** with the pointer held 2px inside the bottom of a card (below its lifted edge), `data-hover` stayed on for 1s with no toggling.
      - **Leaving the grid:** clears every card back to `transform: none` and no inline variables.
      - **Keyboard focus:** lift, shadow and underline.
    - **Reduced motion** (Chrome `--force-prefers-reduced-motion`): even cards not yet reached are visible and untransformed, with no photo clip and no drift. The tilt is not active, and the 1920 match is the same 4.65/255.
  - **Not verified:**
    - **Scroll under a still pointer:** the tilt re-check could not be confirmed, because the test browser did not update hover after a synthetic scroll either.
    - **Other environments:** Safari, Firefox, real touch devices and a physical trackpad.
    - **Pinning:** the grid is not pinned yet (last section), so behaviour while pinned is untested. Transforms do not change its height, and the drift does not move while a section is pinned.

## Navbar dropdown menus (built 2026-11-10, awaiting owner review)

**Status:** implemented and checked; the owner was reviewing the latest version when work stopped on 2026-11-10. Not approved or frozen. **Resume here:** ask the owner for feedback on the current version before changing anything.

### Files

- `components/layout/NavMenus.tsx` (new): `Chevron`, `DesktopNav`, `DesktopMenuItem`, `DropdownSheet` and `MobileNavItem`.
- `components/layout/SiteHeader.tsx`: renders `<DesktopNav items={primaryNav} openMenu compact … />` and `MobileNavItem`; holds `openMenu` state; the bar turns solid white while a menu is open and gets its own edge on desktop (`xl:shadow-[0_1px_0_#e3dbd2,0_10px_24px_-14px_rgb(13_29_68/0.28)]`). Layout, logo, sizes, sticky/shrink and the Contact link are unchanged (item positions verified identical at 1920).
- `lib/content/navigation.ts`: all menu content (see "Central content").

### Content (owner rule: Footer labels exactly, verified destinations only, nothing invented)

The dropdowns list the Footer's Services, Industries and Company columns. The Footer's own links are all `#`; in the dropdowns a label links to a page only where that page already exists:

| Menu | Main links (`links`) | Secondary (`extra`, in the action bar) | Button (`action`) |
|---|---|---|---|
| Services | The six services with cards, each with its Services-card description, linking to its Details page | Cloud, API & DevOps; Support & Maintenance (`#`) | View All Services → `/services` |
| Industries | Healthcare & Medical; Legal & Professional Services; Real Estate & Construction; Finance, Insurance & Accounting; Retail, E-commerce & Logistics (all `#`) | none | View All Industries → `/industries` |
| Company | About Us → `/about` (since 2026-11-11); Insights → `/insights` (since 2026-11-11); How We Work, Our Team, Global Delivery, Careers (all `#`) | Our Work → `/our-work` (it is also a top-level Navbar item) | Contact Us → `/contact` |

The navy brand card shows `navBrandCard` (Footer intro sentence + "USA • UAE • Worldwide"). The top-level Industries, Our Work and Company items stay `#`; Our Work keeps its chevron with no dropdown (not part of the request).

### Current design (desktop, from `xl`)

- **Layers:** white bar with its own edge → a floating ivory sheet (`#fbf9f6`) 10px below the bar, rounded 20px, 1px `#e3dbd2` border, soft two-part navy shadow → the page dimmed with `bg-navy/20` (a fixed overlay below the bar, `pointer-events-none`, so clicks still reach the page and close the menu).
- **Width and position:** measured from the bar's content box (logo left to "Start a Project" right) into CSS variables on the nav (`--sheet-left`, `--sheet-width`, `--sheet-top`, `--dim-top`; compact state lowers the edge by 5px). Services spans that full width; Industries and Company are `w-fit` and centred in it.
- **Body grid:** label row (red uppercase label with bar) then the list; the navy card in a right column.
  - Services: list `grid-cols-3` (six rich items: title 17–19px semibold, description 14–15px `ink-muted`, 2–3 lines); card column `clamp(260px,16.2vw,310px)`.
  - Industries: two columns, column-major (`grid-flow-col grid-rows-3`), `clamp(290px,15.6vw,300px)` each (290 minimum, or "Finance, Insurance & Accounting" wraps at 1280).
  - Company: `grid-cols-[repeat(3,minmax(152px,max-content))]`, so columns size to the labels (was fixed 207px, which caused large gaps).
  - Short menus' card column is a fixed 300px (its text fits in four lines; at 260px it took five and overhung the list).
  - Rows have hairline `#e9e2da` dividers; short lists are `self-start` (rows keep their 59px height).
- **Brand card placement (`cardPlace`):** always its natural height (`self-start`, text at the top). Beside a list of three or more rows (Services, Industries) it starts at the first row (`row-start-2 mt-4`); beside a short list (Company) it runs from the label (`row-span-2 row-start-1`). Earlier versions stretched it with `justify-end`, leaving empty navy above the text; the owner rejected that.
- **Action bar:** a full-width sand band (`#f4efe9`, top border) at the bottom of every menu: `extra` links on the left (16px medium), the red `action` button on the right (44px tall, 10px radius).
- **Hover:** a red line draws along the item's top divider, the title turns red, an arrow slides in. Keyboard focus shows the same. The current page's link is red with the line shown and `aria-current="page"`.
- **Motion:** the sheet fades in and settles 8px (300ms); links rise in one after another; switching between menus swaps instantly. All off with reduced motion (verified by simulation), including the dim.
- **Measured (2026-11-10, latest):** 1920: Services 444px tall, Industries ~1,047px wide × 347px, Company ~935px wide. 1280: all fit inside 20–1260px, no horizontal overflow, no label wraps, Services descriptions 3 lines.

### Overflow fix (2026-11-11, owner-requested)

- **Bug:** at 1280 and 1440 wide, every page could be scrolled 170–250px sideways.
- **Root cause:** closed sheets are only `invisible`, so they still count towards the page's scrollable width. Their `left`/`width` come from `--sheet-left`/`--sheet-width`, which were measured only while a menu was open. On every page load (before any menu opened), those variables were unset, so the sheets fell back to `left: auto` and `width: auto`: each sat beside its trigger at its full content width, reaching about x=1593 at 1440. After a menu closed, the resize listener was removed too, so later resizes left stale values.
- **Fix** (`components/layout/NavMenus.tsx` only):
  - The positions are measured on mount and whenever the bar's content box or the nav resizes (a `ResizeObserver`, which replaces the window `resize` listener). They are no longer measured only while a menu is open.
  - The sheets stay `display: none` until the first measurement: the nav gets `data-measured` and the `group/nav` name, and each sheet has `hidden group-data-measured/nav:block`.
  - Design, positions, sizes, animation and interaction are unchanged.
- **Verified** (Chrome, same-origin iframes):
  - Scroll width equals the viewport on `/`, `/services`, UI/UX Details, `/industries`, `/our-work`, `/contact` and `/about` at 1920, 1440, 1280, 1024, 768 and 390.
  - Every dropdown was opened at 1920, 1440 and 1280. The sizes match the earlier measurements: at 1920, Services 1560×444, Industries 1048×347 and Company 935×297; at 1280, all within x 20–1260. There is no overflow while open, after closing, or after resizing 1920/1440 → 1280 and 1024 → 1440.
  - The mobile menu accordions (Services, Industries, Company) open with their full lists at 390, 768 and 1024.
  - One reading of 1483px right after a resize, taken while another test frame was running, did not reproduce in two isolated repeats.

### Interaction (unchanged through all redesigns)

- Mouse hover opens (`pointerType === "mouse"`), with a 140ms close delay; an invisible 46px strip under the open trigger keeps hover on the way down to the sheet. Clicking a trigger toggles (a click right after hover-open keeps it open).
- Services: the label is a link to `/services`, the chevron is the toggle button. Industries and Company: the whole item is the toggle button.
- Keyboard: Enter/Space toggle; ArrowDown opens and focuses the first link; Up/Down move and wrap (order: links, extras, button); Escape closes and returns focus to the trigger; focus leaving the item closes it. Closed sheets are `invisible`, so their links are out of the tab order.
- Click outside closes; choosing a link closes. One menu open at a time. Disclosure pattern: buttons with `aria-expanded` and `aria-controls`.

### Mobile menu (below `xl`)

Unchanged in look. Services, Industries and Company expand in place (accordion, `grid-template-rows` 0fr→1fr, off with reduced motion); Services' label still links to `/services` with a 44px chevron button. Lists show `links` then `extra` (the Footer order), then the action link. Verified at 390 and 320.

### History (so it is not repeated)

The owner rejected, in order: a white floating card with numbered links (01, 02…); 95% white frosted glass; concepts A (side panel), B (featured service card), C (editorial sheet); four further directions (command panel, bento grid, split navigation, minimal luxury); a full-width white sheet attached to the bar (bar and sheet blended together; CTA spacing inside the card; Industries too sparse). Owner requirements carried forward: no numbering, no invented content or icons, clear separation between bar and dropdown, the action as a distinct bottom element, content-driven column widths, no empty navy space in the card.

### Open points for the owner

- Whether Our Work belongs in Company's grid instead of the action bar.
- Services and Industries cards are shorter than their lists (plain ivory below the card); Company's card ends 9px below its last divider.
- Industries' action bar has only the button (empty left side).
- Dim strength (20% navy) is a taste call.
- Not tested: real mouse hover in the latest round, Safari, Firefox, touch devices.
- Editor Tailwind "suggestCanonicalClasses" hints in `NavMenus.tsx` are style suggestions only; `tsc` and `eslint .` pass.

## Conventions for new pages (added 2026-11-08)

These apply to new Figma pages and sections. They do not authorise changes to existing sections: everything under "Section status" stays protected, and the working rules above still apply.

### Shared UI components

Before creating a component, check whether one of these already covers the need. Do not create duplicates of what they do. Read the source for the exact props; this is a summary of what exists today.

- `components/ui/Container.tsx`: the horizontal page frame (`mx-auto w-full px-5 md:px-8 xl:px-5`). `width`: `"wide"` (default, `max-w-[1600px]`, the 1560px content width) or `"narrow"` (`max-w-[1344px]`, Final CTA's frame). Accepts all `div` props. Vertical padding stays with each section.
- `components/ui/SectionEyebrow.tsx`: the red uppercase label above a heading. Props:
  - `size`: `"sm"`, `"md"` (default) or `"lg"`.
  - `weight`: `"semibold"` (default) or `"bold"`.
  - `bar`: the red bar, default `true`. Without it the label is a plain block, as in the Service List Hero.
  - `barClassName`: for optical nudges such as `-translate-y-px`.
  - `tracking`: default `"0.078em"`, set inline.
  - `className`: for spacing and layout.
- `components/ui/SectionHeading.tsx`: the section title, 26–48px below 1024 and 34–52px from 1024. Props:
  - `as`: `"h1"`, `"h2"` (default) or `"h3"`.
  - `tone`: `"ink"` (default), `"navy"` or `"black"`.
  - Accepts all heading props. Put the red part in `<span className="text-brand">`.
  - To change line height or letter spacing for one design, use `style`: a conflicting class does not reliably win over the built-in one.
- `components/ui/ButtonLink.tsx`: a `next/link` styled as a button. Props:
  - `variant`: `"primary"` (default), `"secondary"`, `"outline"` or `"navy-outline"` (the Our Work button).
  - `weight`: `"semibold"` (default) or `"medium"`.
  - Use these props instead of `!important` overrides. Its border colour has no option yet: the secondary borders in Figma differ slightly (`#998775`, `#a49e9b` in FAQ, `#a59788` in the Service List Hero) and are waiting for the designer to confirm one value.

Sections built before 2026-11-08 do not use the first three components. They keep their own markup and must not be switched over without the owner's approval. Current users (2026-11-10):
- `Container`: Why Choose, Why Choose Us, the three lower Industries sections, Contact Client Overview.
- `SectionEyebrow`: those, plus Recent Projects, the Industries, Our Portfolio and Contact Heroes.
- `SectionHeading`: Industries at a Glance, the Industries trust section and Industry Solutions only.

A change to any of these shared components now affects those pages too.

### Colour tokens

Use the tokens in the `@theme inline` block of `app/globals.css` (as `text-navy`, `bg-sand`, and so on) instead of repeating hex values. Current colour tokens:

| Token | Value | Use |
|---|---|---|
| `brand` / `brand-dark` | `#d71920` / `#b5141a` | Brand red and its hover |
| `ink` | `#231f20` | Main text. `foreground` holds the same value; prefer `ink` |
| `ink-muted` | `#626262` | Secondary text next to ink text |
| `navy` | `#0d1d44` | Text on navy-toned sections |
| `navy-muted` | `#1b3447` | Names and labels next to navy text |
| `steel` | `#3d4e5c` | Secondary body text next to navy text |
| `sand` | `#eae2dd` | Section background (Services, FAQ) |
| `background` | `#ffffff` | Page background |

- Check this list before adding a colour. Do not add a token for a colour that already has one.
- Add a token only for a genuinely reused colour. A one-off Figma colour can stay as a hex value.
- `app/globals.css` is protected, so adding a token needs the owner's approval.

### Central content

Before defining service, industry or navigation data, check `lib/content/` and reuse what is there instead of copying it:

- `services.ts`: `services` (all 8 in the Footer's order; the first 6 have `card` content) and `serviceCards` (those 6, in the Services section's shape).
- `industries.ts`: `industryCards` (the 5 carousel cards, same shape as `IndustryCard`) and `footerIndustries` (the 5 Footer categories), both unused; plus the Industries page content, used by its sections: `industriesAtAGlance` (4 cards), `industryStats` (4 rolling stats) and `industrySolutions` (4 stacked cards).
- `navigation.ts` (**used by the Navbar since 2026-11-10**): types `NavLink` (`label`, `href`, optional `description`), `NavMenu` (`title`, `links`, optional `extra`, `action`), `NavItem`; menus `servicesMenu`, `industriesMenu`, `companyMenu`; `navBrandCard` (the Footer's intro sentence and "USA • UAE • Worldwide", word for word); `primaryNav` (the Navbar items); `companyLinks`, `footerColumns` (each menu's `links` + `extra`, Footer order), `legalLinks`, `socialLinks`. Every `#` is a placeholder; do not invent URLs. See "Navbar dropdown menus".
- `service-details.ts`: content for the Service Details pages (see "Service Details pages").
- `contact.ts`: `contactOverview`, `contactLocations`, `contactMessage` (form fields and dropdown options) and `contactOffices` for the Contact Us page.

Components use `service-details.ts`, `contact.ts` and the Industries-page exports of `industries.ts`. `contact.ts` also reads `serviceCards` from `services.ts` for the Project Type options; nothing else in `services.ts` is used. `navigation.ts` drives the Navbar (desktop dropdowns and mobile menu); it reads `services` from `services.ts` and `footerIndustries` from `industries.ts`. `industryCards` is still unused. `Services.tsx` (including its card links), `Industries.tsx` and `SiteFooter.tsx` still hold their own copies (the Footer's links are all `#`), so a content change must be made in both places until the owner approves switching them over. Do not modify frozen sections or change their data sources without explicit approval.

Unresolved differences, kept as they are on purpose:
- Three different industry lists exist: the carousel (Attorney & Lawyers, Restaurant, Retailers, Doctor, Plumbers), the Footer (Healthcare & Medical, Legal & Professional Services, Real Estate & Construction, Finance, Insurance & Accounting, Retail, E-commerce & Logistics), and the Industries page's "Industries at a Glance" cards (Law Firms, Healthcare, Real Estate, Construction). Ask the owner before adding Industry category pages.
- "Cloud, API & DevOps" and "Support & Maintenance" are only in the Footer, with no description or image.
- "Our Work" is a top-level Navbar item but sits under Company in the Footer.

### New assets

- Name new asset files with lowercase letters and hyphens, for example `industry-hero.png`, `real-estate.jpg` or `construction.jpg`.
- Do not rename existing assets, even those with spaces or capitals.
- `public/images/industry page/construction.png` and `Real State.png` were byte-identical on 2026-11-09; they differ now. `construction.png` is a 1376×768 JPEG with a `.png` name, showing a construction site; `Real State.png` (918×500) shows a modern house. Both are used by Industries at a Glance. Do not delete or rename them.

### Preserving the existing design

- Follow the Figma designs precisely.
- Treat frozen and protected sections as protected while building new pages: do not redesign or refactor them.
- Keep changes to the page or section being built. Avoid unrelated changes.
- Keep existing responsive behaviour and visual consistency.

## References and assets

### Figma references and exported assets

Figma MCP access has not worked (see "Known limitations"), so every section is built from exported PNGs.

- **References:** the owner supplies one exported frame per section, normally 1920 wide. They arrive in the project root, its parent folder, or a folder the owner names. Filenames vary, and some names quoted in code comments (for example `Frame 2147239119.png`, `our protfolio.png`, `Hero Section (1).png`, `Frame 2147239128.png`) are not on disk now. If the folder the owner names does not exist, report it and ask; do not rename or move reference files.
- **Assets:** production files live in `public/images/<page folder>/`. Use them exactly as exported, through a new `lib/assets.ts` entry with a comment giving the pixel size and what the file shows.
- **Never** use placeholders, generate or recreate images, crop or edit an asset, cut parts out of a reference, or substitute a similar file. If something needed is missing or unclear, stop and report it.
- **Framing:** CSS framing of a whole asset is allowed. The Service Details, Our Portfolio and Contact Heroes and the Contact map show artwork whole (`object-contain`), with the top edge faded below `lg`. The Service List Hero's crop below `lg` is the one existing exception.
- **Matching:** match the reference at 1920, then scale with the viewport from `lg`, and stack the content below `lg`. Earlier sections were checked by measuring text bounds and colours in the reference (`sharp` is available in `node_modules`) against `getClientRects()` in the browser.
- **Fonts:** Outfit is the site font even where a reference's body text looks like Inter. Letter spacing is tuned so line widths and line breaks match.

### Homepage and `/services` references

The screenshots below were used for the Homepage and `/services`. They were listed as being in `D:\Ashfaq\Next JS\Tech\`, but that folder does not exist on 2026-11-09, and they are not in the current parent folder either. Ask the owner where they are before relying on them.

The current parent folder, `D:\Ashfaq\Next JS\waywise Tech\Tech\`, holds `Hero Section.png`, `recent projects.png`, `why choose us.png`, `industry .png` and `Frame 2147238537.png`. The project root holds `section.png`, the reference for the Contact "Send Us a Message / Our Offices" section. The Contact world-map reference, `Frame 2147239130 (1).png`, was in the project root while that section was built and is no longer there. Only those two were opened since 2026-11-09.

| File | Shows |
|---|---|
| `Section.png` | Services, 1920×1080 |
| `Industry Section.png` | Industries, 1920×1080 |
| `Industry Card 1.png`, `Industry Card 2.png` | Doctor and Plumbers cards with baked-in text (reference only) |
| `Our Work Section.png` | Our Work, 1920×3193 |
| `Screenshot.png` | Stacked-edge look for Our Work (1619×827, from a different page) |
| `Final CTA.png` | Final CTA, 1920×1080 |
| `Footer.png` | Footer, 1920×639 |
| `Screenshot 2026-11-04 101335.png` | Navbar and Hero, low-resolution 886×552 |
| `Screenshot 2png.png` | Services, low-resolution 1070×560 |
| `serviceListPage.png` | Service List Hero and logo strip only, 1920×1080, not a full-page design. It shows the red banner, which the owner excluded from the page |
| `our progress.png` | Our Process section, 1920×1080. Its label reads "OUR PROCESS" |
| `faq.png` | FAQ section, 1920×1080, all answers closed |

Production assets are in `public/images/`: hero files at the root, then `logos/`, `services/`, `industries/`, `our-work/`, `cto/` (Final CTA), `footer/`, `service List/` (Service List Hero) and `service details/` (UI/UX Details images and the four Recent Projects images), `industry page/` (14 images, all used by `/industries`), `our portfolio/` (`Hero bg.png`) and `contact us/` (`contact.png`, `client overview.png`, `map.png`, and the office photos `usa.png`, `dubai.png`, `dhaka.png`). The asset keys and pixel sizes are in the comments in `lib/assets.ts`. No fonts are stored in `public/`; Outfit comes from `next/font`.

- `footer/logo-white.svg` is a copy of `logo.svg` with only `#0C1E2F` changed to white, approved by the owner. The folder's `logo.svg` is an unused copy of the main logo.
- `footer/Button.svg`, `Button (1).svg`, `Button (2).svg` are LinkedIn, Twitter and Instagram.

## Approved decisions

- **Colours:** brand red `#D71920`, ink `#231F20`, navy `#0D1D44` (Our Work, Final CTA).
- **Our Work:** 180px margins (the reference draws 142/218), Outfit on all cards, all five labels red, 16px stacked edge, white client row not clickable.
- **Final CTA:** uses Outfit, though parts of the reference look like Inter.
- **Industries:** order Attorney, Restaurant, Retailers, Doctor, Plumbers. Plumbers is the owner's own addition. Its description was written to match the others. Fades are rebuilt in CSS, and Plumbers uses orange-brown.
- **Footer:** "View All Industries" under Industries (the reference is a mistake), copyright exactly "© 2026 Way Wise Tech. All rights reserved.", Twitter bird not X, background 1920×536 placed 52px from the top.
- **Links:** every "View All" button and footer link is a `#` placeholder. Do not invent URLs.
- **Services card links (approved permanently, 2026-11-10):** each of the six Services cards links to its Service Details page: UI/UX → `/services/ui-ux-product-design`, Custom Software → `/services/custom-software-development`, Web → `/services/web-development`, Mobile → `/services/mobile-app-development`, AI → `/services/ai-data-automation`, Branding → `/services/branding-digital-growth`. The title is the link, and its `::after` covers the whole card, so the card's hover and `focus-within` lift work for mouse and keyboard. Do not remove or revert these links. The section's "View All" button is still `#`.
- **Navbar Contact link (approved 2026-11-10):** the Contact item links to `/contact`. It is one entry in `primaryNav` in `lib/content/navigation.ts` (it was `navItems` in `SiteHeader.tsx` until the dropdown work), which both the desktop bar and the mobile menu render with `next/link`. Browser-tested: at 1920 the desktop link opens `/contact` without a full reload; at 390 the mobile menu link opens `/contact`, and the menu closes on tap. No other Navbar link changed: Industries, Our Work and Company are still `#` placeholders, and no dropdown has content.
- **Red banner:** Homepage only. All inner pages use `showBanner={false}`.
- **Our Portfolio second section:** on hold until the Figma team's feedback arrives.

## Pinned sections (overlapping scroll)

Status: built and used on every page, **awaiting comprehensive QA and owner approval**. Files: `components/home/PinnedSection.tsx` and `components/home/pinned-section.css`. Do not replace or bypass this architecture; new sections use it as described here.

### How it works

- Each pinned section is held while the next one rises over it. `PinnedSection` uses the same structure as the Our Work cards: a sticky element, an `::after` spacer and a cancelling negative margin, so no heights change and page length equals the sum of the sections.
- A section pins once its bottom reaches the screen bottom (`top: min(0px, 100svh - height)`) and stays pinned for `min(100svh, height)` of scrolling.
- A `ResizeObserver` writes the section's height to `--pin-height`. There are no scroll or wheel listeners; scrolling stays native.
- `limitCoverTo` (optional selector) caps the pin at that element's height (`--pin-limit`), so the spacer cannot add empty scrolling past the end of the page.
- `hold` (optional CSS length, for example `"70svh"`) keeps the section pinned and fully visible for that much extra scrolling before the next section starts to rise.
  - It lengthens the `::after` spacer but not the negative margin, so the page grows by exactly the hold.
  - The wrapper gets `data-hold`, and the section stretches to at least one screen tall (`min-height: 100svh`, child `flex-grow`), so no empty band shows below a short section. Its background extends; its content does not move.
  - While the section is released for keyboard focus, the hold is dropped too.
  - Only the Industries trust section uses it.
- **Reduced motion:** every pin rule sits inside `@media (prefers-reduced-motion: no-preference)`. With reduced motion, `.pin-body` is static, with no negative margin and no spacer, so sections sit in normal document flow and the page is exactly the sum of its sections. Verified on `/contact` on 2026-11-10 at 1440×900, 1280×720 and 390×844. Pins are also off without JavaScript.
- A pinned section releases during keyboard navigation so links are not hidden under the rising section, which makes it jump to its natural position until focus leaves. A `pointerdown` attribute stops this on clicks, because text fields match `:focus-visible` even when clicked.

### Rules

- The section after a pinned one must be positioned, or the pinned one paints over it. A `PinnedSection` is positioned itself; anything else needs a `relative` wrapper.
- The Footer must be at least one screen tall when motion is allowed (it is: `motion-safe:min-h-svh`), so the last pin never outlasts it.
- `limitCoverTo` uses `document.querySelector`, which can find a hidden page's Footer (see "Visited pages stay mounted"). Use it only where it is needed and checked. A selector unique to one route (such as Contact's `[aria-labelledby="contact-locations-heading"]` or `#contact-form`) is safe, because only one instance of a route stays mounted.
- **Last-section rule** (pages still being built, without a Footer):
  - The last built section is not pinned. It sits in a `<div className="relative">` so it paints over the pinned section above.
  - When a new section is added, wrap the previous last section in `PinnedSection`, and put the new one in the `relative` wrapper.
  - If the new last section can be shorter than the previous section's pin (`min(100svh, its height)`), the spacer leaves empty scrolling at the end of the page. Cap the pin with `limitCoverTo` pointing at the new section, and remove or recheck that cap once a later section or the Footer follows.
- A section shorter than the screen pins at `top: 0`, so its top sits under the sticky Navbar (90px at 1280 and up, about 76px below) while the next section rises. Sections whose content starts near their top edge can have their heading partly hidden during that hold.

### Per page

| Page | Pinned | Not pinned | `limitCoverTo` |
|---|---|---|---|
Since 2026-11-11 every "Hero + Client Logos" below is one combined pinned unit (see "Hero + Client Logo Strip standard").

| Page | Pinned | Not pinned | `limitCoverTo` |
|---|---|---|---|
| `/` | Hero + Client Logos (one unit), Services, Industries, Final CTA | Our Work (`relative` wrapper; keeps its own card stacking) | `"footer"` on Final CTA |
| `/services` | All sections, Hero + Client Logos as one unit | none | none |
| Service Details | All sections, Hero + Client Logos as one unit | none | none |
| `/industries` | Hero + Client Logos (one unit), Industries at a Glance, trust section (`hold="70svh"`), Final CTA | Industry Solutions (`relative` wrapper; keeps its own card stacking) | none |
| `/our-work` | none | Hero + Client Logos (last built section, one `relative` wrapper) | none |
| `/contact` | All sections in `<main>`: Hero + Client Logos (one unit), Client Overview, "Have a Project Idea?", "Send Us a Message / Our Offices", FAQ | none (Footer follows, outside `<main>`) | `[aria-labelledby="contact-locations-heading"]` on Client Overview; `#contact-form` on the map section |
| `/about` | All seven sections in `<main>`: Hero + Client Logos (`AboutHero`, one unit), Our Story, Leadership messages, Our Global Presence, Our Process, Final CTA | none (Footer follows, outside `<main>`) | `[aria-labelledby="about-story-heading"]` on the Hero; `#about-leadership` on Our Story; `#about-presence` on the leadership section; none on Our Global Presence, Our Process or Final CTA |
| `/faq` | Both sections in `<main>`: Hero + Client Logos (`FaqHero`, one unit), questions section (measured `hold`, see "FAQ page") | none (Footer follows, outside `<main>`) | `#faq-questions` on the Hero; none on the questions section |
| `/insights` | Hero + Client Logos (`InsightsHero`, one unit) | Article grid (last built section, `relative` wrapper) | none |

- **Homepage:** Hero + Client Logos → Services → Industries → Our Work → Final CTA → Footer. Services is 1px taller than Industries, so without its `relative` wrapper Our Work would be overlapped on tall screens.
- **`/services`:** at the owner's request every consecutive pair overlaps, ending with the Footer. No `limitCoverTo` is used: the first `footer` in the DOM can be a hidden page's zero-height Footer, which would cancel the pin.
- **Service Details:** same approach as `/services`, ending with the Footer.
- **`/industries`:** Hero + Client Logos → Industries at a Glance → trust section → Industry Solutions → Final CTA → Footer.
  - The combined Hero + Client Logos unit pins and Industries at a Glance rises over it.
  - The trust section holds for an extra 70svh so its stats can roll, then Industry Solutions rises over it.
  - Industry Solutions is not pinned. Its cards stay stacked while Final CTA rises over them, like Our Work on the Homepage: its card list's spacer `--cover` is 600px from `lg` and 1000px below.
  - Final CTA pins with no `limitCoverTo`, as on `/services`.
- **`/our-work`:** Hero + Client Logos, then the page ends. The next section is on hold.
- **`/contact`:** Hero + Client Logos → Client Overview → "Have a Project Idea?" → "Send Us a Message / Our Offices" → FAQ → Footer. Verified 2026-11-10 at 2560, 1920, 1440, 1280, 1024, 768, 390 and 320 for map→form, form→FAQ and FAQ→Footer: held, on top, 1:1, reversible, no end gap, no overflow; reduced motion static. The FAQ pin has no `limitCoverTo`, as on `/services`.
  - **Client Overview's cap:** its pin stays capped at the map section's height (802px against 842px at 1440×900). The cap was needed while the map ended the page; now it only shortens that hold slightly.
  - **Map's cap:** the map's pin is capped at the form section's height (`#contact-form`). Without it, wide screens would get empty scrolling at the end (map 1440px against the form section's 1080px at 2560×1440).
  - The form section is now wrapped in `PinnedSection` (no cap) with the FAQ after it; both caps above were rechecked.

## Behaviour

- **Hero entrance:** CSS only (`app/globals.css`), so content shows without JavaScript. Reduced motion uses a fade with no movement.
- **Navbar:** the red banner is not sticky. The bar's content never animates. The wrapper sticks at `-5px` (`-4px` below 1280px), and only a separate background layer moves. Height 100 → 90px at 1280 and up, 80 → 72px below. Compact look: 92% white, `backdrop-blur-sm`, soft shadow, 350ms `ease-in-out`. The state comes from an `IntersectionObserver` on the banner, with no scroll listeners. Solid white while the mobile menu is open. Mobile menu below 1280px.
- **Services card hover (shared by Homepage and `/services`):** 4px lift and a soft shadow (`0 8px 20px rgba(35,31,32,0.1)`) over 300ms, matching the Industries card timing. CSS only, on `<article>` in `Services.tsx`; `translate` does not affect layout. Reduced motion keeps the shadow with no movement. Each card is now a link to its Details page (see "Approved decisions"): the title's `<Link>` has an `::after` covering the card, with a focus outline drawn on it, so keyboard focus triggers the same lift through `focus-within`.
- **Industries carousel:** advances every 3000ms with a 700ms slide, cards moving leftward, looping through cloned sets. Clipped at the left content edge. Arrows and touch swipe. Pauses for hover, focus, touch and a hidden tab. No autoplay with reduced motion. Scrollable without JavaScript. Hover lift and image zoom are CSS, separate from carousel movement.
- **Our Process:** matches `our progress.png` at 1920 within about 1px per text line, 0.66/255 across the frame. Columns are 260.8px with 64px gaps at 1920. The five icons are inline SVGs traced from the reference; difference on their pixels is 2.2% to 7.7%, the rocket being highest. Layouts: five across from 1280, three plus two from 1024, two columns from 640, one below. Hover uses Tailwind `group/step` on each `<li>`, so anywhere in a step lifts its circle 4px with a soft shadow and scales its icon to 1.08 over 300ms. Hover is off on touch and with reduced motion. The reveal uses the shared `Reveal` around the list: steps fade and rise 16px, 110ms apart, once. The hidden state only exists once JavaScript sets it, so steps show without JavaScript. On one-column phones lower steps finish revealing before they are scrolled to.
- **FAQ:** matches `faq.png` at 1920 within about 1–2px on text, apart from the description's second line, which ends about 5px short; 1.2/255 across the frame. The card grid extends 14.5px past the content margin on each side from 1600, as in the reference. The eight questions are the reference's wording. Whole-row buttons with `aria-expanded`; several answers can stay open. Height animates through `grid-template-rows` from `0fr` to `1fr`, with no measuring. Durations are `motion-safe:` on purpose: a bare `duration-300` animates every property under reduced motion, because the default transition property is `all`. A `noscript` style shows all answers without JavaScript. The reference's description looks like Inter; Outfit is kept with 0.036em spacing to reproduce its line break. Two columns from 1024, one below.
- **Industries on `/services`:** `IndustryCarousel` takes its cards as props and the data is private to `Industries.tsx`, so the whole `Industries` section is reused, including the three Phase pricing cards. Autoplay, hover pause and arrows were checked on both pages.
- **Navbar banner:** `SiteHeader` takes `showBanner` (default true). When false it renders an empty `<p>` as the marker the `IntersectionObserver` watches, so the navbar still shrinks on scroll. The Homepage uses the default; every other page (`/services`, the Details template, `/industries`, `/our-work`, `/contact`) passes `false`. The Services nav item links to `/services` and its chevron opens the Services dropdown. Contact links to `/contact` (approved 2026-11-10). The top-level Industries, Our Work and Company items are still `#`; Industries and Company open their dropdowns, Our Work keeps a chevron with no dropdown. See "Navbar dropdown menus".
- **Service List Hero:** from `lg` the artwork fills the section at its own 3840/1614 ratio and the text sits on top. The buttons scale from `lg` to 1920, because at fixed size they overlap the plant and phone at 1024. Below `lg` the text comes first on `#eedac2`, with the artwork underneath cropped to the devices and its top edge faded over 48px. At 1920 the layout matches the reference within 1 to 2px per line, and the buttons exactly. Typography was chosen by pixel and ink comparison with the reference, with letter spacing solved so each weight's width matches (comparing weights at mismatched widths gave a wrong answer): headline 660 at -0.0096em, label 16px 700 at +0.066em, description 400 at line-height 1.367, red button 500, outline button 600, checklist 400. The two buttons differ on purpose: with widths matched, the red button's white text matches best at 500 and the outline button's dark text at about 600, as the owner spotted by eye. The outline button overrides the shared border colour with `#a59788` from the reference, in this Hero only, so it also restates `hover:border-ink`. The weight classes on these buttons are `!important`, so test overrides of their weight must use inline `!important`; injected stylesheets have no effect. Outfit is a variable font here, so in-between weights work. The headline stays on exactly two lines at every width: below `lg` its size is `(100vw - 40px) / 10.3`, capped at 64px. The checklist's larger first gap comes from the reference and applies only from `xl`. The description keeps the reference's wording, ending "for your business."
- **Section motion (built 2026-11-06, awaiting owner review):** Service List Hero, Our Process, FAQ and the shared Footer (so also the Homepage). Behaviour was rebuilt from three Webflow references, with no code, assets or dependencies taken from them. Code is in `components/motion/`. Only translate and opacity animate. `MaskLine` is a headline line rising behind a `clip-path` mask, which clips with no layout effect (on load with CSS alone in the Hero, otherwise with `Reveal`). `Reveal` is an `IntersectionObserver` that plays once and keeps its state in `data-reveal`; `each` makes every `.ww-rise` inside trigger separately, for content taller than the screen. Focus inside it reveals everything, so nobody tabs onto a hidden link. `revealOrder` sits in its own file because Server Components cannot call a function exported from a client file. Its 5% bottom margin matters: at 10% the Footer's legal row never triggered at 1024x768, because its hidden 12px offset kept it below the line. The Footer card animates itself, not through a parent, because a parent's opacity would interrupt its backdrop blur. `StaggerText` is the CSS-only letter roll on the two Hero buttons, FAQ "Contact Us" and Footer "Get in Touch", using a `1.25em` text shadow as the incoming copy. Its `KERNING` table restores the kerning that separate letter boxes lose (up to 5px of width otherwise); add pairs if labels change. Later pages (Service Details, Industries, Our Portfolio, Contact) use `MaskLine` and `Reveal` the same way; `RollingNumber` is described under "Industries page".
- **Our Process sliding panel:** a soft white panel behind the hovered step, from 1280 with a real pointer and motion allowed. Delegated pointer events on the list keep it still across the gaps between steps, and it appears in place on entry instead of sliding across. Its `--ww-gap` in `motion.css` must match the list's `xl:gap-x`. The panel is absolute and sits in a new wrapper that took over the list's top margin.
- **Visited pages stay mounted:** `cacheComponents` makes Next keep visited routes in the DOM, hidden with `<Activity>`. So `document.querySelector` and text searches can hit a hidden page, and ids such as `footer-Services` can appear twice. Check visibility with `getClientRects().length` in tests. `limitCoverTo` uses `document.querySelector`; both navigation orders between `/` and `/services` work because the visible Footer came first in the DOM. Navigation between the Homepage or `/services` and the Details pages has **not been rechecked** since the Details pages were added. It is now a normal path, because the Services cards link there. The same effect duplicates the Details sections' fixed ids (`why-choose-heading`, `recent-projects-heading`, `why-choose-us-heading`) once two Details pages have been visited.
- **Our Work stacking:** plain CSS `position: sticky`, no scale or rotation. First pin is 148px at 1280 and up on screens 820px or taller, 114px at 1280 and up on shorter screens, 96px at 768–1279, 88px below 768, then 16px per card.
- **Pin height is measured, not guessed (fixed 2026-11-06):** the old width-and-height media queries disabled stacking on common browser sizes such as 1366x641 and 1536x695, where cards fit. `CardStack` now gives each card `--card-height` through one `ResizeObserver`, and `top` is `min(usual pin, 100svh - card height - 12px)`. A card that would not fit stops higher, so its bottom is never cut off; on such screens later cards lose the 16px edge or the top slides under the Navbar. Sticky is `motion-safe`, and without JavaScript `top` is invalid, so cards scroll normally.

- **Our Work → Final CTA:** the card list's `::after` spacer (`--cover`: 760px from 1024, 1000px below) is cancelled by a negative margin, so cards stay pinned while Final CTA rises over them with no height change. If card or Final CTA heights change, recheck that the distance moved stays above 64px + card height + section padding, and below Final CTA height + padding. The distance moved is `--cover` + 30px.
- **Final CTA → Footer (owner approved Option A, centred):** Final CTA pins and the Footer rises over it until Final CTA is fully hidden. When motion is allowed, the Footer has `min-height: 100svh` and centres its existing block vertically (`motion-safe:` classes on `<footer>` in `SiteFooter.tsx`). The artwork keeps its size, aspect ratio and position relative to the content, because both are centred. Plain navy fills the rest: 221px above and below the block at 1920×1080. This makes the page longer by the height the Footer gains (441px at 1920×1080, 261px at 1440×900, 81px at 1280×720, 2px at 768×1024, none on phones). With reduced motion the Footer stays at its original height. Without JavaScript it is still tall, since CSS cannot detect that, but the page scrolls normally. `limitCoverTo="footer"` still caps the pin at the Footer's height so it can never add empty scrolling, including on screens where the Footer is taller than the screen. Rejected after visual comparison: content at the top or bottom (the artwork then runs through the copyright row or the logo), the legal row at the screen bottom (larger gap, departs from Figma spacing), and enlarging the artwork to fill (crops its sides).
- **Footer background:** centred. Its top and bottom edges fade over 28px by CSS mask, because the exported file is a crop of larger artwork. Below 1280px it keeps 536px height and the sides crop. On a taller Footer the artwork band stays 536px at 1920 and centred; it does not grow to fill the Footer.
- **Footer animation** (`components/layout/FooterBackground.tsx`, `footer-background.css`): CSS keyframes only, on transform and opacity. The PNG drifts to 5% zoom with a slight pan over 26s. Two beams travel across at constant speed using `color-dodge`: cyan left to right in 12s, gold right to left in 16s. Each loops fully off-screen, so there is no fade or jump. Beam opacity is 0.9, or 0.6 below 768px, where a stronger beam reads as a vertical pillar. Two `screen` glows (19s, 23s) move sideways and vary from 35% to full strength. Gold colour is sensitive: too little blue turns the navy green, too little green turns the filaments pink. An `IntersectionObserver` pauses the loops off-screen by setting an attribute, with no re-renders. With reduced motion only the still PNG shows. No particles, by choice.
- **CSS Modules do not work here:** the `*.css` Turbopack rule in `next.config.ts` compiles `.module.css` as plain global CSS, so `styles.x` is `undefined` with no build or type error. Use plain CSS with prefixed class names.

## Responsive layouts

- **Services and phase cards:** 3 columns on desktop, 2 on tablet, 1 on mobile.
- **Our Work:** two-part card from 768; image on top below that.
- **Final CTA:** two columns from 1024; stacked below.
- **Footer:** left block beside the columns from 1280; on top below that; everything stacked below 640.

## Scroll-transition QA status

The one comprehensive homepage QA cycle is **still to do** and was postponed by the owner. It must include Final CTA → Footer with the taller Footer, and should also cover the Service Details pages (no recorded scroll QA yet) and `/services`, which has only had lightweight checks in headless Chrome: TypeScript, ESLint, production build, a position sweep down and back at 8 screen sizes (plus 3 with all FAQ answers open), and real wheel at 1920 and touch swipes at 390. Those passed on 2026-11-05. Recapture the pixel baseline first: it predates the new Services images and the taller Footer. In the sweep, points landing exactly on a fractional boundary between two sections are flagged falsely; the newer section is correctly on top. The light animation against the plain navy still needs checking in motion.

**Deferred QA backlog (2026-11-10):**
- **No scroll QA recorded:** `/industries` (including the 70svh hold, the stat roll, and the layering in browsers with and without `animation-timeline`), `/our-work`, the three newer Details pages, and the Contact Us Hero and Client Overview. The Contact map and form sections have had the checks under "Contact Us page".
- **Navigation through kept-mounted pages** (see "Visited pages stay mounted"): `/` and `/services` to and from the Details pages through the card links, and between two Details pages.
- **Industries Final CTA → Footer** has no `limitCoverTo`, as on `/services`. Not checked in the browser.

## Last QA results

Run on the production build in headless Chrome at 1920, 1440, 1280, 1024, 768, 390 and 320px:

- Typecheck, lint and production build passed. No horizontal overflow, console errors or layout shift at those widths.
- Our Work → Final CTA: cards stayed pinned, the rise and reversal followed scroll exactly, and no card showed after being covered, including at 1920×1440 and 2560×1300.
- Difference from references at 1920 (out of 255): Footer 5.90, Final CTA 3.63, Services 2.72, Industries 1.70. Most of what remains comes from text rendering and font differences.
- Sticky Our Work cards shift a few Navbar pixels (at most 17/255) at 1280 and up. It looks like a browser rendering side effect; the code is unaffected.

**Inspection on 2026-11-09 (read-only):** `tsc --noEmit --incremental false` and `eslint .` both passed with no errors. `next build` was not run, to leave the running dev server alone. No browser checks were done in that inspection.

**2026-11-10:** `tsc` and `eslint .` passed after the Contact map section and during the audit. The Contact map QA ran against the dev server on port 3000, in Chrome, using same-origin iframes sized to each screen (an iframe's own scrollbar takes 15px, so 1280 wide gives a 1265px page). Reduced motion was simulated by switching the page's `prefers-reduced-motion: no-preference` rules off in that frame. Later that day the Contact form section, the World Map spacing restore, both Budget Range updates and the Navbar Contact link each passed `tsc` and `eslint .`, and were checked in Chrome as recorded in their sections. The editor's Tailwind extension shows "suggestCanonicalClasses" hints (shorter spellings such as `leading-tight` for `leading-[1.25]`) in `ContactForm.tsx` and `SiteHeader.tsx`. They are style suggestions, not TypeScript or ESLint errors, and were left unchanged.

**QA tips:** port 3100 is unusable on this machine, so 4173 was used for `next start`. Turn the browser cache off for pixel comparisons, or results are misleadingly large. Pixel comparisons between runs can flip with no code change: on one build, a line in the Our Work cards at 1024 moved 1px depending only on earlier scrolling (its y is fractional), so repeat a difference before treating it as a regression. In headless Chrome, `Input.synthesizeScrollGesture` scrolls with `mouse` but not `touch`; use `Input.dispatchTouchEvent` for touch. Bring the tab to the front or animation frames are throttled.

## Known limitations and pending tasks

Recorded for reference only. Do not fix any of these without the owner's instruction.

### Raised by the 2026-11-09 inspection

- **No version control:** there is no `.git` folder, so nothing has a backup or history. Setting up Git needs the owner's permission.
- **Reachability (updated 2026-11-10):** the six Details pages are reached through the Services cards (approved). The Footer's service links are still `#`. Since 2026-11-10 the Navbar dropdowns (awaiting review) link the six Details pages, `/services` (View All Services), `/industries` (View All Industries), `/our-work` (Company → Our Work) and `/contact` (Company → Contact Us). The top-level Industries, Our Work and Company items are still `#`.
- **Temporary Service Details images:** all five non-UI/UX Details pages show the UI/UX images through 15 entries in `lib/assets.ts` (listed under "Service Details pages"). None of the five `public/images/service details/<slug>/` folders exists yet. All five pages' copy was written without dedicated Figma designs; it is accepted for now under the Content & SEO policy.
- **Contact map heading under the Navbar** on near-16:9 screens: see "Contact Us page". Accepted by the owner as a known limitation on 2026-11-10. Do not fix without explicit authorisation.
- **`/our-work` ends without Final CTA or Footer**, because it is still being built; its next section is on hold. `/contact` now ends with FAQ and Footer.
- **Contact copy to confirm with the owner** (accepted for now under the Content & SEO policy): the Contact Hero uses Portfolio-style wording (eyebrow "Case Study", "Visit Live Website", "Discuss a Similar Project"), and the Client Overview card descriptions repeat the Why Choose Us text. Neither was rechecked against its reference during the audit.
- **SEO basics are missing:** pages have only `title` and `description`. There is no `metadataBase`, Open Graph or Twitter metadata, canonical URL, `sitemap`, `robots` or structured data. The only icon is `app/favicon.ico`. Add any of these only when the owner asks.
- **Brand name has three spellings:** "Way-Wise Tech" (page titles, logo alt text), "Way Wise Tech" (Footer copyright, approved exactly) and "WayWise" (Service Details copy). Left as is under the Content & SEO policy until the owner decides.
- **Duplicated data:** service, industry and navigation data exist both in `lib/content/` and inside `Services.tsx`, `Industries.tsx`, `SiteHeader.tsx` and `SiteFooter.tsx` (see "Central content").
- **Unused code and files (2026-11-10):** `lib/content/services.ts` apart from `serviceCards` (read by the Contact form); `industryCards` in `lib/content/industries.ts` (`navigation.ts`, `services` and `footerIndustries` are now used by the Navbar); `public/images/footer/logo.svg`. `SectionHeading`, the rest of `industries.ts` and `public/images/industry page/` are now used by `/industries`.
- **Reference in the project root:** `section.png` (the Contact form reference) sits next to `package.json`. It is outside `public/`, so it is not served. Leave it until the owner says where references should live.
- **Contact form has no backend:** like the Final CTA form, "Send Message" sends nothing. A destination is needed before launch.
- **Phase price formatting:** the three cards in `Industries.tsx` mix `$950-$2950`, `$2975 – $6700` and `$6800-$19500`. Content, so left as is.
- **Colour hex values:** older sections repeat values that now have tokens (`#eae2dd`, `#0d1d44`, `#626262` and others). They are protected, so they stay.
- **`README.md`** is still the create-next-app default.

### Earlier items

- **Final CTA form sends nothing.** The submit button is `type="button"` and there is no backend or destination. Needs a decision before launch.
- **Content origin:** Our Work client names, roles, project names, description and details are copied from the reference (marked in a code comment). Final CTA team names and promises came from the design. All of it is approved for now under the Content & SEO policy.
- **Placeholder links:** all `#` except the logo, Home breadcrumb, the Navbar's Services (`/services`) and Contact (`/contact`) links, and the six Services card links. This includes the Navbar's Industries, Our Work and Company items, the Industries, Our Portfolio and Contact Hero buttons, "Start a Project", the profile PDF card, every Hero button, every "View All" button in sections, FAQ "Contact Us", and every Footer, social and legal link except the Footer's About Us (`/about`). In the Navbar dropdowns, 12 links are `#` because their pages do not exist (see "Navbar dropdown menus"); About Us now goes to `/about`.
- **About Us links (owner, 2026-11-11):** every existing About Us link goes to `/about`; no new links were added.
  - **Destination:** set once as `aboutUsLink` in `lib/content/navigation.ts`. It is used by `companyLinks`, so the Navbar Company dropdown (desktop) and the mobile menu's Company list follow it.
  - **Footer:** `SiteFooter.tsx` still keeps its own label lists (switching it to `navigation.ts` still needs the owner's approval). It now looks up hrefs in a small `linkHrefs` map built from `aboutUsLink`, so only About Us has a destination there; every other Footer link stays `#`, including its "Our Work".
  - **Verified in Chrome:** on `/`, `/services`, UI/UX Details, `/industries`, `/our-work`, `/contact` and `/about`, at 1920 and 390, every About Us anchor has `href="/about"`; `/our-work` has no Footer. Clicking the desktop dropdown link (from `/services`), the Footer link (from `/contact`) and the mobile-menu link (from `/industries`) opens `/about` with client-side navigation, without a full reload.
- **Services image crop:** the old exports cut off icons at the top of cards 1, 3, 4 and 6. The owner's new files show the full compositions at the 1920 check; the owner has not yet confirmed this closes the issue.
- **Industries small-screen contrast (unresolved):** Doctor's title contrast is 1.45 at 320px, 2.15 at 390px, 2.46 at 1024px; Plumbers' is 2.78 at 320px. A stronger fade below 1280px was proposed but not applied.
- **Footer text over the artwork (unresolved, owner's decision):** the owner rejected a multi-layer text halo as hazy. Text now has one shadow, `0 1px 2px` at 75%, on the intro paragraph, "Start a Conversation" and the link columns. Contrast against the brightest 5% of pixels within 2px of the letters, still → forced worst frame: "Our Team" 2.60 → 1.43 at 1920, 1.89 → 1.19 at 1440, 2.98 → 1.42 at 1280; "Retail, E-commerce & Logistics" 3.22 → 1.45 at 1920. Sampled over a full 312s cycle, those two lines are under 4.5 all the time at 1280 and up. So are "How We Work" at 1440, and "Start a Conversation" 56% of the time at 1920. Possible fix, not applied: a soft local dark gradient behind the affected columns.
- **Keyboard focus and the Navbar (fixed):** `scroll-pt-[110px]` on `<html>` in `app/layout.tsx` keeps Tab and Shift+Tab targets clear of the sticky Navbar. Tab walk at all 10 sizes in both directions, before Group 4: 0 elements hidden or overlapped by the Navbar. Side effect: at 320×568, 320×640 and 360×640, Tab leaves "Project Details" partly below the screen (44% to 85% visible), because Chrome scrolls a textarea's cursor into view, not the whole box. The cursor stays visible and typing scrolls to follow it. It also improved 844×390, where the cursor started off-screen.
- **Hand-drawn icons:** Navbar chevrons and menu icon, Hero checks, Final CTA checks, Industries arrows and chevrons. Sparkle emojis in the banner vary by device.
- **FileWyse and FlyArzan logos** wrap JPEGs with solid backgrounds. Invisible on white, but would show a box on any other colour.
- **Not tested:** Safari, Firefox, real phones, high-density screens, and scroll feel with a physical mouse wheel or trackpad.
- **Figma access:** MCP calls failed with an edit-access error or the Starter plan limit, so work used exported PNGs.
- **Starter files and this file:** the owner deleted the starter SVGs in `public/`. `next dev` rewrites this file's two marked blocks at the top; keep project notes outside them.
- **Services images (fixed 2026-11-05):** `lib/assets.ts` now points at the owner's files, mapping approved by the owner: UI/UX `Image-4.png`, Custom Software `Image-3.png`, Web `Image-2.png`, Mobile `Image-5.png`, AI `Image-1.png`, Branding `Image.png`. All asset paths exist on disk, and these six load from the optimizer on uncached requests. The earlier pixel baseline in QA scripts holds the old pictures, so the Services images will differ from it by design; recapture it during comprehensive QA.
- **Service images removed:** six files left `public/images/service List/` at about 15:35 on 2026-11-05: `UIUX.png`, `Softaware dev.png`, `Web dev.png`, `Ai automation.png`, `Mobile dev.png`, `Branding design.png`. There is no repository, so no copy exists, and no code uses them. Cause unknown; none of the logged commands touched them. The owner said not to restore them.
- **Service List buttons:** both Hero buttons are `#` placeholders, like the rest of the site, until real destinations exist.
- **`limitCoverTo` lookup:** see "Visited pages stay mounted". The Homepage (`"footer"`) and `/contact` (two selectors unique to that page) use it. Both navigation orders between `/` and `/services` were checked and work; navigation to and from the Details pages was not rechecked.
- **FAQ answers can move the question (owner decision pending):** with FAQ pinned, opening an answer after Final CTA has started rising moves that question up by the answer's height (about 100–150px, animated over 300ms), because a growing pinned section re-anchors to the screen bottom. The answer stays visible, but at 1280×720 with Final CTA 40% up the question went behind the Navbar. Before Final CTA starts rising, nothing moves. Unpinning FAQ removes this but loses the FAQ → Final CTA overlap the owner asked for.
- **Phase pricing cards on `/services` (owner decision pending):** legal-specific prices came with the reused `Industries` section. Hiding them needs an optional setting on frozen `Industries.tsx`. The Service Details pages do not include `Industries`, so they do not show these cards.
- **Our Process scroll reveal:** kept. The owner asked for staggered entrance animations on 2026-11-06.
- **FAQ and Our Process copy:** the FAQ answers were written for `/services` and avoid specific prices and turnaround promises. `Faq.tsx` still has a comment calling them drafts; under the Content & SEO policy they are approved for now. Our Process step 04 has no full stop and steps 03 and 04 have similar titles; both are kept from the reference as instructed.
