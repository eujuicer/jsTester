# jsTester

![Playwright Tests](https://github.com/eujuicer/jsTester/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?logo=typescript&logoColor=white)

Exercices de tests end-to-end avec **Playwright** et **TypeScript**, réalisés pendant ma formation QA.

## Scénarios couverts

| Fichier | Site | Scénarios |
| --- | --- | --- |
| [todomvc.spec.ts](tests/todomvc.spec.ts) | TodoMVC | Titre de la page, ajout d'une tâche, cocher une tâche et vérifier le compteur |
| [login.spec.ts](tests/login.spec.ts) | Sauce Demo | Connexion réussie (`standard_user`) et utilisateur bloqué (`locked_out_user`) |
| [panier.spec.ts](tests/panier.spec.ts) | Sauce Demo | Ajout d'articles au panier et vérification du badge |
| [checkout.spec.ts](tests/checkout.spec.ts) | Sauce Demo | Parcours d'achat complet : sous-total, taxe, total et confirmation de commande |

Les sites testés sont [Sauce Demo](https://www.saucedemo.com/) et [TodoMVC](https://demo.playwright.dev/todomvc), deux applications de démonstration prévues pour s'entraîner à l'automatisation.

## Stack

- [Playwright Test](https://playwright.dev/) pour les tests et les assertions
- TypeScript
- GitHub Actions pour l'intégration continue
- Tests exécutés sur Chromium, Firefox et WebKit

## Prérequis

- [Node.js](https://nodejs.org/) (version LTS recommandée)

## Installation

```bash
git clone https://github.com/eujuicer/jsTester.git
cd jsTester
npm install
npx playwright install
```

## Lancer les tests

```bash
# Tous les tests, sur tous les navigateurs
npm test

# Un seul navigateur
npx playwright test --project=chromium

# Mode UI interactif
npm run test:ui

# Mode avec navigateur visible
npm run test:headed

# Ouvrir le dernier rapport HTML
npm run report
```

## Structure du projet

```
jsTester/
├── .github/workflows/playwright.yml   # Pipeline CI
├── tests/
│   ├── todomvc.spec.ts
│   ├── login.spec.ts
│   ├── panier.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts               # Configuration Playwright
├── tsconfig.json
└── package.json
```

## Intégration continue

À chaque push ou pull request sur `main`, le workflow GitHub Actions installe les dépendances et les navigateurs, lance toute la suite de tests, puis publie le rapport HTML en artefact (conservé 30 jours).

## Bonnes pratiques appliquées

- Sélecteurs orientés utilisateur (`getByRole`, `getByPlaceholder`) et `data-test` via `getByTestId` (attribut surchargé pour TodoMVC)
- `beforeEach` pour factoriser l'étape de connexion
- Assertions web-first qui attendent automatiquement l'état de la page
- Trace activée au premier retry pour faciliter le débogage

## Avertissement

Les identifiants utilisés (`standard_user` / `secret_sauce`) sont les comptes de démonstration publics de Sauce Demo. Ils ne donnent accès à aucune donnée réelle.
