import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ScrollDome } from "@/components/decor/ScrollDome";
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
      {/*
        FAFAFA dome easing into the Big Quote section — the 443px box is centred
        on the seam, so it hangs half its height below this section. It renders
        BEFORE the content on purpose: its fill is deepest at the page edges
        (441 of 443 units, against 229 at the centre), so the top half sweeps
        back up over this section's last row and would paint out anything
        sitting there — the CTA gets sliced in half. The reference avoids this
        by parenting the dome to the dark section below and letting that
        section's overflow clip the upper half away; painting it behind the
        content reaches the same result, and the section's own z-10 still lifts
        the overhang above the Big Quote.
      */}
      {wave ? (
        <ScrollDome className="-bottom-[221.5px] inset-x-0 h-[443px] w-full" />
      ) : null}
      <Container className="flex flex-col gap-[38px] tablet:flex-row tablet:gap-0">
        <Reveal className="tablet:flex-[4] desktop:flex-[6]">
          <Heading as="h2" preset="sans-lg">
            {text.title}
          </Heading>
        </Reveal>
        <div aria-hidden className="hidden tablet:block tablet:flex-[1] desktop:flex-[2]" />
        <Reveal className="tablet:flex-[3] desktop:flex-[4]">
          <Text size="md" tone="accent">
            {linked ? (
             
              <Link
                href={localePath(country, locale, href)}
                className="link-accent [text-decoration-color:var(--color-accent)] [text-underline-offset:auto]"
              >
                {text.body}
              </Link>
            ) : (
              text.body
            )}
          </Text>
        </Reveal>
      </Container>
    </Section>
  );
}
