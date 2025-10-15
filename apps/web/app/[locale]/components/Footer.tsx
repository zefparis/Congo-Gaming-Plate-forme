'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config/site';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{siteConfig.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t('copyright')}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 sm:mb-4">Légal</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {siteConfig.footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(item.title.split('.')[1])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 sm:mb-4">Suivez-nous</h4>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {Object.entries(siteConfig.links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
