import type { Dictionary } from "@/types/dictionary";

const en: Dictionary = {
  common: {
    siteName: "Molodost'",
    skipToContent: "Skip to content",
  },
  navigation: {
    links: {
      home: "Home",
      about: "About",
      services: "Services",
      specialists: "Specialists",
      stories: "Stories",
      bookASession: "Book a session",
      prices: "Prices",
      journal: "Journal",
      article: "Article",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
    },
    menu: {
      open: "Open menu",
      close: "Close menu",
      label: "Main navigation",
    },
    switcher: {
      languageLabel: "Language",
      countryLabel: "Country",
      // Each language is labeled in its own script (endonym convention)
      locales: { en: "EN", ar: "ع" },
      countries: { ae: "AE", eg: "EG" },
    },
  },
  footer: {
    newsletterTitle: "Join Our Newsletter.",
    newsletterBody:
      "We share occasional insights on longevity, regenerative medicine, biomarkers, and practical ways to protect vitality over time.",
    emailPlaceholder: "Your Email",
    subscribe: "Subscribe",
    newsletterLegal:
      "By signing up to receive emails from Molodost', you agree to our Privacy Policy.",
    sitemap: "Sitemap",
    copyright: "Copyright 2026 Molodost'. All rights reserved.",
    social: {
      instagram: "Instagram",
      threads: "Threads",
      facebook: "Facebook",
      whatsapp: "WhatsApp",
      phone: "Call us",
      email: "Email us",
    },
  },
  home: {
    title: "Molodost' — Longevity by Design",
    description:
      "A precision-driven approach to longevity, regenerative medicine, and sustained performance.",
    heading: "Molodost' — Longevity by Design",
    hero: {
      title: "Return the Life to Your Years",
      description:
        "We do not merely treat symptoms; we engineer the future of your biology. Discover a precision-driven approach to longevity, regenerative medicine, and sustained performance.",
      cta: "Start your journey",
    },
    toggle: {
      label: "Vitality",
      offTitle: "If only unlocking peak vitality were as simple as flipping a switch.",
      offBody:
        "Standard medicine waits for dysfunction. True longevity requires measuring your biology before decline takes hold.",
      onTitle: "There is no single switch. But there is Longevity by Design.",
      onBody:
        "We engineer biological advantage — systematically, precisely, and personally. Discover our 5D Framework.",
    },
    philosophy: {
      eyebrow: "Our Philosophy",
      statement:
        "Medicine does not begin with disease — it begins with biology measured early and protected with precision. Through cellular regeneration, metabolic design, and structural artistry, we rewrite your biological limits.",
      cta: "The biological architecture",
    },
    howItWorks: {
      titlePre: "How",
      titleAccent: "It Works",
      intro:
        "Optimization is a science, not guesswork. Our clinical process is structured, precise, and entirely individualized — moving you from baseline diagnostics to sustained biological advantage.",
      steps: [
        {
          title: "Diagnostics & Mapping",
          body: "We start with comprehensive biological mapping. Through advanced panels, hormonal profiling, and cardiometabolic assessments, we uncover the hidden drivers of fatigue and biological aging long before they become a problem.",
        },
        {
          title: "Precision Design",
          body: "Your biology becomes the blueprint. We engineer a highly tailored medical trajectory using targeted cellular therapies, hormonal optimization, and metabolic correction. Nothing is standardized; every intervention is intentional.",
        },
        {
          title: "Continuous Optimization",
          body: "Progress is measured, not assumed. We continuously retest biomarkers and adjust protocols to ensure your results compound over time. Longevity is not a one-time event — it is a sustained system of peak performance.",
        },
      ],
    },
    contact: {
      title: "Ready to protect your biological capital?",
      body: "Every protocol is individualized — diagnostics, treatment, and follow-up adapt to your biology, goals, and response over time.",
      trustedBy: "Trusted by 80+ clients",
      rating: "Excellent 4.9 out of 5",
      ratingBrand: "TrustPoint",
      cta: "Start your journey",
      connect: "Connect with Molodost' through your preferred channel.",
    },
    specialists: {
      eyebrow: "Our Specialists",
      title: "The specialists behind your health, beauty, and longevity.",
      body: "We bring together doctors who work as one team — combining precise diagnostics, evidence-based medicine, and personalized care to help you feel better, look better, and live better.",
      cta: "Meet our specialists",
    },
    split: {
      title:
        "Clinical clarity, regenerative science, and measurable follow-up — built for lasting vitality.",
      body: "Our programs turn biological data into a measured plan. We take time to understand your system, design the right protocol, and adjust care as your markers and goals evolve.",
    },
    quote: {
      text: "“Medicine does not begin with disease — it begins with biology measured early and protected with precision.”",
      attribution: "— Molodost', Longevity by Design",
    },
    journal: {
      eyebrow: "Our Journal",
      title: "Insights for Longevity and Biological Performance.",
      body: "Clinical perspectives, practical guidance, and ideas for protecting vitality over time.",
      cta: "Browse insights",
    },
    stats: {
      title:
        "From diagnostics to measurable progress, these numbers reflect a system built around biology.",
      body: "Behind every result is a protocol: diagnostics, physician-led decisions, and disciplined follow-up designed to compound over time.",
    },
    faq: {
      title: "Your questions. Answered.",
      body: "Not sure what to expect? These answers explain how Molodost' approaches diagnostics, regenerative medicine, and personalized longevity care.",
      note: "Need a more specific answer? Send us a message and our team will respond with care and clarity.",
      cta: "About Molodost'",
    },
    consultation: {
      eyebrow: "Book a consultation",
      title: "Your longevity plan starts with precision.",
      body: "Whether you are beginning with diagnostics, optimizing energy, or planning regenerative care, our team will help define the right next step for your biology.",
    },
  },
  actions: {
    readMore: "Read more",
    readFullStory: "Read full story",
  },
  forms: {
    tellUsAboutYou: "Tell us about you.",
    namePlaceholder: "Your Name *",
    emailPlaceholder: "Your Email *",
    phonePlaceholder: "Phone Number",
    pronouns: "Preferred Pronouns *",
    pronounOptions: ["She/Her", "He/Him", "They/Them", "Prefer not to say"],
    clinicLocation: "Preferred Clinic Location *",
    optimizeTitle: "What would you like to optimize?",
    optimizePlaceholder:
      "Feel free to share anything that helps us understand your needs",
    interestTitle: "Which area are you interested in?",
    interestOptions: [
      "5D Diagnostics & Check-up",
      "Longevity Optimization",
      "Regenerative Medicine & IV Therapy",
      "Aesthetic Regeneration",
      "Not sure yet — help me choose",
    ],
    hearAbout: "Where did you hear about us? *",
    hearAboutOptions: [
      "Google Search",
      "A friend or colleague",
      "Therapist referral",
      "Other",
    ],
    updatesTitle: "Would you like to receive Molodost' updates via email?",
    updatesBody:
      "We send occasional updates with clinical insights, programs, offers, and news. Every email includes an unsubscribe link.",
    consent:
      "By submitting this form, you agree to our Privacy Policy and consent to being contacted about your request.",
    submit: "Book a session",
  },
};

export default en;
