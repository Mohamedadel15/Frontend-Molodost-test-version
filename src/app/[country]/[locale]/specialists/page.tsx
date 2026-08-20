import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { WaveLines } from "@/components/decor/RefLines";
import { SpecialistsFeed } from "@/components/feeds/SpecialistsFeed";
import { EditorialHero } from "@/components/inner/EditorialHero";
import { Section } from "@/components/layout/Section/Section";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { isCountry, type Country } from "@/config/markets";
import { specialists, type Specialist } from "@/content/specialists";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { mergeBySlug, toSpecialist } from "@/lib/api/mappers";
import type { ApiSpecialistListRow, Paginated } from "@/lib/api/types";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

const SPECIALISTS_ENDPOINT = `/molodost/specialists/?page_size=${DEFAULT_PAGE_SIZE}`;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const dictionary = await getDictionary(locale as Locale);
  return pageMetadata({
    country: country as Country,
    locale: locale as Locale,
    path: "/specialists",
    title: dictionary.inner.specialists.title,
    description: dictionary.inner.specialists.lede,
  });
}

/** First page of specialists from the CMS, merged with the static team by slug; static team when the API has nothing. */
async function fetchSpecialistsData(): Promise<{ items: Specialist[]; nextPage: number | null; endpoint: string | null }> {
  const { data, error } = await serverSideFetch<Paginated<ApiSpecialistListRow>>({
    end_Point: `${SPECIALISTS_ENDPOINT}&page=1`,
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) {
    return { items: specialists, nextPage: null, endpoint: null };
  }
  return {
    items: mergeBySlug<ApiSpecialistListRow, Specialist>(data.results, specialists, (row, fallback, index) =>
      toSpecialist(row, fallback, index),
    ),
    nextPage: data.next ? 2 : null,
    endpoint: SPECIALISTS_ENDPOINT,
  };
}

async function SpecialistsWrapper({ country, locale, readMoreLabel }: { country: Country; locale: Locale; readMoreLabel: string }) {
  const { items, nextPage, endpoint } = await fetchSpecialistsData();
  return (
    <SpecialistsFeed
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
 * /specialists — section order taken from the reference frame (Figma 28:8236),
 * top to bottom: editorial hero → two-column team grid with the wave lines
 * threading behind the middle rows → "Begin with clinical clarity" contact
 * block on the #FAFAFA band.
 */
export default async function SpecialistsPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.specialists;

  return (
    <>
      <EditorialHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        lede={copy.lede}
        intro={copy.intro}
        waves={false}
      />
      <Section paddingBottom="md" className="relative overflow-hidden">
        {/* looping wave lines behind the middle card rows (Figma 28:8239:
            a 900px band vertically centred on the grid, lines offset 110px) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[900px] -translate-y-1/2 desktop:block"
        >
          <WaveLines className="left-[-1954px] top-[110px] h-[680px] w-[6000px]" />
        </div>
        <Suspense fallback={null}>
          <SpecialistsWrapper country={typedCountry} locale={typedLocale} readMoreLabel={dictionary.actions.readMore} />
        </Suspense>
      </Section>
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        variant="inner"
        copy={{ title: copy.contactTitle, body: copy.contactBody, cta: copy.contactCta }}
      />
    </>
  );
}
