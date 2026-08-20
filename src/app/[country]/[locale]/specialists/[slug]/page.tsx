import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecialistApproach } from "@/components/inner/SpecialistApproach";
import { SpecialistHero } from "@/components/inner/SpecialistHero";
import { SpecialistPortrait } from "@/components/inner/SpecialistPortrait";
import { SpecialistProfile } from "@/components/inner/SpecialistProfile";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { isCountry, type Country } from "@/config/markets";
import { specialistDetails, type SpecialistDetail } from "@/content/specialist-details";
import { specialists, type Specialist } from "@/content/specialists";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { serverSideFetch } from "@/lib/actions/server-actions";
import { specialistHeroImage, toSpecialist, toSpecialistDetail } from "@/lib/api/mappers";
import type { ApiSpecialist } from "@/lib/api/types";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
  searchParams: Promise<{ preview_token?: string }>;
}

interface SpecialistPageData {
  specialist: Specialist;
  detail: SpecialistDetail;
  heroImage: { src: string };
}

// Slugs come from the CMS, so this segment renders on demand: a static
// generateStaticParams list under the root layout's dynamicParams=false would
// turn into an allowlist and 404 every CMS-only slug.
export const dynamicParams = true;

/*
 * One profile from the CMS (`preview_token` for dashboard previews), merged
 * with the static entry of the same slug — static section headings, years
 * and the framework paragraph stay when the API has no field for them; the
 * static profile alone when the API has nothing.
 */
async function fetchSpecialistData(slug: string, previewToken?: string): Promise<SpecialistPageData | null> {
  const fallback = specialists.find((entry) => entry.id === slug);
  const fallbackDetail = specialistDetails[slug];
  const tokenParam = previewToken ? `?preview_token=${encodeURIComponent(previewToken)}` : "";
  const { data, error } = await serverSideFetch<ApiSpecialist>({
    end_Point: `/molodost/specialists/${encodeURIComponent(slug)}/${tokenParam}`,
    method: "GET",
    ...(previewToken ? { revalidate: 0 } : {}),
  });
  if (error || !data || !data.slug) {
    return fallback && fallbackDetail ? { specialist: fallback, detail: fallbackDetail, heroImage: fallback.image } : null;
  }
  return {
    specialist: toSpecialist(data, fallback),
    detail: toSpecialistDetail(data, fallbackDetail),
    heroImage: specialistHeroImage(data, fallback?.image),
  };
}

export async function generateMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  const { preview_token } = await searchParams;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const page = await fetchSpecialistData(slug, preview_token);
  if (!page) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/specialists/${slug}`,
    title: pick(page.specialist.name, typedLocale),
    description: pick(page.specialist.bio, typedLocale),
  });
}

/*
 * /specialists/[slug] — profile detail, section for section the production
 * page (molodostlongevity.com/specialists/<id>): full-bleed fixed hero →
 * Clinical Focus band (word scrub) → Medical Approach editorial → uniform
 * portrait + pull quote → outcome/specialisations/languages → contact CTA.
 */
export default async function SpecialistDetailPage({ params, searchParams }: PageParams) {
  const { country, locale, slug } = await params;
  const { preview_token } = await searchParams;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const page = await fetchSpecialistData(slug, preview_token);
  if (!page) notFound();
  const { specialist, detail, heroImage } = page;

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.specialists;
  const name = pick(specialist.name, typedLocale);
  const blocks = detail.sections
    .map((section) => ({ heading: pick(section.heading, typedLocale), body: pick(section.body, typedLocale) }))
    .filter((block) => block.body);

  return (
    <>
      <SpecialistHero
        name={name}
        roles={pick(specialist.roles, typedLocale)}
        years={pick(detail.years, typedLocale)}
        bio={pick(specialist.bio, typedLocale)}
        image={heroImage}
        imagePosition={detail.heroPosition}
        focusLabel={pick(detail.focusTitle, typedLocale)}
        focusStatement={pick(detail.focus, typedLocale)}
      />
      {/* positioned so it stacks above the scene's fixed backdrop, but NOT
          opaque: the backdrop has already dissolved to white when this block
          arrives (SceneBackdrop), so an opaque block would only add an edge */}
      <div className="relative">
        <SpecialistApproach
          eyebrow={name}
          title={pick(detail.approachTitle, typedLocale)}
          intro={pick(detail.approachIntro, typedLocale)}
          blocks={blocks}
        />
        {pick(detail.quote, typedLocale) ? (
          <SpecialistPortrait
            image={detail.portrait}
            alt={name}
            quote={pick(detail.quote, typedLocale)}
            attribution={name}
          />
        ) : null}
        <SpecialistProfile
          outcome={pick(detail.outcome, typedLocale)}
          framework={pick(detail.framework, typedLocale)}
          specialisationsTitle={copy.specialisationsTitle}
          specialisations={detail.specialisations.map((item) => pick(item, typedLocale))}
          languagesTitle={copy.languagesTitle}
          languages={pick(detail.languages, typedLocale)}
        />
        <ContactPath
          country={typedCountry}
          locale={typedLocale}
          dictionary={dictionary}
          variant="inner"
          copy={{
            title: copy.detailContactTitle,
            body: copy.detailContactBody,
          }}
        />
      </div>
    </>
  );
}
