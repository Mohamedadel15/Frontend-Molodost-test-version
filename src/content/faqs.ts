import type { Localized } from "./types";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const faqs: FaqItem[] = [
  {
    id: "approach",
    question: {
      en: "What is the Molodost' approach?",
      ar: "ما هو نهج مولودوست؟",
    },
    answer: {
      en: "Molodost' is built around precision longevity: diagnostics first, then a personalized protocol for vitality, regeneration, and long-term biological performance.",
      ar: "يقوم نهج مولودوست على الدقة في رعاية طول العمر: التشخيص أولًا، ثم بروتوكول شخصي للحيوية والتجديد والأداء البيولوجي طويل الأمد.",
    },
  },
  {
    id: "first-visit",
    question: {
      en: "What happens during the first visit?",
      ar: "ماذا يحدث في الزيارة الأولى؟",
    },
    answer: {
      en: "We begin with a detailed consultation and biological mapping. Your physician reviews goals, symptoms, lifestyle, and available biomarkers before recommending the next diagnostic or treatment step.",
      ar: "نبدأ باستشارة مفصّلة ورسم خريطة بيولوجية. يراجع طبيبك الأهداف والأعراض ونمط الحياة والمؤشرات الحيوية المتاحة قبل التوصية بالخطوة التشخيصية أو العلاجية التالية.",
    },
  },
  {
    id: "concierge",
    question: {
      en: "Do you offer in-clinic and concierge care?",
      ar: "هل تقدمون الرعاية في العيادة وخدمة الكونسيرج؟",
    },
    answer: {
      en: "Yes. Some services are delivered in the clinic, while select physician-supervised care and IV protocols can be arranged privately through concierge support.",
      ar: "نعم. تُقدَّم بعض الخدمات في العيادة، بينما يمكن ترتيب رعاية مختارة بإشراف الأطباء وبروتوكولات وريدية بشكل خاص عبر خدمة الكونسيرج.",
    },
  },
  {
    id: "standardized",
    question: {
      en: "Are protocols standardized?",
      ar: "هل البروتوكولات موحّدة؟",
    },
    answer: {
      en: "No. Every protocol is personalized around your biomarkers, clinical history, goals, and response over time. Progress is monitored and adjusted rather than assumed.",
      ar: "لا. كل بروتوكول مصمم شخصيًا وفق مؤشراتك الحيوية وتاريخك السريري وأهدافك واستجابتك مع الوقت. يُراقَب التقدم ويُعدَّل ولا يُفترض.",
    },
  },
  {
    id: "privacy",
    question: {
      en: "Is my medical information private?",
      ar: "هل معلوماتي الطبية سرّية؟",
    },
    answer: {
      en: "Yes. Privacy and discretion are central to the experience. Personal and medical information is handled only by authorized team members involved in your care.",
      ar: "نعم. الخصوصية والسرّية جوهر التجربة. تُتداول المعلومات الشخصية والطبية فقط من قبل أعضاء الفريق المخوّلين المعنيين برعايتك.",
    },
  },
  {
    id: "services-included",
    question: {
      en: "What services can be included?",
      ar: "ما الخدمات التي يمكن أن تشملها الرعاية؟",
    },
    answer: {
      en: "Depending on your goals, care may include 5D diagnostics, regenerative therapies, hormonal and metabolic optimization, cognitive enhancement, aesthetic regeneration, IV therapy, or physician-supervised recovery programs.",
      ar: "وفقًا لأهدافك، قد تشمل الرعاية تشخيصات الأبعاد الخمسة، والعلاجات التجديدية، وتحسين الهرمونات والأيض، وتعزيز القدرات الذهنية، والتجديد الجمالي، والعلاج الوريدي، أو برامج التعافي بإشراف الأطباء.",
    },
  },
];
