"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/animations/StickyScene";
import { Container } from "@/components/layout/Container/Container";
import { QuoteLines } from "@/components/decor/RefLines";

interface BigQuoteProps {
  text: string;
  attribution: string;
}

/*
 * Full-bleed dark quote with scroll-scrubbed word reveal
 * (design-inventory §12.10, animations.md §5): words go 25% → 100% white as
 * the section traverses the viewport. Reduced motion: full opacity.
 */
export function BigQuote({ text, attribution }: BigQuoteProps) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top hits 90% of the viewport; 1 at ~5%
      const raw = (vh * 0.9 - rect.top) / (vh * 0.85);
      // Quantized — one word-step of change at a time, no redundant renders
      const value = Math.min(1, Math.max(0, Math.round(raw * 40) / 40));
      setProgress((prev) => (prev === value ? prev : value));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const words = text.split(" ");
  const visibleCount = reduced
    ? words.length
    : Math.floor(progress * words.length);

  return (
    <section
      ref={ref}
      data-header-invert
      className="relative overflow-hidden py-(--space-section-lg)"
    >
      <Image
        src="/images/quote-hand.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(16,26,30,0.35)]" />
      <QuoteLines
        progress={reduced ? 1 : progress}
        className="start-[52%] top-[-55%] h-[210%] w-[44%]"
      />
      <Container className="relative flex min-h-[440px] flex-col justify-center gap-10">
        <blockquote className="max-w-[720px]">
          <p className="text-serif-xl text-inverse">
            {words.map((word, i) => (
              <span
                key={i}
                className="transition-opacity duration-(--motion-fast)"
                style={{ opacity: i < visibleCount ? 1 : 0.25 }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </blockquote>
        <p
          className="text-body-sm text-inverse-muted transition-opacity duration-(--motion-normal)"
          style={{ opacity: reduced || progress > 0.9 ? 1 : 0 }}
        >
          {attribution}
        </p>
      </Container>
    </section>
  );
}
