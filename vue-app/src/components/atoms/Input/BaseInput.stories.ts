import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watch } from "vue";
import BaseInput from "./BaseInput.vue";

// Liste des icônes disponibles
const iconList = [
  "",
  "search",
  "mail",
  "user",
  "lock",
  "eye",
  "eye-off",
  "calendar",
  "phone",
  "map-pin",
];

const meta = {
  title: "Atoms/BaseInput",
  component: BaseInput,
  tags: ["autodocs"],
  argTypes: {
    // --- V-MODEL ---
    modelValue: {
      control: "text",
      description: "Valeur du champ (v-model)",
    },

    // --- TYPES & ATTRIBUTS ---
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      description: "Type HTML de l'input",
    },
    placeholder: {
      control: "text",
      description: "Texte indicatif (placeholder)",
    },

    // --- ICONES (Props directes) ---
    iconLeft: {
      control: "select",
      options: iconList,
      description: 'Nom de l\'icône à gauche (ex: "mail")',
    },
    iconRight: {
      control: "select",
      options: iconList,
      description: 'Nom de l\'icône à droite (ex: "eye")',
    },
    iconSize: {
      control: "radio",
      options: ["sm", "md"],
      description: "Taille des icônes",
    },

    // --- ÉTATS ---
    error: {
      control: "boolean",
      description: "Affiche la bordure rouge d'erreur",
      table: { category: "States" },
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ",
      table: { category: "States" },
    },
    readonly: {
      control: "boolean",
      description: "Lecture seule",
      table: { category: "States" },
    },
    required: {
      control: "boolean",
      description: "Marque le champ comme requis (attribut HTML)",
    },

    // --- EVENTS ---
    "onUpdate:modelValue": {
      action: "input",
      description: "Émis quand la valeur change",
      table: { category: "Events" },
    },
  },
  args: {
    modelValue: "",
    type: "text",
    placeholder: "Saisissez du texte...",
    error: false,
    disabled: false,
    readonly: false,
    iconLeft: "",
    iconRight: "",
    iconSize: "sm",
  },
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND (Interactif) ---
export const Playground: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup() {
      // On crée une ref locale pour que l'input réagisse quand on tape dedans
      const textValue = ref(args.modelValue);

      // Si on change la valeur depuis les contrôles Storybook, on met à jour l'input
      watch(
        () => args.modelValue,
        (newVal) => {
          textValue.value = newVal;
        },
      );

      return { args, textValue };
    },
    template: `
      <div style="max-width: 400px;">
        <BaseInput 
          v-bind="args" 
          v-model="textValue" 
        />
        <p style="margin-top: 1rem; font-size: 12px; color: var(--color-text-secondary); font-family: var(--font-family-body);">
          Valeur actuelle : "{{ textValue }}"
        </p>
      </div>
    `,
  }),
};

// --- 2. ÉTATS (States) ---
export const States: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: grid; gap: var(--spacing-4); max-width: 400px;">
        
        <div>
          <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px; font-family: var(--font-family-body);">Normal</label>
          <BaseInput placeholder="Champ classique" aria-label="Champ normal" />
        </div>

        <div>
          <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px; font-family: var(--font-family-body);">Erreur</label>
          <BaseInput error modelValue="Mauvaise valeur" aria-label="Champ en erreur" />
        </div>

        <div>
          <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px; font-family: var(--font-family-body);">Désactivé</label>
          <BaseInput disabled placeholder="Ne peut pas écrire ici" aria-label="Champ désactivé" />
        </div>

        <div>
          <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px; font-family: var(--font-family-body);">Readonly</label>
          <BaseInput readonly modelValue="Lecture seule (copiable)" aria-label="Champ en lecture seule" />
        </div>

      </div>
    `,
  }),
};

// --- 3. AVEC ICONES (Addons) ---
export const WithIcons: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: grid; gap: var(--spacing-4); max-width: 400px;">
        
        <BaseInput iconLeft="mail" placeholder="Email" type="email" />
        
        <BaseInput iconLeft="search" placeholder="Rechercher..." />
        
        <BaseInput iconRight="lock" placeholder="Mot de passe" type="password" />

        <BaseInput iconLeft="map-pin" iconRight="crosshair" placeholder="Localisation" />

      </div>
    `,
  }),
};

// --- 4. EXEMPLES CONCRETS ---

export const LoginForm: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="
        display: flex; 
        flex-direction: column; 
        gap: var(--spacing-4); 
        max-width: 320px; 
        padding: var(--spacing-6); 
        border: 1px solid var(--color-border-default);
        border-radius: var(--radius-lg);
      ">
        <h3 style="margin: 0; font-family: var(--font-family-body);">Connexion</h3>
        
        <BaseInput 
          iconLeft="user" 
          placeholder="Nom d'utilisateur" 
        />
        
        <BaseInput 
          iconLeft="lock" 
          iconRight="eye" 
          type="password" 
          placeholder="Mot de passe" 
        />

      </div>
    `,
  }),
};
