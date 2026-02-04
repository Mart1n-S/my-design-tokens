import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watch } from "vue";
import BaseTextarea from "./BaseTextarea.vue";

const meta = {
  title: "Atoms/BaseTextarea",
  component: BaseTextarea,
  tags: ["autodocs"],
  argTypes: {
    // --- V-MODEL ---
    modelValue: {
      control: "text",
      description: "Valeur du champ (v-model)",
    },

    // --- PROPS ---
    rows: {
      control: "number",
      description: "Nombre de lignes visibles initialement",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Direction du redimensionnement",
    },
    placeholder: {
      control: "text",
      description: "Texte indicatif temporaire",
    },
    maxlength: {
      control: "number",
      description: "Limite native de caractères",
    },

    // --- ÉTATS ---
    error: {
      control: "boolean",
      description: "Affiche la bordure en rouge",
      table: { category: "States" },
    },
    disabled: {
      control: "boolean",
      description: "Désactivé (ni clic, ni focus)",
      table: { category: "States" },
    },
    readonly: {
      control: "boolean",
      description: "Lecture seule (focus et copie possibles)",
      table: { category: "States" },
    },
    required: {
      control: "boolean",
      description: "Ajoute l'attribut natif requis",
    },

    // --- EVENTS ---
    "onUpdate:modelValue": {
      action: "input",
      table: { category: "Events" },
    },
  },
  args: {
    modelValue: "",
    rows: 3,
    resize: "vertical",
    placeholder: "Saisissez du texte...",
    error: false,
    disabled: false,
    readonly: false,
  },
} satisfies Meta<typeof BaseTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { BaseTextarea },
    setup() {
      const textValue = ref(args.modelValue);
      watch(
        () => args.modelValue,
        (val) => (textValue.value = val),
      );
      return { args, textValue };
    },
    template: `
      <div style="max-width: 500px;">
        <BaseTextarea 
          v-bind="args" 
          v-model="textValue" 
          aria-label="Zone de texte playground"
        />
        <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 8px;">
          Contenu : {{ textValue }}
        </p>
      </div>
    `,
  }),
};

// --- 2. OPTIONS DE REDIMENSIONNEMENT ---
export const Redimensionnement: Story = {
  render: () => ({
    components: { BaseTextarea },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); max-width: 600px;">

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Resize Vertical (Défaut)
          </p>
          <BaseTextarea 
            placeholder="Vous pouvez m'agrandir vers le bas..." 
            rows="3" 
            aria-label="Textarea vertical resize"
          />
        </div>

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Resize None (Fixe)
          </p>
          <BaseTextarea 
            resize="none" 
            placeholder="Taille fixe (rows=3)..." 
            aria-label="Textarea fixed size"
          />
        </div>

      </div>
    `,
  }),
};

// --- 3. ÉTATS ---
export const Etats: Story = {
  render: () => ({
    components: { BaseTextarea },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--spacing-4);">

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Error
          </p>
          <BaseTextarea 
            error 
            placeholder="Erreur de saisie..." 
            aria-label="Textarea error"
          />
        </div>

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Disabled
          </p>
          <BaseTextarea 
            model-value="Contenu désactivé" 
            disabled 
            resize="none" 
            aria-label="Textarea disabled"
          />
        </div>

        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-family: var(--font-family-body);">
            Readonly
          </p>
          <BaseTextarea 
            model-value="Contenu en lecture seule." 
            readonly 
            resize="none" 
            aria-label="Textarea readonly"
          />
        </div>

      </div>
    `,
  }),
};
