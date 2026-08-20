"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { clientFetch } from "@/lib/actions/clientFetch";
import type { Paginated } from "@/lib/api/types";

interface Options<R, T> {
  /** Endpoint without the page query, e.g. `/molodost/stories/?page_size=12`. */
  endpoint: string | null;
  initialItems: T[];
  /** Page number of the first page that is NOT yet loaded (null = nothing more). */
  initialNextPage: number | null;
  map: (row: R, index: number) => T;
}

/*
 * Scroll pagination over a DRF-style list endpoint: the first page comes
 * server-rendered (`initialItems`), following pages are appended through
 * `clientFetch` whenever the sentinel enters the viewport. `endpoint` null
 * disables fetching (static fallback mode). Rows already on the page are
 * de-duplicated by `id`.
 */
export function useInfiniteRows<R, T extends { id: string }>({
  endpoint,
  initialItems,
  initialNextPage,
  map,
}: Options<R, T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [nextPage, setNextPage] = useState<number | null>(endpoint ? initialNextPage : null);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const loadMore = useCallback(async () => {
    if (!endpoint || nextPage === null || busy.current) return;
    busy.current = true;
    setLoading(true);
    const joiner = endpoint.includes("?") ? "&" : "?";
    const { data } = await clientFetch<Paginated<R>>({
      endpoint: `${endpoint}${joiner}page=${nextPage}`,
    });
    const rows = data?.results ?? [];
    setItems((prev) => {
      const seen = new Set(prev.map((item) => item.id));
      const fresh = rows.map((row, i) => map(row, prev.length + i)).filter((item) => !seen.has(item.id));
      return fresh.length ? [...prev, ...fresh] : prev;
    });
    setNextPage(data?.next && rows.length ? nextPage + 1 : null);
    setLoading(false);
    busy.current = false;
  }, [endpoint, nextPage, map]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || nextPage === null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void loadMore();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, nextPage]);

  return { items, loading, hasMore: nextPage !== null, sentinelRef };
}
