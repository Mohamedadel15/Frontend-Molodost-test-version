import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/inner/PageHero";
import { ProseSections } from "@/components/inner/ProseSections";
import { BigQuote } from "@/components/sections/BigQuote/BigQuote";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { StoryFeature } from "@/components/sections/StoryFeature/StoryFeature";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures } from "@/content/stories";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return storyFeatures.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const story = storyFeatures.find((entry) => entry.id === slug);
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

/** /stories/[slug] — full client story (reference story template). */
export default async function StoryDetailPage({ params }: PageParams) {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const story = storyFeatures.find((entry) => entry.id === slug);
  if (!story) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const detail = story.detail;
  const nextStory = storyFeatures.find((entry) => entry.id !== slug);

  return (
    <>
      <PageHero
        eyebrow={pick(story.tags, typedLocale)}
        title={pick(story.title, typedLocale)}
        lede={pick(detail.lede, typedLocale)}
      />
      <ProseSections
        blocks={[
          {
            heading: pick(detail.challengeTitle, typedLocale),
            body: pick(detail.challenge, typedLocale),
          },
          {
            heading: pick(detail.journeyTitle, typedLocale),
            body: pick(detail.journeyIntro, typedLocale),
          },
          {
            heading: pick(detail.startingPointTitle, typedLocale),
            body: pick(detail.startingPoint, typedLocale),
          },
          {
            heading: pick(detail.approachTitle, typedLocale),
            body: pick(detail.approach, typedLocale),
          },
        ]}
      />
      <BigQuote
        text={pick(detail.quote, typedLocale)}
        attribution={pick(detail.personName, typedLocale)}
      />
      <ProseSections
        blocks={[
          { body: pick(detail.outcome, typedLocale) },
          {
            heading: pick(detail.finalTitle, typedLocale),
            body: pick(detail.final, typedLocale),
          },
        ]}
      />
      {nextStory ? (
        <StoryFeature
          story={nextStory}
          country={typedCountry}
          locale={typedLocale}
          ctaLabel={dictionary.actions.readNextStory}
        />
      ) : null}
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
    </>
  );
}
