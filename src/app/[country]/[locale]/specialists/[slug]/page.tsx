import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/inner/PageHero";
import { ProseSections } from "@/components/inner/ProseSections";
import { Container } from "@/components/layout/Container/Container";
import { BlobOutline } from "@/components/decor/RefLines";
import { BigQuote } from "@/components/sections/BigQuote/BigQuote";
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

/** /specialists/[slug] — profile detail (reference specialist template). */
export default async function SpecialistDetailPage({ params }: PageParams) {
  const { country, locale, slug } = await params;
  if (!isCountry(country) || !isLocale(locale)) notFound();

  const specialist = specialists.find((entry) => entry.id === slug);
  const detail = specialistDetails[slug];
  if (!specialist || !detail) notFound();

  const typedCountry = country as Country;
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <PageHero
        eyebrow={pick(detail.years, typedLocale)}
        title={pick(specialist.name, typedLocale)}
        lede={pick(specialist.roles, typedLocale)}
      />
      <Container className="pb-(--space-section-sm)">
        <Reveal className="relative mx-auto w-full max-w-[560px]">
          <BlobOutline
            variant={specialist.mask}
            className="inset-0 h-full w-full translate-x-3 translate-y-5"
          />
          <div
            className="relative aspect-[434/340] overflow-hidden"
            style={{
              maskImage: `url(/images/mask-${specialist.mask}.svg)`,
              WebkitMaskImage: `url(/images/mask-${specialist.mask}.svg)`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <Image
              src={specialist.image.src}
              alt={pick(specialist.name, typedLocale)}
              fill
              sizes="(min-width: 810px) 560px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </Container>
      <ProseSections
        blocks={[
          {
            heading: pick(detail.focusTitle, typedLocale),
            body: pick(detail.focus, typedLocale),
          },
          {
            heading: pick(detail.approachTitle, typedLocale),
            body: pick(detail.approachIntro, typedLocale),
          },
          ...detail.sections.map((section) => ({
            heading: pick(section.heading, typedLocale),
            body: pick(section.body, typedLocale),
          })),
        ]}
      />
      <BigQuote
        text={pick(detail.quote, typedLocale)}
        attribution={pick(specialist.name, typedLocale)}
      />
      <ContactPath
        country={typedCountry}
        locale={typedLocale}
        dictionary={dictionary}
      />
    </>
  );
}
