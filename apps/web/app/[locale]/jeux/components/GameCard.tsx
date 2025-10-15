'use client';

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GameEntry } from "../data/games";
import Image from "next/image";

type Props = {
  game: GameEntry;
  onSelect: (g: GameEntry) => void;
};

export default function GameCard({ game, onSelect }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={() => onSelect(game)}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-700 hover:shadow-lg transition">
        {/* Image de fond si disponible */}
        {game.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={game.image}
              alt={game.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient pour le badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Badge status en overlay */}
            <div className="absolute top-3 right-3">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/90 text-white uppercase font-semibold backdrop-blur-sm">
                {game.status}
              </span>
            </div>
          </div>
        )}
        
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">{game.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>{game.description}</p>
          {!game.image && (
            <p className="mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
                {game.status}
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
