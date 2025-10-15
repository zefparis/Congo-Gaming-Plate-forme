'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GameEntry } from "../data/games";
import Image from "next/image";

type Props = {
  game: GameEntry;
  onSelect: (g: GameEntry) => void;
};

// Couleurs par type de jeu
const gameColors: Record<string, string> = {
  crash: 'from-orange-500 to-orange-600',
  slots: 'from-purple-500 to-pink-500',
  dice: 'from-cyan-500 to-blue-500',
};

export default function GameCard({ game, onSelect }: Props) {
  const colorClass = gameColors[game.kind] || 'from-gray-500 to-gray-600';
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer w-full"
    >
      <Card className="overflow-hidden bg-neutral-900 border-neutral-800 hover:shadow-xl transition-all h-full flex flex-col">
        {/* Bloc de couleur ou image en haut */}
        {game.image ? (
          <div className="relative h-36 sm:h-40 md:h-44 w-full overflow-hidden bg-neutral-800">
            <Image
              src={game.image}
              alt={game.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={game.id === 'aviator' || game.id === 'slots' || game.id === 'lucky-dice'}
            />
          </div>
        ) : (
          <div className={`h-36 sm:h-40 md:h-44 w-full bg-gradient-to-br ${colorClass}`} />
        )}
        
        {/* Contenu de la carte */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white">{game.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400 capitalize">{game.kind}</p>
          </div>
          
          <Button 
            onClick={() => onSelect(game)}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm sm:text-base"
            variant="secondary"
            size="sm"
          >
            Lancer
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
