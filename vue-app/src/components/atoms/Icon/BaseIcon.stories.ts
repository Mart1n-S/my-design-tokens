import type { Meta, StoryObj } from "@storybook/vue3";
import BaseIcon from "./BaseIcon.vue";

// 1. Liste des clés correspondant aux icônes disponibles dans le mapping du composant BaseIcon
const iconList = [
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
  "logout",
  "eye",
  "eye-off",
  "moon",
  "sun",
];

const meta = {
  title: "Atoms/BaseIcon",
  component: BaseIcon,
  tags: ["autodocs"],
  argTypes: {
    // Liste déroulante pour choisir l'icône
    name: {
      control: "select",
      options: iconList,
      description: "Le nom de l'icône à afficher (clé du mapping)",
    },
    // Choix de la taille
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Taille définie par les tokens d'espacement",
    },
    // Sélecteur de couleur
    color: {
      control: "color",
      description: "Couleur CSS (hex, rgb, var, named)",
    },
  },
  args: {
    name: "heart",
    size: "md",
    color: "currentColor",
  },
} satisfies Meta<typeof BaseIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
};

// --- 2. GALERIE COMPLETE ---
export const AllIcons: Story = {
  render: () => ({
    components: { BaseIcon },
    setup() {
      return { iconList };
    },
    template: `
      <div style="
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); 
        gap: 2rem; 
        padding: 1rem;
      ">
        <div 
          v-for="name in iconList" 
          :key="name" 
          style="
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            gap: 0.5rem;
            color: var(--color-text-primary);
          "
        >
          <BaseIcon :name="name" size="md" />
          <span style="font-size: 12px; font-family: monospace; color: var(--color-text-secondary);">
            {{ name }}
          </span>
        </div>
      </div>
    `,
  }),
  parameters: {
    // On cache les contrôles pour cette vue car c'est une grille statique
    controls: { disable: true },
  },
};

// --- 3. TAILLES ---
export const Sizes: Story = {
  render: () => ({
    components: { BaseIcon },
    template: `
      <div style="display: flex; align-items: flex-end; gap: 2rem; color: var(--color-text-primary);">
        <div style="text-align: center">
          <BaseIcon name="user" size="sm" />
          <p style="font-size: 12px;">sm</p>
        </div>
        <div style="text-align: center">
          <BaseIcon name="user" size="md" />
          <p style="font-size: 12px;">md</p>
        </div>
        <div style="text-align: center">
          <BaseIcon name="user" size="lg" />
          <p style="font-size: 12px;">lg</p>
        </div>
      </div>
    `,
  }),
};

// --- 4. EXEMPLES SPECIFIQUES ---

export const Loading: Story = {
  args: {
    name: "loading",
    size: "lg",
    color: "#3b82f6",
  },
};

export const CustomColor: Story = {
  args: {
    name: "warning",
    size: "lg",
    color: "#ef4444",
  },
};
