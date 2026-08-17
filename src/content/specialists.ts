import type { Localized } from "./types";

export interface Specialist {
  id: string;
  name: Localized;
  roles: Localized;
  bio: Localized;
  image: { src: string; width: number; height: number };
  /** Blob-mask variant cycled across the grid (design-inventory §9). */
  mask: 1 | 2 | 3;
}

export const specialists: Specialist[] = [
  {
    id: "regina-markuseeva",
    name: { en: "Dr. Regina Markuseeva", ar: "د. ريجينا ماركوسييفا" },
    roles: {
      en: "GP Aesthetics, Skin Longevity, Hair Wellness & Preventive Aesthetic Medicine",
      ar: "طب عام تجميلي، شباب البشرة، صحة الشعر والطب التجميلي الوقائي",
    },
    bio: {
      en: "An experienced DHA-licensed General Practitioner with over 15 years of clinical experience and a strong clinical focus on skin health, hair wellness, preventive aesthetic care, and longevity-oriented beauty.",
      ar: "طبيبة عامة مرخّصة من هيئة الصحة بدبي بخبرة سريرية تتجاوز 15 عامًا، مع تركيز قوي على صحة البشرة والشعر والعناية التجميلية الوقائية والجمال الموجّه لطول العمر.",
    },
    image: { src: "/images/specialist-1.jpg", width: 868, height: 824 },
    mask: 1,
  },
  {
    id: "zarema-nashemuk",
    name: { en: "Dr. Zarema Nashemuk", ar: "د. زاريما ناشيموك" },
    roles: {
      en: "GP in functional medicine, preventive health, hormonal support, metabolic health, women's longevity care",
      ar: "طب عام في الطب الوظيفي، الصحة الوقائية، الدعم الهرموني، الصحة الأيضية ورعاية طول العمر للنساء",
    },
    bio: {
      en: "An experienced DHA-licensed doctor with over 13 years of clinical experience and a strong clinical focus on women's health, hormonal wellness, preventive medicine, and longevity-oriented care.",
      ar: "طبيبة مرخّصة من هيئة الصحة بدبي بخبرة سريرية تتجاوز 13 عامًا، مع تركيز قوي على صحة المرأة والتوازن الهرموني والطب الوقائي والرعاية الموجّهة لطول العمر.",
    },
    image: { src: "/images/specialist-2.jpg", width: 868, height: 824 },
    mask: 2,
  },
  {
    id: "areej-hillis",
    name: { en: "Dr. Areej Hilles", ar: "د. أريج حلّس" },
    roles: {
      en: "Molodost clinic's CEO, MD, Women's Health, Functional, Preventive Medicine, Peptide Therapy & Longevity",
      ar: "الرئيسة التنفيذية لعيادة مولودوست، طبيبة، صحة المرأة، الطب الوظيفي والوقائي، العلاج بالببتيدات وطول العمر",
    },
    bio: {
      en: "DHA-licensed MD, and CEO of Molodost Clinic Dubai, with a clinical focus on preventive medicine, hormonal wellness, peptide therapy assessment, and longevity-oriented care.",
      ar: "طبيبة مرخّصة من هيئة الصحة بدبي والرئيسة التنفيذية لعيادة مولودوست دبي، مع تركيز سريري على الطب الوقائي والتوازن الهرموني وتقييم العلاج بالببتيدات ورعاية طول العمر.",
    },
    image: { src: "/images/specialist-3.jpg", width: 868, height: 824 },
    mask: 3,
  },
  {
    id: "albina-nurgazizova",
    name: { en: "Dr. Albina Nurgazizova", ar: "د. ألبينا نورغازيزوفا" },
    roles: {
      en: "GP, Cardiometabolic Health, Functional & Preventive Longevity",
      ar: "طب عام، صحة القلب والأيض، طول العمر الوظيفي والوقائي",
    },
    bio: {
      en: "An experienced DHA-licensed General Practitioner with a strong clinical focus on preventive medicine, cardiometabolic health, functional assessment, and longevity-oriented care.",
      ar: "طبيبة عامة مرخّصة من هيئة الصحة بدبي مع تركيز سريري قوي على الطب الوقائي وصحة القلب والأيض والتقييم الوظيفي والرعاية الموجّهة لطول العمر.",
    },
    image: { src: "/images/specialist-4.jpg", width: 868, height: 824 },
    mask: 2,
  },
  {
    id: "svetlana-skorodumova",
    name: { en: "Svetlana Skorodumova", ar: "سفيتلانا سكورودوموفا" },
    roles: {
      en: "Licensed Massage Therapist, Lymphatic Therapy, Body Recovery & Longevity wellness",
      ar: "أخصائية تدليك مرخّصة، العلاج اللمفاوي، استشفاء الجسم وعافية طول العمر",
    },
    bio: {
      en: "An experienced licensed massage therapist with over 10 years of professional experience and a strong focus on lymphatic wellness, body recovery, circulation support, and longevity-oriented body care.",
      ar: "أخصائية تدليك مرخّصة بخبرة مهنية تتجاوز 10 سنوات، مع تركيز قوي على الصحة اللمفاوية واستشفاء الجسم ودعم الدورة الدموية والعناية الجسدية الموجّهة لطول العمر.",
    },
    image: { src: "/images/specialist-5.jpg", width: 868, height: 824 },
    mask: 1,
  },
  {
    id: "tagir-hamad",
    name: { en: "Dr. Thaer Hamad", ar: "د. ثائر حمد" },
    roles: {
      en: "GP, Preventive medicine, Men's Health & Performance Optimization",
      ar: "طب عام، الطب الوقائي، صحة الرجل وتحسين الأداء",
    },
    bio: {
      en: "DHA-licensed General Practitioner with 22+ years of experience in men's health, urological wellness, hormonal support, and longevity care.",
      ar: "طبيب عام مرخّص من هيئة الصحة بدبي بخبرة تتجاوز 22 عامًا في صحة الرجل والصحة البولية والدعم الهرموني ورعاية طول العمر.",
    },
    image: { src: "/images/specialist-6.jpg", width: 868, height: 824 },
    mask: 3,
  },
];
