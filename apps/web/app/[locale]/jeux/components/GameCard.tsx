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
      className="cursor-pointer"
    >
      <Card className="overflow-hidden bg-neutral-900 border-neutral-800 hover:shadow-xl transition-all">
        {/* Bloc de couleur en haut */}
        {game.image ? (
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={game.image}
              alt={game.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className={`h-32 w-full bg-gradient-to-br ${colorClass}`} />
        )}
        
        {/* Contenu de la carte */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-white">{game.name}</h3>
            <p className="text-sm text-gray-400">{game.kind}</p>
          </div>
          
          <Button 
            onClick={() => onSelect(game)}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white"
            variant="secondary"
          >
            Lancer
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
