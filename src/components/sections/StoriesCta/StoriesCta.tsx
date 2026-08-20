import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { ButtonLink } from "@/components/ui/Button/Button";
import { TrustPoint } from "@/components/ui/TrustPoint/TrustPoint";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { markets, type Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface StoriesCtaProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/*
 * "Ready to find your path?" band that closes the /stories index on
 * production, ahead of the shared contact block. Measured: #FAFAFA, 160px
 * vertical padding (120 tablet / 80 phone); a 6 : 1 : 5 row — headline on the
 * serif-xl preset with its second line in accent (the dictionary marks the
 * break with "\n"), body capped at 640px, navy pill — against the TrustPoint
 * column with its "Prefer to chat first?" aside. Phone stacks the columns
 * 64px apart.
 */
export function StoriesCta({ country, locale, dictionary }: StoriesCtaProps) {
  const copy = dictionary.inner.stories;
  const contact = dictionary.home.contact;
  const [titleLead, ...titleRest] = copy.contactTitle.split("\n");

  return (
    <section className="relative overflow-hidden bg-surface py-20 tablet:py-[120px] desktop:py-40">
      <Container className="flex flex-col gap-16 desktop:flex-row desktop:items-start desktop:gap-0">
        <div className="flex flex-col items-start gap-16 px-2 desktop:flex-[6]">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Heading as="h2" preset="serif-xl">
                {titleLead}
                {titleRest.length ? (
                  <>
                    <br />
                    <span className="text-accent">{titleRest.join(" ")}</span>
                  </>
                ) : null}
              </Heading>
            </Reveal>
            <Reveal>
              <Text size="md" tone="secondary" className="max-w-[640px]">
                {copy.contactBody}
              </Text>
            </Reveal>
          </div>
          <Reveal>
            <ButtonLink href={localePath(country, locale, "/book-a-session")} variant="navy">
              {copy.contactCta}
            </ButtonLink>
          </Reveal>
        </div>

        <div aria-hidden className="hidden desktop:block desktop:flex-1" />

        <div className="flex flex-col items-start gap-8 px-2 desktop:flex-[5]">
          <Reveal>
            <TrustPoint
              trustedBy={contact.trustedBy}
              rating={contact.rating}
              ratingBrand={contact.ratingBrand}
              instagramUrl={markets[country].contact.instagram}
            />
          </Reveal>
          <Reveal>
            <Text size="sm" tone="secondary" className="max-w-[420px]">
              {copy.contactAside}
            </Text>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
