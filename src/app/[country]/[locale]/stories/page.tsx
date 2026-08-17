import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/inner/PageHero";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { StoryFeature } from "@/components/sections/StoryFeature/StoryFeature";
import { isCountry, type Country } from "@/config/markets";
import { storyFeatures } from "@/content/stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
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
    path: "/stories",
    title: dictionary.inner.stories.title,
    description: dictionary.inner.stories.lede,
  });
}

/** /stories — client story index (reference stories template). */
export default async function StoriesPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.stories;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      {storyFeatures.map((story) => (
        <StoryFeature
          key={story.id}
          story={story}
          country={typedCountry}
          locale={typedLocale}
          ctaLabel={dictionary.actions.readFullStory}
        />
      ))}
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
    </>
  );
}
