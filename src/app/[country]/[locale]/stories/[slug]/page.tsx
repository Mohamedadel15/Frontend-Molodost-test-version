import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecialistApproach } from "@/components/inner/SpecialistApproach";
import { SpecialistPortrait } from "@/components/inner/SpecialistPortrait";
import { StoryHero } from "@/components/inner/StoryHero";
import { StoryOutcome } from "@/components/inner/StoryOutcome";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures, type StoryFeatureEntry } from "@/content/stories";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { toStory, toStoryFeature } from "@/lib/api/mappers";
import type { ApiStory, ApiStoryListRow, Paginated } from "@/lib/api/types";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
  searchParams: Promise<{ preview_token?: string }>;
}

// Slugs come from the CMS, so this segment renders on demand (no static params).
export const dynamicParams = true;

/*
 * One story from the CMS (`preview_token` lets the dashboard preview an
 * unpublished entry), merged with the static entry of the same slug; the
 * static entry alone when the API has nothing.
 */
async function fetchStoryData(slug: string, previewToken?: string): Promise<StoryFeatureEntry | null> {
  const fallback = storyFeatures.find((entry) => entry.id === slug);
  const tokenParam = previewToken ? `?preview_token=${encodeURIComponent(previewToken)}` : "";
  const { data, error } = await serverSideFetch<ApiStory>({
    end_Point: `/molodost/stories/${encodeURIComponent(slug)}/${tokenParam}`,
    method: "GET",
    // previews must never be served from cache
    ...(previewToken ? { revalidate: 0 } : {}),
  });
  if (error || !data || !data.slug) return fallback ?? null;
  return toStory(data, fallback);
}

/** The story after this one (API order when available, static otherwise), wrapping to the first. */
async function fetchNextStory(slug: string): Promise<Omit<StoryFeatureEntry, "detail"> | undefined> {
  const { data } = await serverSideFetch<Paginated<ApiStoryListRow>>({
    end_Point: "/molodost/stories/?page=1&page_size=100",
    method: "GET",
  });
  const list: Array<Omit<StoryFeatureEntry, "detail">> =
    data?.results?.length
      ? data.results.map((row) => toStoryFeature(row, storyFeatures.find((entry) => entry.id === row.slug)))
      : storyFeatures;
  if (list.length < 2) return undefined;
  const index = list.findIndex((entry) => entry.id === slug);
  return list[(index + 1) % list.length];
}

export async function generateMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  const { preview_token } = await searchParams;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const story = await fetchStoryData(slug, preview_token);
  if (!story) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/stories/${slug}`,
    title: pick(story.title, typedLocale),
    description: pick(story.detail.lede, typedLocale),
  });
}

/*
 * /stories/[slug] — section for section the production story page
 * (molodostlongevity.com/stories/<id>): full-bleed fixed hero → "The
 * challenge" band (word scrub) → name + "The Journey" editorial with the
 * Starting Point / Our Approach blocks → portrait + pull quote → outcome +
 * "Read next story" link → contact CTA on the #FAFAFA band.
 */
export default async function StoryDetailPage({ params, searchParams }: PageParams) {
  const { country, locale, slug } = await params;
  const { preview_token } = await searchParams;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const [story, nextStory] = await Promise.all([fetchStoryData(slug, preview_token), fetchNextStory(slug)]);
  if (!story) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.stories;
  const detail = story.detail;
  const person = pick(detail.personName, typedLocale);
  const blocks = [
    { heading: pick(detail.startingPointTitle, typedLocale), body: pick(detail.startingPoint, typedLocale) },
    { heading: pick(detail.approachTitle, typedLocale), body: pick(detail.approach, typedLocale) },
  ].filter((block) => block.body);

  return (
    <>
      <StoryHero
        tags={pick(story.tags, typedLocale)}
        title={pick(story.title, typedLocale)}
        lede={pick(detail.lede, typedLocale)}
        image={story.images.back}
        imagePosition="center 30%"
        challengeLabel={pick(detail.challengeTitle, typedLocale)}
        challenge={pick(detail.challenge, typedLocale)}
      />
      {/* positioned so it stacks above the scene's fixed backdrop, but NOT
          opaque: the backdrop has already dissolved to white when this block
          arrives (SceneBackdrop), so an opaque block would only add an edge */}
      <div className="relative">
        <SpecialistApproach
          eyebrow={person}
          title={pick(detail.journeyTitle, typedLocale)}
          intro={pick(detail.journeyIntro, typedLocale)}
          blocks={blocks}
        />
        {pick(detail.quote, typedLocale) ? (
          <div className="pt-16 tablet:pt-20 desktop:pt-[80px]">
            <SpecialistPortrait
              image={story.images.front}
              alt={person}
              quote={pick(detail.quote, typedLocale)}
              attribution={person}
              offset="image"
              rule="accent"
              noiseOpacity={0.05}
            />
          </div>
        ) : null}
        <StoryOutcome
          outcome={pick(detail.outcome, typedLocale)}
          nextHref={nextStory ? localePath(typedCountry, typedLocale, nextStory.href) : undefined}
          nextLabel={dictionary.actions.readNextStory}
        />
        <ContactPath
          country={typedCountry}
          locale={typedLocale}
          dictionary={dictionary}
          variant="inner"
          copy={{ title: copy.detailContactTitle, body: copy.detailContactBody }}
        />
      </div>
    </>
  );
}
