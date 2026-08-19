import type { Localized } from "./types";

/**
 * The three clinical disciplines shown on /about. Deliberately not people:
 * the reference's About page presents the team by role, with no names, and
 * links through to the specialists index for the individuals.
 *
 * Photos, blob masks and focal points are the reference's own — this section
 * does not reuse the named-specialist portraits from the home page.
 */
export interface SpecialistRole {
  id: string;
  title: Localized;
  description: Localized;
  image: { src: string; width: number; height: number };
  mask: 1 | 2 | 3;
  /** CSS object-position from the reference. */
  focus?: string;
}

export const specialistRoles: SpecialistRole[] = [
  {
    id: "longevity-physician",
    title: {
      en: "Longevity Physician",
      ar: "طبيب طول العمر",
    },
    description: {
      en: "Leads diagnostics, biomarker interpretation, and precision medical protocols for long-term vitality.",
      ar: "يقود التشخيص وتفسير المؤشرات الحيوية والبروتوكولات الطبية الدقيقة من أجل حيوية طويلة الأمد.",
    },
    image: { src: "/images/about-role-1.jpg", width: 1365, height: 2048 },
    mask: 3,
    focus: "50.6% 33.4%",
  },
  {
    id: "regenerative-medicine",
    title: {
      en: "Regenerative Medicine Specialist",
      ar: "أخصائي الطب التجديدي",
    },
    description: {
      en: "Designs cellular repair, IV, peptide, and recovery protocols under clinical supervision.",
      ar: "يصمم بروتوكولات إصلاح الخلايا والحقن الوريدي والببتيدات والتعافي تحت إشراف سريري.",
    },
    image: { src: "/images/about-role-2.jpg", width: 1365, height: 2048 },
    mask: 2,
    focus: "49.2% 40.1%",
  },
  {
    id: "aesthetic-regeneration",
    title: {
      en: "Aesthetic Regeneration Specialist",
      ar: "أخصائي التجديد الجمالي",
    },
    description: {
      en: "Focuses on tissue quality, skin renewal, and natural structural balance without changing identity.",
      ar: "يركز على جودة الأنسجة وتجديد البشرة والتوازن البنيوي الطبيعي دون تغيير الهوية.",
    },
    image: { src: "/images/about-role-3.jpg", width: 2048, height: 1365 },
    mask: 1,
  },
];
