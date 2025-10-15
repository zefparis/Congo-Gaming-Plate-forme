'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Moon, Sun, Gamepad2, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/site';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';

export function Header() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t(item.title)}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col gap-4 p-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.title)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
