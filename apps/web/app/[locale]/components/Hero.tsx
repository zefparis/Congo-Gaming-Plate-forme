'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Trophy, Gamepad } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('hero');

  const stats = [
    { icon: Users, label: t('stats.online'), value: '2,547' },
    { icon: Gamepad, label: t('stats.games'), value: '12' },
    { icon: Trophy, label: t('stats.winners'), value: '89' },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32">
      {/* Image de fond avec overlay sombre pour contraste */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)' }}
        />
        {/* Overlay gradient pour contraste du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      </div>
      <div className="container relative px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              {t('title')}
            </span>
            <br />
            <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">{t('subtitle')}</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-4 font-medium">
            {t('description')}
          </p>
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/jeux">
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="glass rounded-lg p-4 sm:p-6 text-center backdrop-blur-md bg-black/50 border border-white/20 shadow-xl"
            >
              <stat.icon className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-primary drop-shadow-lg" />
              <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{stat.value}</p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-100 drop-shadow-md font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
