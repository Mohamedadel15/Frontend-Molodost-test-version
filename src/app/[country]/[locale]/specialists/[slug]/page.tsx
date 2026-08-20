import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecialistApproach } from "@/components/inner/SpecialistApproach";
import { SpecialistHero } from "@/components/inner/SpecialistHero";
import { SpecialistPortrait } from "@/components/inner/SpecialistPortrait";
import { SpecialistProfile } from "@/components/inner/SpecialistProfile";
import { ContactPath } from "@/components/sections/ContactPath/ContactPath";
import { isCountry, type Country } from "@/config/markets";
import { specialistDetails } from "@/content/specialist-details";
import { specialists } from "@/content/specialists";
import { pick } from "@/content/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ country: string; locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return specialists.map((specialist) => ({ slug: specialist.id }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) return {};
  const specialist = specialists.find((entry) => entry.id === slug);
  if (!specialist) return {};
  const typedLocale = locale as Locale;
  return pageMetadata({
    country: country as Country,
    locale: typedLocale,
    path: `/specialists/${slug}`,
    title: pick(specialist.name, typedLocale),
    description: pick(specialist.bio, typedLocale),
  });
}

/*
 * /specialists/[slug] — profile detail, section for section the production
 * page (molodostlongevity.com/specialists/<id>): full-bleed fixed hero →
 * Clinical Focus band (word scrub) → Medical Approach editorial → uniform
 * portrait + pull quote → outcome/specialisations/languages → contact CTA.
 */
export default async function SpecialistDetailPage({ params }: PageParams) {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const specialist = specialists.find((entry) => entry.id === slug);
  const detail = specialistDetails[slug];
  if (!specialist || !detail) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const copy = dictionary.inner.specialists;
  const name = pick(specialist.name, typedLocale);

  return (
    <>
      <SpecialistHero
        name={name}
        roles={pick(specialist.roles, typedLocale)}
        years={pick(detail.years, typedLocale)}
        bio={pick(specialist.bio, typedLocale)}
        image={specialist.image}
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
          blocks={detail.sections.map((section) => ({
            heading: pick(section.heading, typedLocale),
            body: pick(section.body, typedLocale),
          }))}
        />
        <SpecialistPortrait
          image={detail.portrait}
          alt={name}
          quote={pick(detail.quote, typedLocale)}
          attribution={name}
        />
        <SpecialistProfile
          outcome={pick(detail.outcome, typedLocale)}
          framework={pick(detail.framework, typedLocale)}
          specialisationsTitle={copy.specialisationsTitle}
          specialisations={detail.specialisations.map((item) =>
            pick(item, typedLocale),
          )}
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
