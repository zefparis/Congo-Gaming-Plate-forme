'use client';

import GameCard from "./GameCard";
import { GAMES, GameEntry } from "../data/games";

export default function GameGrid({ onSelect }: { onSelect: (g: GameEntry) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game} onSelect={onSelect} />
      ))}
    </div>
  );
}
