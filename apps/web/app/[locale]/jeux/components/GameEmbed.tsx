'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GameEntry } from "../data/games";

type Props = {
  game: GameEntry | null;
  onClose: () => void;
};

export default function GameEmbed({ game, onClose }: Props) {
  if (!game) return null;

  return (
    <Dialog open={!!game} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl h-[85vh] sm:h-[80vh] p-0 overflow-hidden">
        {game.integration.type === "iframe" && game.integration.url ? (
          <iframe
            src={game.integration.url}
            className="w-full h-full border-none rounded-lg"
            allowFullScreen
            title={game.name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-base sm:text-lg px-4 text-center">
            Module <b>{game.name}</b> en cours d&apos;intégration...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
