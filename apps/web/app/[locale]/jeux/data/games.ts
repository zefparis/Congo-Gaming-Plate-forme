export type GameKind = 'crash' | 'slots' | 'dice' | 'mines' | 'lottery' | 'other';
export type GameStatus = 'alpha' | 'beta' | 'live';

export interface GameEntry {
  id: string;
  name: string;
  kind: GameKind;
  status: GameStatus;
  integration: {
    type: 'iframe' | 'module';
    url?: string;
    modulePath?: string;
    requiresMobileAuth?: boolean;
  };
  description?: string;
  tags?: string[];
}

export const GAMES: GameEntry[] = [
  {
    id: 'aviator',
    name: 'Aviator',
    kind: 'crash',
    status: 'beta',
    integration: {
      type: 'iframe',
      url: 'https://aviator.congo-gaming.local/entry',
      requiresMobileAuth: true,
    },
    description: 'Jeu de crash en temps réel avec multiplicateurs',
    tags: ['realtime', 'websocket', 'high-risk'],
  },
  {
    id: 'slots',
    name: 'Slots Galaxy',
    kind: 'slots',
    status: 'alpha',
    integration: {
      type: 'module',
      modulePath: '@/app/[locale]/jeux/components/slots',
    },
    description: 'Machines à sous avec jackpots progressifs',
    tags: ['classic', 'jackpot'],
  },
  {
    id: 'dice',
    name: 'Lucky Dice',
    kind: 'dice',
    status: 'alpha',
    integration: {
      type: 'module',
      modulePath: '@/app/[locale]/jeux/components/dice',
    },
    description: 'Lancez les dés et gagnez gros',
    tags: ['simple', 'quick'],
  },
  {
    id: 'mines',
    name: 'Mines Adventure',
    kind: 'mines',
    status: 'alpha',
    integration: {
      type: 'module',
      modulePath: '@/app/[locale]/jeux/components/mines',
    },
    description: 'Évitez les mines et multipliez vos gains',
    tags: ['strategy', 'multiplier'],
  },
];

export function getGameById(id: string): GameEntry | undefined {
  return GAMES.find((game) => game.id === id);
}

export function getGamesByStatus(status: GameStatus): GameEntry[] {
  return GAMES.filter((game) => game.status === status);
}

export function getGamesByKind(kind: GameKind): GameEntry[] {
  return GAMES.filter((game) => game.kind === kind);
}
