"use client";

import { useCallback } from "react";

import { StoryCard } from "@/components/cards/StoryCard/StoryCard";
import { useInfiniteRows } from "@/components/feeds/useInfiniteRows";
import { Container } from "@/components/layout/Container/Container";
import type { Country } from "@/config/markets";
import type { StoryFeatureEntry } from "@/content/stories";
import type { Locale } from "@/i18n/config";
import { toStoryFeature } from "@/lib/api/mappers";
import type { ApiStoryListRow } from "@/lib/api/types";

type StoryItem = Omit<StoryFeatureEntry, "detail">;

interface StoriesFeedProps {
  initialItems: StoryItem[];
  /** Page number after the server-rendered one; null when there is no more. */
  nextPage: number | null;
  endpoint: string | null;
  country: Country;
  locale: Locale;
  ctaLabel: string;
}

/*
 * /stories index list with scroll pagination: the first page is rendered on
 * the server, later pages append as the reader nears the end. Layout is the
 * production stack — cards 200px apart on desktop (160 tablet / 64 phone).
 */
export function StoriesFeed({ initialItems, nextPage, endpoint, country, locale, ctaLabel }: StoriesFeedProps) {
  const map = useCallback((row: ApiStoryListRow) => toStoryFeature(row), []);
  const { items, sentinelRef, hasMore } = useInfiniteRows<ApiStoryListRow, StoryItem>({
    endpoint,
    initialItems,
    initialNextPage: nextPage,
    map,
  });

  return (
    <>
      <Container className="flex flex-col gap-16 tablet:gap-[160px] desktop:gap-[200px]">
        {items.map((story) => (
          <div key={story.id} id={`${story.id}-story`} className="scroll-mt-(--header-height)">
            <StoryCard story={story} country={country} locale={locale} ctaLabel={ctaLabel} />
          </div>
        ))}
      </Container>
      {hasMore ? <div ref={sentinelRef} aria-hidden className="h-px" /> : null}
    </>
  );
}
