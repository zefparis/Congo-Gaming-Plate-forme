'use client';

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GameEntry } from "../data/games";

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
      <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-700 hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">{game.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>{game.description}</p>
          <p className="mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
              {game.status}
            </span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
