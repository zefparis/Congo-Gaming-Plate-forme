'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GameGrid } from './components/GameGrid';
import { GameEmbed } from './components/GameEmbed';
import { GAMES, type GameEntry } from './data/games';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function JeuxPage() {
  const t = useTranslations('games');
  const [selectedGame, setSelectedGame] = useState<GameEntry | null>(null);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <GameGrid games={GAMES} onGameSelect={setSelectedGame} />

        <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
          <DialogContent className="max-w-6xl h-[80vh]">
            {selectedGame && (
              <GameEmbed
                game={selectedGame}
                mobileAuthToken="mock-jwt-token-123"
                onEvent={(e) => console.log('Game event:', e)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
