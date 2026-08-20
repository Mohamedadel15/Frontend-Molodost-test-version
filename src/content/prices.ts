import type { Localized } from "./types";

export interface PriceItem {
  name: Localized;
  note?: Localized;
  /** AED reference amount; null = consultation required / on request. */
  amount: number | null;
}

export interface PriceCategory {
  id: string;
  label: Localized;
  items: PriceItem[];
}

/*
 * /prices — category tabs from the reference. Only the Gynecology list is
 * present in the production static HTML (other tabs render client-side
 * there); remaining categories await client data (design-inventory §17).
 * Amounts are AED reference figures; EG pricing pending client data.
 */
/*
 * /prices — categories from the production page (molodostlongevity.com/prices).
 * Only the Gynecology list is present in the production static HTML (other
 * categories render client-side there); remaining categories await client
 * data (design-inventory §17). Items and order match production exactly.
 * Amounts are AED reference figures; EG pricing pending client data.
 */
export const priceCategories: PriceCategory[] = [
  {
    id: "gynecology",
    label: { en: "Gynecology", ar: "أمراض النساء" },
    items: [
      { name: { en: "Gynecologist consultation", ar: "استشارة طبيبة نساء" }, amount: 500 },
      { name: { en: "Ultrasound of the pelvic organs (pregnancy diagnosis)", ar: "تصوير أعضاء الحوض بالموجات فوق الصوتية (تشخيص الحمل)" }, amount: 720 },
      { name: { en: "Ultrasound of the kidneys", ar: "تصوير الكلى بالموجات فوق الصوتية" }, amount: 600 },
      { name: { en: "Vaginal douche", ar: "غسول مهبلي" }, amount: 200 },
      { name: { en: "Removal of a lost IUD (intrauterine device)", ar: "إزالة لولب مفقود" }, amount: 3000 },
      { name: { en: "Eurogine Gold T IUD", ar: "لولب Eurogine Gold T" }, amount: 2500 },
      { name: { en: "Ultrasound of singleton pregnancy at 1-14 weeks", ar: "تصوير حمل مفرد في الأسابيع 1-14" }, amount: 800 },
      { name: { en: "Pregnancy screening at 11-13.3 weeks", ar: "فحص الحمل في الأسابيع 11-13.3" }, note: { en: "Consultation + ultrasound + Down syndrome tests + genetic abnormalities + gender determination", ar: "استشارة + تصوير + فحوص متلازمة داون + التشوهات الجينية + تحديد الجنس" }, amount: 4200 },
      { name: { en: "Ultrasound of a singleton pregnancy at 22-40 weeks", ar: "تصوير حمل مفرد في الأسابيع 22-40" }, amount: 1300 },
      { name: { en: "CTG", ar: "تخطيط قلب الجنين (CTG)" }, amount: 500 },
      { name: { en: "Smear for flora", ar: "مسحة فلورا" }, amount: 350 },
      { name: { en: "Filler injection (1 ml) G-spot", ar: "حقن فيلر (1 مل)" }, note: { en: "Consultation required", ar: "تلزم استشارة مسبقة" }, amount: 2000 },
      { name: { en: "Hardware rejuvenation one-time visit + consultation (1 hour)", ar: "جلسة تجديد بالأجهزة + استشارة (ساعة)" }, amount: 2000 },
      { name: { en: "Hardware rejuvenation package of 5 sessions", ar: "باقة تجديد بالأجهزة — 5 جلسات" }, amount: 4990 },
      { name: { en: "Fertility consultation", ar: "استشارة خصوبة" }, amount: 500 },
      { name: { en: "CHEKAP (consultation + pelvic ultrasound)", ar: "فحص شامل (استشارة + تصوير حوض)" }, amount: 990 },
      { name: { en: "Folliculometry", ar: "متابعة التبويض (فوليكولومتري)" }, amount: 600 },
      { name: { en: "Removing the IMPLANON contraceptive", ar: "إزالة غرسة إمبلانون" }, amount: 2000 },
      { name: { en: "IUD removal (uncomplicated)", ar: "إزالة لولب (غير معقدة)" }, amount: 1100 },
      { name: { en: "Mirena IUD insertion", ar: "تركيب لولب ميرينا" }, note: { en: "Includes the cost of the coil", ar: "شامل تكلفة اللولب" }, amount: 3000 },
      { name: { en: "Ultrasound of multiple pregnancy at 1-14 weeks", ar: "تصوير حمل متعدد في الأسابيع 1-14" }, amount: 1000 },
      { name: { en: "Ultrasound of a singleton pregnancy at 14-22 weeks", ar: "تصوير حمل مفرد في الأسابيع 14-22" }, amount: 1100 },
      { name: { en: "Ultrasound of multiple pregnancy at 22-40 weeks", ar: "تصوير حمل متعدد في الأسابيع 22-40" }, amount: 1700 },
      { name: { en: "Cervical ultrasound (CXL)", ar: "تصوير عنق الرحم (CXL)" }, amount: 600 },
      { name: { en: "Colposcopy", ar: "تنظير عنق الرحم" }, amount: 2500 },
      { name: { en: "Filler injection (2 ml) urinary incontinence", ar: "حقن فيلر (2 مل) لسلس البول" }, note: { en: "Consultation required", ar: "تلزم استشارة مسبقة" }, amount: 4000 },
      { name: { en: "Hardware rejuvenation one-time visit (30 min)", ar: "جلسة تجديد بالأجهزة (30 دقيقة)" }, amount: 1500 },
      { name: { en: "Pelvic Floor Chair — Session 1", ar: "كرسي قاع الحوض — جلسة" }, amount: 250 },
      { name: { en: "Online video consultation", ar: "استشارة عبر الفيديو" }, amount: 350 },
      { name: { en: "CHEKAP (consultation + pelvic + breast + thyroid ultrasound)", ar: "فحص شامل (استشارة + تصوير حوض وثدي وغدة درقية)" }, amount: 2160 },
      { name: { en: "Ultrasound of the abdominal cavity", ar: "تصوير البطن بالموجات فوق الصوتية" }, amount: 1000 },
      { name: { en: "Insertion of the contraceptive IMPLANON", ar: "تركيب غرسة إمبلانون" }, amount: 2800 },
      { name: { en: "CU 375 IUD", ar: "لولب CU 375" }, amount: 1800 },
      { name: { en: "Pipelle endometrial biopsy", ar: "خزعة بطانة الرحم (بيبيل)" }, amount: 3000 },
      { name: { en: "Pregnancy screening at 12-14 weeks", ar: "فحص الحمل في الأسابيع 12-14" }, note: { en: "Consultation + ultrasound in hospital + Down syndrome tests", ar: "استشارة + تصوير في المستشفى + فحوص متلازمة داون" }, amount: 2200 },
      { name: { en: "Ultrasound of multiple pregnancy at 14-22 weeks", ar: "تصوير حمل متعدد في الأسابيع 14-22" }, amount: 1400 },
      { name: { en: "Dopplerography (for pregnant women)", ar: "تصوير دوبلر (للحوامل)" }, amount: 800 },
      { name: { en: "Cervical ultrasound (CXL) + fetal heart rate (FH)", ar: "تصوير عنق الرحم + نبض الجنين" }, amount: 700 },
      { name: { en: "PRP (3 tubes)", ar: "بلازما PRP (3 أنابيب)" }, note: { en: "Consultation required", ar: "تلزم استشارة مسبقة" }, amount: 2500 },
      { name: { en: "Pap smear", ar: "مسحة عنق الرحم (باب سمير)" }, amount: 350 },
      { name: { en: "Hardware rejuvenation package of 3 sessions", ar: "باقة تجديد بالأجهزة — 3 جلسات" }, amount: 3900 },
      { name: { en: "Pelvic Floor Chair — 10 sessions", ar: "كرسي قاع الحوض — 10 جلسات" }, amount: 2300 },
    ],
  },
];

export const pendingCategories: Localized[] = [
  { en: "Phlebology", ar: "أمراض الأوردة" },
  { en: "Ultrasound", ar: "الموجات فوق الصوتية" },
  { en: "Urology", ar: "المسالك البولية" },
  { en: "Orthopedics", ar: "العظام" },
  { en: "Cosmetology", ar: "التجميل" },
  { en: "Doctor's house call", ar: "زيارة الطبيب المنزلية" },
  { en: "Pregnancy Management", ar: "متابعة الحمل" },
  { en: "Weight loss", ar: "إنقاص الوزن" },
  { en: "IVs", ar: "المحاليل الوريدية" },
  { en: "Dietetics", ar: "التغذية" },
  { en: "Check-ups", ar: "الفحوصات الشاملة" },
  { en: "Online support", ar: "الدعم عن بُعد" },
  { en: "Massage", ar: "التدليك" },
  { en: "Neurology", ar: "الأعصاب" },
];
