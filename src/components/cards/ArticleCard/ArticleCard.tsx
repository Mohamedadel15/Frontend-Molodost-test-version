import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/content/articles";
import { pick } from "@/content/types";
import type { Locale } from "@/i18n/config";

interface ArticleCardProps {
  article: Article;
  href: string;
  locale: Locale;
  readMoreLabel: string;
}

/** Journal card (design-inventory §9): image, serif link title, excerpt, READ MORE. */
export function ArticleCard({
  article,
  href,
  locale,
  readMoreLabel,
}: ArticleCardProps) {
  return (
    <article className="flex flex-col items-start gap-6">
      <Link href={href} className="group block w-full overflow-hidden">
        <span className="relative block aspect-[4/3] w-full">
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
      <p className="text-body-sm text-secondary">
        {pick(article.excerpt, locale)}
      </p>
      <Link
        href={href}
        className="text-label text-accent underline decoration-1 underline-offset-8 transition-opacity duration-(--motion-fast) hover:opacity-70"
      >
        {readMoreLabel}
      </Link>
    </article>
  );
}
