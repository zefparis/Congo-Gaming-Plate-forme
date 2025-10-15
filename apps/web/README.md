# Congo Gaming 🎮

> Jouez simple. Gagnez grand. Mobile d'abord.

Plateforme de jeux en ligne moderne pour le Congo avec paiements mobiles intégrés (Orange Money, Airtel Money, M-Pesa).

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+ (LTS)
- pnpm 8+

### Installation

```bash
# Installer les dépendances
pnpm install

# Lancer en mode développement
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📦 Scripts disponibles

```bash
pnpm dev          # Démarrer le serveur de développement
pnpm build        # Construire pour la production
pnpm start        # Démarrer le serveur de production
pnpm lint         # Vérifier le code avec ESLint
pnpm typecheck    # Vérifier les types TypeScript
pnpm format       # Formater le code avec Prettier
```

## 🏗️ Architecture

### Stack technique

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + shadcn/ui
- **State**: Zustand (UI) + TanStack Query (data)
- **i18n**: next-intl (FR/EN)
- **Validation**: Zod
- **Charts**: Recharts
- **Animations**: Framer Motion

### Structure du projet

```
apps/web/
├── app/
│   ├── [locale]/              # Routes internationalisées
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── jeux/              # Hub des jeux
│   │   │   ├── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── GameCard.tsx
│   │   │   │   ├── GameGrid.tsx
│   │   │   │   └── GameEmbed.tsx
│   │   │   └── data/games.ts  # Registry des jeux
│   │   ├── loto/              # Loterie Congo
│   │   │   ├── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── TicketBuilder.tsx
│   │   │   │   ├── DrawResults.tsx
│   │   │   │   └── PurchasePanel.tsx
│   │   │   └── data/loto.ts
│   │   └── components/        # Composants partagés
│   ├── api/                   # API Routes (mock)
│   │   ├── games/
│   │   ├── loto/
│   │   └── payments/
│   ├── globals.css
│   └── providers.tsx
├── components/ui/             # Composants shadcn/ui
├── lib/
│   ├── i18n/                  # Configuration i18n
│   ├── config/                # Configuration du site
│   ├── payments/              # Logique paiements mobiles
│   └── utils.ts
└── public/
    ├── manifest.json          # PWA manifest
    └── icons/
```

## 🎮 Fonctionnalités

### ✅ Implémenté

- **Homepage**: Hero, Features, Preview jeux/loto, Section paiements
- **Hub Jeux**: Grid dynamique, GameEmbed avec support iframe/module
- **Loto**: Sélection numéros, achat tickets, résultats tirages, stats
- **Paiements mobiles**: Mock Orange Money, Airtel Money, M-Pesa
- **i18n**: Français (défaut) et Anglais
- **Dark/Light mode**: Thème persistant avec next-themes
- **PWA**: Manifest basique pour installation mobile
- **CI/CD**: GitHub Actions (lint, typecheck, build)

### 🎯 Prochaines étapes

- Intégration réelle Aviator (iframe ou micro-frontend)
- Backend réel avec Postgres/Prisma
- Authentification globale (NextAuth.js)
- Paiements réels (API opérateurs mobiles)
- KYC et conformité légale
- WebSocket pour jeux en temps réel

## 🎲 Intégration de jeux

### Registry des jeux

Les jeux sont définis dans `app/[locale]/jeux/data/games.ts`:

```typescript
export interface GameEntry {
  id: string;
  name: string;
  kind: 'crash' | 'slots' | 'dice' | 'mines' | 'lottery' | 'other';
  status: 'alpha' | 'beta' | 'live';
  integration: {
    type: 'iframe' | 'module';
    url?: string;              // Pour iframe
    modulePath?: string;       // Pour module
    requiresMobileAuth?: boolean;
  };
  description?: string;
  tags?: string[];
}
```

### Ajouter un nouveau jeu

**Option 1: Iframe (jeu externe)**

```typescript
{
  id: 'aviator',
  name: 'Aviator',
  kind: 'crash',
  status: 'live',
  integration: {
    type: 'iframe',
    url: 'https://aviator.provider.com/game',
    requiresMobileAuth: true,
  },
}
```

Le token d'auth mobile sera automatiquement passé via query param `?token=...`

**Option 2: Module (jeu intégré)**

```typescript
{
  id: 'slots',
  name: 'Slots',
  kind: 'slots',
  status: 'beta',
  integration: {
    type: 'module',
    modulePath: '@/app/[locale]/jeux/components/slots',
  },
}
```

Créez ensuite le composant dans le chemin spécifié.

### Event Bus

Le `GameEmbed` écoute les messages postMessage pour la communication iframe:

```typescript
// Dans le jeu (iframe)
window.parent.postMessage({
  type: 'GAME_EVENT',
  action: 'BET_PLACED',
  data: { amount: 1000 }
}, '*');

// Dans GameEmbed
onEvent={(e) => {
  if (e.type === 'GAME_EVENT') {
    // Handle event
  }
}}
```

## 💳 Paiements mobiles (Mock)

Actuellement, tous les paiements sont mockés en mémoire. Pour intégrer les vraies API:

1. Remplacer `/app/api/payments/mobile/route.ts` par les appels API réels
2. Ajouter les credentials dans `.env.local`:

```env
ORANGE_MONEY_API_KEY=xxx
AIRTEL_MONEY_API_KEY=xxx
MPESA_API_KEY=xxx
```

3. Utiliser la façade `lib/payments/mobile.ts` pour abstraire les appels

## 🌍 Internationalisation

Ajouter/modifier les traductions dans:
- `lib/i18n/messages/fr.json`
- `lib/i18n/messages/en.json`

Utilisation:

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('games');
return <h1>{t('title')}</h1>;
```

## 🎨 Thème et Design System

### Couleurs

Configurées dans `app/globals.css` avec CSS variables:

```css
:root {
  --primary: 262 83% 58%;      /* Purple */
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  /* ... */
}
```

### Composants UI

Tous les composants UI sont dans `components/ui/` (shadcn/ui):
- Button, Card, Input, Select, Dialog, Toast
- Configurés avec Radix UI primitives
- Stylés avec Tailwind + CVA

### Animations

Framer Motion pour les animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 📱 PWA

Le manifest PWA est dans `public/manifest.json`. Pour activer le service worker:

1. Installer `next-pwa`:
```bash
pnpm add next-pwa
```

2. Configurer dans `next.config.mjs`:
```js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
```

## 🧪 Tests (à venir)

```bash
pnpm test        # Jest + React Testing Library
pnpm test:e2e    # Playwright
```

## 📄 License

Propriétaire - Congo Gaming © 2025

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

- Email: support@congo-gaming.com
- Discord: [Congo Gaming Community](https://discord.gg/congogaming)

---

**Fait avec ❤️ pour le Congo**
