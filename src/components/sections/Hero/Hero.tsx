import { Container } from "@/components/layout/Container/Container";
import { ButtonLink } from "@/components/ui/Button/Button";
import { HeroLines } from "@/components/decor/RefLines";
import { HeroVideo } from "./HeroVideo";
import type { Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface HeroProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

/*
 * Home hero (design-inventory §12.1, animations.md §1). Server-rendered with
 * CSS keyframe entrance — the image is the LCP element and must be visible
 * without hydration. 900px tall at desktop (measured; taller than the fold
 * by design), 100svh below. Focal point ≈ 60% 30% (§11).
 */
export function Hero({ country, locale, dictionary }: HeroProps) {
  const copy = dictionary.home.hero;

  return (
    <section
      data-header-invert
      className="relative h-svh overflow-hidden desktop:h-[900px]"
    >
      {/* The reference hero backdrop is a looping video (poster = face frame) */}
      <div className="hero-image-in absolute inset-0">
        <HeroVideo />
      </div>
      {/* "Animated Lines" white curves (measured: x 24%, w 51%, extends past the fold) */}
      <HeroLines className="hero-rise start-[24%] top-0 h-[127%] w-[51%]" />
      <Container className="relative z-10 flex h-full max-h-svh flex-col justify-end gap-8 pb-10 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-10">
        <h1
          className="hero-rise text-display max-w-[820px] text-inverse"
          style={{ animationDelay: "200ms" }}
        >
          {copy.title}
        </h1>
        <div
          className="hero-rise flex max-w-[440px] flex-col items-start gap-8 tablet:gap-10 tablet:pb-2"
          style={{ animationDelay: "350ms" }}
        >
          <p className="text-body-lg text-inverse">{copy.description}</p>
          <ButtonLink
            href={localePath(country, locale, "/book-a-session")}
            variant="navy"
          >
            {copy.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
