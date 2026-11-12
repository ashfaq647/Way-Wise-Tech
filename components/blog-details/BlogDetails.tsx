import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { Arrow, Brand, LinkIcon, type BrandIcon } from "@/components/blog-details/BlogIcons";
import { blogDetails, type BlogComment, type BlogImage, type BlogSection } from "@/lib/content/blog-details";

/*
  The Blog Details page (an Insights article), from "Blog Details.png". Ordinary document flow
  throughout: no pinned or sticky sections and no scroll-linked effects, by the owner's instruction.
  Desktop sizes are the reference's at 1920; below lg the columns go full width with the usual page
  gutters and the type steps down.

  Columns at 1920 (all centred): hero and image pair 1190px; intro, sections 1-2, comments and form
  986px; sections 3-4 and the tags row 1082px (wider, as drawn); the wide image 904px; related posts
  1517px.
*/

const NAVY = "text-[#043461]";
const shareIcons: BrandIcon[] = ["facebook", "instagram", "x", "youtube"];

/** A whole image in a frame of its own ratio. */
function Picture({ image, sizes, className = "" }: { image: BlogImage; sizes: string; className?: string }) {
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <AssetImage src={image.src} alt={image.alt} sizes={sizes} className="object-contain" />
    </div>
  );
}

function Sections({ sections }: { sections: BlogSection[] }) {
  return sections.map((section) => (
    <section key={section.heading} className="mt-12 first:mt-0 lg:mt-[61px] lg:first:mt-0">
      <h3 className={`text-[24px] leading-[1.25] font-semibold ${NAVY} lg:text-[35px] lg:leading-[1.3]`}>
        {section.heading}
      </h3>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="mt-4 first-of-type:mt-4 lg:mt-[38px] lg:first-of-type:mt-[23px]">
          {paragraph}
        </p>
      ))}
    </section>
  ));
}

function CommentBody({
  name,
  date,
  text,
  avatar,
}: Pick<BlogComment, "name" | "date" | "text" | "avatar">) {
  return (
    <div className="flex gap-4 lg:gap-[21px]">
      <div className="relative size-12 shrink-0 lg:size-16">
        <AssetImage src={avatar.src} alt="" sizes="64px" className="object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className={`text-[17px] leading-[1.3] font-semibold ${NAVY} lg:text-[19.5px]`}>{name}</p>
            <p className="mt-[3px] text-[13px] leading-[1.4] text-[#999999] lg:text-[14px]">{date}</p>
          </div>
          {/* No comment system exists yet, so the button does nothing. */}
          <button
            type="button"
            className="flex h-8 shrink-0 items-center rounded-full border border-[#1d2123] px-4 text-[14px] text-[#1d2123] lg:text-[16px] transition-colors duration-200 hover:bg-[#1d2123] hover:text-white lg:w-20 lg:justify-center lg:px-0"
          >
            Reply
          </button>
        </div>
        <p className="mt-3 text-[16px] leading-[1.75] text-[#4c576a] lg:mt-[11px] lg:text-[20px] lg:leading-[32px]">
          {text}
        </p>
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: BlogComment }) {
  return (
    <li>
      <article className="rounded-xl border border-[#efefef] bg-white p-4 sm:p-6 lg:px-[23px] lg:pt-[19px] lg:pb-[20px]">
        <CommentBody {...comment} />
      </article>
      {comment.reply && (
        <article
          className={`mt-6 ml-4 rounded-l-[24px] border-l-[3px] py-4 pr-4 pl-4 sm:ml-10 lg:mt-[40px] lg:ml-[60px] lg:pt-[21px] lg:pb-[20px] lg:pr-6 lg:pl-6 ${
            comment.reply.rule === "gold" ? "border-[#eeb877]" : "border-[#043461]"
          }`}
        >
          <CommentBody {...comment.reply} />
        </article>
      )}
    </li>
  );
}

