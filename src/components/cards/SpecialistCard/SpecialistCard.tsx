import Link from "next/link";

import { MaskedPortrait } from "@/components/cards/MaskedPortrait";
import { ButtonLink } from "@/components/ui/Button/Button";
import type { Specialist } from "@/content/specialists";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

interface SpecialistCardProps {
  specialist: Specialist;
  locale: Locale;
  /** Profile URL — when set, portrait and name link there (Figma 28:8401). */
  href?: string;
  /** Label for the navy Read-More pill under the bio (Figma 28:8427). */
  readMoreLabel?: string;
}

/*
 * Specialist card (Figma 28:8398): blob portrait on a 480px column, then the
 * centred text stack on a 340px measure — name, roles, bio — and the navy
 * Read-More pill. Portrait and name share one link; the pill is its own so it
 * keeps the Button hover choreography (colors invert, dot swaps sides).
 */
export function SpecialistCard({
  specialist,
  locale,
  href,
  readMoreLabel,
}: SpecialistCardProps) {
  const name = pick(specialist.name, locale);
  const media = (
    <MaskedPortrait
      src={specialist.image.src}
      alt={name}
      mask={specialist.mask}
      noise
      className={cn(
        href &&
          "transition-transform duration-(--motion-normal) ease-(--ease-inout) group-hover:scale-[1.02]",
      )}
    />
  );
  const heading = <h3 className="text-serif-md text-accent">{name}</h3>;

  return (
    <article className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-6 text-center">
      {href ? (
        <Link
          href={href}
          className="group flex w-full flex-col items-center gap-6"
        >
          {media}
          {heading}
        </Link>
      ) : (
        <>
          {media}
          {heading}
        </>
      )}
      <p className="max-w-[340px] text-body-sm text-muted">
        {pick(specialist.roles, locale)}
      </p>
      <p className="max-w-[340px] text-body-sm text-secondary">
        {pick(specialist.bio, locale)}
      </p>
      {href && readMoreLabel ? (
        <ButtonLink href={href} variant="navy" className="mt-2">
          {readMoreLabel}
        </ButtonLink>
      ) : null}
    </article>
  );
}
