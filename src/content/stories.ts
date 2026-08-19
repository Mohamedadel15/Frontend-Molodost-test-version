import type { Localized } from "./types";

export interface StoryDetail {
  lede: Localized;
  challengeTitle: Localized;
  challenge: Localized;
  personName: Localized;
  journeyTitle: Localized;
  journeyIntro: Localized;
  startingPointTitle: Localized;
  startingPoint: Localized;
  approachTitle: Localized;
  approach: Localized;
  quote: Localized;
  outcome: Localized;
  finalTitle: Localized;
  final: Localized;
}

export interface StoryFeatureEntry {
  id: string;
  tags: Localized;
  title: Localized;
  excerpt: Localized;
  images: {
    front: { src: string; width: number; height: number };
    back: { src: string; width: number; height: number };
  };
  href: string;
  detail: StoryDetail;
}

/** Featured client stories (home Story A / Story B). */
export const storyFeatures: StoryFeatureEntry[] = [
  {
    id: "reclaiming-peak-vitality",
    tags: {
      en: "Longevity, Biohacking, Burnout Recovery",
      ar: "طول العمر، التحسين البيولوجي، التعافي من الإرهاق",
    },
    title: {
      en: "Reclaiming Peak Vitality",
      ar: "استعادة ذروة الحيوية",
    },
    excerpt: {
      en: "After years of executive stress, Elena accepted exhaustion as the cost of success. Through Molodost' precision diagnostics, she did not just recover — she reversed her biological decline and reclaimed her energy.",
      ar: "بعد سنوات من ضغوط العمل القيادي، تقبّلت إيلينا الإرهاق ثمنًا للنجاح. من خلال التشخيص الدقيق في مولودوست، لم تتعافَ فحسب — بل عكست تدهورها البيولوجي واستعادت طاقتها.",
    },
    images: {
      front: { src: "/images/story-a-front.png", width: 826, height: 1868 },
      back: { src: "/images/story-a-back.png", width: 704, height: 1254 },
    },
    href: "/stories/reclaiming-peak-vitality",
    detail: {
      lede: {
        en: "After years of executive stress, Elena accepted exhaustion as the cost of success. Through Molodost' precision diagnostics, she rebuilt energy, resilience, and confidence in her body.",
        ar: "بعد سنوات من ضغوط العمل القيادي، تقبّلت إيلينا الإرهاق ثمنًا للنجاح. من خلال التشخيص الدقيق في مولودوست أعادت بناء طاقتها ومرونتها وثقتها بجسدها.",
      },
      challengeTitle: { en: "The Challenge", ar: "التحدي" },
      challenge: {
        en: "Chronic fatigue, brain fog, and poor sleep had become Elena's normal. Standard labs looked acceptable, but deeper diagnostics showed inflammatory and micronutrient patterns that explained why recovery felt impossible.",
        ar: "أصبح الإرهاق المزمن وتشوش الذهن وسوء النوم حالة إيلينا الطبيعية. بدت التحاليل التقليدية مقبولة، لكن التشخيص الأعمق كشف أنماطًا التهابية ونقصًا في المغذيات الدقيقة فسّرت صعوبة التعافي.",
      },
      personName: { en: "Elena", ar: "إيلينا" },
      journeyTitle: { en: "The Journey", ar: "الرحلة" },
      journeyIntro: {
        en: "Elena did not need generic wellness advice. She needed a measurable biological plan built from diagnostics, physician oversight, and regenerative support.",
        ar: "لم تكن إيلينا بحاجة إلى نصائح عافية عامة، بل إلى خطة بيولوجية قابلة للقياس مبنية على التشخيص وإشراف الأطباء والدعم التجديدي.",
      },
      startingPointTitle: { en: "Starting Point", ar: "نقطة البداية" },
      startingPoint: {
        en: "We mapped inflammation, metabolism, hormone balance, micronutrients, and recovery markers through the 5D Longevity Framework.",
        ar: "رسمنا خريطة الالتهاب والأيض والتوازن الهرموني والمغذيات الدقيقة ومؤشرات التعافي عبر إطار الأبعاد الخمسة لطول العمر.",
      },
      approachTitle: { en: "Our Approach", ar: "نهجنا" },
      approach: {
        en: "Her protocol combined targeted IV support, peptide strategy, sleep restoration, and metabolic guidance. Every intervention had a reason and a follow-up marker.",
        ar: "جمع بروتوكولها بين الدعم الوريدي الموجّه واستراتيجية الببتيدات واستعادة النوم والإرشاد الأيضي. لكل تدخل سببٌ ومؤشر متابعة.",
      },
      quote: {
        en: "“I did not just get my energy back. I understood what my body needed.”",
        ar: "«لم أستعد طاقتي فحسب، بل فهمت ما يحتاجه جسدي.»",
      },
      outcome: {
        en: "Six weeks later, energy improved, sleep stabilized, and the clinical data reflected the change. Elena's work did not become less demanding. Her biological capacity became stronger.",
        ar: "بعد ستة أسابيع تحسنت الطاقة واستقر النوم وعكست البيانات السريرية هذا التغيير. لم يصبح عمل إيلينا أقل تطلبًا — بل أصبحت قدرتها البيولوجية أقوى.",
      },
      finalTitle: { en: "Final Reflections", ar: "خلاصة" },
      final: {
        en: "Longevity care is not a quick fix. It is a system for protecting biological capital before decline becomes identity.",
        ar: "رعاية طول العمر ليست حلًا سريعًا، بل نظام لحماية رأس المال البيولوجي قبل أن يتحول التراجع إلى هوية.",
      },
    },
  },
  {
    id: "optimizing-energy-at-the-source",
    tags: {
      en: "Diagnostics, Regeneration, Vitality",
      ar: "التشخيص، التجديد، الحيوية",
    },
    title: {
      en: "Optimizing Energy at the Source",
      ar: "تحسين الطاقة من مصدرها",
    },
    excerpt: {
      en: "A personalized longevity protocol helped identify the hidden drivers of fatigue and rebuild energy through measurable, physician-guided care.",
      ar: "ساعد بروتوكول شخصي لطول العمر في تحديد الأسباب الخفية للإرهاق وإعادة بناء الطاقة من خلال رعاية قابلة للقياس بإشراف الأطباء.",
    },
    images: {
      front: { src: "/images/story-b-front.jpg", width: 826, height: 1868 },
      back: { src: "/images/story-b-back.jpg", width: 704, height: 1254 },
    },
    href: "/stories/optimizing-energy-at-the-source",
    detail: {
      lede: {
        en: "Maya arrived with persistent fatigue, restless sleep, and declining focus. A personalized longevity assessment revealed the biological drivers behind what she had been calling burnout.",
        ar: "وصلت مايا وهي تعاني إرهاقًا مستمرًا ونومًا متقطعًا وتراجعًا في التركيز. كشف تقييم شخصي لطول العمر المحركات البيولوجية وراء ما كانت تسميه الاحتراق الوظيفي.",
      },
      challengeTitle: { en: "The Challenge", ar: "التحدي" },
      challenge: {
        en: "Her challenge was not motivation. It was cellular recovery, hormonal rhythm, and nutrient depletion that had slowly reduced her capacity.",
        ar: "لم يكن التحدي في الدافعية، بل في التعافي الخلوي والإيقاع الهرموني واستنزاف المغذيات الذي قلّص قدرتها تدريجيًا.",
      },
      personName: { en: "Maya", ar: "مايا" },
      journeyTitle: { en: "The Journey", ar: "الرحلة" },
      journeyIntro: {
        en: "For Maya, the first breakthrough was seeing fatigue as a clinical signal instead of a personal flaw.",
        ar: "كان أول اختراق لمايا هو رؤية الإرهاق إشارةً سريرية لا عيبًا شخصيًا.",
      },
      startingPointTitle: { en: "Starting Point", ar: "نقطة البداية" },
      startingPoint: {
        en: "We began with biomarkers, sleep patterns, metabolic markers, and inflammatory signals.",
        ar: "بدأنا بالمؤشرات الحيوية وأنماط النوم ومؤشرات الأيض وإشارات الالتهاب.",
      },
      approachTitle: { en: "Our Approach", ar: "نهجنا" },
      approach: {
        en: "Her program combined nutrient repletion, recovery design, IV support, and physician-led follow-up so the plan could adjust as her body responded.",
        ar: "جمع برنامجها بين تعويض المغذيات وتصميم التعافي والدعم الوريدي والمتابعة بقيادة الأطباء ليتكيف البروتوكول مع استجابة جسدها.",
      },
      quote: {
        en: "“The data helped me stop guessing and start rebuilding.”",
        ar: "«ساعدتني البيانات على التوقف عن التخمين والبدء في إعادة البناء.»",
      },
      outcome: {
        en: "Within weeks, Maya reported steadier mornings, fewer crashes, and better cognitive endurance. The goal was not to push harder. It was to rebuild the biology that makes performance possible.",
        ar: "خلال أسابيع، تحدثت مايا عن صباحات أكثر استقرارًا وانهيارات أقل وقدرة ذهنية أفضل. لم يكن الهدف مزيدًا من الضغط، بل إعادة بناء البيولوجيا التي تجعل الأداء ممكنًا.",
      },
      finalTitle: { en: "Final Reflections", ar: "خلاصة" },
      final: {
        en: "Energy is not found. It is built — from measurement, correction, and disciplined follow-up.",
        ar: "الطاقة لا تُكتشف بل تُبنى — من القياس والتصحيح والمتابعة المنضبطة.",
      },
    },
  },
  {
    id: "aesthetic-regeneration-without-looking-different",
    tags: {
      en: "Aesthetics, Skin Quality, Regeneration",
      ar: "الجماليات، جودة البشرة، التجديد",
    },
    title: {
      en: "Aesthetic Regeneration Without Looking Different",
      ar: "تجديد جمالي دون تغيير الملامح",
    },
    excerpt: {
      en: "Sofia wanted to look less tired without changing her identity. Her Molodost' plan focused on skin quality, structure, recovery, and subtle regenerative support.",
      ar: "أرادت صوفيا أن تبدو أقل إرهاقًا دون أن تغيّر هويتها. ركّزت خطتها في مولودوست على جودة البشرة والبنية والتعافي ودعم تجديدي خفيف.",
    },
    // Placeholder pair borrowed from the /about story until Sofia's own assets land.
    images: {
      front: { src: "/images/about-story-front.jpg", width: 826, height: 1868 },
      back: { src: "/images/about-story-back.jpg", width: 704, height: 1254 },
    },
    href: "/stories/aesthetic-regeneration-without-looking-different",
    detail: {
      lede: {
        en: "Sofia wanted to look less tired without changing her identity. Her Molodost' plan focused on skin quality, structure, recovery, and subtle regenerative support.",
        ar: "أرادت صوفيا أن تبدو أقل إرهاقًا دون أن تغيّر هويتها. ركّزت خطتها في مولودوست على جودة البشرة والبنية والتعافي ودعم تجديدي خفيف.",
      },
      challengeTitle: { en: "The Challenge", ar: "التحدي" },
      challenge: {
        en: "Stress, disrupted sleep, and skin dullness made Sofia feel disconnected from how she wanted to present herself.",
        ar: "جعلت الضغوط واضطراب النوم وبهتان البشرة صوفيا تشعر بانفصال عن الصورة التي أرادت أن تظهر بها.",
      },
      personName: { en: "Sofia", ar: "صوفيا" },
      journeyTitle: { en: "The Journey", ar: "الرحلة" },
      journeyIntro: {
        en: "The brief was clear: restore vitality, preserve identity.",
        ar: "كان المطلوب واضحًا: استعادة الحيوية مع الحفاظ على الهوية.",
      },
      startingPointTitle: { en: "Starting Point", ar: "نقطة البداية" },
      startingPoint: {
        en: "The team assessed skin quality, facial structure, lifestyle drivers, and inflammatory load.",
        ar: "قيّم الفريق جودة البشرة وبنية الوجه ومحركات نمط الحياة والعبء الالتهابي.",
      },
      approachTitle: { en: "Our Approach", ar: "نهجنا" },
      approach: {
        en: "The plan combined regenerative skin therapies, aesthetic architecture, and internal support for recovery and collagen quality.",
        ar: "جمعت الخطة بين علاجات تجديد البشرة والهندسة الجمالية للوجه والدعم الداخلي للتعافي وجودة الكولاجين.",
      },
      quote: {
        en: "“People said I looked rested. That was exactly the point.”",
        ar: "«قال لي الناس إنني أبدو مرتاحة، وهذا بالضبط ما أردته.»",
      },
      outcome: {
        en: "The result was intentionally understated: brighter skin, fresher features, and a look that felt like Sofia on a better baseline.",
        ar: "جاءت النتيجة هادئة عن قصد: بشرة أكثر إشراقًا وملامح أكثر انتعاشًا وحضور يشبه صوفيا نفسها لكن على خط أساس أفضل.",
      },
      finalTitle: { en: "Final Reflections", ar: "خلاصة" },
      final: {
        en: "Longevity care is not a quick fix. It is a system for protecting biological capital before decline becomes identity.",
        ar: "رعاية طول العمر ليست حلًا سريعًا، بل نظام لحماية رأس المال البيولوجي قبل أن يتحول التراجع إلى هوية.",
      },
    },
  },
];

