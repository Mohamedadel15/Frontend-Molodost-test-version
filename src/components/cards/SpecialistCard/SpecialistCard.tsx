import { MaskedPortrait } from "@/components/cards/MaskedPortrait";
import type { Specialist } from "@/content/specialists";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";

interface SpecialistCardProps {
  specialist: Specialist;
  locale: Locale;
}

export function SpecialistCard({ specialist, locale }: SpecialistCardProps) {
  return (
    <article className="flex flex-col items-center gap-6 text-center">
      <MaskedPortrait
        src={specialist.image.src}
        alt={pick(specialist.name, locale)}
        mask={specialist.mask}
      />
      <h3 className="text-serif-md text-accent">
        {pick(specialist.name, locale)}
      </h3>
      <p className="max-w-[360px] text-body-sm text-muted">
        {pick(specialist.roles, locale)}
      </p>
      <p className="max-w-[400px] text-body-sm text-secondary">
        {pick(specialist.bio, locale)}
      </p>
    </article>
  );
}
