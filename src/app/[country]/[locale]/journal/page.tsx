import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ArticlesFeed } from "@/components/feeds/ArticlesFeed";
import { EditorialHero } from "@/components/inner/EditorialHero";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { isCountry, type Country } from "@/config/markets";
import { articles, type Article } from "@/content/articles";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { mergeBySlug, toArticle } from "@/lib/api/mappers";
import type { ApiArticleListRow, Paginated } from "@/lib/api/types";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

const ARTICLES_ENDPOINT = `/molodost/articles/?page_size=${DEFAULT_PAGE_SIZE}&ordering=-published_time`;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const dictionary = await getDictionary(locale as Locale);
  return pageMetadata({
    country: country as Country,
    locale: locale as Locale,
    path: "/journal",
    title: dictionary.inner.journal.title,
    description: dictionary.inner.journal.lede,
  });
}

/** First page of articles from the CMS (newest first), static list when the API has nothing. */
async function fetchArticlesData(): Promise<{ items: Article[]; nextPage: number | null; endpoint: string | null }> {
  const { data, error } = await serverSideFetch<Paginated<ApiArticleListRow>>({
    end_Point: `${ARTICLES_ENDPOINT}&page=1`,
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) {
    return { items: articles, nextPage: null, endpoint: null };
  }
  return {
    items: mergeBySlug<ApiArticleListRow, Article>(data.results, articles, (row, fallback) => toArticle(row, fallback)),
    nextPage: data.next ? 2 : null,
    endpoint: ARTICLES_ENDPOINT,
  };
}

async function ArticlesWrapper({ country, locale, readMoreLabel }: { country: Country; locale: Locale; readMoreLabel: string }) {
  const { items, nextPage, endpoint } = await fetchArticlesData();
  return (
    <ArticlesFeed
      initialItems={items}
      nextPage={nextPage}
      endpoint={endpoint}
      country={country}
      locale={locale}
      readMoreLabel={readMoreLabel}
    />
  );
}

/*
 * /journal — section order from production (molodostlongevity.com/journal):
 * editorial hero (waves on, 10 : 2 headline row, 3 : 9 label/intro row) →
 * the article cards on a two-column grid, 80px gutters (64 tablet, 48
 * stacked on phone), every card centred in its cell and capped at 480px,
 * all on the same blob mask → contact block as the #FAFAFA inner variant
 * with the journal's own wording.
 */
export default async function JournalPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.journal;

  return (
    <>
      <EditorialHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} intro={copy.intro} />
      <section className="pb-20 tablet:pb-[120px] desktop:pb-40">
        <Suspense fallback={null}>
          <ArticlesWrapper country={typedCountry} locale={typedLocale} readMoreLabel={dictionary.actions.readMore} />
        </Suspense>
      </section>
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        variant="inner"
        copy={{ title: copy.contactTitle, body: copy.contactBody }}
      />
    </>
  );
}
