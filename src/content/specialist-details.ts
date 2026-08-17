import type { Localized } from "./types";

export interface SpecialistDetail {
  years: Localized;
  focusTitle: Localized;
  focus: Localized;
  approachTitle: Localized;
  approachIntro: Localized;
  sections: Array<{ heading: Localized; body: Localized }>;
  quote: Localized;
}

/*
 * Detail-page content keyed by specialist id. Dr. Regina's entry follows the
 * production page verbatim; the others are consistent drafts pending client
 * copy (same structure as the production template).
 */
export const specialistDetails: Record<string, SpecialistDetail> = {
  "regina-markuseeva": {
    years: { en: "14 years", ar: "14 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "Her work combines medical assessment, skin and scalp health evaluation, aesthetic wellness planning, and personalized treatment protocols designed to support healthy aging, natural-looking results, and long-term skin quality.",
      ar: "يجمع عملها بين التقييم الطبي وتقييم صحة البشرة وفروة الرأس وتخطيط العافية الجمالية وبروتوكولات علاجية شخصية تدعم الشيخوخة الصحية والنتائج الطبيعية وجودة البشرة على المدى الطويل.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Regina's approach combines medical dermatology, aesthetic medicine, and trichology to improve skin, hair, and appearance with precision and natural-looking results.",
      ar: "يجمع نهج د. ريجينا بين طب الجلد والطب التجميلي وعلوم الشعر لتحسين البشرة والشعر والمظهر بدقة ونتائج طبيعية.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "She begins by evaluating the condition beneath the surface — skin quality, inflammation, hair health, scalp condition, facial structure, and the patient's aesthetic goals.",
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
  },
  "zarema-nashemuk": {
    years: { en: "13 years", ar: "13 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "Her practice centers on women's health across the lifespan — hormonal wellness, metabolic balance, preventive screening, and longevity-oriented care built on precise diagnostics.",
      ar: "تتمحور ممارستها حول صحة المرأة عبر مراحل العمر — التوازن الهرموني والأيضي والفحص الوقائي ورعاية طول العمر المبنية على تشخيص دقيق.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Zarema connects functional medicine with everyday practicality, translating biomarkers into plans women can sustain.",
      ar: "تربط د. زاريما الطب الوظيفي بالواقع العملي اليومي، محوّلة المؤشرات الحيوية إلى خطط تستطيع النساء الالتزام بها.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "Consultations begin with history, symptoms, lifestyle, and targeted panels covering hormonal and metabolic health.",
          ar: "تبدأ الاستشارات بالتاريخ الصحي والأعراض ونمط الحياة وفحوصات موجهة تغطي الصحة الهرمونية والأيضية.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Plans combine hormonal support, nutrition, recovery, and follow-up markers so progress is measured, not assumed.",
          ar: "تجمع الخطط بين الدعم الهرموني والتغذية والتعافي ومؤشرات المتابعة ليُقاس التقدم لا أن يُفترض.",
        },
      },
    ],
    quote: {
      en: "“Women's health deserves precision — not averages.”",
      ar: "«صحة المرأة تستحق الدقة — لا المتوسطات.»",
    },
  },
  "areej-hillis": {
    years: { en: "12 years", ar: "12 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "As CEO and physician, she bridges clinical strategy and personal care — preventive medicine, hormonal wellness, peptide therapy assessment, and longevity planning.",
      ar: "بصفتها الرئيسة التنفيذية وطبيبة، تجمع بين الاستراتيجية السريرية والرعاية الشخصية — الطب الوقائي والتوازن الهرموني وتقييم العلاج بالببتيدات وتخطيط طول العمر.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Areej builds protocols that treat longevity as a system: measure first, intervene with intent, and review with discipline.",
      ar: "تبني د. أريج بروتوكولات تتعامل مع طول العمر كنظام: القياس أولًا، ثم التدخل بقصد، والمراجعة بانضباط.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "Baseline diagnostics map hormonal, metabolic, and inflammatory status before any protocol is designed.",
          ar: "ترسم التشخيصات الأساسية الحالة الهرمونية والأيضية والالتهابية قبل تصميم أي بروتوكول.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Care integrates preventive medicine, peptide strategies, and regenerative support, adjusted as markers respond.",
          ar: "تدمج الرعاية الطب الوقائي واستراتيجيات الببتيدات والدعم التجديدي، مع التعديل وفق استجابة المؤشرات.",
        },
      },
    ],
    quote: {
      en: "“We don't treat the passage of time — we refine the way you experience it.”",
      ar: "«نحن لا نعالج مرور الزمن — بل نصقل طريقة عيشك له.»",
    },
  },
  "albina-nurgazizova": {
    years: { en: "10 years", ar: "10 أعوام" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "Preventive medicine, cardiometabolic health, and functional assessment — identifying risk early and protecting long-term capacity.",
      ar: "الطب الوقائي وصحة القلب والأيض والتقييم الوظيفي — رصد المخاطر مبكرًا وحماية القدرة طويلة الأمد.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Albina reads cardiometabolic signals as an early-warning system, then builds practical correction plans.",
      ar: "تقرأ د. ألبينا إشارات القلب والأيض كنظام إنذار مبكر، ثم تبني خطط تصحيح عملية.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "Assessment covers lipids, glucose dynamics, blood pressure patterns, inflammation, and functional capacity.",
          ar: "يشمل التقييم الدهون وديناميكية الغلوكوز وأنماط ضغط الدم والالتهاب والقدرة الوظيفية.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Protocols pair medical correction with lifestyle design and scheduled retesting to compound results.",
          ar: "تجمع البروتوكولات بين التصحيح الطبي وتصميم نمط الحياة وإعادة الفحص المجدولة لمضاعفة النتائج.",
        },
      },
    ],
    quote: {
      en: "“Prevention is the most powerful prescription we have.”",
      ar: "«الوقاية هي أقوى وصفة نملكها.»",
    },
  },
  "svetlana-skorodumova": {
    years: { en: "10 years", ar: "10 أعوام" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "Lymphatic therapy, body recovery, and circulation support — hands-on care that complements medical longevity protocols.",
      ar: "العلاج اللمفاوي واستشفاء الجسم ودعم الدورة الدموية — رعاية يدوية تكمّل بروتوكولات طول العمر الطبية.",
    },
    approachTitle: { en: "The Therapeutic Approach", ar: "النهج العلاجي" },
    approachIntro: {
      en: "Svetlana integrates lymphatic technique with recovery goals set alongside the medical team.",
      ar: "تدمج سفيتلانا تقنيات التصريف اللمفاوي مع أهداف تعافٍ تُحدد بالتنسيق مع الفريق الطبي.",
    },
    sections: [
      {
        heading: { en: "Session Design", ar: "تصميم الجلسات" },
        body: {
          en: "Each session is planned around the client's recovery state, training load, and treatment schedule.",
          ar: "تُخطط كل جلسة وفق حالة التعافي وحمل التدريب وجدول العلاج لكل عميل.",
        },
      },
      {
        heading: { en: "Recovery Integration", ar: "دمج التعافي" },
        body: {
          en: "Manual therapy supports circulation, drainage, and body recovery as part of the broader longevity plan.",
          ar: "يدعم العلاج اليدوي الدورة الدموية والتصريف واستشفاء الجسم ضمن خطة طول العمر الأشمل.",
        },
      },
    ],
    quote: {
      en: "“The body heals better when recovery is treated as part of the medicine.”",
      ar: "«يتعافى الجسد بشكل أفضل عندما يُعامل الاستشفاء كجزء من العلاج.»",
    },
  },
  "tagir-hamad": {
    years: { en: "22+ years", ar: "أكثر من 22 عامًا" },
    focusTitle: { en: "The Clinical Focus", ar: "التركيز السريري" },
    focus: {
      en: "Men's health, urological wellness, hormonal support, and performance optimization built on preventive foundations.",
      ar: "صحة الرجل والصحة البولية والدعم الهرموني وتحسين الأداء على أسس وقائية.",
    },
    approachTitle: { en: "The Medical Approach", ar: "النهج الطبي" },
    approachIntro: {
      en: "Dr. Thaer treats performance and longevity as connected outcomes of the same measured biology.",
      ar: "يتعامل د. ثائر مع الأداء وطول العمر كنتيجتين مترابطتين لبيولوجيا واحدة مقاسة.",
    },
    sections: [
      {
        heading: { en: "Clinical Assessment", ar: "التقييم السريري" },
        body: {
          en: "Evaluation spans hormonal profile, urological health, metabolic function, and recovery capacity.",
          ar: "يشمل التقييم الملف الهرموني والصحة البولية والوظيفة الأيضية والقدرة على التعافي.",
        },
      },
      {
        heading: { en: "Personalized Care Strategy", ar: "استراتيجية رعاية شخصية" },
        body: {
          en: "Protocols balance testosterone health, cardiovascular safety, and sustainable performance gains.",
          ar: "توازن البروتوكولات بين صحة التستوستيرون وسلامة القلب والأوعية ومكاسب أداء مستدامة.",
        },
      },
    ],
    quote: {
      en: "“Strong performance at fifty is built by decisions made at forty.”",
      ar: "«الأداء القوي في الخمسين تصنعه قرارات الأربعين.»",
    },
  },
};
