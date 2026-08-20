"use client";

import { useCallback } from "react";

import { Reveal } from "@/components/animations/Reveal";
import { SpecialistCard } from "@/components/cards/SpecialistCard/SpecialistCard";
import { useInfiniteRows } from "@/components/feeds/useInfiniteRows";
import { Container } from "@/components/layout/Container/Container";
import type { Country } from "@/config/markets";
import type { Specialist } from "@/content/specialists";
import type { Locale } from "@/i18n/config";
import { toSpecialist } from "@/lib/api/mappers";
import type { ApiSpecialistListRow } from "@/lib/api/types";
import { localePath } from "@/lib/routes";

interface SpecialistsFeedProps {
  initialItems: Specialist[];
  nextPage: number | null;
  endpoint: string | null;
  country: Country;
  locale: Locale;
  readMoreLabel: string;
}

/** /specialists two-column grid with scroll pagination (Figma 28:8397 geometry). */
export function SpecialistsFeed({ initialItems, nextPage, endpoint, country, locale, readMoreLabel }: SpecialistsFeedProps) {
  const map = useCallback((row: ApiSpecialistListRow, index: number) => toSpecialist(row, undefined, index), []);
  const { items, sentinelRef, hasMore } = useInfiniteRows<ApiSpecialistListRow, Specialist>({
    endpoint,
    initialItems,
    initialNextPage: nextPage,
    map,
  });

  return (
    <>
      <Container className="relative grid gap-x-20 gap-y-20 tablet:grid-cols-2">
        {items.map((specialist, index) => (
          <Reveal key={specialist.id} delay={(index % 2) * 100}>
            <SpecialistCard
              specialist={specialist}
              locale={locale}
              href={localePath(country, locale, `/specialists/${specialist.id}`)}
              readMoreLabel={readMoreLabel}
            />
          </Reveal>
        ))}
      </Container>
      {hasMore ? <div ref={sentinelRef} aria-hidden className="h-px" /> : null}
    </>
  );
}
