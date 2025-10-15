'use client';

import { useTranslations } from 'next-intl';
import { GameCard } from './GameCard';
import type { GameEntry } from '../data/games';

interface GameGridProps {
  games: GameEntry[];
  onGameSelect: (game: GameEntry) => void;
}

export function GameGrid({ games, onGameSelect }: GameGridProps) {
  const t = useTranslations('games');

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onPlay={() => onGameSelect(game)} />
      ))}
    </div>
  );
}
