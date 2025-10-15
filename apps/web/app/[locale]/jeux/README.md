# Page Jeux - Congo Gaming

## 📁 Structure

```
app/[locale]/jeux/
├── page.tsx              # Page principale avec animations Framer Motion
├── components/
│   ├── GameCard.tsx      # Carte de jeu animée (hover/tap effects)
│   ├── GameGrid.tsx      # Grille responsive des jeux
│   └── GameEmbed.tsx     # Modal plein écran pour jouer
└── data/
    └── games.ts          # Configuration des jeux disponibles
```

## 🎮 Jeux Disponibles

### Aviator (Crash Game)
- **Status**: Beta
- **Type**: iframe
- **URL**: `https://aviator.congo-gaming.local/embed`
- **Features**: Authentification mobile requise

### Slots Galaxy
- **Status**: Alpha
- **Type**: module
- **Path**: `@/app/jeux/components/slots`
- **Features**: À implémenter

## 🚀 Fonctionnalités

✅ **Design futuriste** avec dégradés dark/light
✅ **Animations Framer Motion** (hover, tap, fade-in)
✅ **Responsive mobile-first** (grid adaptatif)
✅ **Modal plein écran** pour l'expérience de jeu
✅ **Support iframe & modules** pour intégration flexible
✅ **Dark/Light mode** compatible

## 🔧 Utilisation

### Accéder à la page
```
http://localhost:3001/fr/jeux
http://localhost:3001/en/jeux
```

### Ajouter un nouveau jeu

Éditez `/app/[locale]/jeux/data/games.ts` :

```typescript
{
  id: 'mon-jeu',
  name: 'Mon Jeu',
  kind: 'poker',
  status: 'live',
  description: "Description du jeu",
  integration: {
    type: 'iframe',
    url: 'https://mon-jeu.com/embed',
    requiresMobileAuth: false,
  },
  tags: ['nouveau', 'populaire'],
}
```

## 🎨 Personnalisation

### Modifier les couleurs des cartes
Éditez `GameCard.tsx` pour changer les classes Tailwind :
- `from-neutral-900 to-neutral-800` (dark mode)
- `dark:from-neutral-800 dark:to-neutral-700` (light mode)

### Ajuster les animations
Modifiez les props Framer Motion dans `GameCard.tsx` :
```typescript
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.98 }}
```

## 📱 Navigation

Le lien "Jeux" est déjà intégré dans le header principal via `/lib/config/site.ts`.

## 🔗 Intégration Aviator

Pour activer l'iframe Aviator réel, remplacez le placeholder dans `GameEmbed.tsx` :

```typescript
<iframe
  src={game.integration.url}
  className="w-full h-full border-none rounded-lg"
  allowFullScreen
/>
```

L'URL est déjà configurée : `https://aviator.congo-gaming.local/embed`
