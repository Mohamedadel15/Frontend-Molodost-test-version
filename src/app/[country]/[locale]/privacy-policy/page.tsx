import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalLayout } from "@/components/inner/LegalLayout";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { isCountry, type Country } from "@/config/markets";
import { privacyPolicy } from "@/content/legal";
import { pick } from "@/content/types";
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
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: "/privacy-policy",
    title: pick(privacyPolicy.title, typedLocale),
    description: pick(privacyPolicy.intro, typedLocale),
  });
}

/** /privacy-policy — production legal template, then the FAQ band. */
export default async function PrivacyPolicyPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <LegalLayout
        title={pick(privacyPolicy.title, typedLocale)}
        updated={pick(privacyPolicy.updated, typedLocale)}
        intro={pick(privacyPolicy.intro, typedLocale)}
        sections={privacyPolicy.sections.map((section) => ({
          heading: pick(section.heading, typedLocale),
          body: pick(section.body, typedLocale),
          items: section.items?.map((item) => pick(item, typedLocale)),
        }))}
      />
      <FAQSection country={typedCountry} locale={typedLocale} dictionary={dictionary} />
    </>
  );
}
