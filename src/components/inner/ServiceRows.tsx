import Image from "next/image";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { serviceRows } from "@/content/services";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/types/dictionary";

interface ServiceRowsProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/** /services alternating text/image rows (reference services template). */
export function ServiceRows({ country, locale, dictionary }: ServiceRowsProps) {
  const bookHref = localePath(country, locale, "/book-a-session");

  return (
    <Section paddingBottom="md">
      <Container className="flex flex-col gap-24 desktop:gap-32">
        {serviceRows.map((row, index) => {
          const flipped = index % 2 === 1;
          return (
            <div
              key={row.id}
              className="grid items-center gap-12 desktop:grid-cols-2 desktop:gap-24"
            >
              <Reveal
                className={cn(
                  "relative aspect-[4/5] w-full overflow-hidden rounded-[16px]",
                  flipped && "desktop:order-2",
                )}
              >
                <Image
                  src={row.image.src}
                  alt={pick(row.title, locale)}
                  fill
                  sizes="(min-width: 1200px) 45vw, 90vw"
                  className="object-cover"
                />
              </Reveal>
              <Reveal
                delay={120}
                className={cn(
                  "flex flex-col items-start gap-8",
                  flipped && "desktop:order-1",
                )}
              >
                <Heading as="h2" preset="serif-xl" className="max-w-[560px]">
                  {pick(row.title, locale)}
                </Heading>
                <Text size="md" tone="secondary" className="max-w-[520px]">
                  {pick(row.body, locale)}
                </Text>
                <ButtonLink href={bookHref} variant="navy">
                  {dictionary.actions.bookNow}
                </ButtonLink>
              </Reveal>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
