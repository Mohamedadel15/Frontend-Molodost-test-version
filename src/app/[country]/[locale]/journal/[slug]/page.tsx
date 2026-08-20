import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/inner/ArticleLayout";
import { RelatedArticles } from "@/components/inner/RelatedArticles";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { isCountry, type Country } from "@/config/markets";
import { articles, type Article } from "@/content/articles";
import { faqs as staticFaqs, type FaqItem } from "@/content/faqs";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { articleHtml, mergeBySlug, toArticle, toFaq } from "@/lib/api/mappers";
import type { ApiArticle, ApiArticleListRow, ApiFaq, Paginated } from "@/lib/api/types";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
  searchParams: Promise<{ preview_token?: string }>;
}

interface ArticlePageData {
  article: Article;
  /** CMS rich-text body; null when the static sections should render. */
  html: string | null;
}

// Slugs come from the CMS, so this segment renders on demand: a static
// generateStaticParams list under the root layout's dynamicParams=false would
// turn into an allowlist and 404 every CMS-only slug.
export const dynamicParams = true;

/** One article from the CMS (`preview_token` for dashboard previews); the static entry when the API has nothing. */
async function fetchArticleData(slug: string, previewToken?: string): Promise<ArticlePageData | null> {
  const fallback = articles.find((entry) => entry.id === slug);
  const tokenParam = previewToken ? `?preview_token=${encodeURIComponent(previewToken)}` : "";
  const { data, error } = await serverSideFetch<ApiArticle>({
    end_Point: `/molodost/articles/${encodeURIComponent(slug)}/${tokenParam}`,
    method: "GET",
    ...(previewToken ? { revalidate: 0 } : {}),
  });
  if (error || !data || !data.slug) return fallback ? { article: fallback, html: null } : null;
  return { article: toArticle(data, fallback), html: articleHtml(data) };
}

/** Latest articles for the "More insights" block; static list when the API has nothing. */
async function fetchRelatedData(): Promise<Article[]> {
  const { data, error } = await serverSideFetch<Paginated<ApiArticleListRow>>({
    end_Point: "/molodost/articles/?page=1&page_size=6&ordering=-published_time",
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) return articles;
  return mergeBySlug<ApiArticleListRow, Article>(data.results, articles, (row, fallback) => toArticle(row, fallback));
}

/** FAQs from the CMS; the static list when the API has nothing. */
async function fetchFaqsData(): Promise<FaqItem[]> {
  const { data, error } = await serverSideFetch<Paginated<ApiFaq>>({
    end_Point: "/molodost/faqs/?page=1&page_size=12",
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) return staticFaqs;
  return mergeBySlug<ApiFaq, FaqItem>(data.results, staticFaqs, (row, fallback) => toFaq(row, fallback));
}

export async function generateMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  const { preview_token } = await searchParams;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const page = await fetchArticleData(slug, preview_token);
  if (!page) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/journal/${slug}`,
    title: pick(page.article.title, typedLocale),
    description: pick(page.article.excerpt, typedLocale),
  });
}

/*
 * /journal/[slug] — section for section the production article page:
 * sticky masked image beside the intro + rich text → "More longevity
 * insights" with two cards → FAQ on the #FAFAFA band.
 */
export default async function ArticlePage({ params, searchParams }: PageParams) {
  const { country, locale, slug } = await params;
  const { preview_token } = await searchParams;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const [page, related, faqs] = await Promise.all([
    fetchArticleData(slug, preview_token),
    fetchRelatedData(),
    fetchFaqsData(),
  ]);
  if (!page) notFound();
  const { article, html } = page;

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <ArticleLayout
        title={pick(article.title, typedLocale)}
        lede={pick(article.excerpt, typedLocale)}
        date={pick(article.date, typedLocale)}
        image={article.image}
        sections={article.sections.map((section) => ({
          heading: pick(section.heading, typedLocale),
          body: pick(section.body, typedLocale),
        }))}
        quote={pick(article.closing, typedLocale) || undefined}
        attribution={dictionary.home.quote.attribution}
        html={html}
      />
      <RelatedArticles
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        excludeId={article.id}
        articles={related}
      />
      <FAQSection country={typedCountry} locale={typedLocale} dictionary={dictionary} items={faqs} />
    </>
  );
}
