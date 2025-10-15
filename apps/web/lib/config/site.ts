export const siteConfig = {
  name: 'Congo Gaming',
  description: 'Jouez simple. Gagnez grand. Mobile d\'abord.',
  url: 'https://congo-gaming.com',
  ogImage: '/og.png',
  links: {
    twitter: 'https://twitter.com/congogaming',
    facebook: 'https://facebook.com/congogaming',
    instagram: 'https://instagram.com/congogaming',
  },
  nav: [
    {
      title: 'nav.home',
      href: '/',
    },
    {
      title: 'nav.games',
      href: '/jeux',
    },
    {
      title: 'nav.lottery',
      href: '/loto',
    },
  ],
  footer: {
    legal: [
      { title: 'footer.terms', href: '/terms' },
      { title: 'footer.privacy', href: '/privacy' },
      { title: 'footer.responsible', href: '/responsible-gaming' },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
