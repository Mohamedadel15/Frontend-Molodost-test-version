import type { ElementType, ReactNode } from "react";

import { AppearIn } from "@/components/animations/AppearIn";
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
  /**
   * "reveal" (home, mid-page): copy fades in on scroll. "appear"
   * (/book-a-session, where this is the opening section): the production
   * page-load timeline — eyebrow drops at 0.4s, title rises at 0.4s, body at
   * 0.6s, the trust/connect block at 0.8s, the form fades in at 0.6s.
   */
  entrance?: "reveal" | "appear";
}

interface EnterProps {
  entrance: "reveal" | "appear";
  as?: ElementType;
  from?: "up" | "down" | "fade";
  delay: number;
  className?: string;
  children: ReactNode;
}

/** Page-load entrance on /book-a-session, scroll reveal elsewhere. */
function Enter({ entrance, as, from = "up", delay, className, children }: EnterProps) {
  return entrance === "appear" ? (
    <AppearIn as={as} from={from} delay={delay} className={className}>
      {children}
    </AppearIn>
  ) : (
    <Reveal as={as} className={className}>
      {children}
    </Reveal>
  );
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
 * Book A Session (production /book-a-session, also the home closer): eyebrow
 * row, 56px, then a 6 : 1 : 5 row — copy column (serif-xl title, 480px body,
 * 24px apart; 80px below, the trust + connect block pinned at 160px while the
 * form scrolls), a gutter column, and the 480px form column.
 */
export function ConsultationSection({
  country,
  dictionary,
  entrance = "reveal",
}: ConsultationSectionProps) {
  const copy = dictionary.home.consultation;
  const contact = dictionary.home.contact;

  return (
    <Section paddingTop="md" paddingBottom="md" id="book-a-session">
      <Container className="flex flex-col gap-14">
        <Enter entrance={entrance} from="down" delay={400} className="px-2">
          <Eyebrow tone="accent">{copy.eyebrow}</Eyebrow>
        </Enter>
        {/* no items-start: the copy column must stretch to the row height so its
            sticky trust block can travel alongside the taller form */}
        <div className="grid gap-20 desktop:grid-cols-[6fr_1fr_5fr] desktop:gap-0">
          <div className="flex flex-col gap-20 desktop:self-stretch">
            <div className="flex flex-col items-start gap-6 px-2">
              <Enter entrance={entrance} delay={400}>
                <Heading as="h2" preset="serif-xl" className="text-balance">
                  {copy.title}
                </Heading>
              </Enter>
              <Enter entrance={entrance} delay={600}>
                <Text size="md" tone="secondary" className="max-w-[480px]">
                  {copy.body}
                </Text>
              </Enter>
            </div>
            {/* only the trust/connect block pins while the form scrolls */}
            <Enter entrance={entrance} delay={800} className="flex flex-col gap-20 desktop:sticky desktop:top-40 desktop:self-start">
              <div className="px-2">
                <TrustPoint
                  trustedBy={contact.trustedBy}
                  rating={contact.rating}
                  ratingBrand={contact.ratingBrand}
                  instagramUrl={markets[country].contact.instagram}
                />
              </div>
              <div className="flex flex-col gap-8 px-2">
                <Text size="sm" tone="accent" className="max-w-[480px]">
                  {contact.connect}
                </Text>
                <ul className="flex items-center gap-8">
                  {channels(country, dictionary.footer.social).map((channel) => (
                    <li key={channel.icon}>
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={channel.label}
                        className="text-accent transition-opacity duration-(--motion-fast) hover:opacity-70"
                      >
                        <Icon name={channel.icon} size={22} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Enter>
          </div>
          <div aria-hidden className="hidden desktop:block" />
          <Enter entrance={entrance} from="fade" delay={600} className="px-2">
            <ConsultationForm
              country={country}
              forms={dictionary.forms}
              countryNames={dictionary.navigation.switcher.countries}
            />
          </Enter>
        </div>
      </Container>
    </Section>
  );
}
