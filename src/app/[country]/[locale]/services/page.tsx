import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialHero } from "@/components/inner/EditorialHero";
import { PricingSection } from "@/components/inner/PricingSection";
import { ServicePanels } from "@/components/inner/ServicePanels";
import { ConsultationSection } from "@/components/sections/ConsultationSection/ConsultationSection";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { StatsSection } from "@/components/sections/StatsSection/StatsSection";
import { StoryFeature } from "@/components/sections/StoryFeature/StoryFeature";
import { isCountry, type Country } from "@/config/markets";
import { faqs as staticFaqs, type FaqItem } from "@/content/faqs";
import { pricingTiers as staticTiers, serviceRows as staticRows, type PricingTier, type ServiceRow } from "@/content/services";
import { storyFeatures, type StoryFeatureEntry } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { mergeBySlug, toFaq, toPricingTier, toServiceRow, toStory } from "@/lib/api/mappers";
import type { ApiFaq, ApiProgram, ApiServiceListRow, ApiStory, Paginated } from "@/lib/api/types";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const dictionary = await getDictionary(locale as Locale);
  return pageMetadata({
    country: country as Country,
    locale: locale as Locale,
    path: "/services",
    title: dictionary.inner.services.title,
    description: dictionary.inner.services.lede,
  });
}

const SERVICES_STORY_ID = "aesthetic-regeneration-without-looking-different";

/*
 * The featured story is content, not request state, so it is resolved once at
 * import: a missing id is an authoring slip in stories.ts and should break the
 * build, not render an empty section. The lookup sits in a function because a
 * module-level `if (!story) throw` does not narrow away `undefined` inside the
 * component body.
 */
function requireStory(id: string): StoryFeatureEntry {
  const story = storyFeatures.find((entry) => entry.id === id);
  if (!story) throw new Error(`storyFeatures has no entry with id "${id}"`);
  return story;
}

const servicesStory = requireStory(SERVICES_STORY_ID);

/** Service panels from the CMS, merged with the static rows by slug; static rows when the API has nothing. */
async function fetchServicesData(): Promise<ServiceRow[]> {
  const { data, error } = await serverSideFetch<Paginated<ApiServiceListRow>>({
    end_Point: "/molodost/services/?page=1&page_size=12",
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) return staticRows;
  return mergeBySlug<ApiServiceListRow, ServiceRow>(data.results, staticRows, (row, fallback) => toServiceRow(row, fallback));
}

/** Pricing tiers from the CMS programs (price / sale_price); static tiers when the API has nothing. */
async function fetchProgramsData(): Promise<PricingTier[]> {
  const { data, error } = await serverSideFetch<Paginated<ApiProgram>>({
    end_Point: "/molodost/programs/?page=1&page_size=12",
    method: "GET",
  });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) return staticTiers;
  return mergeBySlug<ApiProgram, PricingTier>(data.results, staticTiers, (row, fallback) => toPricingTier(row, fallback));
}

/** The featured story from the CMS (same slug); the static entry when the API has nothing. */
async function fetchFeaturedStory(): Promise<StoryFeatureEntry> {
  const { data, error } = await serverSideFetch<ApiStory>({
    end_Point: `/molodost/stories/${SERVICES_STORY_ID}/`,
    method: "GET",
  });
  if (error || !data || !data.slug) return servicesStory;
  return toStory(data, servicesStory);
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

/*
 * /services — section order taken from the reference page, top to bottom:
 * hero → four full-bleed service panels → stats → pricing → story → FAQ →
 * consultation.
 */
export default async function ServicesPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.services;
  const [rows, tiers, story, faqs] = await Promise.all([
    fetchServicesData(),
    fetchProgramsData(),
    fetchFeaturedStory(),
    fetchFaqsData(),
  ]);

  return (
    <>
      <EditorialHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        lede={copy.lede}
        intro={copy.intro}
      />

      <ServicePanels
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        rows={rows}
      />

      <StatsSection
        locale={typedLocale}
        dictionary={dictionary}
        copy={copy.stats}
      />

      <PricingSection
        locale={typedLocale}
        bookHref={localePath(typedCountry, typedLocale, "/book-a-session")}
        copy={{
          eyebrow: copy.programsEyebrow,
          title: copy.programsTitle,
          body: copy.programsBody,
          toggleOne: copy.toggleOne,
          toggleBundle: copy.toggleBundle,
          bookNow: dictionary.actions.bookNow,
        }}
        tiers={tiers}
      />

      <StoryFeature
        story={story}
        country={typedCountry}
        locale={typedLocale}
        ctaLabel={dictionary.actions.readFullStory}
      />

      <FAQSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        items={faqs}
      />

      <ConsultationSection country={typedCountry} dictionary={dictionary} />
    </>
  );
}
