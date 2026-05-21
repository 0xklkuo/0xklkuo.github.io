import { getLocalizedPath, type Locale } from './i18n';

export type SocialIconName = 'brand-x' | 'brand-github' | 'brand-threads' | 'brand-linkedin';

export type SocialLink = {
  href: string;
  label: string;
  icon: SocialIconName;
};

type Link = {
  href: string;
  label: string;
};

type HomeFeature = {
  title: string;
  description: string;
};

type LocaleContent = {
  nav: {
    home: string;
    blog: string;
    about: string;
    privacy: string;
    terms: string;
    toggleThemeToDark: string;
    toggleThemeToLight: string;
  };
  home: {
    tagline: string;
    title: string;
    quote: string;
    description: string;
    profileImageAlt: string;
    featureTitle: string;
    features: HomeFeature[];
    aboutTitle: string;
    aboutBody: string;
    aboutAction: string;
    writingTitle: string;
    writingBody: string;
    writingAction: string;
    legalTitle: string;
    legalBody: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    description: string;
    keywords: string[];
    emptyTitle: string;
    emptyBody: string;
    readPost: string;
    authorLabel: string;
    publishedLabel: string;
    updatedLabel: string;
    minutesRead: string;
    tagPageEyebrow: string;
    tagPageTitlePrefix: string;
    tagPageDescriptionPrefix: string;
    relatedTitle: string;
    backToIndex: string;
  };
  footer: {
    rights: string;
  };
};

export const socialLinks: SocialLink[] = [
  { href: 'https://x.com/0xklkuo', label: 'X', icon: 'brand-x' },
  { href: 'https://github.com/0xklkuo', label: 'GitHub', icon: 'brand-github' },
  { href: 'https://threads.net/@0xklkuo', label: 'Threads', icon: 'brand-threads' },
  { href: 'https://linkedin.com/in/0xklkuo', label: 'LinkedIn', icon: 'brand-linkedin' },
];

