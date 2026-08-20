import { Reveal } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { LotusIcon } from "@/components/decor/BrandIcons";
import { Container } from "@/components/layout/Container/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
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

/*
 * "More longevity insights for you." under an article (production): section
 * icon + "our journal" label, the 48px sans headline and lede centred, then
 * two cards on the journal's two-column grid. 20px above, 160px below.
 */
export function RelatedArticles({ country, locale, dictionary, excludeId }: RelatedArticlesProps) {
  const copy = dictionary.inner.journal;
  const related = articles.filter((article) => article.id !== excludeId).slice(0, 2);

  return (
    <section className="overflow-hidden pt-5 pb-20 tablet:pb-[120px] desktop:pb-40">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <LotusIcon />
          <Eyebrow tone="accent">{dictionary.home.journal.eyebrow}</Eyebrow>
        </Reveal>
        <div className="flex flex-col items-center gap-6">
          <Reveal>
            <Heading as="h2" preset="sans-lg" className="max-w-[900px]">
              {copy.moreTitle}
            </Heading>
          </Reveal>
          <Reveal>
            <Text size="md" tone="secondary" className="max-w-[620px]">
              {copy.moreBody}
            </Text>
          </Reveal>
        </div>
      </Container>
      <Container className="mt-16 grid items-start gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:gap-20">
        {related.map((article) => (
          <Reveal key={article.id}>
            <ArticleCard
              article={article}
              href={localePath(country, locale, article.href)}
              locale={locale}
              readMoreLabel={dictionary.actions.readMore}
              mask={1}
            />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
