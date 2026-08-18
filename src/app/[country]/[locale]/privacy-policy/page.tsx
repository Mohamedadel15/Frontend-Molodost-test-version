import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/inner/PageHero";
import { ProseSections } from "@/components/inner/ProseSections";
import { isCountry, type Country } from "@/config/markets";
import { privacyPolicy } from "@/content/legal";
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
    path: "/privacy-policy",
    title: pick(privacyPolicy.title, typedLocale),
    description: pick(privacyPolicy.intro, typedLocale),
  });
}

/** /privacy-policy — legal text (reference legal template). */
export default async function PrivacyPolicyPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedLocale = locale as Locale;

  return (
    <>
      <PageHero
        title={pick(privacyPolicy.title, typedLocale)}
        lede={pick(privacyPolicy.updated, typedLocale)}
      />
      <ProseSections
        intro={pick(privacyPolicy.intro, typedLocale)}
        blocks={privacyPolicy.sections.map((section) => ({
          heading: pick(section.heading, typedLocale),
          body: pick(section.body, typedLocale),
        }))}
      />
    </>
  );
}
