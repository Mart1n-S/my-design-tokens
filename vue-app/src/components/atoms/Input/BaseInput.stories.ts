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
  "check",
  "warning",
  "crosshair",
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

    // --- ICONES ---
    iconLeft: {
      control: "select",
      options: iconList,
      description: "Nom de l'icône à gauche",
    },
    iconRight: {
      control: "select",
      options: iconList,
      description: "Nom de l'icône à droite",
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
      description: "Marque le champ comme requis",
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

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup() {
      const textValue = ref(args.modelValue);
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
          aria-label="Input playground"
        />
        <p style="margin-top: 1rem; font-size: 12px; color: var(--color-text-secondary); font-family: var(--font-family-body);">
          Valeur actuelle : "{{ textValue }}"
        </p>
      </div>
    `,
  }),
};

// --- 2. BASIQUE & ICONES  ---
export const BasiqueEtIcones: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); max-width: 700px;">
        
        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Standard (Placeholder)
          </p>
          <BaseInput 
            placeholder="Saisie simple..." 
            aria-label="Saisie simple"
          />
        </div>

        <div>
           <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Icônes (Props)
          </p>
          <BaseInput 
            icon-left="user" 
            icon-right="check"
            placeholder="Nom d'utilisateur" 
            aria-label="Avec icones"
          />
        </div>

      </div>
    `,
  }),
};

// --- 3. ÉTATS VISUELS  ---
export const EtatsVisuels: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-4);">
        
        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Error (Invalide)
          </p>
          <BaseInput 
            error 
            modelValue="Mauvaise valeur" 
            icon-right="warning" 
            aria-label="Erreur"
          />
        </div>

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Disabled (Désactivé)
          </p>
          <BaseInput 
            disabled 
            icon-left="lock" 
            modelValue="Désactivé" 
            aria-label="Désactivé"
          />
        </div>

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Readonly (Lecture)
          </p>
          <BaseInput 
            readonly 
            modelValue="ID: 123456" 
            aria-label="Lecture seule"
          />
        </div>

      </div>
    `,
  }),
};
