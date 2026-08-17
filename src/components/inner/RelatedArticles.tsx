import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { articles } from "@/content/articles";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface RelatedArticlesProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
  excludeId: string;
}

/** "More insights" grid under an article (reference article template). */
export function RelatedArticles({
  country,
  locale,
  dictionary,
  excludeId,
}: RelatedArticlesProps) {
  const copy = dictionary.inner.journal;
  const related = articles.filter((article) => article.id !== excludeId);

  return (
    <Section paddingBottom="md">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <Heading as="h2" preset="sans-lg" className="max-w-[900px]">
            {copy.moreTitle}
          </Heading>
        </Reveal>
        <Reveal delay={80}>
          <Text size="md" tone="secondary" className="max-w-[620px]">
            {copy.moreBody}
          </Text>
        </Reveal>
      </Container>
      <Container className="mx-auto mt-16 grid max-w-[1200px] items-start gap-x-24 gap-y-16 tablet:grid-cols-2">
        {related.map((article, index) => (
          <Reveal key={article.id} delay={index * 100}>
            <ArticleCard
              article={article}
              href={localePath(country, locale, article.href)}
              locale={locale}
              readMoreLabel={dictionary.actions.readMore}
              mask={((index % 3) + 1) as 1 | 2 | 3}
            />
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
