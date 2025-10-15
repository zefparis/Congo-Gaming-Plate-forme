'use client';

import { useEffect, useRef } from 'react';
import type { GameEntry } from '../data/games';

interface GameEmbedProps {
  game: GameEntry;
  mobileAuthToken?: string;
  onEvent?: (event: unknown) => void;
}

export function GameEmbed({ game, mobileAuthToken, onEvent }: GameEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (onEvent) {
        onEvent(event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onEvent]);

  if (game.integration.type === 'iframe') {
    const url = new URL(game.integration.url || '');
    if (mobileAuthToken) {
      url.searchParams.set('token', mobileAuthToken);
    }

    return (
      <div className="h-full w-full flex flex-col">
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-lg">{game.name}</h3>
          <p className="text-sm text-muted-foreground">{game.description}</p>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎮</div>
            <h4 className="text-xl font-bold mb-2">Placeholder Aviator</h4>
            <p className="text-muted-foreground mb-4">
              Intégration iframe prête pour le jeu Aviator
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-left text-sm font-mono">
              <div>URL: {url.toString()}</div>
              <div>Token: {mobileAuthToken?.substring(0, 20)}...</div>
              <div>Type: {game.integration.type}</div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Remplacez cette div par: <code className="bg-muted px-2 py-1 rounded">{'<iframe src={url.toString()} />'}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Module type - dynamic import placeholder
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🎰</div>
        <h4 className="text-xl font-bold mb-2">{game.name}</h4>
        <p className="text-muted-foreground mb-4">Module à implémenter</p>
        <div className="bg-muted/50 rounded-lg p-4 text-left text-sm font-mono">
          <div>Module: {game.integration.modulePath}</div>
          <div>Type: {game.integration.type}</div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Utilisez dynamic import: <code className="bg-muted px-2 py-1 rounded">const Game = dynamic(() =&gt; import('{game.integration.modulePath}'))</code>
        </p>
      </div>
    </div>
  );
}
