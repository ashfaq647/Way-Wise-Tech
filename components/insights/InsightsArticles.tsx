import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { ArticleTiltGrid } from "./ArticleTiltGrid";
import {
  insightsArticleHref,
  insightsArticles,
  insightsPagination,
  type InsightsArticle,
} from "@/lib/content/insights";
import "./insights-articles.css";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.5 9h13M10 3.5 15.5 9 10 14.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
  One article card. The whole card is one link: the title's link stretches over the card with
  ::after (as on the Services cards), so the accessible name is the title, there are no nested
  links, and "Read More" is a visual part of the same link. Typography and spacing scale with the
  card's own width (container units) in insights-articles.css.
*/
function ArticleCard({ article }: { article: InsightsArticle }) {
  const { slug, category, date, dateLabel, title, excerpt, featured, image } = article;

  return (
    <li className={`wi-card ww-rise ${featured ? "wi-card--featured" : ""}`}>
      <div className="wi-card__frame">
        <div className="wi-card__drift">
          <AssetImage
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 1024px) 26vw, (min-width: 768px) 46vw, 100vw"
            className="wi-card__img object-cover"
          />
        </div>
      </div>

      <div className="wi-card__body">
        <div className="wi-card__meta wi-card__stagger">
          <span className="wi-card__tag">{category}</span>
          <time dateTime={date} className="wi-card__date">
            {dateLabel}
          </time>
        </div>

        <div className="wi-card__text">
          <h3 className="wi-card__title wi-card__stagger">
            {/* Article pages are not built yet; prefetching them would only fetch a 404. */}
            <Link href={insightsArticleHref(slug)} prefetch={false} className="wi-card__link">
              {title}
            </Link>
          </h3>
          <p className="wi-card__excerpt wi-card__stagger">{excerpt}</p>
        </div>

        <span aria-hidden="true" className="wi-card__more wi-card__stagger">
          <span className="wi-card__more-label">Read More</span>
          <ArrowRight className="wi-card__more-arrow" />
        </span>
      </div>
    </li>
  );
}

/*
  The reference's pagination: pages 1 to 4, page 1 current. Only one page of articles exists, so by
  the owner's decision (2026-11-11) the other pages and both arrows are visibly disabled buttons,
  with no fake navigation.
*/
function Pagination() {
  const { current, total } = insightsPagination;
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav aria-label="Insights pages" className="wi-pager ww-rise">
      <ul className="wi-pager__list">
        <li>
          <button type="button" disabled aria-label="Previous page" className="wi-pager__item">
            <ArrowRight className="wi-pager__arrow rotate-180" />
          </button>
        </li>
        {pages.map((page) =>
          page === current ? (
            <li key={page}>
              <span aria-current="page" className="wi-pager__item wi-pager__item--current">
                <span className="sr-only">Page </span>
                {page}
              </span>
            </li>
          ) : (
            <li key={page}>
              <button type="button" disabled className="wi-pager__item">
                <span className="sr-only">Page </span>
                {page}
              </button>
            </li>
          ),
        )}
        <li>
          <button type="button" disabled aria-label="Next page" className="wi-pager__item">
            <ArrowRight className="wi-pager__arrow" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

/**
 * The Insights article grid, from Frame 2147239044.png (cards in Frame 2147239113.png). At 1920 the
 * section is on #f4f0e9 with nine 489px cards in three columns (x 200 to 1720, 25.5px apart), 100px
 * from the top; the rows are 576, 564 and 564px tall, 24px apart, then the pagination 32px below and
 * 100px of space under it. Two columns from md (the ninth card centred on its own row), one below.
 */
export function InsightsArticles() {
  return (
    <section id="insights-articles" aria-labelledby="insights-articles-heading" className="bg-[#f4f0e9]">
      <h2 id="insights-articles-heading" className="sr-only">
        Latest Insights
      </h2>
      <Reveal each className="wi-articles">
        <ArticleTiltGrid>
          {insightsArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </ArticleTiltGrid>
        <Pagination />
      </Reveal>
    </section>
  );
}
