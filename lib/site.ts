/**
 * Site-wide facts for SEO and metadata code (Phase A, 2026-11-14). Only verified values live here;
 * anything not yet confirmed by the owner stays `null` and is marked pending, so nothing is guessed.
 *
 * Not used by the existing pages yet: their metadata is unchanged and still written in each
 * page.tsx. `lib/seo.ts` reads this file.
 */

type Site = {
  /**
   * The brand name exactly as every page title, the root title and the logo alt text spell it
   * today. This records current usage, not a brand decision: the site also uses "Way Wise Tech"
   * (Footer copyright, approved exactly) and "WayWise" (Service Details copy). The official
   * spelling is pending the owner's decision.
   */
  name: string;
  /**
   * The production origin, for example "https://www.example.com" (no trailing path).
   * PENDING: not confirmed by the owner. While it is null, no canonical URL, absolute Open Graph
   * URL, `metadataBase`, robots or sitemap is generated.
   */
  url: string | null;
  /** The document language, as set on <html lang> in app/layout.tsx. */
  language: string;
};

export const site: Site = {
  name: "Way-Wise Tech",
  url: null,
  language: "en",
};
