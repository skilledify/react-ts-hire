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
export const CONTACT_INFO = {
  PHONE: '+1 (416) 555-01-42',
  PHONE_HREF: 'tel:+14165550142',
  EMAIL: 'hello@hire.estate',
  EMAIL_HREF: 'mailto:hello@hire.estate',
  ADDRESS: '1087 Pin Oak Drive, Clinton, USA',
  HOURS: 'Mon – Sat, 09:00 – 19:00',
} as const;
export const SITE_META = {
  NAME: 'Hire',
  TAGLINE: 'Perfect way to buy, rent and sell a home',
  DESCRIPTION:
    'Hire is a full-cycle real estate agency: verified listings, transparent pricing and one dedicated advisor for buying, renting and selling.',
} as const;
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
