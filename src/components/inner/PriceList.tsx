"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { AppearIn } from "@/components/animations/AppearIn";
import { WavesIcon } from "@/components/decor/BrandIcons";
import { Container } from "@/components/layout/Container/Container";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { priceCurrency } from "@/content/services";
import { pendingCategories, priceCategories, type PriceItem } from "@/content/prices";
import { pick } from "@/content/types";
import { cn } from "@/lib/cn";

interface PriceListProps {
  locale: "en" | "ar";
  bookHref: string;
  copy: {
    eyebrow: string;
    title: string;
    lede: string;
    categoryLabel: string;
    comingSoon: string;
    bookNow: string;
  };
}

interface Option {
  id: string;
  label: string;
  categoryIndex: number | null;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US");
}

/*
 * One price card (production "Price" component): the whole card is the
 * booking link — 32px padding, 40px between the title block, the price row
 * and the pill; white at 65% on the page so it reads as a soft tile, 16px
 * radius, a 1px hairline that tints accent on hover. Title on the 36px serif,
 * note 14px, amount 48px/500/-0.04em in accent with the currency prefix.
 * Hovering anywhere on the card flips the pill exactly like ButtonLink
 * (it cannot nest a second anchor, so the pill is drawn inline here).
 */
function PriceCard({
  item,
  locale,
  bookHref,
  bookNow,
}: {
  item: PriceItem;
  locale: "en" | "ar";
  bookHref: string;
  bookNow: string;
}) {
  const dot =
    "absolute size-(--button-dot-size) rounded-pill bg-current transition-opacity duration-(--motion-fast)";
  return (
    <Link
      href={bookHref}
      className={cn(
        "group flex w-full flex-col items-start gap-10 rounded-card border p-8",
        "bg-background/65 border-transparent transition-colors duration-(--motion-fast) ease-(--ease-inout)",
        "hover:border-accent/40",
      )}
    >
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-serif-md text-primary">{pick(item.name, locale)}</h3>
        {item.note ? (
          <p className="text-body-sm text-secondary">{pick(item.note, locale)}</p>
        ) : null}
      </div>
      <div className="flex w-full items-end">
        {item.amount != null ? (
          <p
            dir="ltr"
            className="font-sans text-[40px] font-medium leading-[1.05] tracking-[-0.04em] text-accent desktop:text-[48px]"
          >
            {priceCurrency} {formatAmount(item.amount)}
          </p>
        ) : null}
      </div>
      <span
        className={cn(
          "relative inline-flex h-(--button-height) items-center justify-center rounded-pill text-label whitespace-nowrap select-none",
          "ps-5 pe-12 bg-accent text-inverse",
          "transition-[padding,background-color,color,box-shadow] duration-(--motion-fast) ease-(--ease-inout)",
          "group-hover:ps-12 group-hover:pe-5 group-hover:bg-background group-hover:text-accent group-hover:shadow-[0_0_0_1px_rgba(46,50,49,0.12)]",
        )}
      >
        <span aria-hidden className={cn(dot, "start-(--button-dot-inset) opacity-0 group-hover:opacity-100")} />
        <span>{bookNow}</span>
        <span aria-hidden className={cn(dot, "end-(--button-dot-inset) opacity-100 group-hover:opacity-0")} />
      </span>
    </Link>
  );
}

/*
 * /prices — the production "Pricing" section: section icon + display title +
 * sans headline + lede, all centred and 32px apart; 80px below, the
 * "Category" label with its native select (180px wide, 40px tall); then the
 * price cards on a 3 / 2 / 1 column grid, 20px gutters, filled column by
 * column (production renders each column as its own stack). Entrance: title
 * drops at 0.4s, headline rises at 0.4s, lede at 0.6s, select at 0.8s, the
 * grid fades in at 0.6s. Categories without published data show the
 * coming-soon note (design-inventory §17).
 */
export function PriceList({ locale, bookHref, copy }: PriceListProps) {
  const selectId = useId();
  const options: Option[] = [
    ...priceCategories.map((category, index) => ({
      id: category.id,
      label: pick(category.label, locale),
      categoryIndex: index,
    })),
    ...pendingCategories.map((label, index) => ({
      id: `pending-${index}`,
      label: pick(label, locale),
      categoryIndex: null,
    })),
  ];
  const [activeId, setActiveId] = useState(options[0]?.id ?? "");
  const active = options.find((option) => option.id === activeId) ?? options[0];
  const category =
    active?.categoryIndex != null ? priceCategories[active.categoryIndex] : null;

  return (
    <section className="relative overflow-hidden py-20 tablet:py-[120px] desktop:py-40">
      <Container className="flex flex-col items-center gap-12 desktop:gap-20">
        <div className="flex w-full flex-col items-center gap-8 px-2 text-center">
          <AppearIn from="fade" delay={200}>
            <WavesIcon />
          </AppearIn>
          <AppearIn from="down" delay={400} className="w-full">
            <h1 className="text-display text-primary">{copy.eyebrow}</h1>
          </AppearIn>
          <div className="flex w-full flex-col items-center gap-6">
            <AppearIn delay={400} className="w-full">
              <Heading as="h2" preset="sans-lg" className="mx-auto max-w-[900px]">
                {copy.title}
              </Heading>
            </AppearIn>
            <AppearIn delay={600}>
              <Text size="md" tone="secondary" className="max-w-[480px]">
                {copy.lede}
              </Text>
            </AppearIn>
          </div>
        </div>

        <AppearIn delay={800} className="flex w-[180px] flex-col gap-2 self-start">
          <label htmlFor={selectId} className="text-[12px] font-medium leading-[1.4] text-secondary">
            {copy.categoryLabel}
          </label>
          <select
            id={selectId}
            value={active?.id}
            onChange={(event) => setActiveId(event.target.value)}
            className={cn(
              "h-10 w-full rounded-[10px] border border-[rgba(136,136,136,0.1)] bg-[rgba(187,187,187,0.15)] px-3",
              "font-sans text-[14px] leading-[1.2] text-primary outline-none",
              "focus-visible:border-accent",
            )}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </AppearIn>

        <AppearIn from="fade" delay={600} className="w-full">
          {category ? (
            <ul className="w-full gap-5 tablet:columns-2 desktop:columns-3">
              {category.items.map((item, index) => (
                <li key={`${category.id}-${index}`} className="mb-5 break-inside-avoid">
                  <PriceCard item={item} locale={locale} bookHref={bookHref} bookNow={copy.bookNow} />
                </li>
              ))}
            </ul>
          ) : (
            <Text size="md" tone="secondary" className="mx-auto max-w-[640px] text-center">
              {copy.comingSoon}
            </Text>
          )}
        </AppearIn>
      </Container>
    </section>
  );
}
