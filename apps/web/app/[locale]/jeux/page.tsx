'use client';

import { useState } from "react";
import { GameEntry } from "./data/games";
import GameGrid from "./components/GameGrid";
import GameEmbed from "./components/GameEmbed";
import { motion } from "framer-motion";

export default function JeuxPage() {
  const [selected, setSelected] = useState<GameEntry | null>(null);

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-2"
      >
        🎮 Jeux Virtuels Congo Gaming
      </motion.h1>
      <p className="text-center text-muted-foreground mb-6">
        Découvrez nos jeux de hasard et de stratégie — Crash, Slots, et plus encore !
      </p>

      <GameGrid onSelect={setSelected} />
      <GameEmbed game={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
