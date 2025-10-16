'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const previewGames = [
  { id: 'aviator', name: 'Aviator', category: 'Crash', image: '/images/hero/aviator.jpg' },
  { id: 'slots', name: 'Slots Galaxy', category: 'Slots', image: '/images/hero/835.jpg' },
  { id: 'dice', name: 'Lucky Dice', category: 'Dice', image: '/images/hero/dice.jpg' },
];

export function GamesPreview() {
  const t = useTranslations('games');

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {previewGames.map((game) => (
            <Card key={game.id} className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/jeux">{t('play')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/jeux">
              Voir tous les jeux
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
