import Link from "next/link";

import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Heading, Text } from "@/components/ui/Typography/Typography";
import { markets, type Country } from "@/config/markets";
import { footerSitemap } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";
import type { Dictionary } from "@/types/dictionary";

interface FooterProps {
  country: Country;
  locale: Locale;
  dictionary: Dictionary;
}

interface SocialChannel {
  icon: IconName;
  href: string;
  label: string;
}

function socialChannels(
  country: Country,
  labels: Dictionary["footer"]["social"],
): SocialChannel[] {
  const { contact } = markets[country];
  const channels: SocialChannel[] = [];
  if (contact.instagram)
    channels.push({ icon: "instagram", href: contact.instagram, label: labels.instagram });
  if (contact.threads)
    channels.push({ icon: "threads", href: contact.threads, label: labels.threads });
  if (contact.facebook)
    channels.push({ icon: "facebook", href: contact.facebook, label: labels.facebook });
  if (contact.whatsapp)
    channels.push({
      icon: "whatsapp",
      href: `https://wa.me/${contact.whatsapp}`,
      label: labels.whatsapp,
    });
  if (contact.phone)
    channels.push({ icon: "phone", href: `tel:${contact.phone}`, label: labels.phone });
  channels.push({ icon: "mail", href: `mailto:${contact.email}`, label: labels.email });
  return channels;
}

/*
 * Dark footer (design-inventory §10). Interim solid background — the wave
 * imagery is pending asset export (design-inventory §17 #4). The newsletter
 * form is markup-only; validation/submission land in Phase 12.
 */
export function Footer({ country, locale, dictionary }: FooterProps) {
  const { footer, navigation } = dictionary;

  return (
    <footer className="bg-footer text-inverse">
      <Container className="pt-(--space-section-md) pb-16">
        <div className="grid gap-y-20 desktop:grid-cols-2 desktop:gap-x-24">
          <div className="max-w-xl">
            <Heading as="h2" preset="serif-xl" tone="inverse">
              {footer.newsletterTitle}
            </Heading>
            <Text size="md" tone="inverse-muted" className="mt-8 max-w-md">
              {footer.newsletterBody}
            </Text>
            <form className="mt-10 flex max-w-md items-end gap-6" data-pending="phase-12">
              <label className="flex-1">
                <span className="sr-only">{footer.emailPlaceholder}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={footer.emailPlaceholder}
                  className="w-full border-b border-inverse-muted bg-transparent pb-3 text-body text-inverse transition-colors duration-(--motion-fast) placeholder:text-inverse-muted focus:border-inverse focus:outline-none"
                />
              </label>
              <Button type="submit" variant="white">
                {footer.subscribe}
              </Button>
            </form>
            <Text size="sm" tone="inverse-muted" className="mt-8">
              {footer.newsletterLegal}
            </Text>
          </div>

          <div className="desktop:justify-self-end">
            <p className="text-label text-inverse-muted">{footer.sitemap}</p>
            <div className="mt-10 grid grid-cols-2 gap-x-16">
              {footerSitemap.map((column, columnIndex) => (
                <ul key={columnIndex} className="flex flex-col gap-5">
                  {column.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={localePath(country, locale, item.path)}
                        className="text-body font-semibold transition-opacity duration-(--motion-fast) hover:opacity-70"
                      >
                        {navigation.links[item.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-28 flex flex-col gap-8 tablet:flex-row tablet:items-center tablet:justify-between">
          <ul className="flex items-center gap-5">
            {socialChannels(country, footer.social).map((channel) => (
              <li key={channel.icon}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={channel.label}
                  className="text-inverse-muted transition-colors duration-(--motion-fast) hover:text-inverse"
                >
                  <Icon name={channel.icon} size={22} />
                </a>
              </li>
            ))}
          </ul>
          <Text size="sm" tone="inverse-muted" as="p">
            {footer.copyright}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
