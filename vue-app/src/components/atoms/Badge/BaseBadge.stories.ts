import type { Meta, StoryObj } from "@storybook/vue3";
import BaseBadge from "./BaseBadge.vue";
import BaseIcon from "../Icon/BaseIcon.vue";

const meta = {
  title: "Atoms/BaseBadge",
  component: BaseBadge,
  tags: ["autodocs"],
  argTypes: {
    // --- 1. PROPS STANDARDS ---
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info"],
      description: "Couleur sémantique",
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "Taille : sm (petit) ou md (standard)",
    },
    shape: {
      control: "radio",
      options: ["rounded", "pill"],
      description: "Forme : rounded (4px) ou pill (capsule)",
    },

    // --- 2. CONTENU ---
    default: {
      control: "text",
      description: "Label du badge",
    },

    // --- 3. SLOT ICON ---
    icon: { control: false },
  },
  args: {
    variant: "neutral",
    size: "md",
    shape: "rounded",
    default: "Badge Label",
  },
} satisfies Meta<typeof BaseBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { BaseBadge },
    setup() {
      return { args };
    },
    template: `
      <BaseBadge v-bind="args">
        {{ args.default }}
      </BaseBadge>
    `,
  }),
};

// --- 2. VARIANTES ---
export const Variantes: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="display: flex; gap: var(--spacing-2); flex-wrap: wrap;">
        <BaseBadge variant="neutral">Neutral</BaseBadge>
        <BaseBadge variant="success">Success</BaseBadge>
        <BaseBadge variant="warning">Warning</BaseBadge>
        <BaseBadge variant="error">Error</BaseBadge>
        <BaseBadge variant="info">Info</BaseBadge>
      </div>
    `,
  }),
};

// --- 3. FORMES ---
export const Shapes: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="display: flex; gap: var(--spacing-4); align-items: center;">
        <div style="text-align: center">
          <BaseBadge shape="rounded" variant="info">Rounded</BaseBadge>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 5px;">Défaut</p>
        </div>
        <div style="text-align: center">
          <BaseBadge shape="pill" variant="info">Pill</BaseBadge>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 5px;">Capsule</p>
        </div>
      </div>
    `,
  }),
};

// --- 4. TAILLES ---
export const Sizes: Story = {
  render: () => ({
    components: { BaseBadge },
    template: `
      <div style="display: flex; gap: var(--spacing-4); align-items: flex-end;">
        <div>
          <BaseBadge size="sm" variant="success">Small</BaseBadge>
        </div>
        <div>
          <BaseBadge size="md" variant="success">Medium</BaseBadge>
        </div>
      </div>
    `,
  }),
};

// --- 5. COMPOSITION ---
export const CompositionAvecIcone: Story = {
  render: () => ({
    components: { BaseBadge, BaseIcon },
    template: `
      <div style="display: flex; gap: var(--spacing-4); align-items: center;">
        
        <BaseBadge variant="success" size="sm">
          <template #icon><BaseIcon name="check" size="sm" /></template>
          Succès
        </BaseBadge>

        <BaseBadge variant="warning" shape="pill" size="md">
          <template #icon><BaseIcon name="warning" size="sm" /></template>
          Attention requise
        </BaseBadge>

        <BaseBadge variant="error" shape="rounded">
          <template #icon><BaseIcon name="trash" size="sm" /></template>
          Supprimé
        </BaseBadge>

      </div>
    `,
  }),
};
