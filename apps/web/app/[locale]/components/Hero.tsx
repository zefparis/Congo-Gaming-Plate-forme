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
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Image de fond avec overlay sombre pour contraste */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)' }}
        />
        {/* Overlay gradient pour contraste du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      </div>
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
              {t('title')}
            </span>
            <br />
            <span className="text-white drop-shadow-lg">{t('subtitle')}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 drop-shadow-md">
            {t('description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="group">
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
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="glass rounded-lg p-6 text-center backdrop-blur-md bg-black/40 border border-white/10"
            >
              <stat.icon className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
