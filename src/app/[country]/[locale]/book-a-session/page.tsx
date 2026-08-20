import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConsultationSection } from "@/components/sections/ConsultationSection/ConsultationSection";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { isCountry, type Country } from "@/config/markets";
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
    path: "/book-a-session",
    title: dictionary.home.consultation.title,
    description: dictionary.home.consultation.body,
  });
}

/*
 * /book-a-session — production order: the Book A Session block (its own
 * page-load entrance, 160px top pad under the floating header) → FAQ band.
 * No contact block in between on the reference.
 */
export default async function BookSessionPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <ConsultationSection country={typedCountry} dictionary={dictionary} entrance="appear" />
      <FAQSection country={typedCountry} locale={typedLocale} dictionary={dictionary} />
    </>
  );
}
