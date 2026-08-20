import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/inner/ArticleLayout";
import { RelatedArticles } from "@/components/inner/RelatedArticles";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { isCountry, type Country } from "@/config/markets";
import { articles } from "@/content/articles";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return articles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const article = articles.find((entry) => entry.id === slug);
  if (!article) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/journal/${slug}`,
    title: pick(article.title, typedLocale),
    description: pick(article.excerpt, typedLocale),
  });
}

/*
 * /journal/[slug] — section for section the production article page:
 * sticky masked image beside the intro + rich text → "More longevity
 * insights" with two cards → FAQ on the #FAFAFA band.
 */
export default async function ArticlePage({ params }: PageParams) {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const article = articles.find((entry) => entry.id === slug);
  if (!article) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <ArticleLayout
        title={pick(article.title, typedLocale)}
        lede={pick(article.excerpt, typedLocale)}
        date={pick(article.date, typedLocale)}
        image={article.image}
        sections={article.sections.map((section) => ({
          heading: pick(section.heading, typedLocale),
          body: pick(section.body, typedLocale),
        }))}
        quote={pick(article.closing, typedLocale)}
        attribution={dictionary.home.quote.attribution}
      />
      <RelatedArticles
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
        excludeId={article.id}
      />
      <FAQSection country={typedCountry} locale={typedLocale} dictionary={dictionary} />
    </>
  );
}
