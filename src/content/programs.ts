import type { Localized } from "./types";

export interface Program {
  id: string;
  title: Localized;
  description: Localized;
  image: { src: string; width: number; height: number };
  href: string;
}

/** Home "Our Services" cards (content measured from the reference). */
export const programs: Program[] = [
  {
    id: "longevity-optimization",
    title: {
      en: "Longevity Optimization",
      ar: "تحسين طول العمر",
    },
    description: {
      en: "A functional-medicine approach to restore metabolic balance, harmonize the gut-mind axis, and enhance daily energy through medically guided interventions.",
      ar: "نهج قائم على الطب الوظيفي لاستعادة التوازن الأيضي، ومواءمة محور الأمعاء والدماغ، وتعزيز الطاقة اليومية من خلال تدخلات طبية موجهة.",
    },
    image: { src: "/images/program-longevity.jpg", width: 1120, height: 1520 },
    href: "/services",
  },
  {
    id: "female-vitality",
    title: {
      en: "Female Vitality & Hormonal Balance",
      ar: "حيوية المرأة والتوازن الهرموني",
    },
    description: {
      en: "A data-driven program designed to restore female hormonal rhythms, improve emotional resilience, and optimize long-term well-being.",
      ar: "برنامج قائم على البيانات لاستعادة الإيقاعات الهرمونية الأنثوية، وتحسين المرونة النفسية، وتعزيز الصحة على المدى الطويل.",
    },
    image: {
      src: "/images/program-female-vitality.jpg",
      width: 1120,
      height: 1520,
    },
    href: "/services",
  },
  {
    id: "male-vitality",
    title: {
      en: "Male Vitality & Performance",
      ar: "حيوية الرجل والأداء",
    },
    description: {
      en: "Precision-driven protocols to restore testosterone balance, enhance physical stamina, and sharpen cognitive performance for high-stakes environments.",
      ar: "بروتوكولات دقيقة لاستعادة توازن التستوستيرون، وتعزيز القدرة البدنية، وصقل الأداء الذهني لبيئات العمل عالية التحدي.",
    },
    image: {
      src: "/images/program-male-vitality.png",
      width: 1120,
      height: 1520,
    },
    href: "/services",
  },
  {
    id: "cognitive-enhancement",
    title: {
      en: "Cognitive Enhancement",
      ar: "تعزيز القدرات الذهنية",
    },
    description: {
      en: "Neuroscience-driven biohacking to optimize memory, focus, and stress resilience through regenerative neuro-nutrition and NAD+ therapies.",
      ar: "تحسين بيولوجي قائم على علوم الأعصاب لتعزيز الذاكرة والتركيز ومقاومة التوتر من خلال التغذية العصبية التجديدية وعلاجات +NAD.",
    },
    image: { src: "/images/program-cognitive.jpg", width: 1120, height: 1520 },
    href: "/services",
  },
];
