import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/inner/PageHero";
import { PriceList } from "@/components/inner/PriceList";
import { ConsultationSection } from "@/components/sections/ConsultationSection/ConsultationSection";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { isCountry, type Country } from "@/config/markets";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
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
    path: "/prices",
    title: dictionary.inner.prices.title,
    description: dictionary.inner.prices.lede,
  });
}

/** /prices — category tabs + price list (reference prices template). */
export default async function PricesPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.prices;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <PriceList
        locale={typedLocale}
        bookHref={localePath(typedCountry, typedLocale, "/book-a-session")}
        copy={{
          comingSoon: copy.comingSoon,
          bookNow: dictionary.actions.bookNow,
        }}
      />
      <FAQSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <ConsultationSection country={typedCountry} dictionary={dictionary} />
    </>
  );
}
