import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { ScrollDome } from "@/components/decor/ScrollDome";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { TrustPoint } from "@/components/ui/TrustPoint/TrustPoint";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { markets, type Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface ContactPathProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
  /**
   * Per-page overrides for the headline/body. Inner pages run their own
   * wording over the same block (/about, /stories, …); everything else —
   * TrustPoint, CTA, channels — stays shared.
   */
  copy?: Partial<Pick<Dictionary["home"]["contact"], "title" | "body">>;
  /**
   * "inner" is the /about arrangement: no map embed, the TrustPoint moves to
   * the end column above the channels, and the columns run 696 : 456 with the
   * gutter between them rather than an even split.
   */
  variant?: "default" | "inner";
  /** Dome easing into a dark section below — /about, where a Big Quote follows. */
  wave?: boolean;
}

interface Channel {
  icon: IconName;
  href: string;
  label: string;
}

function channels(
  country: Country,
  labels: Dictionary["footer"]["social"],
): Channel[] {
  const { contact } = markets[country];
  const list: Channel[] = [];
  if (contact.instagram)
    list.push({ icon: "instagram", href: contact.instagram, label: labels.instagram });
  if (contact.threads)
    list.push({ icon: "threads", href: contact.threads, label: labels.threads });
  if (contact.facebook)
    list.push({ icon: "facebook", href: contact.facebook, label: labels.facebook });
  if (contact.whatsapp)
    list.push({ icon: "whatsapp", href: `https://wa.me/${contact.whatsapp}`, label: labels.whatsapp });
  if (contact.phone)
    list.push({ icon: "phone", href: `tel:${contact.phone}`, label: labels.phone });
  list.push({ icon: "mail", href: `mailto:${contact.email}`, label: labels.email });
  return list;
}

/*
 * "Ready to find your path?" contact block (design-inventory §12.7):
 * left — headline, body, TrustPoint, CTA; right — market map embed,
 * connect line, social channel icons. Fully market-aware via config.
 */
export function ContactPath({
  country,
  locale,
  dictionary,
  copy: overrides,
  variant = "default",
  wave = false,
}: ContactPathProps) {
  const copy = { ...dictionary.home.contact, ...overrides };
  const market = markets[country];
  const inner = variant === "inner";
  const trust = (
    <TrustPoint
      trustedBy={copy.trustedBy}
      rating={copy.rating}
      ratingBrand={copy.ratingBrand}
      instagramUrl={market.contact.instagram}
    />
  );

  return (
    <Section
      paddingTop="md"
      paddingBottom="md"
      /*
       * The dome overhangs the section, so it cannot be clipped here. The inner
       * arrangement also sits on a #FAFAFA band — measured on /about as a
       * full-bleed 640px band starting exactly at this section's top edge and
       * ending at the Big Quote. The home page's contact block has no such band,
       * which is why the tint rides on the variant rather than the component.
       */
      className={cn(
        "relative",
        inner && "bg-surface",
        wave ? "z-10" : "overflow-hidden",
      )}
    >
      {/* No line art: the reference's contact block carries no decorative SVG —
          its only inline SVGs are the six channel icons. */}
      {/*
        FAFAFA dome easing into the Big Quote section — the 443px box is centred
        on the seam, so it hangs half its height below this section. It renders
        BEFORE the content on purpose: its fill is deepest at the page edges
        (441 of 443 units, against 229 at the centre), so the top half sweeps
        back up over this section's last row and would paint out anything
        sitting there — the CTA gets sliced in half. The reference avoids this
        by parenting the dome to the dark section below and letting that
        section's overflow clip the upper half away; painting it behind the
        content reaches the same result, and the section's own z-10 still lifts
        the overhang above the Big Quote.
      */}
      {wave ? (
        <ScrollDome className="-bottom-[221.5px] inset-x-0 h-[443px] w-full" />
      ) : null}
      <Container
        className={cn(
          "relative grid gap-16",
          inner
            ? "desktop:grid-cols-[minmax(0,696px)_minmax(0,456px)] desktop:justify-between"
            : "desktop:grid-cols-2 desktop:gap-24",
        )}
      >
        {/* Figma 2:8683 runs two different gaps, not one: the heading block
            sits 23.105px above the body (2:8686 → 2:8689) and the CTA a
            further 64px below the body (2:8689 bottom → 2:8692). */}
        <div
          className={cn(
            "flex flex-col items-start gap-16",
            !inner && "max-w-[520px]",
          )}
        >
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Heading as="h2" preset="serif-xl">
                {copy.title}
              </Heading>
            </Reveal>
            <Reveal>
              <Text size="md" tone="secondary" className={cn(inner && "max-w-[640px]")}>
                {copy.body}
              </Text>
            </Reveal>
          </div>
          {inner ? null : <Reveal>{trust}</Reveal>}
          <Reveal>
            <ButtonLink
              href={localePath(country, locale, "/book-a-session")}
              variant="navy"
            >
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          {inner ? <Reveal className="pb-8">{trust}</Reveal> : null}
          {!inner && market.mapEmbedUrl ? (
            <Reveal>
              <iframe
                src={market.mapEmbedUrl}
                title={copy.connect}
                loading="lazy"
                className="h-[300px] w-full rounded-[12px] border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          ) : null}
          <Reveal>
            <Text size={inner ? "sm" : "md"} tone="accent">
              {copy.connect}
            </Text>
          </Reveal>
          <Reveal>
            <ul className="flex items-center gap-6">
              {channels(country, dictionary.footer.social).map((channel) => (
                <li key={channel.icon}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={channel.label}
                    className="text-accent transition-opacity duration-(--motion-fast) hover:opacity-70"
                  >
                    <Icon name={channel.icon} size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
