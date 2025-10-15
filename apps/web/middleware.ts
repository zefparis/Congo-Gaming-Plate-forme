import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(fr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
