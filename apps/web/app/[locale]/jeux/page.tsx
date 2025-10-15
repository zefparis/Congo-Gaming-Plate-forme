'use client';

import { useState } from "react";
import { GameEntry } from "./data/games";
import GameGrid from "./components/GameGrid";
import GameEmbed from "./components/GameEmbed";
import { motion } from "framer-motion";

export default function JeuxPage() {
  const [selected, setSelected] = useState<GameEntry | null>(null);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2"
      >
        Jeux Virtuels
      </motion.h1>
      <p className="text-center text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
        Découvrez nos jeux passionnants
      </p>

      <GameGrid onSelect={setSelected} />
      
      <div className="flex justify-center mt-6 sm:mt-8">
        <button className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-neutral-800 hover:bg-neutral-700 text-white rounded-md transition-colors flex items-center gap-2">
          Voir tous les jeux
          <span>→</span>
        </button>
      </div>
      
      <GameEmbed game={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
