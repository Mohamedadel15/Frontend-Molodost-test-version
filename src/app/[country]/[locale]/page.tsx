import { notFound } from "next/navigation";

import { BigQuote } from "@/components/sections/BigQuote/BigQuote";
import { ConsultationSection } from "@/components/sections/ConsultationSection/ConsultationSection";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { Hero } from "@/components/sections/Hero/Hero";
import { HeroToggle } from "@/components/sections/Hero/HeroToggle";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";
import { JournalSection } from "@/components/sections/JournalSection/JournalSection";
import { PhilosophyStatement } from "@/components/sections/PhilosophyStatement/PhilosophyStatement";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid/ProgramsGrid";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection/SpecialistsSection";
import { SplitStatement } from "@/components/sections/SplitStatement/SplitStatement";
import { StatsSection } from "@/components/sections/StatsSection/StatsSection";
import { StoryFeature } from "@/components/sections/StoryFeature/StoryFeature";
import { ToggleScene } from "@/components/sections/ToggleScene/ToggleScene";
import { isCountry, type Country } from "@/config/markets";
import { articles as staticArticles, type Article } from "@/content/articles";
import { faqs as staticFaqs, type FaqItem } from "@/content/faqs";
import { programs as staticPrograms, type Program } from "@/content/programs";
import { specialists as staticSpecialists, type Specialist } from "@/content/specialists";
import { storyFeatures, type StoryFeatureEntry } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { mergeBySlug, toArticle, toFaq, toProgram, toSpecialist, toStoryFeature } from "@/lib/api/mappers";
import type {
  ApiArticleListRow,
  ApiFaq,
  ApiProgram,
  ApiSpecialistListRow,
  ApiStoryListRow,
  Paginated,
} from "@/lib/api/types";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

type StoryItem = Omit<StoryFeatureEntry, "detail">;

/** Generic first-page list fetch with static fallback (home only needs the first few rows of each resource). */
async function fetchList<R extends { slug: string }, T extends { id: string }>(
  endpoint: string,
  statics: T[],
  map: (row: R, fallback: T | undefined, index: number) => T,
): Promise<T[]> {
  const { data, error } = await serverSideFetch<Paginated<R>>({ end_Point: endpoint, method: "GET" });
  if (error || !data || !Array.isArray(data.results) || data.results.length === 0) return statics;
  return mergeBySlug<R, T>(data.results, statics, map);
}

const fetchProgramsData = () =>
  fetchList<ApiProgram, Program>("/molodost/programs/?page=1&page_size=4", staticPrograms, (row, fallback, index) =>
    toProgram(row, fallback ?? staticPrograms[index]),
  );
const fetchStoriesData = () =>
  fetchList<ApiStoryListRow, StoryItem>("/molodost/stories/?page=1&page_size=2", storyFeatures, (row, fallback) =>
    toStoryFeature(row, fallback),
  );
const fetchSpecialistsData = () =>
  fetchList<ApiSpecialistListRow, Specialist>(
    "/molodost/specialists/?page=1&page_size=6",
    staticSpecialists,
    (row, fallback, index) => toSpecialist(row, fallback, index),
  );
const fetchArticlesData = () =>
  fetchList<ApiArticleListRow, Article>(
    "/molodost/articles/?page=1&page_size=3&ordering=-published_time",
    staticArticles,
    (row, fallback) => toArticle(row, fallback),
  );
const fetchFaqsData = () =>
  fetchList<ApiFaq, FaqItem>("/molodost/faqs/?page=1&page_size=12", staticFaqs, (row, fallback) => toFaq(row, fallback));

/** Home — section order per design-inventory §12. */
export default async function HomePage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const [programs, stories, specialists, articles, faqs] = await Promise.all([
    fetchProgramsData(),
    fetchStoriesData(),
    fetchSpecialistsData(),
    fetchArticlesData(),
    fetchFaqsData(),
  ]);
  const [storyA, storyB] = stories;

  return (
    <>
      <HeroToggle
        hero={
          <Hero
            country={typedCountry}
            locale={typedLocale}
            dictionary={dictionary}
          />
        }
        toggle={<ToggleScene dictionary={dictionary} />}
      />
      <ProgramsGrid
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        programs={programs}
      />
      <PhilosophyStatement
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      {storyA ? (
        <StoryFeature
          story={storyA}
          country={typedCountry}
          locale={typedLocale}
          ctaLabel={dictionary.actions.readFullStory}
        />
      ) : null}
      <HowItWorks
        dictionary={dictionary}
        steps={dictionary.home.howItWorks.steps}
      />
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <SpecialistsSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        specialists={specialists}
      />
      <SplitStatement dictionary={dictionary} />
      <BigQuote
        text={dictionary.home.quote.text}
        attribution={dictionary.home.quote.attribution}
      />
      {storyB ? (
        <StoryFeature
          story={storyB}
          country={typedCountry}
          locale={typedLocale}
          ctaLabel={dictionary.actions.readFullStory}
        />
      ) : null}
      <JournalSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        articles={articles}
      />
      <StatsSection locale={typedLocale} dictionary={dictionary} />
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
