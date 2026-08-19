import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { MaskedPortrait } from "@/components/cards/MaskedPortrait";
import { MotionIcon } from "@/components/decor/BrandIcons";
import { Container } from "@/components/layout/Container/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import type { Country } from "@/config/markets";
import { specialistRoles } from "@/content/specialist-roles";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface SpecialistRolesProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/*
 * Specialists on /about (reference "Journal" + "Team" blocks): centred header
 * over a three-across row of blob-masked cards presenting the clinical
 * disciplines rather than named physicians, and with no "meet the team" CTA.
 *
 * Measured spacing: header/grid gap 32; header icon and headline stacks 24
 * apart with 30 between them; the grid keeps three columns down to tablet and
 * only stacks at phone, gaps 120 / 80 / 40.
 */
export function SpecialistRoles({
  country,
  locale,
  dictionary,
}: SpecialistRolesProps) {
  const copy = dictionary.inner.specialists;

  return (
    /*
     * No block padding at desktop: #meet-anna above supplies the top, and the
     * reference leaves a single 160 gap below — measured 160px from this
     * section's content to the split statement's heading, against 320 between
     * the split statement and the contact block. That one unit is the split
     * statement's own top padding, so adding a bottom padding here doubles it.
     */
    <section className="flex flex-col items-center gap-8 overflow-hidden py-(--space-section-md) desktop:py-0">
      <Container className="flex flex-col items-center gap-[30px] text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <MotionIcon />
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal className="flex flex-col items-center gap-6">
          <Heading as="h2" preset="sans-lg" className="max-w-[900px]">
            {copy.title}
          </Heading>
          <Text size="md" tone="secondary" className="max-w-[640px]">
            {copy.lede}
          </Text>
        </Reveal>
      </Container>

      <Container className="grid grid-cols-1 gap-10 tablet:grid-cols-3 tablet:gap-20 desktop:gap-[120px]">
        {specialistRoles.map((role, index) => (
          /* the reference drops the middle card 80px at desktop */
          <Reveal key={role.id} className={index === 1 ? "desktop:mt-20" : undefined}>
            {/* Figma's "Person" auto-layout (2:9034 / 2:9060 / 2:9086) has gap 0
                between the square image frame and the Text block — the only
                whitespace under the blob is the mask's own bottom inset. */}
            <article className="flex flex-col items-center gap-0 text-center">
              <MaskedPortrait
                src={role.image.src}
                alt=""
                mask={role.mask}
                objectPosition={role.focus}
                noise
                sizes="(min-width: 1200px) 30vw, (min-width: 810px) 30vw, 90vw"
              />
              {/* reference caps the card's copy at 340 inside a 384 column */}
              <div className="flex max-w-[340px] flex-col items-center gap-4">
                <h3 className="text-serif-md text-accent">
                  {pick(role.title, locale)}
                </h3>
                <p className="text-body-sm text-secondary">
                  {pick(role.description, locale)}
                </p>
              </div>
              <Link
                href={localePath(country, locale, "/specialists")}
                /* the card stack carries no gap, so the phone-only CTA brings
                   its own 24px */
                className="link-accent mt-6 text-label desktop:hidden"
              >
                {dictionary.actions.readMore}
              </Link>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
