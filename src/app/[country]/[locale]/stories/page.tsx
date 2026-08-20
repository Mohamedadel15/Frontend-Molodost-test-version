import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { StoriesFeed } from "@/components/feeds/StoriesFeed";
import { EditorialHero } from "@/components/inner/EditorialHero";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { StoriesCta } from "@/components/sections/StoriesCta/StoriesCta";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures, type StoryFeatureEntry } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { mergeBySlug, toStoryFeature } from "@/lib/api/mappers";
import type { ApiStoryListRow, Paginated } from "@/lib/api/types";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

type StoryItem = Omit<StoryFeatureEntry, "detail">;

const STORIES_ENDPOINT = `/molodost/stories/?page_size=${DEFAULT_PAGE_SIZE}`;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const dictionary = await getDictionary(locale as Locale);
  return pageMetadata({
    country: country as Country,
    locale: locale as Locale,
    path: "/stories",
    title: dictionary.inner.stories.title,
    description: dictionary.inner.stories.lede,
  });
}

/*
 * First page of stories from the CMS, merged with the static entries by slug
 * (static copy fills anything the API leaves empty). When the API is
 * unreachable or empty the static list renders unchanged and the feed does
 * not page.
 */
async function fetchStoriesData(): Promise<{ items: StoryItem[]; nextPage: number | null; endpoint: string | null }> {
  const { data, error } = await serverSideFetch<Paginated<ApiStoryListRow>>({
    end_Point: `${STORIES_ENDPOINT}&page=1`,
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) {
    return { items: storyFeatures, nextPage: null, endpoint: null };
  }
  return {
    items: mergeBySlug<ApiStoryListRow, StoryItem>(data.results, storyFeatures, (row, fallback) =>
      toStoryFeature(row, fallback),
    ),
    nextPage: data.next ? 2 : null,
    endpoint: STORIES_ENDPOINT,
  };
}

async function StoriesWrapper({ country, locale, ctaLabel }: { country: Country; locale: Locale; ctaLabel: string }) {
  const { items, nextPage, endpoint } = await fetchStoriesData();
  return (
    <StoriesFeed
      initialItems={items}
      nextPage={nextPage}
      endpoint={endpoint}
      country={country}
      locale={locale}
      ctaLabel={ctaLabel}
    />
  );
}

/*
 * /stories — section order from production, top to bottom: editorial hero
 * (waves on, 10 : 2 headline row, 3 : 9 label/intro row) → the story list,
 * one card per client journey stacked 200px apart on desktop (160 tablet /
 * 64 phone) with the same distance below the last card → "Ready to find
 * your path?" band on #FAFAFA → shared contact block.
 */
export default async function StoriesPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.stories;

  return (
    <>
      <EditorialHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} intro={copy.intro} />
      <section className="pb-16 tablet:pb-[160px] desktop:pb-[200px]">
        <Suspense fallback={null}>
          <StoriesWrapper country={typedCountry} locale={typedLocale} ctaLabel={dictionary.actions.readFullStory} />
        </Suspense>
      </section>
      <StoriesCta country={typedCountry} locale={typedLocale} dictionary={dictionary} />
      <ContactPath country={typedCountry} locale={typedLocale} dictionary={dictionary} />
    </>
  );
}