/**
 * Featured story on /about. Feature-only on purpose: the reference links it to
 * a story detail page whose long-form body has not been supplied, and inventing
 * clinical narrative is not an option — so this entry stays out of
 * `storyFeatures` (which drives /stories/[slug] static params) and points at
 * the index. Move it into `storyFeatures` with a `detail` once the copy lands,
 * then change `href` to `/stories/metabolic-health-redesigned`.
 */
export const aboutStoryFeature: Omit<StoryFeatureEntry, "detail"> = {
  id: "metabolic-health-redesigned",
  tags: {
    en: "Metabolism, Hormones, Weight Optimization",
    ar: "الأيض، الهرمونات، تحسين الوزن",
  },
  title: {
    en: "Metabolic Health, Redesigned",
    ar: "صحة أيضية، مُعاد تصميمها",
  },
  excerpt: {
    en: "Daniel wanted to improve body composition, but the deeper issue was metabolic instability. Molodost' mapped the hormonal and inflammatory signals behind the plateau.",
    ar: "أراد دانيال تحسين تكوين جسمه، لكن المشكلة الأعمق كانت عدم استقرار الأيض. رسمت مولودوست خريطة الإشارات الهرمونية والالتهابية وراء هذا الثبات.",
  },
  images: {
    front: { src: "/images/about-story-front.jpg", width: 2048, height: 2048 },
    back: { src: "/images/about-story-back.jpg", width: 2048, height: 2048 },
  },
  href: "/stories",
};
