import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { TrustPoint } from "@/components/ui/TrustPoint/TrustPoint";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { markets, type Country } from "@/config/markets";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface ContactPathProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
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
export function ContactPath({ country, locale, dictionary }: ContactPathProps) {
  const copy = dictionary.home.contact;
  const market = markets[country];

  return (
    <Section paddingTop="md" paddingBottom="md">
      <Container className="grid gap-16 desktop:grid-cols-2 desktop:gap-24">
        <div className="flex max-w-[520px] flex-col items-start gap-10">
          <Reveal>
            <Heading as="h2" preset="serif-xl">
              {copy.title}
            </Heading>
          </Reveal>
          <Reveal delay={80}>
            <Text size="md" tone="secondary">
              {copy.body}
            </Text>
          </Reveal>
          <Reveal delay={140}>
            <TrustPoint
              trustedBy={copy.trustedBy}
              rating={copy.rating}
              ratingBrand={copy.ratingBrand}
            />
          </Reveal>
          <Reveal delay={200}>
            <ButtonLink
              href={localePath(country, locale, "/book-a-session")}
              variant="navy"
            >
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          {market.mapEmbedUrl ? (
            <Reveal>
              <iframe
                src={market.mapEmbedUrl}
                title={copy.connect}
                loading="lazy"
                className="h-[300px] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          ) : null}
          <Reveal delay={100}>
            <Text size="md" tone="accent">
              {copy.connect}
            </Text>
          </Reveal>
          <Reveal delay={160}>
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
