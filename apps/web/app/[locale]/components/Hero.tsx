'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <motion.section
      className="relative text-center py-28 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
      />
      
      {/* Overlay - light/dark mode friendly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-primary/20 dark:from-black/90 dark:via-black/70 dark:to-primary/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white drop-shadow-lg">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('title')}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mb-10 leading-relaxed text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('description')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-400 hover:to-violet-500 text-white font-semibold shadow-xl transition-all duration-300"
          >
            <Link href="/jeux">{t('cta')}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Light glow accents */}
      <div className="absolute -top-20 left-1/3 w-[300px] h-[300px] bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
    </motion.section>
  );
}
