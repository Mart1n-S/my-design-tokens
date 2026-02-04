import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watch } from "vue";
import BaseSwitch from "./BaseSwitch.vue";

const meta = {
  title: "Atoms/BaseSwitch",
  component: BaseSwitch,
  tags: ["autodocs"],
  argTypes: {
    // --- V-Model ---
    modelValue: {
      control: "boolean",
      description: "État du switch (v-model)",
      table: {
        category: "States",
        type: { summary: "boolean" },
      },
    },

    // --- Props ---
    label: {
      control: "text",
      description: "Texte affiché à côté du switch",
      table: { category: "Content" },
    },
    id: {
      control: "text",
      description: "Identifiant unique",
      table: { category: "Accessibility" },
    },
    disabled: {
      control: "boolean",
      description: "Désactive toute interaction",
      table: { category: "States" },
    },

    // --- Events ---
    "onUpdate:modelValue": {
      action: "updated",
      description: "Événement émis lors du changement d'état",
      table: { category: "Events" },
    },
  },
  // Valeurs par défaut pour toutes les stories
  args: {
    modelValue: false,
    label: "Activer l'option",
    disabled: false,
    id: "switch-demo",
  },
} satisfies Meta<typeof BaseSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND (Interactif) ---
export const Playground: Story = {
  args: {
    label: "Essayer le switch",
  },
  render: (args) => ({
    components: { BaseSwitch },
    setup() {
      // On crée une copie locale de l'état pour que le switch bouge au clic
      const isChecked = ref(args.modelValue);

      // Si on change le contrôle "boolean" dans Storybook, on met à jour la ref
      watch(
        () => args.modelValue,
        (newVal) => {
          isChecked.value = newVal;
        },
      );

      return { args, isChecked };
    },
    template: `
      <div style="padding: var(--spacing-4);">
        <BaseSwitch 
          v-bind="args" 
          v-model="isChecked"
        />
        
        <div style="
          margin-top: var(--spacing-4); 
          font-size: var(--font-size-sm); 
          font-family: var(--font-family-body);
          color: var(--color-text-secondary); 
        ">
          État actuel : <strong>{{ isChecked ? 'ON' : 'OFF' }}</strong>
        </div>
      </div>
    `,
  }),
};

// --- 2. ÉTATS ---

export const Active: Story = {
  args: {
    modelValue: true,
    label: "Activé par défaut",
  },
};

export const Inactive: Story = {
  args: {
    modelValue: false,
    label: "Désactivé par défaut",
  },
};

// --- 3. VARIANTES ---

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: (args) => ({
    components: { BaseSwitch },
    setup() {
      return { args };
    },
    template:
      '<BaseSwitch v-bind="args" aria-label="Switch sans label visible" />',
  }),
};

export const DisabledOff: Story = {
  args: {
    disabled: true,
    modelValue: false,
    label: "Désactivé (OFF)",
  },
};

export const DisabledOn: Story = {
  args: {
    disabled: true,
    modelValue: true,
    label: "Désactivé (ON)",
  },
};

// --- 4. EXEMPLE EN CONTEXTE ---
export const InFormContext: Story = {
  render: () => ({
    components: { BaseSwitch },
    template: `
      <div style="
        display: flex; 
        flex-direction: column; 
        gap: var(--spacing-4); 
        max-width: 300px; 
        padding: var(--spacing-4); 
        border: 1px solid var(--color-border); 
        border-radius: var(--radius-md);
        font-family: var(--font-family-body);
      ">
        <h3 style="
          margin: 0; 
          font-size: var(--font-size-md); 
          color: var(--color-text-primary);
        ">Préférences</h3>
        
        <hr style="
          width: 100%; 
          border: 0; 
          border-top: 1px solid var(--color-border);
        " />
        
        <BaseSwitch id="notif" label="Notifications Push" :modelValue="true" />
        <BaseSwitch id="newsletter" label="Abonnement Newsletter" :modelValue="false" />
        <BaseSwitch id="darkmode" label="Mode Sombre" :modelValue="false" disabled />
      </div>
    `,
  }),
};
