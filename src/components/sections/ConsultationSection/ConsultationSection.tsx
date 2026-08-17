import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/layout/Container/Container";
import { Section } from "@/components/layout/Section/Section";
import { ConsultationForm } from "@/components/forms/ConsultationForm/ConsultationForm";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { TrustPoint } from "@/components/ui/TrustPoint/TrustPoint";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography/Typography";
import { markets, type Country } from "@/config/markets";
import type { Dictionary } from "@/types/dictionary";

interface ConsultationSectionProps {
  country: Country;
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
 * Book A Session (design-inventory §12.15): eyebrow, then two columns —
 * copy + trust + connect at inline-start, the consultation form at
 * inline-end. Also used standalone on /book-a-session.
 */
export function ConsultationSection({
  country,
  dictionary,
}: ConsultationSectionProps) {
  const copy = dictionary.home.consultation;
  const contact = dictionary.home.contact;

  return (
    <Section paddingTop="md" paddingBottom="md" id="book-a-session">
      <Container>
        <Reveal>
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Reveal>
      </Container>
      <Container className="mt-14 grid items-stretch gap-20 desktop:grid-cols-2 desktop:gap-28">
        <div className="flex h-full max-w-[560px] flex-col items-start gap-12">
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
          {/* Only the trust/connect block pins while the form scrolls */}
          <div className="flex flex-col gap-12 desktop:sticky desktop:top-28">
          <Reveal delay={140}>
            <TrustPoint
              trustedBy={contact.trustedBy}
              rating={contact.rating}
              ratingBrand={contact.ratingBrand}
              instagramUrl={markets[country].contact.instagram}
            />
          </Reveal>
          <Reveal delay={200} className="flex flex-col gap-6">
            <Text size="md" tone="accent">
              {contact.connect}
            </Text>
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
        </div>
        <Reveal delay={120}>
          <ConsultationForm
            country={country}
            forms={dictionary.forms}
            countryNames={dictionary.navigation.switcher.countries}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