export const siteContent: Record<Locale, LocaleContent> = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      toggleThemeToDark: 'Switch to dark mode',
      toggleThemeToLight: 'Switch to light mode',
    },
    home: {
      tagline: 'Infinite Gamer',
      title: 'Harmonize. Master. Play.',
      quote: 'There is but one infinite game. — James Carse',
      description:
        'A slash dad exploring nature and technology to build a better life under real constraints.',
      profileImageAlt: 'KL KUO profile graphic',
      featureTitle: 'Three core moves',
      features: [
        {
          title: 'Harmonize what matters',
          description:
            'Build a life where health, family, faith, and work reinforce each other instead of taking turns collapsing.',
        },
        {
          title: 'Master from scratch',
          description:
            'Learn essential skills without drowning in tabs, courses, and generic advice. Train the fundamentals. Keep what works under pressure.',
        },
        {
          title: 'Play better games',
          description:
            'Stop optimizing for metrics that do not deserve your life. Question the default path. Run small experiments. Choose longer horizons.',
        },
      ],
      aboutTitle: 'For ambitious people done with the default path',
      aboutBody:
        'You can be capable, disciplined, and still know the default script is too expensive. This is for people carrying real responsibility who want clearer thinking, better systems, and a life that stays whole while they keep growing.',
      aboutAction: 'Read the philosophy',
      writingTitle: 'Start with the field notes',
      writingBody:
        'Essays, decision frameworks, and small experiments on focus, systems, technology, and meaning—for people who need ideas that survive work, family, and real constraints.',
      writingAction: 'Start reading',
      legalTitle: 'No dark patterns in the fine print',
      legalBody:
        'Privacy and terms stay plain, readable, and inspectable. Respect should not require detective work.',
    },
    blog: {
      eyebrow: 'Field notes',
      title: 'Field Notes',
      description:
        'Notes on clarity, systems, technology, and the infinite game—for people done with generic productivity advice.',
      keywords: ['field notes', 'clarity', 'systems', 'mastery', 'infinite game'],
      emptyTitle: 'More field notes are coming.',
      emptyBody:
        'I’m restoring the archive and writing new essays for readers who want practical systems, not recycled hacks.',
      readPost: 'Read note',
      authorLabel: 'Author',
      publishedLabel: 'Published',
      updatedLabel: 'Updated',
      minutesRead: 'min read',
      tagPageEyebrow: 'Tag',
      tagPageTitlePrefix: 'Tag',
      tagPageDescriptionPrefix: 'Posts filed under',
      relatedTitle: 'Keep playing',
      backToIndex: 'Back to field notes',
    },
    footer: {
      rights: `© ${new Date().getFullYear()} KL KUO. All rights reserved.`,
    },
  },
  zh: {
    nav: {
      home: '首頁',
      blog: '文章',
      about: '關於',
      privacy: '隱私政策',
      terms: '使用條款',
      toggleThemeToDark: '切換為深色模式',
      toggleThemeToLight: '切換為淺色模式',
    },
    home: {
      tagline: '無限玩家',
      title: '平衡。掌握。暢玩。',
      quote: 'There is but one infinite game. — James Carse',
      description: '一個在真實限制下，探索自然與科技、把人生活得更好的斜槓老爸。',
      profileImageAlt: 'KL KUO 個人主視覺',
      featureTitle: '三個核心動作',
      features: [
        {
          title: '平衡真正重要的人事物',
          description:
            '把健康、家庭、信仰與工作排進同一個系統，而不是在某一邊贏、在另一邊慢慢失血。',
        },
        {
          title: '從零快速掌握',
          description:
            '學真正重要的事，不用淹死在分頁、課程與泛用建議裡。砍掉雜訊，練好基本功，留下在壓力下也能運作的方法。',
        },
        {
          title: '玩更好的遊戲',
          description:
            '別再為不值得的人生指標拚命。質疑預設路徑，做小實驗，選擇更長、更值得成為的局。',
        },
      ],
      aboutTitle: '寫給受夠預設路徑的進取者',
      aboutBody:
        '你可以很自律、很能扛，也很清楚這套預設劇本的代價太高。這裡寫給肩上有責任、卻仍想活得清楚、長久而完整的人。',
      aboutAction: '讀這套方法',
      writingTitle: '先讀實戰筆記',
      writingBody:
        '這裡有關於專注、系統、科技與意義的長文、決策框架與小實驗——寫給那些需要想法能穿過工作、家庭與真實限制的人。',
      writingAction: '開始閱讀',
      legalTitle: '連細則也不玩花樣',
      legalBody: '隱私與條款保持白話、可讀、可查。尊重使用者，不該讓人用放大鏡找真相。',
    },
    blog: {
      eyebrow: '實戰筆記',
      title: '實戰筆記',
      description: '寫給受夠泛用生產力建議的人：關於清晰、系統、科技，以及怎麼把人生玩成長局。',
      keywords: ['實戰筆記', '清晰', '系統', '掌握', '無限賽局'],
      emptyTitle: '更多實戰筆記正在路上。',
      emptyBody: '我會持續補回舊文，也寫新的文章，給那些想要實用系統，而不是舊瓶裝新酒建議的人。',
      readPost: '閱讀這則筆記',
      authorLabel: '作者',
      publishedLabel: '發布',
      updatedLabel: '更新',
      minutesRead: '分鐘閱讀',
      tagPageEyebrow: '標籤',
      tagPageTitlePrefix: '標籤',
      tagPageDescriptionPrefix: '收錄於',
      relatedTitle: '繼續玩下去',
      backToIndex: '返回實戰筆記',
    },
    footer: {
      rights: `© ${new Date().getFullYear()} KL KUO。保留所有權利。`,
    },
  },
};

export function getPrimaryNavigation(locale: Locale): Link[] {
  const labels = siteContent[locale].nav;

  return [
    { href: getLocalizedPath(locale), label: labels.home },
    { href: getLocalizedPath(locale, 'blog'), label: labels.blog },
    { href: getLocalizedPath(locale, 'about'), label: labels.about },
    { href: getLocalizedPath(locale, 'privacy'), label: labels.privacy },
    { href: getLocalizedPath(locale, 'terms'), label: labels.terms },
  ];
}

export function getLegalNavigation(locale: Locale): Link[] {
  const labels = siteContent[locale].nav;

  return [
    { href: getLocalizedPath(locale, 'privacy'), label: labels.privacy },
    { href: getLocalizedPath(locale, 'terms'), label: labels.terms },
  ];
}
