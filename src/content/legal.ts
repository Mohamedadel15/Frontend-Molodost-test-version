import type { Localized } from "./types";

export interface LegalDoc {
  title: Localized;
  updated: Localized;
  intro: Localized;
  sections: Array<{
    heading: Localized;
    body: Localized;
    /** Optional bullet list rendered after the body (production marks it up as a <ul>). */
    items?: Localized[];
  }>;
}

/*
 * Legal texts — English follows the production site; Arabic is a DRAFT
 * translation pending legal review (design-inventory §17).
 */
export const privacyPolicy: LegalDoc = {
  title: { en: "Privacy Policy.", ar: "سياسة الخصوصية." },
  updated: { en: "Last updated: September 17, 2025", ar: "آخر تحديث: 17 سبتمبر 2025" },
  intro: {
    en: "At Molodost', we are committed to protecting your privacy and safeguarding your personal and medical information. This Privacy Policy explains what information we collect, how we use it, and what choices you have when using our website and services.",
    ar: "في مولودوست، نلتزم بحماية خصوصيتك وصون معلوماتك الشخصية والطبية. توضح سياسة الخصوصية هذه ما نجمعه من معلومات وكيف نستخدمها وما الخيارات المتاحة لك عند استخدام موقعنا وخدماتنا.",
  },
  sections: [
    {
      heading: { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
      body: {
        en: "We collect personal information that you voluntarily provide through forms, bookings, or communication — such as your name, email address, phone number, and details you choose to share when reaching out to us. We may also collect limited technical data to improve website functionality. Sensitive medical information is handled with care and only for service coordination and clinical follow-up.",
        ar: "نجمع المعلومات الشخصية التي تقدمها طوعًا عبر النماذج أو الحجوزات أو التواصل — مثل الاسم والبريد الإلكتروني ورقم الهاتف وما تختار مشاركته معنا. وقد نجمع بيانات تقنية محدودة لتحسين عمل الموقع. تُعامل المعلومات الطبية الحساسة بعناية ولأغراض تنسيق الخدمة والمتابعة السريرية فقط.",
      },
    },
    {
      heading: { en: "How We Use Your Information", ar: "كيف نستخدم معلوماتك" },
      body: {
        en: "The information you provide allows us to communicate with you, respond to inquiries, and deliver services effectively. It may also be used to improve our website or send occasional updates if you've opted in. We do not sell or rent your information to third parties. We also do not use your data for advertising or behavioral targeting.",
        ar: "تتيح لنا المعلومات التي تقدمها التواصل معك والرد على الاستفسارات وتقديم الخدمات بفعالية. وقد تُستخدم لتحسين موقعنا أو لإرسال تحديثات دورية إذا اشتركت بذلك. نحن لا نبيع معلوماتك ولا نؤجرها لأطراف ثالثة، ولا نستخدم بياناتك للإعلانات أو الاستهداف السلوكي.",
      },
    },
    {
      heading: { en: "Data Storage & Security", ar: "تخزين البيانات وأمنها" },
      body: {
        en: "All personal data is stored using secure, encrypted systems and is accessible only to authorized team members. We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or alteration. Despite our efforts, no online platform is entirely risk-free. If a data breach ever occurs, we will notify affected individuals as required by law.",
        ar: "تُخزَّن جميع البيانات الشخصية في أنظمة آمنة ومشفّرة ولا يصل إليها إلا أعضاء الفريق المخوّلون. نطبق تدابير أمنية وفق معايير الصناعة لحماية معلوماتك من الوصول أو الإفشاء أو التعديل غير المصرح به. ورغم جهودنا، لا توجد منصة إلكترونية خالية تمامًا من المخاطر؛ وفي حال وقوع خرق للبيانات سنخطر المتأثرين وفق ما يقتضيه القانون.",
      },
    },
    {
      heading: { en: "Cookies", ar: "ملفات تعريف الارتباط" },
      body: {
        en: "We may use cookies (small data files) to understand how visitors interact with our website. This helps us improve your experience. You can choose to disable cookies in your browser settings at any time.",
        ar: "قد نستخدم ملفات تعريف الارتباط (ملفات بيانات صغيرة) لفهم كيفية تفاعل الزوار مع موقعنا وتحسين تجربتك. يمكنك تعطيلها من إعدادات المتصفح في أي وقت.",
      },
    },
    {
      heading: { en: "Your Rights", ar: "حقوقك" },
      body: {
        en: "You have the right to access, correct, or delete your personal information at any time. If you would like to review the data we've stored, or request its removal, you can contact us directly using the details below. You can also unsubscribe from our email communications at any time via the unsubscribe link or by reaching out to us.",
        ar: "يحق لك الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها في أي وقت. إذا رغبت في مراجعة بياناتك المخزنة أو طلب إزالتها فتواصل معنا مباشرة. كما يمكنك إلغاء الاشتراك في رسائلنا البريدية في أي وقت عبر رابط إلغاء الاشتراك أو بالتواصل معنا.",
      },
    },
    {
      heading: { en: "Changes to This Policy", ar: "التغييرات على هذه السياسة" },
      body: {
        en: "This policy may be updated from time to time. When significant changes are made, we will update the date at the top of this page and, when appropriate, notify you by email or through the website.",
        ar: "قد تُحدَّث هذه السياسة من حين لآخر. وعند إجراء تغييرات جوهرية سنحدّث التاريخ أعلى هذه الصفحة، وسنخطرك عبر البريد الإلكتروني أو الموقع عند الاقتضاء.",
      },
    },
    {
      heading: { en: "Contact", ar: "التواصل" },
      body: {
        en: "If you have any questions or concerns about this Privacy Policy, please use the contact options on our booking page.",
        ar: "إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، فاستخدم وسائل التواصل في صفحة الحجز.",
      },
    },
  ],
};

export const termsOfUse: LegalDoc = {
  title: { en: "Terms of Use.", ar: "شروط الاستخدام." },
  updated: { en: "Last updated: September 17, 2025", ar: "آخر تحديث: 17 سبتمبر 2025" },
  intro: {
    en: "These Terms of Use govern your access to and use of our website and services. By visiting this site, you agree to comply with and be bound by these Terms. If you do not agree, please do not use the site.",
    ar: "تحكم شروط الاستخدام هذه وصولك إلى موقعنا وخدماتنا واستخدامك لهما. بزيارتك هذا الموقع فإنك توافق على الالتزام بهذه الشروط. إذا لم توافق، يُرجى عدم استخدام الموقع.",
  },
  sections: [
    {
      heading: { en: "Website Purpose", ar: "غرض الموقع" },
      body: {
        en: "Molodost' provides general information about longevity medicine, regenerative care, aesthetic regeneration, diagnostics, and related medical services. Website content is informational only and is not a substitute for an individual medical consultation, diagnosis, or treatment plan.",
        ar: "يقدم موقع مولودوست معلومات عامة عن طب طول العمر والرعاية التجديدية والتجديد الجمالي والتشخيصات والخدمات الطبية ذات الصلة. محتوى الموقع معلوماتي فقط وليس بديلًا عن استشارة طبية فردية أو تشخيص أو خطة علاج.",
      },
    },
    {
      heading: { en: "Use of the Site", ar: "استخدام الموقع" },
      body: {
        en: "You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of others. You must not:",
        ar: "توافق على استخدام هذا الموقع لأغراض مشروعة فقط وبما لا ينتهك حقوق الآخرين. يُحظر عليك:",
      },
      items: [
        { en: "Misuse the website by knowingly introducing harmful software or code", ar: "إساءة استخدام الموقع بإدخال برمجيات أو شيفرات ضارة عمدًا" },
        { en: "Attempt to gain unauthorized access to the site or its servers", ar: "محاولة الوصول غير المصرح به إلى الموقع أو خوادمه" },
        { en: "Use content from the website for commercial purposes without permission", ar: "استخدام محتوى الموقع لأغراض تجارية دون إذن" },
      ],
    },
    {
      heading: { en: "Intellectual Property", ar: "الملكية الفكرية" },
      body: {
        en: "All content on this website — including text, images, graphics, branding, and layout — is the property of Molodost' or its content providers and is protected by copyright laws. You may view, download, or print content for personal, non-commercial use only. Reproduction or redistribution without permission is prohibited.",
        ar: "جميع محتويات هذا الموقع — بما فيها النصوص والصور والرسومات والهوية والتصميم — ملك لمولودوست أو لمزوّدي المحتوى لديها ومحمية بقوانين حقوق النشر. يجوز لك عرض المحتوى أو تنزيله أو طباعته للاستخدام الشخصي غير التجاري فقط، ويُحظر نسخه أو إعادة توزيعه دون إذن.",
      },
    },
    {
      heading: { en: "External Links", ar: "الروابط الخارجية" },
      body: {
        en: "Our website may contain links to third-party websites or services. These links are provided for convenience and do not imply endorsement. We are not responsible for the content or practices of any external websites.",
        ar: "قد يحتوي موقعنا على روابط لمواقع أو خدمات خارجية. تُقدَّم هذه الروابط للتسهيل ولا تعني تأييدًا لها، ولسنا مسؤولين عن محتوى المواقع الخارجية أو ممارساتها.",
      },
    },
    {
      heading: { en: "Disclaimer", ar: "إخلاء المسؤولية" },
      body: {
        en: "While we strive to provide accurate and helpful information, we make no guarantees about the completeness or reliability of the content. Use of the website is at your own risk. Molodost' is not liable for any damages arising from your use of the site.",
        ar: "رغم حرصنا على تقديم معلومات دقيقة ومفيدة، فإننا لا نقدم ضمانات بشأن اكتمال المحتوى أو موثوقيته. استخدامك للموقع على مسؤوليتك الخاصة، ولا تتحمل مولودوست أي مسؤولية عن أضرار ناشئة عن استخدامك له.",
      },
    },
    {
      heading: { en: "Changes to These Terms", ar: "التغييرات على هذه الشروط" },
      body: {
        en: "We may update these Terms occasionally. When we do, we'll update the \"Last updated\" date at the top of the page. Continued use of the site after changes means you accept the revised Terms.",
        ar: "قد نحدّث هذه الشروط من حين لآخر، وعندها سنحدّث تاريخ \"آخر تحديث\" أعلى الصفحة. استمرارك في استخدام الموقع بعد التغييرات يعني قبولك الشروط المعدلة.",
      },
    },
    {
      heading: { en: "Contact", ar: "التواصل" },
      body: {
        en: "If you have questions about these Terms, please use the contact options on our booking page.",
        ar: "إذا كانت لديك أسئلة حول هذه الشروط، فاستخدم وسائل التواصل في صفحة الحجز.",
      },
    },
  ],
};