export function BlogDetails() {
  const d = blogDetails;
  const field =
    "block w-full rounded-xl border border-[#cfcfd6] bg-white px-5 text-[16px] text-[#1d2123] placeholder:text-[#afb6c1] focus:border-[#043461] focus:outline-none lg:px-[29px]";

  return (
    <div className="bg-white px-5 pt-8 pb-16 text-[18px] leading-[1.7] text-[#1d2123] md:px-8 lg:pt-10 lg:pb-[80px] lg:text-[24px] lg:leading-[38px]">
      <article>
        {/*
          The hero card is one supplied image with the title, author, date, read time and share icons
          drawn into it, so they are also given as text for screen readers and search engines.
        */}
        <header className="mx-auto max-w-[1190px]">
          <Picture image={d.hero} sizes="(min-width: 1230px) 1190px, 100vw" />
          <h1 className="sr-only">{d.title}</h1>
          <p className="sr-only">
            By {d.author}, {d.date}, {d.readTime}
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-[986px] lg:mt-[64px]">
          <p>{d.intro}</p>
          <h2
            className={`mt-10 text-center text-[32px] leading-[1.25] font-semibold ${NAVY} lg:mt-[39px] lg:text-[54.7px] lg:leading-[71px]`}
          >
            {d.lead}
          </h2>
        </div>

        <Picture
          image={d.wideImage}
          sizes="(min-width: 944px) 904px, 100vw"
          className="mx-auto mt-10 max-w-[904px] lg:mt-[65px]"
        />

        <div className="mx-auto mt-12 max-w-[986px] lg:mt-[64px]">
          <Sections sections={d.sectionsBeforeImages} />
        </div>

        <div className="mx-auto mt-12 grid max-w-[1190px] gap-5 sm:grid-cols-2 lg:mt-[64px] lg:gap-[30px]">
          {d.pairImages.map((image) => (
            // The right file has square corners; its frame is rounded like the left one's baked corners.
            <Picture
              key={image.src}
              image={image}
              sizes="(min-width: 1230px) 580px, (min-width: 640px) 50vw, 100vw"
              className="overflow-hidden rounded-[11px]"
            />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-[1082px] lg:mt-[64px]">
          <Sections sections={d.sectionsAfterImages} />

          {/* Tags and share, between two rules. */}
          <div className="mt-12 flex flex-col gap-4 border-y border-[#c8ccd2] py-5 sm:flex-row sm:items-center sm:justify-between lg:mt-[64px] lg:py-[19px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`mr-1 text-[18px] font-bold ${NAVY} lg:text-[19px]`}>Tags:</span>
              {d.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`flex h-[42px] items-center rounded-full px-6 text-[16px] leading-none lg:px-[25px] lg:text-[20px] ${
                    index === 0 ? "bg-[#eeb877] font-medium text-[#1d2123]" : "bg-[#fffefe] text-[#1d2123] shadow-[0_1px_6px_rgb(0_0_0/0.06)]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="mr-1 text-[16px] text-[#4c576a] lg:text-[17px]">Share:</span>
              {/* No share links were supplied, so the icons are not links yet. */}
              {shareIcons.map((name) => (
                <Brand key={name} name={name} className={`size-5 ${NAVY}`} />
              ))}
              <LinkIcon className={`size-5 ${NAVY}`} />
            </div>
          </div>
        </div>
      </article>

      <section aria-labelledby="blog-comments-heading" className="mx-auto mt-14 max-w-[986px] lg:mt-[65px]">
        <h2
          id="blog-comments-heading"
          className={`text-[28px] leading-[1.25] font-semibold ${NAVY} lg:text-[35px]`}
        >
          Comments ({d.comments.reduce((count, comment) => count + (comment.reply ? 2 : 1), 0)})
        </h2>
        <ul className="mt-8 grid gap-6 lg:mt-[40px] lg:gap-[40px]">
          {d.comments.map((comment) => (
            <Comment key={comment.name} comment={comment} />
          ))}
        </ul>

        <h2 className={`mt-14 text-[24px] leading-[1.3] font-semibold ${NAVY} lg:mt-[64px] lg:text-[29.3px]`}>
          {d.commentForm.heading}
        </h2>
        {/* Frontend only, as the Contact and Final CTA forms: there is no comment backend yet. */}
        <form className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-[30px] lg:gap-x-[31px] lg:gap-y-[30px]">
          <label className="block">
            <span className="sr-only">Name</span>
            <input type="text" name="name" placeholder={d.commentForm.name} className={`${field} h-[45px]`} />
          </label>
          <label className="block">
            <span className="sr-only">Email address</span>
            <input type="email" name="email" placeholder={d.commentForm.email} className={`${field} h-[45px]`} />
          </label>
          <label className="block sm:col-span-2">
            <span className="sr-only">Message</span>
            <textarea
              name="message"
              placeholder={d.commentForm.message}
              className={`${field} h-[212px] resize-none py-4 lg:py-[14px]`}
            />
          </label>
          <button
            type="button"
            className="h-14 rounded-xl bg-[#fc0000] text-[15.5px] font-semibold text-white transition-colors duration-200 hover:bg-[#d40000] sm:col-span-2"
          >
            {d.commentForm.submit}
          </button>
        </form>
      </section>

      <section aria-labelledby="blog-related-heading" className="mx-auto mt-16 max-w-[1517px] lg:mt-[65px]">
        <h2 id="blog-related-heading" className={`text-[26px] leading-[1.3] font-semibold ${NAVY} lg:text-[29.3px]`}>
          {d.related.heading}
        </h2>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 lg:mt-[3px]">
          <p className="text-[#4c576a]">{d.related.intro}</p>
          <Link
            href={d.related.seeAll.href}
            className="group flex items-center gap-2 text-[#4c576a] transition-colors duration-200 hover:text-[#043461]"
          >
            {d.related.seeAll.label}
            <Arrow className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-[21px] lg:grid-cols-3 lg:gap-[25px]">
          {d.related.posts.map((post) => (
            <li key={post.title}>
              <article className="h-full overflow-hidden rounded-lg border border-[#d0d8e0] bg-white">
                <Picture image={post.image} sizes="(min-width: 1024px) 490px, (min-width: 768px) 50vw, 100vw" />
                <div className="px-5 pt-5 pb-5 lg:px-[23px] lg:pt-[20px] lg:pb-[18px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`rounded-md bg-[#fdebd1] px-2.5 py-1 text-[15px] leading-[1.4] font-medium ${NAVY} lg:py-0.5 lg:text-[20px]`}>
                      {post.category}
                    </span>
                    <span className="text-[15px] text-[#6f6c8f] lg:text-[20px]">{post.date}</span>
                  </div>
                  <h3
                    className={`mt-5 text-[20px] leading-[1.45] font-semibold ${NAVY} lg:mt-[18px] lg:text-[26px] lg:leading-[34px]`}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[17px] leading-[1.6] text-black lg:mt-[9px] lg:text-[24px] lg:leading-[30px]">
                    {post.excerpt}
                  </p>
                  {/* The posts' own pages do not exist yet. */}
                  <a
                    href="#"
                    className={`mt-4 inline-flex items-center gap-2 text-[18px] leading-[1.25] font-semibold ${NAVY} lg:mt-[18px] lg:text-[25px]`}
                  >
                    Read More
                    <Arrow className="size-4" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
