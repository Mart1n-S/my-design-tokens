<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import BaseButton from './components/atoms/Button/BaseButton.vue';
import BaseIcon from './components/atoms/Icon/BaseIcon.vue';
import FormField from './components/molecules/FormField/FormField.vue';
import BaseTextarea from './components/atoms/Textarea/BaseTextarea.vue';

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

// Data pour la démos des Textareas
const textBio = ref('');
const textError = ref('');
const textLimit = ref('');
const textDisabled = ref('Ce contenu ne peut pas être modifié.');
const textReadonly = ref('ID-12345-X89 (Lecture seule, mais copiable)');
</script>

<template>
  <div class="app-layout">

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

      <section class="showcase-section">
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

      <section class="showcase-section">
        <h2>Atome: BaseButton</h2>

        <div class="doc-box">
          <h3>Documentation</h3>
          <p>Composant bouton principal. Supporte le polymorphisme (balise <code>button</code> ou <code>a</code>), les
            icônes et les états de chargement.</p>
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

      </section>

      <section class="showcase-section">
        <h2>Molécule: FormField + Atome: BaseTextarea</h2>

        <div class="doc-box">
          <h3>Documentation</h3>
          <p>Architecture atomique : <code>FormField</code> gère le layout (Label, Messages, Compteur),
            <code>BaseTextarea</code> gère le champ.</p>

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
    </main>
  </div>
</template>

<style>
/* Reset global pour la démo */
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: var(--color-background-primary);
  border-bottom: 1px solid var(--color-border-default);
  padding: var(--spacing-4) 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-main {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
  width: 100%;
  box-sizing: border-box;
}

.showcase-section {
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.section-desc {
  margin-top: 0;
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-style: italic;
}

/* Grilles */
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  align-items: center;
}

/* Documentation Box */
.doc-box {
  background-color: var(--color-background-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-6);
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

/* Icons Grid */
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