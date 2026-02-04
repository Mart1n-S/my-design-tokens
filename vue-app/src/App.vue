<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import BaseButton from './components/atoms/Button/BaseButton.vue';
import BaseIcon from './components/atoms/Icon/BaseIcon.vue';
import FormField from './components/molecules/FormField/FormField.vue';
import BaseTextarea from './components/atoms/Textarea/BaseTextarea.vue';
import BaseInput from './components/atoms/Input/BaseInput.vue';
import BaseBadge from './components/atoms/Badge/BaseBadge.vue';
import BaseAvatar from './components/atoms/Avatar/BaseAvatar.vue';
import BaseSwitch from './components/atoms/Switch/BaseSwitch.vue';
import ProfileCard from './components/molecules/ProfileCard/ProfileCard.vue';
import ReviewCard from './components/molecules/ReviewCard/ReviewCard.vue';
import AlertToast from './components/molecules/AlertToast/AlertToast.vue';

const handleFollow = (name: string) => {
  alert(`Action ${name}`);
};
// Gestion du thème (clair/sombre)
// On lit la préférence système ou le localStorage
const theme = ref(localStorage.getItem('theme') || 'light');

watchEffect(() => {
  const root = document.documentElement;
  // On applique l'attribut data-theme sur la balise <html>
  root.setAttribute('data-theme', theme.value);
  // On sauvegarde le choix
  localStorage.setItem('theme', theme.value);
});

// Fonction simple pour basculer le thème
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

// Liste des icones pour la démo
const allIcons = [
  'search', 'check', 'close', 'plus', 'edit', 'trash', 'settings',
  'warning', 'info', 'loading',
  'user', 'mail', 'heart', 'eye',
  'menu', 'chevron-down', 'arrow-right', 'logout',
  'sun', 'moon'
];

// Variables pour la démo des Inputs et Textareas
const atomInputText = ref('');
const atomInputIcon = ref('');
const atomInputError = ref('Mauvaise valeur');
const atomInputDisabled = ref('Valeur figée');

const atomTxtSimple = ref('');
const atomTxtResize = ref('');
const atomTxtError = ref('Contenu invalide');

// Data pour la démos des Textareas
const textBio = ref('');
const textError = ref('');
const textLimit = ref('');
const textDisabled = ref('Ce contenu ne peut pas être modifié.');
const textReadonly = ref('ID-12345-X89 (Lecture seule, mais copiable)');

// DATA POUR BASE INPUT
const inputSearch = ref('');
const inputPassword = ref('SuperSecret123');
const showPassword = ref(false);
const inputEmail = ref('jean.dupont@');
const inputDisabled = ref('admin_user');
const inputReadonly = ref('pk_live_51MzT8');

// Variables pour BaseSwitch
const switchVal1 = ref(false);
const switchVal2 = ref(true);
const switchVal3 = ref(false);

// Demo ReviewCard
const reviewText = ref('');
const reviewTextNoAvatar = ref('');
const isSubmittingReview = ref(false);
const reviewLimit = ref('');

const submitReview = () => {
  isSubmittingReview.value = true;
  // Simulation d'appel API
  setTimeout(() => {
    isSubmittingReview.value = false;
    alert(`Avis envoyé : "${reviewText.value}"`);
    reviewText.value = '';
  }, 2000);
};

// Demo alert toast
const showAlertDemo = ref(true);
const resetAlert = () => {
  showAlertDemo.value = false;
  setTimeout(() => {
    showAlertDemo.value = true;
  }, 200);
};

const toc = [
  {
    category: 'ATOMES',
    links: [
      { label: 'BaseIcon', id: 'atom-icon' },
      { label: 'BaseButton', id: 'atom-button' },
      { label: 'BaseTextarea', id: 'atom-textarea' },
      { label: 'BaseInput', id: 'atom-input' },
      { label: 'BaseBadge', id: 'atom-badge' },
      { label: 'BaseAvatar', id: 'atom-avatar' },
      { label: 'BaseSwitch', id: 'atom-switch' },
    ]
  },
  {
    category: 'MOLÉCULES',
    links: [
      { label: 'FormField (Textarea)', id: 'mol-formfield-textarea' },
      { label: 'FormField (Input)', id: 'mol-formfield-input' },
      { label: 'ProfileCard', id: 'mol-profile' },
      { label: 'ReviewCard', id: 'mol-review' },
      { label: 'AlertToast', id: 'mol-alert' },
    ]
  }
];

