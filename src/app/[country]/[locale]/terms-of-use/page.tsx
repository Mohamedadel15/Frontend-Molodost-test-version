import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/inner/PageHero";
import { ProseSections } from "@/components/inner/ProseSections";
import { isCountry, type Country } from "@/config/markets";
import { termsOfUse } from "@/content/legal";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: "/terms-of-use",
    title: pick(termsOfUse.title, typedLocale),
    description: pick(termsOfUse.intro, typedLocale),
  });
}

/** /terms-of-use — legal text (reference legal template). */
export default async function TermsOfUsePage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedLocale = locale as Locale;

  return (
    <>
      <PageHero
        title={pick(termsOfUse.title, typedLocale)}
        lede={pick(termsOfUse.updated, typedLocale)}
      />
      <ProseSections
        intro={pick(termsOfUse.intro, typedLocale)}
        blocks={termsOfUse.sections.map((section) => ({
          heading: pick(section.heading, typedLocale),
          body: pick(section.body, typedLocale),
        }))}
      />
    </>
  );
}
