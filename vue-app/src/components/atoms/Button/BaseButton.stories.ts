import type { Meta, StoryObj } from "@storybook/vue3";
import BaseButton from "./BaseButton.vue";

// Liste des icônes disponibles
const iconOptions = [
  "", // Option vide
  "close",
  "check",
  "plus",
  "trash",
  "edit",
  "search",
  "settings",
  "copy",
  "loading",
  "warning",
  "info",
  "user",
  "mail",
  "heart",
  "menu",
  "chevron-down",
  "arrow-right",
  "log-out",
  "eye",
  "eye-off",
  "moon",
  "sun",
];

const meta = {
  title: "Atoms/BaseButton",
  component: BaseButton,
  argTypes: {
    // --- Apparence ---
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "danger"],
      description: "Le style visuel du bouton",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "La taille du bouton",
    },
    fullWidth: {
      control: "boolean",
      description: "Prend 100% de la largeur disponible",
    },

    // --- Icônes ---
    icon: {
      control: "select",
      options: iconOptions,
      description: "Nom de l'icône (Lucide)",
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position de l'icône par rapport au texte",
    },
    iconOnly: {
      control: "boolean",
      description: "Si vrai, transforme le bouton en carré (pour icône seule)",
    },

    // --- États ---
    disabled: {
      control: "boolean",
      description: "Désactive les interactions",
    },
    loading: {
      control: "boolean",
      description: "Affiche un spinner de chargement",
    },

    // --- Slots (Documentation) ---
    default: {
      control: "text",
      description: "Contenu principal du bouton (Texte ou HTML)",
      table: {
        category: "Slots",
        type: { summary: "html" },
      },
    },
    "icon-left": {
      control: false,
      description: "Slot pour remplacer l'icône de gauche",
      table: { category: "Slots" },
    },
    "icon-right": {
      control: false,
      description: "Slot pour remplacer l'icône de droite",
      table: { category: "Slots" },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false,
    iconPosition: "left",
    iconOnly: false,
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. Playground (Zone de test interactive) ---
export const Playground: Story = {
  args: {
    default: "Primary",
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <BaseButton v-bind="args">
        {{ args.default }}
      </BaseButton>
    `,
  }),
};

// --- 2. Variantes Visuelles ---

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Secondaire</BaseButton>',
  }),
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Tertiaire</BaseButton>',
  }),
};

export const Danger: Story = {
  args: {
    variant: "danger",
    icon: "trash",
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Supprimer</BaseButton>',
  }),
};

// --- 3. Cas d'usage spécifiques ---

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Chargement...</BaseButton>',
  }),
};

export const WithIconRight: Story = {
  args: {
    variant: "primary",
    icon: "arrow-right",
    iconPosition: "right",
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Suivant</BaseButton>',
  }),
};

export const IconOnly: Story = {
  args: {
    variant: "secondary",
    icon: "search",
    iconOnly: true,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" aria-label="Rechercher" />',
  }),
};
