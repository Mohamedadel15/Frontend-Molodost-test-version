import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppearIn } from "@/components/animations/AppearIn";
import { WaveLines } from "@/components/decor/RefLines";
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

/*
 * /prices — section order from production (molodostlongevity.com/prices):
 * the looping wave lines in the first viewport (2s fade, desktop only) →
 * pricing section (icon, "Our Prices", headline, category select, card
 * grid) → FAQ on the #FAFAFA band → consultation block with the form.
 */
export default async function PricesPage({ params }: PageParams) {
  const { country, locale } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.prices;

  return (
    <>
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-svh overflow-hidden desktop:block">
          <AppearIn slow from="fade" className="h-full">
            <WaveLines className="absolute left-[-400px] top-[calc(50%-340px)] h-[680px] w-[6000px]" />
          </AppearIn>
        </div>
        <div className="relative pt-(--header-height)">
          <PriceList
            locale={typedLocale}
            bookHref={localePath(typedCountry, typedLocale, "/book-a-session")}
            copy={{
              eyebrow: copy.eyebrow,
              title: copy.title,
              lede: copy.lede,
              categoryLabel: copy.categoryLabel,
              comingSoon: copy.comingSoon,
              bookNow: dictionary.actions.bookNow,
            }}
          />
        </div>
      </div>
      <FAQSection
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
      <ConsultationSection country={typedCountry} dictionary={dictionary} />
    </>
  );
}