// Fonction pour le scroll fluide
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="app-layout">

    <aside class="sidebar">
      <h1 class="app-logo">Design System</h1>

      <nav class="toc-nav">
        <div v-for="group in toc" :key="group.category" class="toc-group">
          <h3 class="toc-category">{{ group.category }}</h3>
          <ul>
            <li v-for="link in group.links" :key="link.id">
              <a href="#" @click.prevent="scrollToSection(link.id)" class="toc-link">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <div class="app-content-layout">
      <header class="app-header">
        <div class="header-content">
          <h1>Design System Demo</h1>

          <BaseButton @click="toggleTheme" variant="secondary" size="sm">
            <template #icon-left>
              <BaseIcon :name="theme === 'light' ? 'moon' : 'sun'" size="sm" />
            </template>
            {{ theme === 'light' ? 'Passer en Mode Sombre' : 'Passer en Mode Clair' }}
          </BaseButton>
        </div>
      </header>

      <main class="app-main">

        <section id="atom-icon" class="showcase-section">
          <h2>Atome: BaseIcon</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Utilise <code>lucide-vue-next</code>. Les tailles sont connectées aux Design Tokens.</p>
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Valeurs possibles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Voir liste ci-dessous</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td>String</td>
                  <td>'md'</td>
                  <td>'sm', 'md', 'lg'</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td>String</td>
                  <td>'currentColor'</td>
                  <td>Hex, RGB, ou var(--token)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="icon-grid">
            <div v-for="iconName in allIcons" :key="iconName" class="icon-item">
              <BaseIcon :name="iconName" size="lg" />
              <span>{{ iconName }}</span>
            </div>
          </div>
        </section>

        <section id="atom-button" class="showcase-section">
          <h2>Atome: BaseButton</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Composant bouton principal. Supporte le polymorphisme, les icônes, le mode "icon-only" et les états de
              chargement.</p>
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Valeurs possibles / Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td>String</td>
                  <td>'primary'</td>
                  <td>'primary', 'secondary', 'tertiary', 'danger'</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td>String</td>
                  <td>'md'</td>
                  <td>'sm', 'md', 'lg'</td>
                </tr>
                <tr>
                  <td><code>iconOnly</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Bouton rond contenant uniquement l'icône</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Désactive le bouton (visuel + interaction)</td>
                </tr>
                <tr>
                  <td><code>loading</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche un spinner et empêche le clic</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Nom de l'icône (ex: 'search', 'check')</td>
                </tr>
                <tr>
                  <td><code>iconPosition</code></td>
                  <td>String</td>
                  <td>'left'</td>
                  <td>'left', 'right'</td>
                </tr>
                <tr>
                  <td><code>fullWidth</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Prend 100% de la largeur disponible</td>
                </tr>
                <tr>
                  <td><code>as</code></td>
                  <td>String</td>
                  <td>'button'</td>
                  <td>'button', 'a' (lien), 'router-link'</td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td>String</td>
                  <td>'button'</td>
                  <td>Type natif : 'button', 'submit', 'reset'</td>
                </tr>
                <tr>
                  <td><code>href</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>URL du lien (si utilisé avec <code>as="a"</code>)</td>
                </tr>
                <tr>
                  <td><code>to</code></td>
                  <td>String | Object</td>
                  <td>-</td>
                  <td>Route cible (si utilisé avec <code>as="router-link"</code>)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>1. Variantes (Couleurs)</h3>
          <p class="section-desc">Test des couleurs de base, hover et active.</p>
          <div class="btn-row">
            <BaseButton variant="primary">Primary</BaseButton>
            <BaseButton variant="secondary">Secondary</BaseButton>
            <BaseButton variant="tertiary">Tertiary</BaseButton>
            <BaseButton variant="danger">Danger</BaseButton>
          </div>

          <h3>2. Tailles</h3>
          <div class="btn-row">
            <BaseButton size="sm" variant="primary">Small</BaseButton>
            <BaseButton size="md" variant="primary">Medium</BaseButton>
            <BaseButton size="lg" variant="primary">Large</BaseButton>
          </div>

          <h3>3. États Désactivés (Disabled)</h3>
          <p class="section-desc">Doit afficher un fond gris clair et texte gris foncé (sauf Tertiary).</p>
          <div class="btn-row">
            <BaseButton variant="primary" disabled>Primary Disabled</BaseButton>
            <BaseButton variant="secondary" disabled>Secondary Disabled</BaseButton>
            <BaseButton variant="tertiary" disabled>Tertiary Disabled</BaseButton>
            <BaseButton variant="danger" disabled>Danger Disabled</BaseButton>
          </div>

          <h3>4. États de Chargement (Loading)</h3>
          <div class="btn-row">
            <BaseButton loading aria-label="Chargement en cours...">
              Loading...
            </BaseButton>

            <BaseButton variant="secondary" loading aria-label="Sauvegarde en cours">
              Saving...
            </BaseButton>

            <BaseButton variant="danger" loading aria-label="Suppression en cours">
              Deleting...
            </BaseButton>
          </div>

          <h3>5. Composition avec Icones</h3>
          <div class="btn-row">
            <BaseButton icon="search">Rechercher</BaseButton>
            <BaseButton variant="secondary" icon="arrow-right" icon-position="right">Suivant</BaseButton>
            <BaseButton variant="danger" icon="trash">Supprimer</BaseButton>
            <BaseButton variant="tertiary">
              <template #icon-left>
                <BaseIcon name="settings" />
              </template>
              Slot Custom
            </BaseButton>
          </div>

          <h3>6. Pleine largeur (Full Width)</h3>
          <div style="max-width: 400px; border: 1px dashed var(--color-border-default); padding: 1rem;">
            <BaseButton fullWidth>Bouton Block</BaseButton>
          </div>

          <h3>7. Boutons Icones (Icon Only)</h3>
          <p class="section-desc">Boutons carrés ou ronds. <strong>Note :</strong> Toujours fournir un
            <code>aria-label</code>.
          </p>

          <div class="btn-row">
            <BaseButton size="md" icon="search" icon-only aria-label="Rechercher" />
            <BaseButton size="md" variant="secondary" icon="edit" icon-only aria-label="Éditer" />
            <BaseButton size="md" variant="tertiary" icon="close" icon-only aria-label="Fermer" />
            <BaseButton size="md" variant="danger" icon="trash" icon-only aria-label="Supprimer" />
          </div>

          <div class="btn-row">
            <BaseButton size="sm" icon="plus" icon-only aria-label="Ajouter (Small)" />
            <BaseButton size="md" icon="plus" icon-only aria-label="Ajouter (Medium)" />
            <BaseButton size="lg" icon="plus" icon-only aria-label="Ajouter (Large)" />
          </div>

        </section>

        <section id="atom-textarea" class="showcase-section">
          <h2>Atome: BaseTextarea</h2>

          <div class="doc-box">
            <h3>Documentation Technique</h3>
            <p>Zone de texte multiligne. Gère le redimensionnement et les états natifs.</p>

            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>modelValue</code></td>
                  <td>String</td>
                  <td>''</td>
                  <td>Valeur du champ (v-model)</td>
                </tr>
                <tr>
                  <td><code>rows</code></td>
                  <td>Number | String</td>
                  <td>3</td>
                  <td>Nombre de lignes visibles initialement</td>
                </tr>
                <tr>
                  <td><code>resize</code></td>
                  <td>String</td>
                  <td>'vertical'</td>
                  <td>'none', 'vertical', 'horizontal', 'both'</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte indicatif temporaire</td>
                </tr>
                <tr>
                  <td><code>maxlength</code></td>
                  <td>Number</td>
                  <td>-</td>
                  <td>Limite native de caractères (bloque la saisie)</td>
                </tr>
                <tr>
                  <td><code>readonly</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Lecture seule (focus et copie possibles)</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Désactivé (ni clic, ni focus)</td>
                </tr>
                <tr>
                  <td><code>error</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche la bordure en rouge</td>
                </tr>
                <tr>
                  <td><code>required</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Ajoute l'attribut natif requis</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">

            <div>
              <h3>1. Options de Redimensionnement</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">

                <div>
                  <p class="section-desc">Resize Vertical (Défaut)</p>
                  <BaseTextarea v-model="atomTxtSimple" placeholder="Vous pouvez m'agrandir vers le bas..." rows="3" />
                </div>

                <div>
                  <p class="section-desc">Resize None (Fixe)</p>
                  <BaseTextarea v-model="atomTxtResize" resize="none" placeholder="Taille fixe (rows=3)..." />
                </div>

              </div>
            </div>

            <div>
              <h3>2. États</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-4);">

                <div>
                  <p class="section-desc">Error</p>
                  <BaseTextarea v-model="atomTxtError" error placeholder="Erreur de saisie..." />
                </div>

                <div>
                  <p class="section-desc">Disabled</p>
                  <BaseTextarea model-value="Contenu désactivé" disabled resize="none" />
                </div>

                <div>
                  <p class="section-desc">Readonly</p>
                  <BaseTextarea model-value="Contenu en lecture seule." readonly resize="none" />
                </div>

              </div>
            </div>

          </div>
        </section>

        <section id="atom-input" class="showcase-section">
          <h2>Atome: BaseInput</h2>

          <div class="doc-box">
            <h3>Documentation Technique</h3>
            <p>
              Champ de saisie sur une ligne. Hérite des attributs natifs (<code>$attrs</code>) comme
              <code>autocomplete</code>, <code>name</code>, etc.
            </p>

            <h4 style="margin-top: 15px;">Props</h4>
            <table class="doc-table">
              <thead>
                <tr>
                  <th style="width: 15%;">Prop</th>
                  <th style="width: 15%;">Type</th>
                  <th style="width: 15%;">Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>modelValue</code></td>
                  <td>String | Number</td>
                  <td>-</td>
                  <td>Valeur liée (v-model).</td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td>String</td>
                  <td>'text'</td>
                  <td>Type HTML natif : 'text', 'password', 'email', 'search', 'tel', 'url', 'number'.</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte indicatif (disparait à la saisie).</td>
                </tr>
                <tr>
                  <td><code>id</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>ID unique (nécessaire pour lier à un Label).</td>
                </tr>
                <tr>
                  <td><code>iconLeft</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Nom de l'icône à afficher à gauche (ex: 'search').</td>
                </tr>
                <tr>
                  <td><code>iconRight</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Nom de l'icône à afficher à droite (ex: 'eye').</td>
                </tr>
                <tr>
                  <td><code>iconSize</code></td>
                  <td>String</td>
                  <td>'sm'</td>
                  <td>Taille des icônes : 'sm' (16px), 'md' (20px).</td>
                </tr>
                <tr>
                  <td><code>error</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Passe la bordure en rouge et ajoute <code>aria-invalid="true"</code>.</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Désactive l'interaction et réduit l'opacité.</td>
                </tr>
                <tr>
                  <td><code>readonly</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Lecture seule (focus possible, copie possible, pas de modification).</td>
                </tr>
              </tbody>
            </table>

            <h4 style="margin-top: 15px;">Slots & Événements</h4>
            <table class="doc-table">
              <thead>
                <tr>
                  <th style="width: 20%;">Nom</th>
                  <th style="width: 15%;">Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>update:modelValue</code></td>
                  <td>Event</td>
                  <td>Émis à chaque frappe (input). Renvoie la valeur brute.</td>
                </tr>
                <tr>
                  <td><code>#icon-left</code></td>
                  <td>Slot</td>
                  <td>Remplace l'icône gauche par du contenu personnalisé.</td>
                </tr>
                <tr>
                  <td><code>#icon-right</code></td>
                  <td>Slot</td>
                  <td>Remplace l'icône droite par du contenu personnalisé (ex: bouton toggle password).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">

            <div>
              <h3>1. Basique & Icônes</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">
                <div>
                  <p class="section-desc">Standard (Placeholder)</p>
                  <BaseInput v-model="atomInputText" placeholder="Saisie simple..." />
                </div>
                <div>
                  <p class="section-desc">Icônes (Props)</p>
                  <BaseInput v-model="atomInputIcon" icon-left="user" icon-right="check"
                    placeholder="Nom d'utilisateur" />
                </div>
              </div>
            </div>

            <div>
              <h3>2. États Visuels</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-4);">
                <div>
                  <p class="section-desc">Error (Invalide)</p>
                  <BaseInput v-model="atomInputError" error icon-right="warning" />
                </div>
                <div>
                  <p class="section-desc">Disabled (Désactivé)</p>
                  <BaseInput v-model="atomInputDisabled" icon-left="lock" disabled />
                </div>
                <div>
                  <p class="section-desc">Readonly (Lecture)</p>
                  <BaseInput model-value="ID: 123456" readonly />
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="atom-badge" class="showcase-section">
          <h2>Atome: BaseBadge</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Indicateur de statut, labels ou tags.</p>
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Défaut</th>
                  <th>Valeurs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td>'neutral'</td>
                  <td>'neutral', 'success', 'warning', 'error', 'info'</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td>'md'</td>
                  <td>'sm' (petit), 'md' (standard)</td>
                </tr>
                <tr>
                  <td><code>shape</code></td>
                  <td>'rounded'</td>
                  <td>'rounded' (coins 4px), 'pill' (capsule)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-8);">

            <div>
              <h3>1. Variantes (Couleurs Sémantiques)</h3>
              <p class="section-desc">Test des différentes couleurs d'état.</p>
              <div style="display: flex; gap: var(--spacing-2); flex-wrap: wrap;">
                <BaseBadge variant="neutral">Neutral</BaseBadge>
                <BaseBadge variant="success">Success</BaseBadge>
                <BaseBadge variant="warning">Warning</BaseBadge>
                <BaseBadge variant="error">Error</BaseBadge>
                <BaseBadge variant="info">Info</BaseBadge>
              </div>
            </div>

            <hr style="border: 0; border-top: 1px dashed var(--color-border-default);" />

            <div>
              <h3>2. Formes (Shapes)</h3>
              <p class="section-desc">Comparaison entre le style standard et le style "capsule".</p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); max-width: 500px;">

                <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
                  <span style="font-size: 12px; font-weight: 600; color: var(--color-text-secondary);">Rounded
                    (Défaut)</span>
                  <div style="display: flex; gap: var(--spacing-2);">
                    <BaseBadge shape="rounded" variant="neutral">Tag #1</BaseBadge>
                    <BaseBadge shape="rounded" variant="info">v1.0.2</BaseBadge>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
                  <span style="font-size: 12px; font-weight: 600; color: var(--color-text-secondary);">Pill
                    (Capsule)</span>
                  <div style="display: flex; gap: var(--spacing-2);">
                    <BaseBadge shape="pill" variant="neutral">Tag #1</BaseBadge>
                    <BaseBadge shape="pill" variant="info">v1.0.2</BaseBadge>
                  </div>
                </div>

              </div>
            </div>

            <hr style="border: 0; border-top: 1px dashed var(--color-border-default);" />

            <div>
              <h3>3. Tailles (Sizes)</h3>
              <p class="section-desc">Comparaison de l'échelle Small vs Medium.</p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); max-width: 500px;">

                <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
                  <span style="font-size: 12px; font-weight: 600; color: var(--color-text-secondary);">Small (sm)</span>
                  <div>
                    <BaseBadge size="sm" variant="success">Payé</BaseBadge>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
                  <span style="font-size: 12px; font-weight: 600; color: var(--color-text-secondary);">Medium (md)</span>
                  <div>
                    <BaseBadge size="md" variant="success">Payé</BaseBadge>
                  </div>
                </div>

              </div>
            </div>

            <hr style="border: 0; border-top: 1px dashed var(--color-border-default);" />

            <div>
              <h3>4. Composition avec Icône</h3>
              <p class="section-desc">Exemples contextuels.</p>
              <div style="display: flex; gap: var(--spacing-4); align-items: flex-start;">

                <BaseBadge variant="success" size="sm">
                  <template #icon>
                    <BaseIcon name="check" size="sm" />
                  </template>
                  Succès
                </BaseBadge>

                <BaseBadge variant="warning" shape="pill" size="md">
                  <template #icon>
                    <BaseIcon name="warning" size="sm" />
                  </template>
                  Attention requise
                </BaseBadge>

                <BaseBadge variant="error" shape="rounded">
                  <template #icon>
                    <BaseIcon name="trash" size="sm" />
                  </template>
                  Supprimé
                </BaseBadge>

              </div>
            </div>

          </div>
        </section>

        <!-- BaseAvatar Showcase -->
        <section id="atom-avatar" class="showcase-section">
          <h2>Atome: BaseAvatar</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Composant d'affichage de photo de profil (toujours circulaire).</p>
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>src</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>URL de l'image. Fallback auto si erreur.</td>
                </tr>
                <tr>
                  <td><code>alt</code></td>
                  <td>String</td>
                  <td>(Requis)</td>
                  <td>Texte alternatif.</td>
                </tr>
                <tr>
                  <td><code>initials</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Force les initiales.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td>String</td>
                  <td>'md'</td>
                  <td>'sm', 'md', 'lg', 'xl'</td>
                </tr>
                <tr>
                  <td><code>decorative</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Ignorer par les lecteurs d'écran.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-6); max-width: 600px;">

            <div>
              <h3>1. Tailles</h3>
              <div style="display: flex; align-items: center; gap: var(--spacing-4);">
                <BaseAvatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="sm" />
                <BaseAvatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="md" />
                <BaseAvatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="lg" />
                <BaseAvatar src="https://i.pravatar.cc/150?img=4" alt="User 4" size="xl" />
              </div>
            </div>

            <div>
              <h3>2. Fallback (Initials)</h3>
              <div style="display: flex; gap: var(--spacing-6);">

                <div style="text-align: center;">
                  <BaseAvatar src="error.jpg" alt="Jean Dupont" size="sm" />
                  <p style="font-size: 12px; margin-top: 8px; color: var(--color-text-secondary);">Image HS</p>
                </div>

                <div style="text-align: center;">
                  <BaseAvatar src="error.jpg" alt="Jean Dupont" size="md" />
                  <p style="font-size: 12px; margin-top: 8px; color: var(--color-text-secondary);">Image HS</p>
                </div>

                <div style="text-align: center;">
                  <BaseAvatar src="error.jpg" alt="Jean Dupont" size="lg" />
                  <p style="font-size: 12px; margin-top: 8px; color: var(--color-text-secondary);">Image HS</p>
                </div>

                <div style="text-align: center;">
                  <BaseAvatar alt="Entreprise Acme" initials="AC" size="xl" />
                  <p style="font-size: 12px; margin-top: 8px; color: var(--color-text-secondary);">Sans Src</p>
                </div>

              </div>
            </div>

          </div>
        </section>
        
        <section id="atom-switch" class="showcase-section">
          <h2>Atome: BaseSwitch</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Bascule binaire (On/Off) utilisant un input checkbox natif avec <code>role="switch"</code>.</p>
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>modelValue</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>État du switch (v-model).</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte affiché à côté du switch.</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Rend le switch inactif (visuellement et fonctionnellement).</td>
                </tr>
                <tr>
                  <td><code>id</code></td>
                  <td>String</td>
                  <td>(Auto)</td>
                  <td>Identifiant unique (utile pour l'accessibilité si pas de label visuel).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-8);">

            <div>
              <h3>1. États Interactifs</h3>
              <p class="section-desc">Cliquez pour tester l'animation et le v-model.</p>

              <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">

                <div style="display: flex; align-items: center; justify-content: space-between; max-width: 300px;">
                  <BaseSwitch v-model="switchVal1" label="Notifications Push" />
                  <span style="font-size: 12px; color: var(--color-text-secondary);">
                    Valeur : <strong>{{ switchVal1 }}</strong>
                  </span>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; max-width: 300px;">
                  <BaseSwitch v-model="switchVal2" label="Mode Sombre" />
                  <span style="font-size: 12px; color: var(--color-text-secondary);">
                    Valeur : <strong>{{ switchVal2 }}</strong>
                  </span>
                </div>

              </div>
            </div>

            <hr style="border: 0; border-top: 1px dashed var(--color-border-default);" />

            <div>
              <h3>2. États Désactivés (Disabled)</h3>
              <p class="section-desc">Le curseur change et l'opacité est réduite.</p>

              <div style="display: flex; gap: var(--spacing-8);">
                <BaseSwitch :model-value="false" label="Option indisponible (Off)" disabled />

                <BaseSwitch :model-value="true" label="Option forcée (On)" disabled />
              </div>
            </div>

            <hr style="border: 0; border-top: 1px dashed var(--color-border-default);" />

            <div>
              <h3>3. Sans Label Visuel</h3>
              <p class="section-desc">Utile dans les tableaux ou en-têtes. Utilisez <code>aria-label</code>.</p>

              <div style="display: flex; align-items: center; gap: var(--spacing-4);">
                <span>Wi-Fi :</span>
                <BaseSwitch v-model="switchVal3" aria-label="Activer le Wi-Fi" />
                <span style="font-size: 12px; color: var(--color-text-secondary);">
                  {{ switchVal3 ? 'Activé' : 'Désactivé' }}
                </span>
              </div>
            </div>

          </div>
        </section>

        <section id="mol-formfield-textarea" class="showcase-section">
          <h2>Molécule: FormField + Atome: BaseTextarea</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Architecture atomique : <code>FormField</code> gère le layout (Label, Messages, Compteur),
              <code>BaseTextarea</code> gère le champ.
            </p>

            <table class="doc-table">
              <thead>
                <tr>
                  <th>Composant</th>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>modelValue</code></td>
                  <td>String</td>
                  <td>''</td>
                  <td>Valeur du champ (v-model)</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>rows</code></td>
                  <td>Number | String</td>
                  <td>3</td>
                  <td>Nombre de lignes visibles initialement</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>resize</code></td>
                  <td>String</td>
                  <td>'vertical'</td>
                  <td>'none', 'vertical', 'horizontal', 'both'</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>placeholder</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte indicatif temporaire</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>maxlength</code></td>
                  <td>Number</td>
                  <td>-</td>
                  <td>Limite native de caractères (bloque la saisie)</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>readonly</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Lecture seule (focus et copie possibles)</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>disabled</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Désactivé (ni clic, ni focus)</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>error</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche la bordure en rouge</td>
                </tr>
                <tr>
                  <td><strong>BaseTextarea</strong></td>
                  <td><code>required</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Ajoute l'attribut natif requis</td>
                </tr>

                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>id</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>ID unique pour lier Label et Input (Requis)</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>label</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Libellé du champ (Requis)</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>helpText</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte d'aide affiché sous le champ (gris)</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>errorMessage</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Message d'erreur affiché sous le champ (rouge)</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>error</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Bascule le label et le message en rouge</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>showCount</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche le compteur de caractères</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>maxLength</code></td>
                  <td>Number</td>
                  <td>-</td>
                  <td>Valeur max pour l'affichage du compteur (ex: 10/100)</td>
                </tr>
                <tr>
                  <td><strong>FormField</strong></td>
                  <td><code>currentLength</code></td>
                  <td>Number</td>
                  <td>-</td>
                  <td>Longueur actuelle du texte (v-model.length)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-6); max-width: 600px;">

            <div>
              <h3>1. Standard (Resize Vertical)</h3>
              <FormField id="bio" label="Biographie" help-text="Sera visible sur votre profil public.">
                <BaseTextarea id="bio" v-model="textBio" placeholder="Racontez votre histoire..." />
              </FormField>
            </div>

            <div>
              <h3>2. Avec Compteur & Limite</h3>
              <FormField id="tweet" label="Message court" show-count :max-length="100" :current-length="textLimit.length">
                <BaseTextarea id="tweet" v-model="textLimit" :maxlength="100" rows="2"
                  placeholder="Écrivez ici (max 100)..." />
              </FormField>
            </div>

            <div>
              <h3>3. État Erreur</h3>
              <FormField id="comment-error" label="Feedback" error error-message="Ce champ est requis pour soumettre."
                required>
                <template #default="{ describedBy }">
                  <BaseTextarea id="comment-error" v-model="textError" error required :aria-describedby="describedBy" />
                </template>
              </FormField>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">

              <div>
                <h3>4. Disabled</h3>
                <p class="section-desc">Label grisé, pas d'interaction.</p>
                <FormField id="disabled-demo" label="Archives" disabled>
                  <BaseTextarea id="disabled-demo" v-model="textDisabled" disabled resize="none" />
                </FormField>
              </div>

              <div>
                <h3>5. Readonly</h3>
                <p class="section-desc">Fond teinté, focus & copie ok.</p>
                <FormField id="readonly-demo" label="Clé API">
                  <BaseTextarea id="readonly-demo" v-model="textReadonly" readonly resize="none" />
                </FormField>
              </div>

            </div>

          </div>
        </section>

        <section id="mol-formfield-input" class="showcase-section">
          <h2>Molécule: FormField + Atome: BaseInput</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>Champ de saisie texte (input) avec gestion d'icônes, états et accessibilité.</p>
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop / Slot</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>modelValue</code></td>
                  <td>String | Number</td>
                  <td>-</td>
                  <td>Valeur du champ (v-model)</td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td>String</td>
                  <td>'text'</td>
                  <td>'text', 'password', 'email', 'search', etc.</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte fantôme (utilise le token text.placeholder)</td>
                </tr>
                <tr>
                  <td><code>iconLeft</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Nom de l'icône décorative à gauche</td>
                </tr>
                <tr>
                  <td><code>iconRight</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Nom de l'icône décorative à droite</td>
                </tr>
                <tr>
                  <td><code>iconSize</code></td>
                  <td>String</td>
                  <td>'sm'</td>
                  <td>Taille des icônes ('sm', 'md'...). Affecte aussi les slots.</td>
                </tr>
                <tr>
                  <td><code>#icon-right</code><br><code>#icon-left</code></td>
                  <td>Slot</td>
                  <td>-</td>
                  <td>Pour insérer du contenu complexe (ex: <code>BaseButton</code>)</td>
                </tr>
                <tr>
                  <td><code>error</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche la bordure en rouge</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Désactivé (ni clic, ni focus)</td>
                </tr>
                <tr>
                  <td><code>readonly</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Lecture seule (focus et copie possibles)</td>
                </tr>
                <tr>
                  <td><code>required</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Ajoute l'attribut natif requis</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-6); max-width: 600px;">

            <div>
              <h3>1. Standard & Recherche</h3>
              <FormField id="search-demo" label="Recherche utilisateur">
                <BaseInput id="search-demo" v-model="inputSearch" type="search" icon-left="search" icon-size="md"
                  placeholder="Tapez un nom..." />
              </FormField>
            </div>

            <div>
              <h3>2. Mot de passe (Toggle Visibility)</h3>
              <p class="section-desc">Cliquez sur l'œil pour changer le type de l'input.</p>

              <FormField id="pass-demo" label="Mot de passe">

                <BaseInput id="pass-demo" v-model="inputPassword" :type="showPassword ? 'text' : 'password'"
                  placeholder="Votre mot de passe">
                  <template #icon-right>
                    <BaseButton variant="tertiary" size="md" :icon="showPassword ? 'eye-off' : 'eye'" icon-only
                      aria-label="Afficher/Masquer le mot de passe" @click="showPassword = !showPassword" />
                  </template>

                </BaseInput>

              </FormField>

            </div>

            <div>
              <h3>3. Validation / Erreur</h3>
              <FormField id="email-demo" label="Email professionnel" error
                error-message="Veuillez entrer une adresse email valide." required>
                <BaseInput id="email-demo" type="email" v-model="inputEmail" icon-left="mail" icon-right="warning" error
                  icon-size="md" required />
              </FormField>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4);">

              <div>
                <h3>4. Disabled</h3>
                <FormField id="disabled-input" label="Identifiant" disabled>
                  <BaseInput id="disabled-input" v-model="inputDisabled" icon-left="user" icon-size="md" disabled />
                </FormField>
              </div>

              <div>
                <h3>5. Readonly</h3>
                <FormField id="readonly-input" label="Clé API Publique">
                  <BaseInput id="readonly-input" v-model="inputReadonly" readonly icon-size="md" />
                </FormField>
              </div>

            </div>

          </div>
        </section>

        <section id="mol-profile" class="showcase-section">
          <h2>Molécule: ProfileCard</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>
              Combine Avatar, Badge et Actions.
              <strong>Responsive :</strong> Colonne centrée sur mobile, Ligne sur desktop (sauf si <code>centered</code>).
            </p>

            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description / Valeurs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Nom de l'utilisateur (Requis).</td>
                </tr>
                <tr>
                  <td><code>jobTitle</code></td>
                  <td>String</td>
                  <td>''</td>
                  <td>Titre du poste ou description courte.</td>
                </tr>
                <tr>
                  <td><code>role</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte du badge (ex: Admin, Pro).</td>
                </tr>
                <tr>
                  <td><code>roleVariant</code></td>
                  <td>String</td>
                  <td>'neutral'</td>
                  <td>Couleur du badge ('success', 'info', etc.).</td>
                </tr>
                <tr>
                  <td><code>avatarSrc</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>URL de l'image. Fallback sur initiales si vide.</td>
                </tr>
                <tr>
                  <td><code>avatarSize</code></td>
                  <td>String</td>
                  <td>'lg'</td>
                  <td>Taille de l'avatar : 'sm', 'md', 'lg', 'xl'.</td>
                </tr>
                <tr>
                  <td><code>badgeSize</code></td>
                  <td>String</td>
                  <td>'sm'</td>
                  <td>Taille du badge : 'sm', 'md'.</td>
                </tr>
                <tr>
                  <td><code>badgeShape</code></td>
                  <td>String</td>
                  <td>'pill'</td>
                  <td>Forme du badge : 'rounded', 'pill'.</td>
                </tr>
                <tr>
                  <td><code>buttonSize</code></td>
                  <td>String</td>
                  <td>'sm'</td>
                  <td>Taille du bouton d'action : 'sm', 'md', 'lg'.</td>
                </tr>
                <tr>
                  <td><code>centered</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Force l'alignement centré même sur Desktop.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-8);">

            <div>
              <h3>1. Standard (Responsive)</h3>
              <p class="section-desc">Passe de colonne (mobile) à ligne (desktop).</p>
              <ProfileCard name="Sophie Martin" job-title="Lead Developer" role="Admin" role-variant="info"
                avatar-src="https://i.pravatar.cc/150?u=sophie" @action="handleFollow('Sophie')" />
            </div>

            <div>
              <h3>2. Style "Carte de contact" (Force Centered)</h3>
              <p class="section-desc">Idéal pour les grilles d'équipe.</p>
              <div style="max-width: 320px;">
                <ProfileCard name="Julien Dupont" job-title="Product Designer" role="Pro" role-variant="info" centered
                  action-label="Contacter" @action="handleFollow('Julien')" />
              </div>
            </div>

            <div>
              <h3>3. Personnalisation des Tailles (Large/VIP)</h3>
              <p class="section-desc">Avatar XL, Badge Medium Rounded, Bouton Medium.</p>
              <ProfileCard name="Directeur Général" job-title="Management" role="VIP" role-variant="warning"
                badge-size="md" badge-shape="rounded" avatar-size="xl" button-size="md" action-label="Prendre RDV"
                avatar-src="https://i.pravatar.cc/150?u=director" />
            </div>

            <div>
              <h3>4. Minimal (Fallback Avatar & Sans Rôle)</h3>
              <ProfileCard name="Marc Lavoine" job-title="Marketing Intern" avatar-size="md"
                action-label="Envoyer email" />
            </div>

          </div>
        </section>

        <section id="mol-review" class="showcase-section">
          <h2>Molécule: ReviewCard</h2>

          <div class="doc-box">
            <h3>Documentation Technique</h3>
            <p>
              Formulaire complet d'avis ou de commentaire.
              Combine <code>BaseAvatar</code>, <code>FormField</code>, <code>BaseTextarea</code> et
              <code>BaseButton</code>.
              Gère automatiquement l'état désactivé si le champ est vide.
            </p>

            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>modelValue</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Contenu du texte (v-model).</td>
                </tr>
                <tr>
                  <td><code>userName</code></td>
                  <td>String</td>
                  <td>'?'</td>
                  <td>Nom de l'utilisateur (utilisé pour les initiales si pas d'image).</td>
                </tr>
                <tr>
                  <td><code>avatarSrc</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>URL de l'image de profil.</td>
                </tr>
                <tr>
                  <td><code>avatarAlt</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Texte alternatif pour l'avatar (Accessibilité).</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td>String</td>
                  <td>'Votre avis'</td>
                  <td>Label au-dessus du champ texte.</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td>String</td>
                  <td>'Partagez...'</td>
                  <td>Texte indicatif dans le champ.</td>
                </tr>
                <tr>
                  <td><code>buttonLabel</code></td>
                  <td>String</td>
                  <td>'Envoyer'</td>
                  <td>Texte du bouton d'action.</td>
                </tr>
                <tr>
                  <td><code>loading</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche le spinner sur le bouton et désactive le champ.</td>
                </tr>
                <tr>
                  <td><code>id</code></td>
                  <td>String</td>
                  <td>(Auto)</td>
                  <td>ID unique pour lier label et input.</td>
                </tr>
                <tr>
                  <td><code>showCount</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche le compteur "X / Max".</td>
                </tr>
                <tr>
                  <td><code>maxLength</code></td>
                  <td>Number</td>
                  <td>-</td>
                  <td>Limite native de caractères.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-8); max-width: 700px;">

            <div>
              <h3>1. Standard (Avec Photo)</h3>
              <p class="section-desc">Configuration classique pour un fil de commentaires.</p>

              <ReviewCard v-model="reviewText" user-name="John Doe" avatar-src="https://i.pravatar.cc/150?u=john"
                label="Laisser un commentaire" placeholder="Dites-nous ce que vous avez pensé du produit..."
                :loading="isSubmittingReview" @submit="submitReview" />

              <div
                style="margin-top: 10px; padding: 10px; background: var(--color-background-tertiary); border-radius: var(--radius-md); border: 1px dashed var(--color-border-default);">
                <p
                  style="margin: 0; font-size: 12px; color: var(--color-text-secondary); font-family: var(--font-family-mono);">
                  v-model: "{{ reviewText }}"
                </p>
              </div>
            </div>

            <div>
              <h3>2. Variante : Sans Photo (Initiales)</h3>
              <p class="section-desc">Si <code>avatarSrc</code> est absent, les initiales de <code>userName</code> sont
                utilisées.</p>

              <ReviewCard v-model="reviewTextNoAvatar" user-name="Marie Curie" label="Posez une question"
                button-label="Publier la question" placeholder="Votre question ici..." />
            </div>

            <div>
              <h3>3. États Visuels</h3>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">

                <div style="opacity: 0.7; pointer-events: none;">
                  <p class="section-desc" style="margin-bottom: 5px;">État Vide (Bouton désactivé par défaut)</p>
                  <ReviewCard model-value="" user-name="Test" placeholder="Essayez de cliquer sur envoyer..." />
                </div>

                <div style="opacity: 0.7; pointer-events: none;">
                  <p class="section-desc" style="margin-bottom: 5px;">État Loading (Interaction bloquée)</p>
                  <ReviewCard model-value="Envoi en cours..." user-name="Bot" loading />
                </div>

              </div>
            </div>

            <div>
              <h3>4. Variante : Avec Limite (Max Length)</h3>
              <p class="section-desc">
                Limite la saisie à 140 caractères et affiche le compteur via <code>FormField</code>.
              </p>

              <ReviewCard v-model="reviewLimit" user-name="Twitter Fan" label="Tweet rapide" button-label="Tweeter"
                placeholder="Quoi de neuf ? (Max 140 caractères)" show-count :max-length="140" />
            </div>

          </div>
        </section>

        <section id="mol-alert" class="showcase-section">
          <h2>Molécule: Alert</h2>

          <div class="doc-box">
            <h3>Documentation</h3>
            <p>
              Composant de feedback pour afficher des statuts (Succès, Erreur, Info, Attention).
              Combine <code>BaseIcon</code> pour l'identité visuelle et <code>BaseButton</code> pour l'action de
              fermeture.
            </p>

            <table class="doc-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Défaut</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>title</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Titre principal du message (Gras).</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td>String</td>
                  <td>-</td>
                  <td>Détails supplémentaires (Optionnel).</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td>String</td>
                  <td>'info'</td>
                  <td>'info', 'success', 'warning', 'error'. Définit la couleur et l'icône par défaut.</td>
                </tr>
                <tr>
                  <td><code>closable</code></td>
                  <td>Boolean</td>
                  <td>false</td>
                  <td>Affiche une croix pour fermer l'alerte.</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td>String</td>
                  <td>(Auto)</td>
                  <td>Permet de surcharger l'icône par défaut du variant.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--spacing-6); max-width: 800px;">

            <div>
              <h3>1. Variantes Sémantiques</h3>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">

                <AlertToast variant="info" title="Nouvelle version disponible"
                  description="La version 2.0 inclut de nouvelles fonctionnalités de dashboard." />

                <AlertToast variant="success" title="Paiement validé"
                  description="Votre transaction #89023 a été traitée avec succès." />

                <AlertToast variant="warning" title="Maintenance programmée"
                  description="Le service sera indisponible ce soir entre 22h et 23h." />

                <AlertToast variant="error" title="Échec de connexion"
                  description="Impossible de joindre le serveur. Vérifiez votre connexion internet." />
              </div>
            </div>

            <div>
              <h3>2. Styles Alternatifs (Sans description / Icone Custom)</h3>
              <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">

                <AlertToast variant="error" icon="close" title="Une erreur inconnue est survenue (Titre seul)." />
                <AlertToast variant="info" icon="info" title="Notification système"
                  description="Ici on force l'icône 'info'." />

              </div>
            </div>

            <div>
              <h3>3. Fermeture (Closable)</h3>
              <p class="section-desc">Écoute l'événement <code>@close</code> pour masquer l'élément.</p>

              <div style="min-height: 100px;">
                <transition name="fade">
                  <AlertToast v-if="showAlertDemo" variant="warning" icon="warning" title="Alerte Dismissible"
                    description="Cliquez sur la croix à droite pour me fermer." closable
                    @close="showAlertDemo = false" />
                </transition>

                <div v-if="!showAlertDemo"
                  style="padding: 20px; text-align: center; background: var(--color-background-tertiary); border-radius: var(--radius-md);">
                  <p style="margin-bottom: 10px; font-size: 14px; color: var(--color-text-secondary);">L'alerte a été
                    fermée.</p>
                  <BaseButton size="sm" variant="secondary" icon="check" @click="resetAlert">
                    Réinitialiser
                  </BaseButton>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style>

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}


