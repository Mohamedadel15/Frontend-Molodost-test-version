import type { Localized } from "./types";

export interface ServiceRow {
  id: string;
  title: Localized;
  body: Localized;
  image: { src: string; width: number; height: number };
}

/** /services alternating rows (content from the reference site). */
export const serviceRows: ServiceRow[] = [
  {
    id: "diagnostics",
    title: {
      en: "5D Diagnostics & Biological Mapping",
      ar: "تشخيصات الأبعاد الخمسة ورسم الخريطة البيولوجية",
    },
    body: {
      en: "We begin with a deep clinical view of your biology: advanced panels, hormonal and metabolic markers, inflammation signals, and lifestyle context. This creates a precise baseline before any protocol is designed.",
      ar: "نبدأ بنظرة سريرية عميقة إلى بيولوجيتك: فحوصات متقدمة ومؤشرات هرمونية وأيضية وإشارات التهابية وسياق نمط الحياة. هذا يخلق خط أساس دقيقًا قبل تصميم أي بروتوكول.",
    },
    image: { src: "/images/program-longevity.jpg", width: 1120, height: 1520 },
  },
  {
    id: "regenerative",
    title: { en: "Regenerative Medicine", ar: "الطب التجديدي" },
    body: {
      en: "Targeted regenerative protocols support cellular repair, energy production, recovery, and long-term resilience. Depending on your case, care may include peptide therapy, NAD+ support, exosomes, IV therapy, and physician-guided recovery programs.",
      ar: "تدعم البروتوكولات التجديدية الموجهة إصلاح الخلايا وإنتاج الطاقة والتعافي والمرونة طويلة الأمد. وقد تشمل الرعاية العلاج بالببتيدات ودعم +NAD والإكسوسومات والعلاج الوريدي وبرامج التعافي بإشراف الأطباء.",
    },
    image: { src: "/images/program-female-vitality.jpg", width: 1120, height: 1520 },
  },
  {
    id: "aesthetic",
    title: { en: "Aesthetic Regeneration", ar: "التجديد الجمالي" },
    body: {
      en: "Our aesthetic work is rooted in structural balance and tissue quality. Treatments are selected to refresh skin, restore firmness, and support a natural appearance without changing the identity of the face.",
      ar: "يرتكز عملنا الجمالي على التوازن البنيوي وجودة الأنسجة. تُختار العلاجات لإنعاش البشرة واستعادة الشد ودعم مظهر طبيعي دون تغيير هوية الوجه.",
    },
    image: { src: "/images/program-cognitive.jpg", width: 1120, height: 1520 },
  },
  {
    id: "concierge",
    title: { en: "Concierge & IV Therapy", ar: "الكونسيرج والعلاج الوريدي" },
    body: {
      en: "For clients who value discretion and time, select services can be coordinated through private concierge care. Physician-supervised home visits and IV protocols bring medical oversight into a calm, confidential setting.",
      ar: "لمن يقدّرون الخصوصية والوقت، يمكن تنسيق خدمات مختارة عبر رعاية كونسيرج خاصة. تنقل الزيارات المنزلية بإشراف الأطباء والبروتوكولات الوريدية الرقابة الطبية إلى أجواء هادئة وسرّية.",
    },
    image: { src: "/images/program-male-vitality.png", width: 1120, height: 1520 },
  },
];

/**
 * All published amounts are AED reference figures regardless of market —
 * EGP pricing is pending client data (design-inventory §17).
 */
export const priceCurrency = "AED";

export interface PricingTier {
  id: string;
  title: Localized;
  tagline: Localized;
  features: Localized[];
  /** AED reference pricing — EG figures pending client data. */
  priceOne: number;
  priceBundle: number;
}

/**
 * /services pricing tiers. `priceBundle` is not a multi-session total: the
 * reference's "UP TO +3" switch discounts the same per-session price by a flat
 * 20% (measured live: 49 → 39, 89 → 71, 229 → 183).
 */
export const pricingTiers: PricingTier[] = [
  {
    id: "diagnostics",
    title: { en: "Diagnostics", ar: "التشخيص" },
    tagline: {
      en: "Start with a precise biological baseline.",
      ar: "ابدأ بخط أساس بيولوجي دقيق.",
    },
    features: [
      { en: "5D biomarker review", ar: "مراجعة مؤشرات الأبعاد الخمسة" },
      { en: "Physician consultation", ar: "استشارة طبيب" },
      { en: "Personalized next steps", ar: "خطوات تالية شخصية" },
      { en: "Care team follow-up", ar: "متابعة فريق الرعاية" },
    ],
    priceOne: 49,
    priceBundle: 39,
  },
  {
    id: "optimization",
    title: { en: "Optimization", ar: "التحسين" },
    tagline: {
      en: "Build a protocol for sustained vitality.",
      ar: "ابنِ بروتوكولًا لحيوية مستدامة.",
    },
    features: [
      { en: "Everything in Diagnostics", ar: "كل ما في باقة التشخيص" },
      { en: "Hormonal and metabolic design", ar: "تصميم هرموني وأيضي" },
      { en: "Progress tracking", ar: "تتبع التقدم" },
      { en: "Regenerative add-ons", ar: "إضافات تجديدية" },
    ],
    priceOne: 89,
    priceBundle: 71,
  },
  {
    id: "concierge",
    title: { en: "Concierge", ar: "الكونسيرج" },
    tagline: {
      en: "Private medical oversight with priority care.",
      ar: "إشراف طبي خاص مع أولوية في الرعاية.",
    },
    features: [
      { en: "All Optimization features", ar: "كل مزايا باقة التحسين" },
      { en: "Priority booking", ar: "أولوية الحجز" },
      { en: "Physician-supervised home care", ar: "رعاية منزلية بإشراف طبيب" },
      { en: "Direct care coordination", ar: "تنسيق مباشر للرعاية" },
    ],
    priceOne: 229,
    priceBundle: 183,
  },
];
