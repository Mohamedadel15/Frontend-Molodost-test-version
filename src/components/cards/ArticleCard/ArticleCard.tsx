import Image from "next/image";
import Link from "next/link";

import { BlobOutline } from "@/components/decor/RefLines";
import { ButtonLink } from "@/components/ui/Button/Button";
import type { Article } from "@/content/articles";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";

interface ArticleCardProps {
  article: Article;
  href: string;
  locale: Locale;
  readMoreLabel: string;
  /** Blob mask variant cycled across the grid (reference journal cards). */
  mask: 1 | 2 | 3;
}

const maskStyle = (mask: 1 | 2 | 3) => ({
  maskImage: `url(/images/mask-${mask}.svg)`,
  WebkitMaskImage: `url(/images/mask-${mask}.svg)`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
});

/** Journal card (design-inventory §9): image, serif link title, excerpt, READ MORE. */
export function ArticleCard({
  article,
  href,
  locale,
  readMoreLabel,
  mask,
}: ArticleCardProps) {
  return (
    <article className="flex flex-col items-center gap-6 text-center">
      <Link href={href} className="group relative block w-full">
        <BlobOutline
          variant={mask}
          className="inset-0 h-full w-full -translate-x-2 translate-y-4"
        />
        <span
          className="relative block aspect-[500/430] w-full overflow-hidden"
          style={maskStyle(mask)}
        >
          <Image
            src={article.image.src}
            alt=""
            fill
            sizes="(min-width: 1200px) 26vw, (min-width: 810px) 45vw, 90vw"
            className="object-cover transition-[scale] duration-(--motion-slow) ease-(--ease-out-soft) group-hover:scale-105"
          />
        </span>
      </Link>
      <h3 className="text-serif-md">
        <Link
          href={href}
          className="text-accent transition-opacity duration-(--motion-fast) hover:opacity-70"
        >
          {pick(article.title, locale)}
        </Link>
      </h3>
      <p className="max-w-[380px] text-body-sm text-secondary">
        {pick(article.excerpt, locale)}
      </p>
      <ButtonLink href={href} variant="navy">
        {readMoreLabel}
      </ButtonLink>
    </article>
  );
}