h1 {
  font-family: var(--font-family-heading);
  margin: 0;
  font-size: var(--font-size-2xl);
}

h2 {
  margin-top: 0;
  border-bottom: 1px solid var(--color-border-default);
  padding-bottom: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

h3 {
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.sidebar {
  width: 260px;
  background-color: var(--color-background-primary);
  border-right: 1px solid var(--color-border-default);
  padding: var(--spacing-6);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 50;
}

.app-content-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: var(--color-background-secondary);
}

.app-header {
  background-color: var(--color-background-primary);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-4) var(--spacing-8);
  position: sticky;
  top: 0;
  z-index: 40;
}

.header-content {
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  font-size: var(--font-size-lg);
  margin: 0;
  font-weight: 600;
}

.app-main {
  flex: 1;
  padding: var(--spacing-8);
  width: 100%;
  box-sizing: border-box;
}

.showcase-section {
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-sm);
  scroll-margin-top: 100px;
  max-width: 1000px;
}

.app-logo {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  color: var(--color-primary-default);
  margin-top: 0;
  margin-bottom: var(--spacing-8);
}

.toc-category {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: var(--spacing-4) 0 var(--spacing-2) 0;
  font-weight: var(--font-weight-bold);
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-link {
  text-decoration: none;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  display: block;
  padding: var(--spacing-1) 0;
  transition: color 0.2s;
}

.toc-link:hover {
  color: var(--color-primary-default);
}

.section-desc {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-style: italic;
}
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  align-items: center;
}
.doc-box {
  background-color: var(--color-background-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-8);
  border: 1px solid var(--color-border-default);
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-2);
}

.doc-table th,
.doc-table td {
  text-align: left;
  padding: var(--spacing-2);
  border-bottom: 1px solid var(--color-border-default);
}

.doc-table th {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.doc-table code {
  background-color: var(--color-background-tertiary);
  padding: 2px 4px;
  border-radius: var(--radius-xs);
  font-family: var(--font-family-mono);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--spacing-6);
  padding: var(--spacing-4) 0;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
}

.icon-item span {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-family: var(--font-family-mono);
}
</style>