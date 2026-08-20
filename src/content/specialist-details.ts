import type { Localized } from "./types";

export interface SpecialistDetail {
  years: Localized;
  /** Band label — "The Clinical Focus". */
  focusTitle: Localized;
  /**
   * Band statement, scrubbed word by word. The production copy is a sentence
   * fragment continuing the label ("[The clinical focus] connects …"), so most
   * entries start lowercase on purpose.
   */
  focus: Localized;
  approachTitle: Localized;
  approachIntro: Localized;
  sections: Array<{ heading: Localized; body: Localized }>;
  quote: Localized;
  /** First paragraph after the quote — what patients get. */
  outcome: Localized;
  /** Second paragraph — how the work sits inside the 5D Longevity Framework. */
  framework: Localized;
  specialisations: Localized[];
  languages: Localized;
  /**
   * `object-position` for the full-bleed hero crop of the card portrait —
   * copied from the production hero per specialist.
   */
  heroPosition: string;
  /** Standing uniform shot beside the pull quote. */
  portrait: { src: string; width: number; height: number };
}

/*
 * Detail-page content keyed by specialist id. English copy is VERBATIM from
 * the production pages (molodostlongevity.com/specialists/<id>, captured
 * 2026-08-20) — do not reword it here; Arabic follows the site's established
 * terminology (DHA → هيئة الصحة بدبي, 5D Longevity Framework → إطار الأبعاد
 * الخمسة لطول العمر).
 */
