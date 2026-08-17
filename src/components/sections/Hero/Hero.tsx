import { Container } from "@/components/layout/Container/Container";
import { ButtonLink } from "@/components/ui/Button/Button";
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
 * Home hero content (design-inventory §12.1, animations.md §1). The video
 * backdrop + animated lines are provided by the shared pinned layer in
 * HeroToggle — this section is transparent. Server-rendered with CSS
 * keyframe entrance (LCP-safe). 900px tall at desktop (measured), 100svh
 * below.
 */
export function Hero({ country, locale, dictionary }: HeroProps) {
  const copy = dictionary.home.hero;

  return (
    <section data-header-invert className="relative h-svh desktop:h-[900px]">
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
          <p className="text-body-lg text-inverse [text-indent:18%]">
            {copy.description}
          </p>
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
