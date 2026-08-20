"use client";

import { useCallback } from "react";

import { Reveal } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard/ArticleCard";
import { useInfiniteRows } from "@/components/feeds/useInfiniteRows";
import { Container } from "@/components/layout/Container/Container";
import type { Country } from "@/config/markets";
import type { Article } from "@/content/articles";
import type { Locale } from "@/i18n/config";
import { toArticle } from "@/lib/api/mappers";
import type { ApiArticleListRow } from "@/lib/api/types";
import { localePath } from "@/lib/routes";

interface ArticlesFeedProps {
  initialItems: Article[];
  nextPage: number | null;
  endpoint: string | null;
  country: Country;
  locale: Locale;
  readMoreLabel: string;
}

/** /journal card grid with scroll pagination (production's two-column grid). */
export function ArticlesFeed({ initialItems, nextPage, endpoint, country, locale, readMoreLabel }: ArticlesFeedProps) {
  const map = useCallback((row: ApiArticleListRow) => toArticle(row), []);
  const { items, sentinelRef, hasMore } = useInfiniteRows<ApiArticleListRow, Article>({
    endpoint,
    initialItems,
    initialNextPage: nextPage,
    map,
  });

  return (
    <>
      <Container className="grid items-start gap-12 tablet:grid-cols-2 tablet:gap-16 desktop:gap-20">
        {items.map((article) => (
          <Reveal key={article.id}>
            <ArticleCard
              article={article}
              href={localePath(country, locale, article.href)}
              locale={locale}
              readMoreLabel={readMoreLabel}
              mask={1}
            />
          </Reveal>
        ))}
      </Container>
      {hasMore ? <div ref={sentinelRef} aria-hidden className="h-px" /> : null}
    </>
  );
}
