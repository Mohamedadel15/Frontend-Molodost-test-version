import type { Localized } from "./types";

export interface Article {
  id: string;
  title: Localized;
  excerpt: Localized;
  image: { src: string; width: number; height: number };
  href: string;
  date: Localized;
  sections: Array<{ heading: Localized; body: Localized }>;
  closing: Localized;
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
    date: { en: "August 6, 2025", ar: "6 أغسطس 2025" },
    sections: [
      {
        heading: { en: "Why biomarkers matter.", ar: "لماذا تهم المؤشرات الحيوية؟" },
        body: {
          en: "Longevity care begins with measurement. Symptoms often appear late, while biomarkers can show inflammation, metabolic strain, hormonal imbalance, micronutrient depletion, and recovery gaps much earlier.",
          ar: "تبدأ رعاية طول العمر بالقياس. غالبًا ما تظهر الأعراض متأخرة، بينما تكشف المؤشرات الحيوية الالتهاب والإجهاد الأيضي واختلال الهرمونات ونقص المغذيات الدقيقة وفجوات التعافي قبل ذلك بكثير.",
        },
      },
      {
        heading: { en: "Data turns prevention into a plan.", ar: "البيانات تحوّل الوقاية إلى خطة." },
        body: {
          en: "At Molodost', diagnostics are not a report to file away. They become the architecture for a personalized protocol: what to correct, what to protect, and what to track over time.",
          ar: "في مولودوست، ليست التشخيصات تقريرًا يُحفظ في الأدراج، بل تصبح البنية لبروتوكول شخصي: ما الذي يجب تصحيحه، وما الذي يجب حمايته، وما الذي يجب تتبعه مع الوقت.",
        },
      },
      {
        heading: { en: "From baseline to direction.", ar: "من خط الأساس إلى الاتجاه." },
        body: {
          en: "A clear baseline helps your physician connect energy, sleep, performance, body composition, skin quality, and long-term risk into one practical plan. The goal is not more data. The goal is better decisions.",
          ar: "يساعد خط الأساس الواضح طبيبك على ربط الطاقة والنوم والأداء وتكوين الجسم وجودة البشرة والمخاطر طويلة الأمد في خطة عملية واحدة. الهدف ليس مزيدًا من البيانات، بل قرارات أفضل.",
        },
      },
    ],
    closing: {
      en: "Medicine does not begin with disease. It begins with biology measured early.",
      ar: "الطب لا يبدأ بالمرض، بل يبدأ ببيولوجيا تُقاس مبكرًا.",
    },
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
    date: { en: "July 12, 2025", ar: "12 يوليو 2025" },
    sections: [
      {
        heading: { en: "The framework behind the plan.", ar: "الإطار وراء الخطة." },
        body: {
          en: "The 5D approach starts with diagnostics and moves into a precise design for care. From there, treatment delivery, physician direction, and long-term discipline keep the protocol accountable to real biology.",
          ar: "يبدأ نهج الأبعاد الخمسة بالتشخيص ثم ينتقل إلى تصميم دقيق للرعاية. ومن هناك، يحافظ تنفيذ العلاج وتوجيه الأطباء والانضباط طويل الأمد على مساءلة البروتوكول أمام البيولوجيا الحقيقية.",
        },
      },
      {
        heading: { en: "Why systems matter.", ar: "لماذا تهم الأنظمة؟" },
        body: {
          en: "Longevity is rarely solved by one treatment. Hormones, metabolism, inflammation, recovery, cognition, skin quality, and performance interact. A systems framework helps the team prioritize what matters first.",
          ar: "نادرًا ما يُحل طول العمر بعلاج واحد. فالهرمونات والأيض والالتهاب والتعافي والإدراك وجودة البشرة والأداء كلها تتفاعل. يساعد إطار الأنظمة الفريق على ترتيب الأولويات.",
        },
      },
    ],
    closing: {
      en: "Longevity by Design means building health with sequence, measurement, and intent.",
      ar: "طول العمر بالتصميم يعني بناء الصحة بالتسلسل والقياس والقصد.",
    },
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
    date: { en: "July 5, 2025", ar: "5 يوليو 2025" },
    sections: [
      {
        heading: { en: "Recovery is biological, not generic.", ar: "التعافي بيولوجي لا عام." },
        body: {
          en: "Regenerative medicine is most useful when it responds to a clear need: cellular energy, inflammation, tissue repair, immune resilience, cognitive performance, or metabolic recovery.",
          ar: "يكون الطب التجديدي أكثر فائدة عندما يستجيب لحاجة واضحة: الطاقة الخلوية، الالتهاب، إصلاح الأنسجة، المناعة، الأداء الذهني، أو التعافي الأيضي.",
        },
      },
      {
        heading: { en: "Why measurement protects the outcome.", ar: "لماذا يحمي القياس النتيجة؟" },
        body: {
          en: "At Molodost', protocols are selected and followed by physicians. Biomarkers help define whether the body needs support, how intense the intervention should be, and what should change over time.",
          ar: "في مولودوست، يختار الأطباء البروتوكولات ويتابعونها. تساعد المؤشرات الحيوية في تحديد ما إذا كان الجسم يحتاج دعمًا، ومدى كثافة التدخل، وما الذي ينبغي تغييره مع الوقت.",
        },
      },
    ],
    closing: {
      en: "The goal is not a trend. The goal is repair that can be tracked.",
      ar: "الهدف ليس موضة عابرة، بل إصلاح يمكن تتبعه.",
    },
  },
];
