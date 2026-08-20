import Link from "next/link";

import { ParallaxImage } from "@/components/animations/ParallaxImage";
import type { Program } from "@/content/programs";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

interface ProgramCardProps {
  program: Program;
  href: string;
  locale: Locale;
  readMoreLabel: string;
  className?: string;
}

/*
 * Home "Our Services" card (production "Card" component, measured): the whole
 * card is the link, sharp corners, a square photo the height of the 560px row
 * centred behind it with a 200px vertical parallax and the 100px grain tile at
 * 15%; the serif title inset 24px at the top; the 14px copy in a 240px block
 * centred on the card with the text sitting at its bottom; and at bottom-left
 * a 4px dot with the uppercase "read more" label 16px beside it, hidden at
 * rest. Hover: the label fades in and the card grows ~80px taller (it sits
 * vertically centred in its row, so it expands both ways) over 600ms.
 *
 * Height is owned by the grid (`className`): all four cards rest at the same
 * height inside the 560px row and only the hovered one grows.
 */
export function ProgramCard({ program, href, locale, readMoreLabel, className }: ProgramCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block w-full overflow-hidden bg-black",
        "transition-[height,translate] duration-(--motion-normal) ease-(--ease-inout)",
        className,
      )}
    >
      {/* square photo, row-height, centred — always covers the card */}
      <ParallaxImage
        src={program.image.src}
        alt={pick(program.title, locale)}
        travel={200}
        travelTablet={120}
        noiseOpacity={0.15}
        sizes="(min-width: 1200px) 560px, (min-width: 810px) 50vw, 100vw"
        className="absolute left-1/2 top-1/2 aspect-square h-[max(100%,560px)] -translate-x-1/2 -translate-y-1/2"
      />
      {/* legibility gradients (top for the title, bottom for the copy) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,32,36,0.45)_0%,rgba(20,32,36,0)_32%,rgba(20,32,36,0)_55%,rgba(20,32,36,0.55)_100%)]" />

      <h3 className="absolute inset-x-6 top-6 text-serif-md text-balance text-inverse">{pick(program.title, locale)}</h3>

      <div className="absolute inset-x-6 top-1/2 flex h-[240px] -translate-y-1/2 flex-col justify-end">
        <p className="text-body-sm text-inverse">{pick(program.description, locale)}</p>
      </div>

      {/* 4px dot + label: the dot is always there, the label fades in on hover */}
      <span className="absolute bottom-6 start-6 flex items-center gap-4 pt-px">
        <span aria-hidden className="size-1 shrink-0 rounded-pill bg-inverse" />
        <span className="text-label whitespace-nowrap text-inverse opacity-0 transition-opacity duration-(--motion-normal) ease-(--ease-inout) group-hover:opacity-100">
          {readMoreLabel}
        </span>
      </span>
    </Link>
  );
}