export const specialistDetails: Record<string, SpecialistDetail> = {
  "regina-markuseeva": {
    years: { en: "14 years", ar: "14 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "combines medical assessment, skin and scalp health evaluation, aesthetic wellness planning, and personalized treatment protocols designed to support healthy aging, natural-looking results, and long-term skin quality.",
      ar: "يجمع بين التقييم الطبي وتقييم صحة البشرة وفروة الرأس وتخطيط العافية الجمالية وبروتوكولات علاجية شخصية تدعم الشيخوخة الصحية والنتائج الطبيعية وجودة البشرة على المدى الطويل.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Regina’s approach combines medical dermatology, aesthetic medicine, and trichology to improve skin, hair, and appearance with precision and natural-looking results.",
      ar: "يجمع نهج د. ريجينا بين طب الجلد والطب التجميلي وعلوم الشعر لتحسين البشرة والشعر والمظهر بدقة ونتائج طبيعية.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "She begins by evaluating the condition beneath the surface — skin quality, inflammation, hair health, scalp condition, facial structure, and the patient’s aesthetic goals.",
          ar: "تبدأ بتقييم ما تحت السطح — جودة البشرة والالتهاب وصحة الشعر وحالة فروة الرأس وبنية الوجه والأهداف الجمالية للمريض.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Her treatment plans integrate medical dermatology, injectable techniques, advanced technologies, and hair restoration protocols to address both clinical concerns and aesthetic refinement.",
          ar: "تدمج خططها العلاجية طب الجلد والتقنيات الحقنية والتقنيات المتقدمة وبروتوكولات استعادة الشعر لمعالجة الجوانب السريرية والتجميلية معًا.",
        },
      },
    ],
    quote: {
      en: "“Beautiful results should never come at the expense of medical precision. Healthy skin, natural aesthetics, and confidence must always work together.”",
      ar: "«النتائج الجميلة يجب ألا تأتي أبدًا على حساب الدقة الطبية. البشرة الصحية والجماليات الطبيعية والثقة يجب أن تعمل معًا دائمًا.»",
    },
    outcome: {
      en: "Her goal is to create results that look balanced, healthy, and naturally refreshed — while maintaining medical safety, facial harmony, and the patient’s individuality.",
      ar: "هدفها تحقيق نتائج تبدو متوازنة وصحية ومنتعشة بشكل طبيعي — مع الحفاظ على السلامة الطبية وتناغم الوجه وفرادة كل مريض.",
    },
    framework: {
      en: "At Molodost, Dr. Regina works within the 5D Longevity Framework, looking at beauty not only as an external result, but as a reflection of internal balance, inflammation control, hormonal changes, lifestyle, stress, and cellular wellbeing.",
      ar: "تعمل د. ريجينا في مولودوست ضمن إطار الأبعاد الخمسة لطول العمر، ناظرةً إلى الجمال ليس كنتيجة خارجية فحسب، بل كانعكاس للتوازن الداخلي وضبط الالتهاب والتغيرات الهرمونية ونمط الحياة والتوتر والصحة الخلوية.",
    },
    specialisations: [
      { en: "Skin Health Assessment", ar: "تقييم صحة البشرة" },
      { en: "Skin Longevity & Healthy Aging", ar: "شباب البشرة والشيخوخة الصحية" },
      { en: "Preventive Aesthetic Care", ar: "العناية التجميلية الوقائية" },
      { en: "Hair & Scalp Wellness", ar: "صحة الشعر وفروة الرأس" },
      {
        en: "Acne, Pigmentation & Skin Texture Concerns",
        ar: "حب الشباب والتصبغات ومشاكل ملمس البشرة",
      },
      { en: "Regenerative Skin Support", ar: "الدعم التجديدي للبشرة" },
      {
        en: "PRP & Exosome-Based Skin/Hair Protocols",
        ar: "بروتوكولات البلازما الغنية بالصفائح والإكسوسومات للبشرة والشعر",
      },
      { en: "Device-Based Aesthetic Treatments", ar: "العلاجات التجميلية بالأجهزة" },
      {
        en: "Morpheus8, IPL & Lifting Technologies",
        ar: "تقنيات مورفيوس 8 والضوء النبضي المكثف والشد",
      },
      { en: "Personalized Skin Quality Programs", ar: "برامج شخصية لجودة البشرة" },
      { en: "Post-Treatment Skin Recovery", ar: "تعافي البشرة بعد العلاجات" },
      { en: "Aesthetic Wellness Planning", ar: "تخطيط العافية الجمالية" },
    ],
    languages: { en: "English, Russian", ar: "الإنجليزية والروسية" },
    heroPosition: "55% 22.1%",
    portrait: {
      src: "/images/specialist-1-uniform.jpg",
      width: 3317,
      height: 4976,
    },
  },
  "zarema-nashemuk": {
    years: { en: "13 years", ar: "13 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "connects hormones, reproductive health, metabolism, stress, and inflammation to support long-term female wellbeing through personalized care, screening, ultrasound assessment, and ongoing follow-up",
      ar: "يربط بين الهرمونات والصحة الإنجابية والأيض والتوتر والالتهاب لدعم صحة المرأة على المدى الطويل من خلال رعاية شخصية وفحص وتقييم بالموجات فوق الصوتية ومتابعة مستمرة",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Zarema’s approach brings clarity to women’s health by combining gynecology, endocrinology, and advanced ultrasound diagnostics in one complete clinical pathway.",
      ar: "يمنح نهج د. زاريما وضوحًا لصحة المرأة عبر الجمع بين أمراض النساء والغدد الصماء والتشخيص المتقدم بالموجات فوق الصوتية في مسار سريري واحد متكامل.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "She begins with a comprehensive evaluation of symptoms, reproductive health, hormonal balance, ultrasound findings, and preventive risk factors to understand the full clinical picture.",
          ar: "تبدأ بتقييم شامل للأعراض والصحة الإنجابية والتوازن الهرموني ونتائج الموجات فوق الصوتية وعوامل الخطر الوقائية لفهم الصورة السريرية الكاملة.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Her care connects diagnostics with treatment — supporting hormonal disorders, fertility planning, pregnancy care, preventive gynecology, and anti-age medicine through an individualized plan.",
          ar: "تربط رعايتها التشخيص بالعلاج — بدعم الاضطرابات الهرمونية وتخطيط الخصوبة ورعاية الحمل وطب النساء الوقائي وطب مقاومة الشيخوخة عبر خطة فردية.",
        },
      },
    ],
    quote: {
      en: "“Women’s health deserves clarity. When diagnostics, hormones, and clinical care come together, we can treat not only symptoms — but the full picture.”",
      ar: "«صحة المرأة تستحق الوضوح. حين يجتمع التشخيص والهرمونات والرعاية السريرية، يمكننا علاج الصورة الكاملة لا الأعراض وحدها.»",
    },
    outcome: {
      en: "Patients receive clear answers, precise diagnostics, and a structured treatment plan within one visit — designed to support women’s health with confidence and continuity.",
      ar: "تحصل المريضات على إجابات واضحة وتشخيص دقيق وخطة علاج منظمة في زيارة واحدة — لدعم صحة المرأة بثقة واستمرارية.",
    },
    framework: {
      en: "At Molodost, Dr. Zarema works within the 5D Longevity Framework, helping patients move beyond isolated symptoms toward a more complete understanding of their health, vitality, hormonal balance, and biological aging.",
      ar: "تعمل د. زاريما في مولودوست ضمن إطار الأبعاد الخمسة لطول العمر، لمساعدة المريضات على تجاوز الأعراض المتفرقة نحو فهم أكمل لصحتهن وحيويتهن وتوازنهن الهرموني وشيخوختهن البيولوجية.",
    },
    specialisations: [
      { en: "Women’s Health Assessment", ar: "تقييم صحة المرأة" },
      { en: "Hormonal Optimization", ar: "تحسين التوازن الهرموني" },
      { en: "Preventive Gynecological Care", ar: "رعاية نسائية وقائية" },
      { en: "Reproductive Health Support", ar: "دعم الصحة الإنجابية" },
      { en: "Pregnancy Planning & Monitoring", ar: "تخطيط الحمل ومتابعته" },
      {
        en: "Ultrasound-Based Health Screening",
        ar: "الفحص الصحي بالموجات فوق الصوتية",
      },
      {
        en: "Breast, Pelvic & Thyroid Screening Support",
        ar: "دعم فحص الثدي والحوض والغدة الدرقية",
      },
      {
        en: "Menstrual & Perimenopausal Wellness",
        ar: "عافية الدورة الشهرية وما حول انقطاع الطمث",
      },
      { en: "Regenerative Medicine Protocols", ar: "بروتوكولات الطب التجديدي" },
      { en: "Longevity Female Health", ar: "صحة المرأة الموجهة لطول العمر" },
      { en: "Preventive Medicine", ar: "الطب الوقائي" },
      { en: "Personalized Health Planning", ar: "تخطيط صحي شخصي" },
    ],
    languages: { en: "English, Russian", ar: "الإنجليزية والروسية" },
    heroPosition: "55.6% 27.2%",
    portrait: {
      src: "/images/specialist-3-uniform.jpg",
      width: 3006,
      height: 4018,
    },
  },
  "areej-hillis": {
    years: { en: "8 years", ar: "8 أعوام" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "connects hormones, metabolism, energy, stress, inflammation, lifestyle, and aging to support long-term vitality through personalized care, screening, and medically guided longevity protocols.",
      ar: "يربط بين الهرمونات والأيض والطاقة والتوتر والالتهاب ونمط الحياة والشيخوخة لدعم الحيوية طويلة الأمد من خلال رعاية شخصية وفحص وبروتوكولات طول عمر بإشراف طبي.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Areej’s approach is built around proactive longevity care for women — preserving vitality, hormonal balance, and long-term health before imbalance becomes disease.",
      ar: "يقوم نهج د. أريج على رعاية استباقية لطول عمر المرأة — بالحفاظ على الحيوية والتوازن الهرموني والصحة طويلة الأمد قبل أن يتحول الخلل إلى مرض.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "She begins by looking beyond isolated symptoms, assessing hormonal rhythm, metabolic health, lifestyle patterns, energy levels, and long-term risk factors that shape how a woman feels today and ages tomorrow.",
          ar: "تبدأ بالنظر إلى ما وراء الأعراض المتفرقة، فتقيّم الإيقاع الهرموني والصحة الأيضية وأنماط الحياة ومستويات الطاقة وعوامل الخطر طويلة الأمد التي تحدد كيف تشعر المرأة اليوم وكيف تشيخ غدًا.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Each plan is designed around prevention, cellular health, endocrine balance, and sustainable lifestyle optimization — creating a clear medical strategy for energy, resilience, and healthy aging.",
          ar: "تُصمم كل خطة حول الوقاية والصحة الخلوية والتوازن الهرموني وتحسين مستدام لنمط الحياة — لتشكل استراتيجية طبية واضحة للطاقة والمرونة والشيخوخة الصحية.",
        },
      },
    ],
    quote: {
      en: "“True longevity begins when we stop waiting for disease — and start building health with intention, precision, and care.”",
      ar: "«طول العمر الحقيقي يبدأ حين نتوقف عن انتظار المرض — ونبدأ ببناء الصحة بقصد ودقة وعناية.»",
    },
    outcome: {
      en: "Her work helps women move from reactive healthcare to intentional longevity — with a personalized path toward balance, vitality, and quality of life over time.",
      ar: "يساعد عملها النساء على الانتقال من رعاية صحية تفاعلية إلى طول عمر مقصود — عبر مسار شخصي نحو التوازن والحيوية وجودة الحياة مع الوقت.",
    },
    framework: {
      en: "At Molodost, Dr. Areej works within the 5D Longevity Framework, helping patients move beyond symptoms toward a more complete understanding of their health, hormonal balance, energy, and aging process.",
      ar: "تعمل د. أريج في مولودوست ضمن إطار الأبعاد الخمسة لطول العمر، لمساعدة المرضى على تجاوز الأعراض نحو فهم أكمل لصحتهم وتوازنهم الهرموني وطاقتهم ومسار شيخوختهم.",
    },
    specialisations: [
      { en: "Women’s Health Assessment", ar: "تقييم صحة المرأة" },
      { en: "Hormonal Wellness Support", ar: "دعم التوازن الهرموني" },
      { en: "Longevity-Oriented Care", ar: "رعاية موجهة لطول العمر" },
      { en: "Preventive Medicine", ar: "الطب الوقائي" },
      { en: "Peptide Therapy Assessment", ar: "تقييم العلاج بالببتيدات" },
      {
        en: "Medically Guided Peptide Protocols",
        ar: "بروتوكولات ببتيدات بإشراف طبي",
      },
      {
        en: "Metabolic Health & Energy Optimization",
        ar: "الصحة الأيضية وتحسين الطاقة",
      },
      {
        en: "Stress, Fatigue & Lifestyle-Related Concerns",
        ar: "التوتر والإرهاق ومشاكل نمط الحياة",
      },
      {
        en: "Biological Age & Healthspan Planning",
        ar: "تخطيط العمر البيولوجي ومدى الصحة",
      },
      { en: "Personalized Longevity Programs", ar: "برامج شخصية لطول العمر" },
      {
        en: "Preventive Check-Ups & Health Screening",
        ar: "الفحوصات الوقائية والفحص الصحي",
      },
      {
        en: "Medical Follow-Up & Patient Education",
        ar: "المتابعة الطبية وتثقيف المرضى",
      },
    ],
    languages: {
      en: "Arabic, English, Russian, Turkish",
      ar: "العربية والإنجليزية والروسية والتركية",
    },
    heroPosition: "62.8% 27.2%",
    portrait: {
      src: "/images/specialist-5-uniform.jpg",
      width: 2516,
      height: 3357,
    },
  },
  "albina-nurgazizova": {
    years: { en: "13 years", ar: "13 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "connects cardiovascular health, metabolism, inflammation, hormones, lifestyle, and stress to support long-term wellbeing through personalized care, screening, diagnostics, and follow-up",
      ar: "يربط بين صحة القلب والأوعية والأيض والالتهاب والهرمونات ونمط الحياة والتوتر لدعم العافية طويلة الأمد من خلال رعاية شخصية وفحص وتشخيص ومتابعة",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Albina’s approach is based on early detection, clinical precision, and a complete understanding of the patient’s internal health.",
      ar: "يقوم نهج د. ألبينا على الاكتشاف المبكر والدقة السريرية والفهم الكامل للصحة الداخلية للمريض.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "She begins with a structured evaluation of cardiovascular health, internal medicine markers, ultrasound findings, ECG results, respiratory function, and long-term health risks.",
          ar: "تبدأ بتقييم منظم لصحة القلب والأوعية ومؤشرات الطب الباطني ونتائج الموجات فوق الصوتية وتخطيط القلب والوظيفة التنفسية والمخاطر الصحية طويلة الأمد.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Her care combines diagnostics, prevention, treatment, and monitoring — helping patients manage existing conditions, identify risks early, and recover safely after procedures.",
          ar: "تجمع رعايتها بين التشخيص والوقاية والعلاج والمراقبة — لمساعدة المرضى على إدارة الحالات القائمة ورصد المخاطر مبكرًا والتعافي الآمن بعد الإجراءات.",
        },
      },
    ],
    quote: {
      en: "“The best medicine is not only treatment — it is early detection, thoughtful prevention, and understanding the body before problems become urgent.”",
      ar: "«أفضل الطب ليس العلاج وحده — بل الاكتشاف المبكر والوقاية المدروسة وفهم الجسد قبل أن تصبح المشكلات طارئة.»",
    },
    outcome: {
      en: "Patients receive comprehensive medical guidance designed to protect long-term health, support prevention, and provide clarity before symptoms become urgent.",
      ar: "يحصل المرضى على توجيه طبي شامل يحمي الصحة طويلة الأمد ويدعم الوقاية ويمنح الوضوح قبل أن تصبح الأعراض طارئة.",
    },
    framework: {
      en: "At Molodost, Dr. Albina works within the 5D Longevity Framework, helping patients identify early risk factors, optimize internal health, and build a sustainable strategy for energy, vitality, and healthy aging.",
      ar: "تعمل د. ألبينا في مولودوست ضمن إطار الأبعاد الخمسة لطول العمر، لمساعدة المرضى على رصد عوامل الخطر مبكرًا وتحسين الصحة الداخلية وبناء استراتيجية مستدامة للطاقة والحيوية والشيخوخة الصحية.",
    },
    specialisations: [
      { en: "Preventive Health Assessment", ar: "تقييم الصحة الوقائية" },
      { en: "Cardiometabolic Health", ar: "صحة القلب والأيض" },
      { en: "Functional Health Assessment", ar: "التقييم الصحي الوظيفي" },
      { en: "Longevity-Oriented Care", ar: "رعاية موجهة لطول العمر" },
      {
        en: "Metabolic Balance & Weight-Related Concerns",
        ar: "التوازن الأيضي ومشاكل الوزن",
      },
      {
        en: "Blood Pressure & Cholesterol Risk Evaluation",
        ar: "تقييم مخاطر ضغط الدم والكوليسترول",
      },
      {
        en: "Energy, Fatigue & Lifestyle-Related Concerns",
        ar: "الطاقة والإرهاق ومشاكل نمط الحياة",
      },
      { en: "Cardiovascular Risk Awareness", ar: "الوعي بمخاطر القلب والأوعية" },
      {
        en: "ECG, Spirometry & Functional Diagnostics Coordination",
        ar: "تنسيق تخطيط القلب وقياس التنفس والتشخيص الوظيفي",
      },
      {
        en: "Post-Treatment & Post-Procedure Health Monitoring",
        ar: "المراقبة الصحية بعد العلاجات والإجراءات",
      },
      { en: "Personalized Health Planning", ar: "تخطيط صحي شخصي" },
      {
        en: "Medical Follow-Up & Patient Education",
        ar: "المتابعة الطبية وتثقيف المرضى",
      },
    ],
    languages: { en: "English, Russian", ar: "الإنجليزية والروسية" },
    heroPosition: "64.7% 27.4%",
    portrait: {
      src: "/images/specialist-2-uniform.jpg",
      width: 2482,
      height: 3311,
    },
  },
  "svetlana-skorodumova": {
    years: { en: "11 years", ar: "11 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "Combines manual, recovery-focused, and device-assisted body treatments to support lymphatic flow, ease tension, improve comfort, and promote overall wellbeing.",
      ar: "يجمع بين علاجات الجسم اليدوية والموجهة للتعافي والمدعومة بالأجهزة لدعم التدفق اللمفاوي وتخفيف التوتر وتحسين الراحة وتعزيز العافية العامة.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Svetlana’s approach supports body recovery by relieving tension, improving circulation, and helping the body return to physical balance.",
      ar: "يدعم نهج سفيتلانا استشفاء الجسم عبر تخفيف التوتر وتحسين الدورة الدموية ومساعدة الجسد على استعادة توازنه البدني.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "She begins by understanding the patient’s pain points, muscle tension, swelling, stress load, posture patterns, recovery needs, and body contour goals.",
          ar: "تبدأ بفهم نقاط الألم لدى المريض وتوتر العضلات والتورم وعبء التوتر وأنماط القوام واحتياجات التعافي وأهداف تنسيق القوام.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Her programs combine therapeutic massage, lymphatic drainage, relaxation techniques, rehabilitation support, and advanced body technologies such as Icoone Laser.",
          ar: "تجمع برامجها بين التدليك العلاجي والتصريف اللمفاوي وتقنيات الاسترخاء ودعم إعادة التأهيل وتقنيات الجسم المتقدمة مثل ليزر آيكون.",
        },
      },
    ],
    quote: {
      en: "“Recovery is not a luxury. It is how the body restores balance, releases tension, and returns to strength.”",
      ar: "«الاستشفاء ليس رفاهية. إنه الطريقة التي يستعيد بها الجسد توازنه ويطلق توتره ويعود إلى قوته.»",
    },
    outcome: {
      en: "Her work helps restore comfort, mobility, lightness, and physical wellbeing — supporting recovery from stress, physical load, chronic tension, and body imbalance.",
      ar: "يساعد عملها على استعادة الراحة والحركة والخفة والعافية البدنية — بدعم التعافي من التوتر والأحمال البدنية والشد المزمن واختلال توازن الجسم.",
    },
    framework: {
      en: "At Molodost, Svetlana’s work complements the 5D Longevity Framework by supporting the body’s recovery systems, circulation, lymphatic balance, stress release, and long-term vitality through structured non-invasive body treatments.",
      ar: "يكمّل عمل سفيتلانا في مولودوست إطار الأبعاد الخمسة لطول العمر عبر دعم أنظمة التعافي في الجسم والدورة الدموية والتوازن اللمفاوي وتفريغ التوتر والحيوية طويلة الأمد من خلال علاجات جسدية منظمة غير جراحية.",
    },
    specialisations: [
      { en: "Lymphatic Wellness", ar: "العافية اللمفاوية" },
      { en: "Body Recovery Support", ar: "دعم استشفاء الجسم" },
      { en: "Manual Massage Therapy", ar: "العلاج بالتدليك اليدوي" },
      { en: "Lymphatic Drainage", ar: "التصريف اللمفاوي" },
      { en: "Circulation Support", ar: "دعم الدورة الدموية" },
      { en: "Stress & Tension Relief", ar: "تخفيف التوتر والشد" },
      { en: "Muscle Relaxation", ar: "استرخاء العضلات" },
      { en: "Body Lightness & Fluid Balance", ar: "خفة الجسم وتوازن السوائل" },
      { en: "Post-Treatment Recovery Support", ar: "دعم التعافي بعد العلاجات" },
      { en: "Non-Invasive Body Care", ar: "العناية بالجسم دون تدخل جراحي" },
      { en: "Device-Assisted Body Treatments", ar: "علاجات الجسم بمساعدة الأجهزة" },
      { en: "Icoone Body Protocols", ar: "بروتوكولات آيكون للجسم" },
      {
        en: "Longevity-Oriented Wellness Support",
        ar: "دعم العافية الموجهة لطول العمر",
      },
    ],
    languages: { en: "Russian, English", ar: "الروسية والإنجليزية" },
    heroPosition: "50.8% 27.4%",
    portrait: {
      src: "/images/specialist-4-uniform.jpg",
      width: 2433,
      height: 3244,
    },
  },
  "tagir-hamad": {
    years: { en: "23 years", ar: "23 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "connects urinary health, metabolism, hormones, stress, lifestyle, and sexual wellbeing to support long-term male vitality through personalized care, screening, assessment, and follow-up.",
      ar: "يربط بين الصحة البولية والأيض والهرمونات والتوتر ونمط الحياة والصحة الجنسية لدعم حيوية الرجل طويلة الأمد من خلال رعاية شخصية وفحص وتقييم ومتابعة.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Thaer’s approach is built on precision, discretion, and a complete understanding of men’s urological and reproductive health.",
      ar: "يقوم نهج د. ثائر على الدقة والخصوصية والفهم الكامل لصحة الرجل البولية والإنجابية.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "He begins with a confidential consultation, detailed medical history, and focused evaluation of urinary function, prostate health, hormonal status, fertility, and sexual health.",
          ar: "يبدأ باستشارة سرية وتاريخ طبي مفصل وتقييم مركز للوظيفة البولية وصحة البروستاتا والحالة الهرمونية والخصوبة والصحة الجنسية.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "His treatment plans combine advanced diagnostics, ultrasound imaging, PCR testing when needed, medical therapy, minimally invasive options, and lifestyle guidance.",
          ar: "تجمع خططه العلاجية بين التشخيص المتقدم والتصوير بالموجات فوق الصوتية واختبار تفاعل البوليميراز المتسلسل عند الحاجة والعلاج الدوائي والخيارات محدودة التدخل وإرشاد نمط الحياة.",
        },
      },
    ],
    quote: {
      en: "“Men’s health requires trust, precision, and discretion. My role is to help patients restore function, confidence, and quality of life with dignity.”",
      ar: "«صحة الرجل تتطلب الثقة والدقة والخصوصية. دوري أن أساعد المرضى على استعادة الوظيفة والثقة وجودة الحياة بكرامة.»",
    },
    outcome: {
      en: "His care helps men restore function, confidence, and quality of life through accurate diagnosis, personalized treatment, and a respectful clinical experience.",
      ar: "تساعد رعايته الرجال على استعادة الوظيفة والثقة وجودة الحياة من خلال تشخيص دقيق وعلاج شخصي وتجربة سريرية محترمة.",
    },
    framework: {
      en: "At Molodost, Dr. Thaer works within the 5D Longevity Framework, helping men move beyond symptoms toward a deeper understanding of their performance, energy, hormonal patterns, reproductive health, and long-term wellbeing.",
      ar: "يعمل د. ثائر في مولودوست ضمن إطار الأبعاد الخمسة لطول العمر، لمساعدة الرجال على تجاوز الأعراض نحو فهم أعمق لأدائهم وطاقتهم وأنماطهم الهرمونية وصحتهم الإنجابية وعافيتهم طويلة الأمد.",
    },
    specialisations: [
      { en: "Men’s Health Assessment", ar: "تقييم صحة الرجل" },
      { en: "Urological Wellness Support", ar: "دعم الصحة البولية" },
      { en: "Hormonal Wellness Support", ar: "دعم التوازن الهرموني" },
      { en: "Male Vitality & Performance", ar: "حيوية الرجل وأداؤه" },
      {
        en: "Preventive Men’s Health Screening",
        ar: "الفحص الوقائي لصحة الرجل",
      },
      { en: "Urinary Health Concerns", ar: "مشاكل الصحة البولية" },
      { en: "Prostate Health Awareness", ar: "الوعي بصحة البروستاتا" },
      { en: "Sexual Wellness Support", ar: "دعم الصحة الجنسية" },
      {
        en: "Fertility & Reproductive Health Guidance",
        ar: "إرشاد الخصوبة والصحة الإنجابية",
      },
      {
        en: "Metabolic & Lifestyle-Related Concerns",
        ar: "المشاكل الأيضية ومشاكل نمط الحياة",
      },
      { en: "Longevity-Oriented Male Health", ar: "صحة الرجل الموجهة لطول العمر" },
      { en: "Personalized Health Planning", ar: "تخطيط صحي شخصي" },
      {
        en: "Medical Follow-Up & Patient Education",
        ar: "المتابعة الطبية وتثقيف المرضى",
      },
    ],
    languages: {
      en: "Russian, English, Arabic",
      ar: "الروسية والإنجليزية والعربية",
    },
    heroPosition: "65.3% 25%",
    portrait: {
      src: "/images/specialist-6-uniform.jpg",
      width: 2640,
      height: 3522,
    },
  },
};
