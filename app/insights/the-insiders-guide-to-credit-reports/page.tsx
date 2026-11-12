import type { Metadata } from "next";
import { BlogDetails } from "@/components/blog-details/BlogDetails";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { blogDetails } from "@/lib/content/blog-details";

export const metadata: Metadata = {
  title: `${blogDetails.title} | Way-Wise Tech`,
  description: blogDetails.intro,
};

/*
  The Blog Details page: the first Insights article, at the URL its Insights card already links to
  (insightsArticleHref). Ordinary document scrolling throughout, with no pinned sections, by the
  owner's instruction: the header, the article (with its comments, comment form and related posts),
  then the shared Footer.
*/
export default function BlogDetailsPage() {
  return (
    <>
      {/* The red banner is Homepage only. */}
      <SiteHeader showBanner={false} />
      <main>
        <BlogDetails />
      </main>
      <SiteFooter />
    </>
  );
}
