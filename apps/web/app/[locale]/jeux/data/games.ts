export type GameEntry = {
  id: string;
  name: string;
  kind: string;
  status: 'alpha' | 'beta' | 'live';
  description: string;
  integration: {
    type: 'iframe' | 'module';
    url?: string;
    modulePath?: string;
    requiresMobileAuth?: boolean;
  };
  tags?: string[];
};

export const GAMES: GameEntry[] = [
  {
    id: 'aviator',
    name: 'Aviator (Crash)',
    kind: 'crash',
    status: 'live',
    description: "Un jeu de type Crash Game en temps réel. Multipliez vos gains avant le crash !",
    integration: {
      type: 'iframe',
      url: 'https://aviator-1-server.vercel.app',
      requiresMobileAuth: false,
    },
    tags: ['realtime', 'high-risk'],
  },
  {
    id: 'slots',
    name: 'Slots Galaxy',
    kind: 'slots',
    status: 'alpha',
    description: "Tournez et tentez votre chance dans l'espace !",
    integration: {
      type: 'module',
      modulePath: '@/app/jeux/components/slots',
    },
    tags: ['coming-soon'],
  },
];

export function getGameById(id: string): GameEntry | undefined {
  return GAMES.find((game) => game.id === id);
}
