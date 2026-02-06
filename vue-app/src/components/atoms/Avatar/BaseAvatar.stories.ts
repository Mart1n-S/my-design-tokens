import type { Meta, StoryObj } from "@storybook/vue3";
import BaseAvatar from "./BaseAvatar.vue";

// URL d'image stable pour les tests (Pravatar ou Unsplash)
const AVATAR_URL =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
const BROKEN_URL = "https://broken-image-link.com/404.jpg";

const meta = {
  title: "Atoms/BaseAvatar",
  component: BaseAvatar,
  argTypes: {
    // --- PROPS ---
    src: {
      control: "text",
      description: "URL de l'image (optionnel)",
    },
    alt: {
      control: "text",
      description: "Texte alternatif (Requis pour A11y)",
    },
    initials: {
      control: "text",
      description: "Texte de remplacement si pas d'image (max 2-3 lettres)",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Taille de l'avatar",
    },
    decorative: {
      control: "boolean",
      description: "Si vrai, l'avatar est ignoré par les lecteurs d'écran",
      table: { category: "Accessibility" },
    },
  },
  args: {
    src: AVATAR_URL,
    alt: "Utilisateur inconnu",
    size: "md",
    decorative: false,
    initials: "",
  },
} satisfies Meta<typeof BaseAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { BaseAvatar },
    setup() {
      return { args };
    },
    template: `<BaseAvatar v-bind="args" />`,
  }),
};

// --- 2. TAILLES (Sizes) ---
export const Sizes: Story = {
  render: () => ({
    components: { BaseAvatar },
    setup() {
      return { AVATAR_URL };
    },
    template: `
      <div style="display: flex; align-items: flex-end; gap: var(--spacing-4);">
        <div style="text-align: center">
          <BaseAvatar size="sm" :src="AVATAR_URL" alt="User Small" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">sm</p>
        </div>
        <div style="text-align: center">
          <BaseAvatar size="md" :src="AVATAR_URL" alt="User Medium" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">md</p>
        </div>
        <div style="text-align: center">
          <BaseAvatar size="lg" :src="AVATAR_URL" alt="User Large" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">lg</p>
        </div>
        <div style="text-align: center">
          <BaseAvatar size="xl" :src="AVATAR_URL" alt="User XL" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">xl</p>
        </div>
      </div>
    `,
  }),
};

// --- 3. FALLBACKS (Pas d'image) ---
export const FallbackInitials: Story = {
  render: () => ({
    components: { BaseAvatar },
    template: `
      <div style="display: flex; gap: var(--spacing-4);">
        
        <div style="text-align: center">
          <BaseAvatar initials="JD" alt="Jean Dupont" size="lg" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">Prop Initials "JD"</p>
        </div>

        <div style="text-align: center">
          <BaseAvatar alt="Martin" size="lg" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">Auto depuis Alt "Martin"</p>
        </div>

         <div style="text-align: center">
          <BaseAvatar alt="" size="lg" />
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-secondary);">Alt vide "?"</p>
        </div>

      </div>
    `,
  }),
};

// --- 4. GESTION D'ERREUR ---
// Teste si le composant bascule bien sur les initiales quand l'image ne charge pas
export const BrokenImage: Story = {
  args: {
    src: BROKEN_URL, // Lien mort
    initials: "ERR",
    alt: "Image cassée",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Démonstration de la robustesse : si l'URL de l'image est invalide (404), le composant affiche automatiquement les initiales.",
      },
    },
  },
};

// --- 5. DÉCORATIF (A11y) ---
export const Decorative: Story = {
  args: {
    src: AVATAR_URL,
    alt: "Cette description sera ignorée",
    decorative: true,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Un avatar purement décoratif (ex: dans une liste déjà explicite) est masqué aux lecteurs d\'écran (`aria-hidden="true"`).',
      },
    },
  },
};
