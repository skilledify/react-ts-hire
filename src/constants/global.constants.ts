/**
 * Единый источник путей для маршрутов React Router 7.
 * Используется в App.tsx (объявление Routes), хедере, футере и внутренних ссылках.
 */
export const AppRoutes = {
  HOME_PAGE: '/',
  ABOUT_PAGE: '/about',
  BUYING_PAGE: '/buying',
  RENTING_PAGE: '/renting',
  SELLING_PAGE: '/selling',
  CONTACT_PAGE: '/contact',
  LOGIN_PAGE: '/login',
  SIGNUP_PAGE: '/signup',
  NOTFOUND_PAGE: '*',
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

/** Контакты компании — единый источник для футера, страницы Contact и форм. */
export const CONTACT_INFO = {
  PHONE: '+1 (416) 555-01-42',
  PHONE_HREF: 'tel:+14165550142',
  EMAIL: 'hello@hire.estate',
  EMAIL_HREF: 'mailto:hello@hire.estate',
  ADDRESS: '1087 Pin Oak Drive, Clinton, USA',
  HOURS: 'Mon – Sat, 09:00 – 19:00',
} as const;

/** Маркетинговые цифры, переиспользуемые в Hero, About и SEO-блоках. */
export const SITE_META = {
  NAME: 'Hire',
  TAGLINE: 'Perfect way to buy, rent and sell a home',
  DESCRIPTION:
    'Hire is a full-cycle real estate agency: verified listings, transparent pricing and one dedicated advisor for buying, renting and selling.',
} as const;

/**
 * Путь к статике из `public/`.
 *
 * Vite НЕ перезаписывает абсолютные пути вида `/img/...` внутри JSX и CSS
 * (перезапись работает только для `index.html` и для `import` ассетов), поэтому
 * при `base: '/react-ts-hire'` такие ссылки вели в корень домена и давали 404.
 * `import.meta.env.BASE_URL` содержит base, но завершающий слеш в нём не
 * гарантирован, поэтому нормализуем его сами — тогда путь корректен и в dev,
 * и на GitHub Pages.
 *
 * @example asset('/img/hero.jpg') // → '/react-ts-hire/img/hero.jpg'
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
