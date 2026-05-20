import { getLocalizedPath, type Locale } from './i18n';
import { site } from './site';

type Link = {
  href: string;
  label: string;
};

export type SocialIconName = 'brand-x' | 'brand-github' | 'brand-threads' | 'brand-linkedin';

export type SocialLink = {
  href: string;
  label: string;
  icon: SocialIconName;
};

type HomeFeature = {
  title: string;
  description: string;
};

type HomeCopy = {
  nav: {
    home: string;
    blog: string;
    about: string;
    privacy: string;
    terms: string;
    switchLocale: string;
    toggleThemeToDark: string;
    toggleThemeToLight: string;
  };
  home: {
    tagline: string;
    title: string;
    quote: string;
    description: string;
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
    emptyTitle: string;
    emptyBody: string;
    readPost: string;
    authorLabel: string;
    publishedLabel: string;
    updatedLabel: string;
    minutesRead: string;
    tagPageEyebrow: string;
    tagPageTitlePrefix: string;
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

export const siteContent: Record<Locale, HomeCopy> = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      switchLocale: '中文',
      toggleThemeToDark: 'Switch to dark mode',
      toggleThemeToLight: 'Switch to light mode',
    },
    home: {
      tagline: 'Infinite Gamer',
      title: 'Harmonize. Transurfing. Play.',
      quote: 'There is but one infinite game. — James Carse',
      description:
        'Just a slash dad exploring nature and tech to play better games toward an optimal life.',
      featureTitle: 'Current principles',
      features: [
        {
          title: 'Play freely',
          description:
            'Protect enough space to notice what matters and keep life from collapsing into noise.',
        },
        {
          title: 'Harmonize what matters',
          description:
            'Build systems that reduce hidden trade-offs instead of chasing short-term optimization.',
        },
        {
          title: 'Master from scratch',
          description:
            'Learn fast, ship carefully, and keep practical curiosity alive across work and life.',
        },
      ],
      aboutTitle: 'Who is KL KUO',
      aboutBody:
        'Dad. Developer. And more. I write about clarity, focus, systems, and building an intentional life without drifting into finite games.',
      aboutAction: 'Read the full story',
      writingTitle: 'Writing now has a static home again',
      writingBody:
        'The rebuilt blog keeps the route structure small, serves posts from the content collection, and preserves existing slugs where practical.',
      writingAction: 'Browse the blog',
      legalTitle: 'Simple and explicit by design',
      legalBody:
        'This rebuild keeps the public site static-first and moves legal pages into plain MDX so the repository stays understandable.',
    },
    blog: {
      eyebrow: 'Writing',
      title: 'Blog',
      description:
        'Notes on clarity, focus, systems, and intentional living, now rebuilt from the static content collection.',
      emptyTitle: 'More writing is on the way.',
      emptyBody:
        'The route is ready. New and restored posts can ship here without changing the blog architecture again.',
      readPost: 'Read article',
      authorLabel: 'Author',
      publishedLabel: 'Published',
      updatedLabel: 'Updated',
      minutesRead: 'min read',
      tagPageEyebrow: 'Tag',
      tagPageTitlePrefix: 'Tag',
      relatedTitle: 'Keep reading',
      backToIndex: 'Back to blog',
    },
    footer: {
      rights: `© ${new Date().getFullYear()} ${site.name}. All rights reserved.`,
    },
  },
  zh: {
    nav: {
      home: '首頁',
      blog: '文章',
      about: '關於',
      privacy: '隱私政策',
      terms: '使用條款',
      switchLocale: 'English',
      toggleThemeToDark: '切換為深色模式',
      toggleThemeToLight: '切換為淺色模式',
    },
    home: {
      tagline: '無限玩家',
      title: '平衡。悠遊。暢玩。',
      quote: 'There is but one infinite game. — James Carse',
      description: '只是個為了玩更好的遊戲，探索自然和科技，實現最佳人生的斜槓老爸。',
      featureTitle: '目前的核心原則',
      features: [
        {
          title: '自由暢玩',
          description: '保留足夠的空間看見真正重要的人事物，不讓生活被雜訊吞沒。',
        },
        {
          title: '平衡關鍵要角',
          description: '打造能減少隱性代價的系統，而不是只追逐短期最佳化。',
        },
        {
          title: '從零快速掌握',
          description: '快速學習、謹慎交付，並在工作與人生中保留實作型的好奇心。',
        },
      ],
      aboutTitle: 'KL KUO 是誰',
      aboutBody:
        '父親、工程師，還有更多角色。我書寫清晰、專注、系統，以及如何在有限賽局之外打造有意識的人生。',
      aboutAction: '閱讀完整介紹',
      writingTitle: '文章已經回到靜態站點裡',
      writingBody: '重建後的文章列表與文章頁直接來自內容集合，並在可行時保留既有 slug。',
      writingAction: '瀏覽文章',
      legalTitle: '刻意保持簡單與明確',
      legalBody:
        '這次重構讓公開網站維持靜態優先，並把法律頁面放回簡單的 MDX 檔案，讓整個專案更容易理解。',
    },
    blog: {
      eyebrow: '文章',
      title: '部落格',
      description: '整理關於清晰、專注、系統，以及有意識生活的筆記，現在已改由靜態內容集合提供。',
      emptyTitle: '更多文章正在整理中。',
      emptyBody: '路由已經就緒，之後補回與新增文章都不需要再調整整體架構。',
      readPost: '閱讀文章',
      authorLabel: '作者',
      publishedLabel: '發布',
      updatedLabel: '更新',
      minutesRead: '分鐘閱讀',
      tagPageEyebrow: '標籤',
      tagPageTitlePrefix: '標籤',
      relatedTitle: '延伸閱讀',
      backToIndex: '返回文章列表',
    },
    footer: {
      rights: `© ${new Date().getFullYear()} ${site.name}。保留所有權利。`,
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
