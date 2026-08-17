import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

interface PageParams {
  params: Promise<{ country: string; locale: string }>;
}

/*
 * Foundation-phase home page: intentionally empty except for the document
 * outline — homepage sections are built in Phase 9 against the design audit.
 * No placeholder sections (Phase 2 brief).
 */
export default async function HomePage({ params }: PageParams) {
  const { locale } = await params;
  const dictionary = await getDictionary(
    (isLocale(locale) ? locale : "en") as Locale,
  );

  return <h1 className="sr-only">{dictionary.home.heading}</h1>;
}
