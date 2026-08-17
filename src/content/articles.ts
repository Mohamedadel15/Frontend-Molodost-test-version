import type { Localized } from "./types";

export interface Article {
  id: string;
  title: Localized;
  excerpt: Localized;
  image: { src: string; width: number; height: number };
  href: string;
}

/** Journal articles (home Journal section + /journal). */
export const articles: Article[] = [
  {
    id: "what-your-biomarkers-can-tell-you",
    title: {
      en: "What Your Biomarkers Can Tell You",
      ar: "ماذا تخبرك مؤشراتك الحيوية",
    },
    excerpt: {
      en: "A precise baseline can reveal fatigue, inflammation, metabolic stress, and early signals of biological decline.",
      ar: "خط أساس دقيق يمكن أن يكشف الإرهاق والالتهاب والإجهاد الأيضي والإشارات المبكرة للتدهور البيولوجي.",
    },
    image: { src: "/images/journal-1.jpg", width: 768, height: 578 },
    href: "/journal/what-your-biomarkers-can-tell-you",
  },
  {
    id: "the-5d-longevity-framework",
    title: {
      en: "The 5D Longevity Framework",
      ar: "إطار الأبعاد الخمسة لطول العمر",
    },
    excerpt: {
      en: "Diagnostics, design, delivery, direction, and discipline turn longevity into a measurable medical system.",
      ar: "التشخيص والتصميم والتنفيذ والتوجيه والانضباط تحوّل طول العمر إلى نظام طبي قابل للقياس.",
    },
    image: { src: "/images/journal-2.jpg", width: 768, height: 574 },
    href: "/journal/the-5d-longevity-framework",
  },
  {
    id: "regenerative-recovery-measured",
    title: {
      en: "Regenerative Recovery, Measured",
      ar: "التعافي التجديدي بمقاييس دقيقة",
    },
    excerpt: {
      en: "NAD+, peptides, exosomes, and IV protocols work best when selected from evidence, biomarkers, and clinical goals.",
      ar: "علاجات +NAD والببتيدات والإكسوسومات والبروتوكولات الوريدية تعمل بأفضل صورة عندما تُختار وفق الأدلة والمؤشرات الحيوية والأهداف السريرية.",
    },
    image: { src: "/images/journal-3.jpg", width: 768, height: 516 },
    href: "/journal/regenerative-recovery-measured",
  },
];
