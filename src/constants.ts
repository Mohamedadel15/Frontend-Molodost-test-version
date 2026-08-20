/** API origin (no trailing slash); endpoints are appended as `/molodost/...`. */
export const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

/** Rows per page for the scroll-paginated indexes (stories, journal, specialists). */
export const DEFAULT_PAGE_SIZE = 12;

/** ISR window for read-only content fetched on the server. */
export const DEFAULT_REVALIDATE_SECONDS = 300;
