import type { Locale } from "@/i18n/config";

/**
 * 404 copy lives outside the server dictionaries because not-found.tsx is a
 * client component (App Router not-found boundaries receive no params; the
 * locale is read via useParams). Keep this file tiny and client-safe.
 */
export interface NotFoundCopy {
  eyebrow: string;
  title: string;
  body: string;
  backHome: string;
}

export const notFoundCopy: Record<Locale, NotFoundCopy> = {
  en: {
    eyebrow: "Error 404",
    title: "This page could not be found.",
    body: "The page you are looking for does not exist or may have been moved.",
    backHome: "Back to home",
  },
  ar: {
    eyebrow: "خطأ 404",
    title: "تعذّر العثور على هذه الصفحة.",
    body: "الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.",
    backHome: "العودة إلى الرئيسية",
  },
};
