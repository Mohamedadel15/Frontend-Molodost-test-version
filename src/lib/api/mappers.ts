import { BASE_URL } from "@/constants";
import type { Article } from "@/content/articles";
import type { FaqItem } from "@/content/faqs";
import type { Program } from "@/content/programs";
import type { PricingTier, ServiceRow } from "@/content/services";
import type { SpecialistDetail } from "@/content/specialist-details";
import type { Specialist } from "@/content/specialists";
import type { StoryDetail, StoryFeatureEntry } from "@/content/stories";
import type { Localized } from "@/content/types";
import type {
  ApiArticle,
  ApiArticleListRow,
  ApiFaq,
  ApiImage,
  ApiLabel,
  ApiProgram,
  ApiServiceListRow,
  ApiSpecialist,
  ApiSpecialistListRow,
  ApiStory,
  ApiStoryListRow,
} from "@/lib/api/types";

/*
 * API → content mappers. Every mapper takes the static entry for the same
 * slug as an optional fallback: any field the API leaves empty keeps the
 * static value, so the UI renders exactly as before wherever the CMS has no
 * data yet. Copy comes back from the API in one language only (the request
 * carries no Accept-Language), so it fills `en`; `ar` keeps the static
 * translation when one exists and otherwise shows the same text.
 */

const PLACEHOLDER = { src: "/images/texture-b.png", width: 1200, height: 1200 };

