export interface Dictionary {
  common: {
    siteName: string;
    skipToContent: string;
  };
  navigation: {
    links: {
      home: string;
      about: string;
      services: string;
      specialists: string;
      stories: string;
      bookASession: string;
      prices: string;
      journal: string;
      article: string;
      privacyPolicy: string;
      termsOfUse: string;
    };
    menu: {
      open: string;
      close: string;
      label: string;
    };
    switcher: {
      languageLabel: string;
      countryLabel: string;
      locales: { en: string; ar: string };
      countries: { ae: string; eg: string };
    };
  };
  footer: {
    newsletterTitle: string;
    newsletterBody: string;
    emailPlaceholder: string;
    subscribe: string;
    newsletterLegal: string;
    sitemap: string;
    copyright: string;
    social: {
      instagram: string;
      threads: string;
      facebook: string;
      whatsapp: string;
      phone: string;
      email: string;
    };
  };
  home: {
    title: string;
    description: string;
    heading: string;
    hero: {
      title: string;
      description: string;
      cta: string;
    };
    toggle: {
      label: string;
      offTitle: string;
      offBody: string;
      onTitle: string;
      onBody: string;
    };
    philosophy: {
      eyebrow: string;
      statement: string;
      cta: string;
    };
    howItWorks: {
      titlePre: string;
      titleAccent: string;
      intro: string;
      steps: Array<{ title: string; body: string }>;
    };
    contact: {
      title: string;
      body: string;
      trustedBy: string;
      rating: string;
      ratingBrand: string;
      cta: string;
      connect: string;
    };
    specialists: {
      eyebrow: string;
      titlePre: string;
      titleCircled: string;
      titlePost: string;
      body: string;
      cta: string;
    };
    split: {
      title: string;
      body: string;
    };
    quote: {
      text: string;
      attribution: string;
    };
    journal: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
    };
    stats: {
      title: string;
      body: string;
    };
    faq: {
      title: string;
      body: string;
      note: string;
      cta: string;
    };
    consultation: {
      eyebrow: string;
      title: string;
      body: string;
    };
  };
  actions: {
    readMore: string;
    readFullStory: string;
    bookNow: string;
    bookASession: string;
    readNextStory: string;
  };
  inner: {
    about: {
      eyebrow: string;
      title: string;
      lede: string;
      intro: string;
      methodEyebrow: string;
      methodBody: string;
      philosophyTitle: string;
      philosophyBody: string;
      /** Founder quote, split so the closing clause can take the accent colour. */
      founderQuoteLead: string;
      founderQuoteAccent: string;
      founderName: string;
      splitTitle: string;
      splitBody: string;
      contactBody: string;
      quote: string;
      quoteAttribution: string;
    };
    services: {
      eyebrow: string;
      title: string;
      lede: string;
      intro: string;
      /** Stats heading, split so the closing clause can take the accent colour. */
      stats: {
        title: string;
        titleAccent: string;
        body: string;
      };
      programsEyebrow: string;
      programsTitle: string;
      programsBody: string;
      toggleOne: string;
      toggleBundle: string;
    };
    specialists: {
      eyebrow: string;
      title: string;
      lede: string;
      intro: string;
      contactTitle: string;
      contactBody: string;
      contactCta: string;
      specialisationsTitle: string;
      languagesTitle: string;
      detailContactTitle: string;
      detailContactBody: string;
    };
    stories: {
      eyebrow: string;
      title: string;
      lede: string;
      intro: string;
      /** "\n" marks the line break before the accent-coloured second line. */
      contactTitle: string;
      contactBody: string;
      contactCta: string;
      /** "Prefer to chat first?" aside under the TrustPoint. */
      contactAside: string;
      /** Contact block wording on /stories/[slug]. */
      detailContactTitle: string;
      detailContactBody: string;
    };
    journal: {
      eyebrow: string;
      title: string;
      lede: string;
      intro: string;
      moreTitle: string;
      moreBody: string;
      /** Contact block wording on /journal. */
      contactTitle: string;
      contactBody: string;
    };
    prices: {
      eyebrow: string;
      title: string;
      lede: string;
      /** Label over the category select. */
      categoryLabel: string;
      comingSoon: string;
    };
  };
  forms: {
    tellUsAboutYou: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    pronouns: string;
    pronounOptions: string[];
    clinicLocation: string;
    optimizeTitle: string;
    optimizePlaceholder: string;
    interestTitle: string;
    interestOptions: string[];
    hearAbout: string;
    hearAboutOptions: string[];
    updatesTitle: string;
    updatesBody: string;
    consent: string;
    submit: string;
  };
}
