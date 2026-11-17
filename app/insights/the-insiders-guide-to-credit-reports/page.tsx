import type { Metadata } from "next";
import { BlogDetails } from "@/components/blog-details/BlogDetails";
import { Footer } from "@/components/layout/Footer";
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
      {/* The shared floating Homepage Navbar. It takes no space, so <main> keeps the old bar's 80px
          (100px from xl): the article sits exactly where it did, clear of the floating card. */}
      <SiteHeader showBanner={false} variant="floating" />
      <main className="pt-20 xl:pt-[100px]">
        <BlogDetails />
      </main>
      {/* The shared Footer (Final CTA + footer), as on the Homepage. Normal scrolling: it follows the article. */}
      <Footer />
    </>
  );
}
