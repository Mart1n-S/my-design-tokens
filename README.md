# 🎨 My Design System

![Vue.js](https://img.shields.io/badge/vuejs-%2335495E.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)
![Chromatic](https://img.shields.io/badge/-Chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

Bienvenue sur le dépôt de **My Design System**. Ce projet est une bibliothèque de composants UI modulaire, construite avec **Vue 3** et **TypeScript**, conçue pour assurer la cohérence visuelle et fonctionnelle des applications.

Il repose sur l'utilisation de **Design Tokens** pour le style et suit la méthodologie **Atomic Design** pour l'architecture des composants.

Une attention particulière a été portée à l'**accessibilité (A11y)** ♿. Chaque composant est conçu pour être inclusif et utilisable par tous :
* Utilisation de la **sémantique HTML native**.
* Gestion des états de **focus** pour la navigation au clavier.
* Support des technologies d'assistance via les attributs **ARIA**.
* Respect des ratios de **contraste** via les tokens de couleurs.

---

## 🏗️ Architecture & Conception

Le projet est structuré pour être évolutif et maintenable.

### 1. Design Tokens
Nous n'utilisons pas de valeurs "en dur" (hex codes, pixels) dans les composants. Tout est centralisé via des **Tokens** (variables CSS) générés automatiquement.
* **Localisation** : `vue-app/src/styles/variables.css`, `vue-app/src/styles/variables-dark.css` (ou `vue-app/src/styles/tokens.ts`)
* **Usage** : Couleurs, Espacements, Typographie, Ombres, Radius.

### 2. Atomic Design
Les composants sont organisés selon leur complexité :

```bash
vue-app/src/components/
├── atoms/       # Composants indivisibles (Button, Icon, Badge, Input...)
└── molecules/   # Assemblages d'atomes (FormField, SearchBar, AlertToast...)

```

---

## 🚀 Installation & Setup

### Prérequis

* Node.js (v20+ recommandé)
* NPM

### Installation

Clonez le dépôt et installez les dépendances.

```bash
# Cloner le projet
git clone https://github.com/Mart1n-S/my-design-tokens.git

# Aller dans le dossier racine
cd my-design-tokens

# Installer toutes les dépendances (racine)
npm install

# Aller dans le dossier de l'application Vue
cd vue-app

# Installer les dépendances de l'application Vue
npm install

```

### Lancer le projet

Une fois l'installation terminée, déplacez-vous dans le dossier de l'application pour lancer l'environnement de développement (Vite) :

```bash
# Entrer dans le dossier de l'application si vous n'y êtes pas déjà
cd vue-app

# Lancer le serveur de développement
npm run dev

```


---

## 📚 Storybook (Documentation)

Nous utilisons **Storybook** pour développer, tester et documenter les composants de manière isolée. C'est notre "source de vérité" visuelle et technique.

La documentation est conçue pour être exhaustive et pratique :

* **Design Tokens** : Une section dédiée visualise la palette de couleurs 🎨, les typographies et les espacements.
* **Playground (Contrôles)** : Chaque composant dispose d'un tableau interactif pour tester ses différentes **props** et voir le rendu en temps réel.
* **Guides d'utilisation** : Des sections **"Do & Don't"** expliquent le contexte d'utilisation idéal de chaque composant.
* **Accessibilité (A11y)** : Des audits automatiques et des notes spécifiques garantissent que chaque composant est inclusif.

Pour lancer Storybook en local depuis le dossier `vue-app` :

```bash
npm run storybook

```

L'interface sera accessible sur : http://localhost:6006

---

### 📚 Deux façons d’explorer les composants

Une fois le projet lancé, vous disposez de deux interfaces complémentaires :

1. **Storybook** (`http://localhost:6006`)
* *Source de vérité du Design System.*
* Documentation technique, contrôles interactifs, tests d’accessibilité, règles "Do & Don’t".


2. **Application Vite** (`http://localhost:5173`)
* *Vue d’ensemble.*
* Présentation centralisée de tous les composants expliquée dans `App.vue`.
* Idéal pour visualiser les composants dans un contexte applicatif réel.

---

## ✅ Tests & Qualité

La qualité du code est assurée par deux niveaux de tests.

### 1. Tests Unitaires (Vitest)

Ils vérifient le rendu visuel, les props et la logique interne des composants.

Pour lancer les tests unitaires depuis le dossier `vue-app` :

```bash
npm run test

```

### 2. Tests d'Interactions (Storybook Test Runner)

Ils vérifient les scénarios d'interaction (clics, formulaires, navigation) définis dans les stories.

⚠️ **Prérequis :** Storybook doit être **lancé en local** (`npm run storybook`) dans un terminal séparé pour que ces tests fonctionnent.

Une fois Storybook démarré (sur le port 6006), lancez dans un **nouveau terminal** depuis le dossier `vue-app` :

```bash
npm run test-storybook

```

---

## 🌗 Thèmes Light & Dark

Le Design System supporte nativement les **thèmes clair et sombre**.

* La gestion des thèmes repose entièrement sur les **Design Tokens**.
* Les variables CSS sont générées automatiquement pour chaque thème.
* Le changement de thème est global et cohérent sur tous les composants.

💡 *Les fichiers de thèmes sont générés dans `vue-app/src/styles` (`variables.css`, `variables-dark.css`).*

---

## 🎨 Personnalisation du Thème (Design Tokens)

Le style de l'application n'est pas codé en dur, il est généré à partir de fichiers JSON situés dans le dossier `tokens/` à la racine du projet.

Pour modifier l'apparence (couleurs, espacements, typographie) :

1. **Modifier les fichiers sources** :
Allez dans le dossier `tokens/` et modifiez les fichiers JSON souhaités :
* `tokens/color/base.json` : Pour changer les palettes de couleurs.
* `tokens/spacing.json` : Pour ajuster les marges et paddings.
* `tokens/typography.json` : Pour changer les polices et tailles.


2. **Générer les variables CSS** :
Une fois vos modifications terminées, vous devez recompiler les tokens pour qu'ils soient pris en compte par l'application Vue. Lancez cette commande depuis la **racine** du projet :
```bash
npm run build:tokens

```


*Cela va mettre à jour les variables CSS dans le dossier de l'application.*

---

## 🚀 Déploiement Manuel sur votre propre Chromatic

Si vous souhaitez forker ce projet et le déployer sur votre propre compte Chromatic (hors CI/CD), suivez ces étapes :

1. **Créer un projet** : Connectez-vous sur [Chromatic.com](https://www.chromatic.com/) avec votre compte GitHub et créez un nouveau projet pour obtenir un `projectToken`.
2. **Configuration locale** :
Dans le dossier `vue-app`, dupliquez le fichier d'exemple pour créer votre configuration locale :
```bash
cd vue-app
cp .env.example .env

```


3. **Ajout du Token** :
Ouvrez le fichier `.env` nouvellement créé et remplacez la variable par votre propre token :
```env
CHROMATIC_PROJECT_TOKEN=votre-token-chromatic-ici

```


4. **Déployer** :
Lancez la commande de déploiement manuel :
```bash
npm run chromatic

```


*Cette commande va construire votre Storybook et l'envoyer sur votre dashboard Chromatic.*

---

## ⚙️ CI/CD & Déploiement

Ce projet dispose d'un pipeline d'intégration et de déploiement continu (CI/CD) géré par **GitHub Actions**.

### Workflow Automatisé (`.github/workflows/release.yml`)

À chaque `push` ou `pull_request` sur la branche `main`, les étapes suivantes sont exécutées :

1. **Installation** : Récupération du code et installation des dépendances (`npm ci`).
2. **Préparation Tests** : Installation des navigateurs Playwright (nécessaires pour Vitest en mode browser).
3. **Tests Unitaires** : Exécution de `npm run test`.
* 🛑 *Si les tests échouent, le déploiement est bloqué.*


4. **Déploiement Chromatic** : Si les tests passent, Storybook est construit et déployé sur Chromatic pour la validation visuelle.

### 🔍 Chromatic

**Chromatic** est utilisé pour :

* Héberger notre Storybook en ligne (consultable par les designers/PMs).
* Effectuer des **tests de régression visuelle** (détecter les pixels qui ont changé entre deux versions).

---

## 📂 Structure du Projet

L'architecture sépare la définition du design (Tokens) de son implémentation technique (Vue App).

```text
my-design-tokens/             # Racine du projet
├── .github/workflows/        # ⚙️ Configuration CI/CD
├── tokens/                   # 🎨 Source des Design Tokens (Fichiers JSON)
│   ├── color/                # Palettes de couleurs
│   ├── spacing.json          # Espacements
│   ├── radius.json           # Arrondis
│   └── typography.json       # Typographie
├── config.js                 # Configuration du générateur (Style Dictionary)
├── package.json              # Scripts racine (ex: build:tokens)
└── vue-app/                  # Bibliothèque de composants Vue 3
    ├── .storybook/           # Configuration Storybook
    ├── src/
    │   ├── components/       # ⚛️ Architecture Atomic Design
    │   │   ├── atoms/        # (Boutons, Inputs, Badges...)
    │   │   └── molecules/    # (Cartes, Champs formulaires...)
    │   ├── stories/          # Pages de documentation globale
    │   │   ├── Introduction.mdx
    │   │   └── ...
    │   ├── styles/           # CSS généré automatiquement (Ne pas modifier ici)
    │   └── types/            # Définitions TypeScript
    ├── vite.config.ts
    └── package.json

```
