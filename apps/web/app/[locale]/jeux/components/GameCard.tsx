'use client';

import { useTranslations } from 'next-intl';
import { Play, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GameEntry } from '../data/games';

interface GameCardProps {
  game: GameEntry;
  onPlay: () => void;
}

const gradients = {
  crash: 'from-orange-500 to-red-500',
  slots: 'from-purple-500 to-pink-500',
  dice: 'from-blue-500 to-cyan-500',
  mines: 'from-green-500 to-emerald-500',
  lottery: 'from-yellow-500 to-orange-500',
  other: 'from-gray-500 to-slate-500',
};

const statusColors = {
  alpha: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  beta: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  live: 'bg-green-500/10 text-green-500 border-green-500/20',
};

export function GameCard({ game, onPlay }: GameCardProps) {
  const t = useTranslations('games');

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:scale-105">
      <div className={`h-40 bg-gradient-to-br ${gradients[game.kind]} relative`}>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[game.status]}`}>
            {t(`status.${game.status}`)}
          </span>
        </div>
        {game.integration.requiresMobileAuth && (
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-1 rounded bg-black/50 text-white text-xs flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Auth Mobile
            </span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{t(`categories.${game.kind}`)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{game.description}</p>
        {game.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-md bg-muted text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onPlay} className="w-full group-hover:bg-primary/90">
          <Play className="mr-2 h-4 w-4" />
          {t('play')}
        </Button>
      </CardFooter>
    </Card>
  );
}
