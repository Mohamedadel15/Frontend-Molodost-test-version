import Image from "next/image";
import Link from "next/link";

import type { Program } from "@/content/programs";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";

interface ProgramCardProps {
  program: Program;
  href: string;
  locale: Locale;
}

/*
 * Full-image program card (design-inventory §9): sharp corners, serif title
 * top, small description bottom, darkening gradients for legibility, whole
 * card is the link. Subtle image scale on hover (est. — calibrate).
 */
export function ProgramCard({ program, href, locale }: ProgramCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[3/5] overflow-hidden"
    >
      <Image
        src={program.image.src}
        alt={pick(program.title, locale)}
        fill
        sizes="(min-width: 1200px) 25vw, (min-width: 810px) 50vw, 100vw"
        className="object-cover transition-[scale] duration-(--motion-slow) ease-(--ease-out-soft) group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,32,36,0.45)_0%,rgba(20,32,36,0)_32%,rgba(20,32,36,0)_55%,rgba(20,32,36,0.55)_100%)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <h3 className="text-serif-md text-inverse">
          {pick(program.title, locale)}
        </h3>
        <p className="text-body-sm text-inverse">
          {pick(program.description, locale)}
        </p>
      </div>
    </Link>
  );
}