/** Absolute URL for a media path; the CMS serves `/media/...` relative paths. */
export function imageUrl(value: ApiImage | undefined): string | null {
  if (!value) return null;
  const raw = typeof value === "string" ? value : (value.url ?? value.image ?? value.file ?? value.src);
  if (!raw) return null;
  if (/^https?:\/\//.test(raw) || raw.startsWith("data:")) return raw;
  return `${BASE_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
}

function image(value: ApiImage | undefined, fallback?: { src: string; width: number; height: number }) {
  const src = imageUrl(value);
  if (!src) return fallback ?? PLACEHOLDER;
  return { src, width: fallback?.width ?? 1600, height: fallback?.height ?? 1600 };
}

function nth(list: ApiImage[] | undefined, index: number): ApiImage | undefined {
  return Array.isArray(list) ? list[index] : undefined;
}

export function label(value: ApiLabel | undefined): string {
  if (!value) return "";
  return typeof value === "string" ? value : (value.name ?? value.title ?? value.label ?? "");
}

export function labels(list: ApiLabel[] | string | undefined): string[] {
  if (!list) return [];
  if (typeof list === "string") return list.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
  return list.map(label).filter(Boolean);
}

function text(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Localised field: API text for `en`, static Arabic when known, else the same text. */
function loc(value: string | null | undefined, fallback?: Localized): Localized {
  const v = text(value);
  if (!v) return fallback ?? { en: "", ar: "" };
  return { en: v, ar: fallback?.ar ?? v };
}

function locList(values: string[], fallback?: Localized[]): Localized[] {
  if (!values.length) return fallback ?? [];
  return values.map((v, i) => ({ en: v, ar: fallback?.[i]?.ar ?? v }));
}

/** Rich text → plain text (the CMS wraps short answers in <p>). */
export function stripHtml(value: string | null | undefined): string {
  return text(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Feature lines: a list of strings or `{ text | name }` objects, or free text split on newlines / bullets. */
function lines(value: ApiProgram["details"]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => (typeof v === "string" ? text(v) : text(v?.text ?? v?.name))).filter(Boolean);
  return value
    .split(/\r?\n|•|<br\s*\/?>|<\/li>|<\/p>/i)
    .map((s) => s.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
}

function num(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function formatDate(iso: string | undefined, locale: "en" | "ar"): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// ---------------------------------------------------------------- stories

export function toStoryFeature(
  row: ApiStoryListRow,
  fallback?: Omit<StoryFeatureEntry, "detail">,
): Omit<StoryFeatureEntry, "detail"> {
  const tags = labels(row.categories).join(", ");
  return {
    id: row.slug,
    tags: loc(tags, fallback?.tags),
    title: loc(row.title, fallback?.title),
    excerpt: loc(row.short_description, fallback?.excerpt),
    images: {
      // card collage: short frame first, tall frame second (falls back to the hero shot)
      front: image(nth(row.card_images, 0), fallback?.images.front),
      back: image(nth(row.card_images, 1) ?? nth(row.header_images, 0), fallback?.images.back),
    },
    href: `/stories/${row.slug}`,
  };
}

/**
 * Detail copy. Section titles ("The Challenge", "The Journey", …) are not in
 * the API — they come from the static entry when present, else from the
 * English defaults used across the site.
 */
export function toStoryDetail(row: ApiStory, fallback?: StoryDetail): StoryDetail {
  const t = (en: string, ar: string, f?: Localized): Localized => f ?? { en, ar };
  return {
    lede: loc(row.short_description, fallback?.lede),
    challengeTitle: t("The Challenge", "التحدي", fallback?.challengeTitle),
    challenge: loc(row.challenge, fallback?.challenge),
    personName: loc(row.patient_name, fallback?.personName),
    journeyTitle: t("The Journey", "الرحلة", fallback?.journeyTitle),
    journeyIntro: loc(row.paragraph_1, fallback?.journeyIntro),
    startingPointTitle: t("Starting Point", "نقطة البداية", fallback?.startingPointTitle),
    startingPoint: loc(row.paragraph_2, fallback?.startingPoint),
    approachTitle: t("Our Approach", "نهجنا", fallback?.approachTitle),
    approach: loc(row.paragraph_3, fallback?.approach),
    quote: loc(row.paragraph_4, fallback?.quote),
    outcome: loc(row.paragraph_5, fallback?.outcome),
    finalTitle: t("Final Reflections", "تأملات ختامية", fallback?.finalTitle),
    final: loc(row.paragraph_6, fallback?.final),
  };
}

export function toStory(row: ApiStory, fallback?: StoryFeatureEntry): StoryFeatureEntry {
  return {
    ...toStoryFeature(row, fallback),
    // the detail hero uses the header shot; the feature collage keeps the card shots
    images: {
      front: image(nth(row.card_images, 0), fallback?.images.front),
      back: image(nth(row.header_images, 0) ?? nth(row.card_images, 1), fallback?.images.back),
    },
    detail: toStoryDetail(row, fallback?.detail),
  };
}

// ------------------------------------------------------------- specialists

export function toSpecialist(row: ApiSpecialistListRow, fallback?: Specialist, index = 0): Specialist {
  const card = "card_images" in row ? nth((row as ApiSpecialist).card_images, 0) : undefined;
  return {
    id: row.slug,
    name: loc(row.full_name, fallback?.name),
    roles: loc(row.medical_role, fallback?.roles),
    bio: loc(row.short_description, fallback?.bio),
    image: image(card ?? nth(row.header_images, 0), fallback?.image),
    mask: fallback?.mask ?? (((index % 3) + 1) as 1 | 2 | 3),
  };
}

export function toSpecialistDetail(row: ApiSpecialist, fallback?: SpecialistDetail): SpecialistDetail {
  const paragraphs = [row.paragraph_2, row.paragraph_3].map(text).filter(Boolean);
  const sections = paragraphs.length
    ? paragraphs.map((body, i) => ({
        heading: fallback?.sections[i]?.heading ?? { en: "", ar: "" },
        body: { en: body, ar: fallback?.sections[i]?.body.ar ?? body },
      }))
    : (fallback?.sections ?? []);
  return {
    years: fallback?.years ?? { en: "", ar: "" },
    focusTitle: fallback?.focusTitle ?? { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: loc(row.clinical_focus, fallback?.focus),
    approachTitle: fallback?.approachTitle ?? { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: loc(row.paragraph_1, fallback?.approachIntro),
    sections,
    quote: loc(row.paragraph_4, fallback?.quote),
    outcome: loc(row.paragraph_5, fallback?.outcome),
    framework: fallback?.framework ?? { en: "", ar: "" },
    specialisations: locList(labels(row.specializations), fallback?.specialisations),
    languages: loc(labels(row.languages).join(", "), fallback?.languages),
    heroPosition: fallback?.heroPosition ?? "center 20%",
    portrait: image(nth(row.card_images, 0), fallback?.portrait),
  };
}

/** Hero shot for the profile page (the list row's `image` is the card shot). */
export function specialistHeroImage(row: ApiSpecialistListRow, fallback?: { src: string; width: number; height: number }) {
  return image(nth(row.header_images, 0), fallback);
}

// ---------------------------------------------------------------- articles

export function toArticle(row: ApiArticleListRow, fallback?: Article): Article {
  return {
    id: row.slug,
    title: loc(row.title, fallback?.title),
    excerpt: loc(row.short_description, fallback?.excerpt),
    image: image(row.image, fallback?.image),
    href: `/journal/${row.slug}`,
    date: row.published_time
      ? { en: formatDate(row.published_time, "en"), ar: formatDate(row.published_time, "ar") }
      : (fallback?.date ?? { en: "", ar: "" }),
    sections: fallback?.sections ?? [],
    closing: fallback?.closing ?? { en: "", ar: "" },
  };
}

/** Rich-text body of an article (HTML from the CMS), when the API has one. */
export function articleHtml(row: ApiArticle): string | null {
  const html = text(row.content);
  return html || null;
}

// ---------------------------------------------------------------- services

export function toServiceRow(row: ApiServiceListRow, fallback?: ServiceRow): ServiceRow {
  return {
    id: row.slug,
    title: loc(row.title, fallback?.title),
    body: loc(row.short_description, fallback?.body),
    image: image(row.image, fallback?.image),
  };
}

// ---------------------------------------------------------------- programs

export function toProgram(row: ApiProgram, fallback?: Program): Program {
  return {
    id: row.slug,
    title: loc(row.title, fallback?.title),
    description: loc(row.short_description, fallback?.description),
    image: fallback?.image ?? PLACEHOLDER,
    href: fallback?.href ?? "/services",
  };
}

export function toPricingTier(row: ApiProgram, fallback?: PricingTier): PricingTier {
  const price = num(row.price) ?? fallback?.priceOne ?? 0;
  const sale = num(row.sale_price);
  return {
    id: row.slug,
    title: loc(row.title, fallback?.title),
    tagline: loc(row.short_description, fallback?.tagline),
    features: locList(lines(row.details), fallback?.features),
    priceOne: price,
    priceBundle: sale ?? fallback?.priceBundle ?? price,
  };
}

// -------------------------------------------------------------------- faqs

export function toFaq(row: ApiFaq, fallback?: FaqItem): FaqItem {
  return {
    id: row.slug,
    question: loc(stripHtml(row.question), fallback?.question),
    answer: loc(stripHtml(row.answer), fallback?.answer),
  };
}

/** Merge API rows with the static list: API order, static fallback by slug, API-only rows appended as-is. */
export function mergeBySlug<R extends { slug: string }, T extends { id: string }>(
  rows: R[],
  statics: T[],
  map: (row: R, fallback: T | undefined, index: number) => T,
): T[] {
  return rows.map((row, index) => map(row, statics.find((entry) => entry.id === row.slug), index));
}
