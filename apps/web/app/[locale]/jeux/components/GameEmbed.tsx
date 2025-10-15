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
      <DialogContent className="max-w-6xl h-[80vh] p-0 overflow-hidden">
        {game.integration.type === "iframe" && game.integration.url ? (
          <iframe
            src={game.integration.url}
            className="w-full h-full border-none rounded-lg"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg">
            Module <b>{game.name}</b> en cours d&apos;intégration...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
