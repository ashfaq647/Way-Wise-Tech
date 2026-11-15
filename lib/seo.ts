import type { Metadata } from "next";
import { site } from "@/lib/site";

/*
  A reusable metadata builder (Phase A, 2026-11-14), prepared for future SEO-specialist rules and
  CMS-provided SEO fields. No existing page uses it yet: their metadata is unchanged.

  - The title is passed through exactly as given. There is no title template (app/layout.tsx has
    none, and every page already writes its own " | Way-Wise Tech" suffix).
  - Canonical URLs and absolute Open Graph URLs need the production origin (`site.url`). While it
    is pending (null), they are left out rather than guessed. Next.js also fails the build on
    relative metadata URLs when there is no metadataBase.
  - Nothing is invented: every value comes from the caller or from lib/site.ts.
*/

/** The content image shape used across lib/content: `src` is a public path such as "/images/…". */
export type SeoImage = { src: string; width: number; height: number; alt: string };

export type SeoInput = {
  /** The full document title, used as given. */
  title: string;
  description?: string;
  /** The route path, such as "/services". Used for the canonical URL once `site.url` is set. */
  path?: string;
  /** Social sharing image. Used only once `site.url` is set, because it must be absolute. */
  image?: SeoImage;
  /** The Open Graph type. */
  type?: "website" | "article";
  /** Asks search engines not to index the page. */
  noIndex?: boolean;
};

/** An absolute URL on the production origin, or null while the origin is pending. */
function absoluteUrl(path: string): string | null {
  return site.url ? new URL(path, site.url).toString() : null;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: SeoInput): Metadata {
  const url = path ? absoluteUrl(path) : null;
  const imageUrl = image ? absoluteUrl(image.src) : null;
  const ogImage =
    image && imageUrl ? { url: imageUrl, width: image.width, height: image.height, alt: image.alt } : null;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      siteName: site.name,
      ...(url ? { url } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage.url, alt: ogImage.alt }] } : {}),
    },
  };

  if (url) metadata.alternates = { canonical: url };
  if (noIndex) metadata.robots = { index: false };

  return metadata;
}
