import Image from "next/image";

import { BlobOutline } from "@/components/decor/RefLines";
import type { Specialist } from "@/content/specialists";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/* Reference blob mask files (extracted from the production site). */
const maskStyle = (mask: Specialist["mask"]) => ({
  maskImage: `url(/images/mask-${mask}.svg)`,
  WebkitMaskImage: `url(/images/mask-${mask}.svg)`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
});

interface SpecialistCardProps {
  specialist: Specialist;
  locale: Locale;
}

export function SpecialistCard({ specialist, locale }: SpecialistCardProps) {
  return (
    <article className="flex flex-col items-center gap-6 text-center">
      <div className="relative w-full max-w-[434px]">
        {/* reference blob outline decoration (exact path) */}
        <BlobOutline
          variant={specialist.mask}
          className="inset-0 h-full w-full translate-x-3 translate-y-5"
        />
        <div
          className="relative aspect-[434/340] overflow-hidden"
          style={maskStyle(specialist.mask)}
        >
          <Image
            src={specialist.image.src}
            alt={pick(specialist.name, locale)}
            fill
            sizes="(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
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
