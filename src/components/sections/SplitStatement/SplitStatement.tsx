import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ContactWave } from "@/components/decor/RefLines";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface SplitStatementCopy {
  title: string;
  body: string;
}

interface SplitStatementProps {
  dictionary: Dictionary;
  /** Per-page override — /about runs different copy from the home page. */
  copy?: SplitStatementCopy;
  /** When set, the body becomes a link to this in-site path (as on /about). */
  href?: string;
  country?: Country;
  locale?: Locale;
  /** The dome divider only belongs where a Big Quote follows (home). */
  wave?: boolean;
}

/*
 * Two-column text section (design-inventory §12.9): sans headline at
 * inline-start, navy body copy at inline-end.
 */
export function SplitStatement({
  dictionary,
  copy,
  href,
  country,
  locale,
  wave = true,
}: SplitStatementProps) {
  const text = copy ?? dictionary.home.split;
  const linked = href && country && locale;

  return (
    <Section paddingTop="md" paddingBottom="md" className="relative z-10">
      {/* Measured column split: 6 : 2 gutter : 4 at desktop, 4 : 1 : 3 at
          tablet, stacked with a 38px gap at phone. */}
      <Container className="flex flex-col gap-[38px] tablet:flex-row tablet:gap-0">
        <Reveal className="tablet:flex-[4] desktop:flex-[6]">
          <Heading as="h2" preset="sans-lg">
            {text.title}
          </Heading>
        </Reveal>
        <div aria-hidden className="hidden tablet:block tablet:flex-[1] desktop:flex-[2]" />
        <Reveal className="tablet:flex-[3] desktop:flex-[4]">
          <Text size="lg" tone="accent">
            {linked ? (
              <Link
                href={localePath(country, locale, href)}
                className="link-accent"
              >
                {text.body}
              </Link>
            ) : (
              text.body
            )}
          </Text>
        </Reveal>
      </Container>
      {/* FAFAFA dome easing into the Big Quote section (measured seam overlap ~220px) */}
      {wave ? <ContactWave className="-bottom-[220px] inset-x-0 h-[443px] w-full" /> : null}
    </Section>
  );
}
