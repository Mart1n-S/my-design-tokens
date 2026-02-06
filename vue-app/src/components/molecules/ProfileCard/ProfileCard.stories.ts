import type { Meta, StoryObj } from "@storybook/vue3";
import ProfileCard from "./ProfileCard.vue";

const meta = {
  title: "Molecules/ProfileCard",
  component: ProfileCard,
  argTypes: {
    // --- CONTENU PRINCIPAL ---
    name: {
      control: "text",
      description: "Nom de l'utilisateur (Requis).",
    },
    jobTitle: {
      control: "text",
      description: "Titre du poste ou description courte.",
    },

    // --- AVATAR ---
    avatarSrc: {
      control: "text",
      description: "URL de l'image. Fallback sur initiales si vide.",
    },
    avatarAlt: {
      control: "text",
      description: "Alt text pour l'avatar (utilise le nom par défaut).",
    },
    avatarSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Taille de l'avatar.",
      table: { category: "Sizes" },
    },

    // --- BADGE (Rôle) ---
    role: {
      control: "text",
      description: "Texte du badge (ex: Admin, Pro).",
    },
    roleVariant: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info"],
      description: "Couleur du badge.",
    },
    badgeSize: {
      control: "radio",
      options: ["sm", "md"],
      description: "Taille du badge.",
      table: { category: "Sizes" },
    },
    badgeShape: {
      control: "radio",
      options: ["rounded", "pill"],
      description: "Forme du badge.",
      table: { category: "Sizes" },
    },

    // --- ACTIONS ---
    actionLabel: {
      control: "text",
      description: "Texte du bouton d'action.",
    },
    buttonSize: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Taille du bouton.",
      table: { category: "Sizes" },
    },
    onAction: {
      action: "clicked",
      description: "Événement émis au clic sur le bouton.",
      table: { category: "Events" },
    },

    // --- LAYOUT ---
    centered: {
      control: "boolean",
      description: "Force l'alignement centré même sur Desktop.",
      table: { category: "Layout" },
    },
  },
  args: {
    // Valeurs par défaut
    name: "Sophie Martin",
    jobTitle: "Lead Developer",
    role: "Admin",
    roleVariant: "info",
    actionLabel: "Voir le profil",
    avatarSrc: "https://i.pravatar.cc/150?u=sophie",
    centered: false,
    avatarSize: "lg",
    badgeSize: "sm",
    badgeShape: "pill",
    buttonSize: "sm",
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { ProfileCard },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 600px;">
        <ProfileCard v-bind="args" />
      </div>
    `,
  }),
};

// --- 2. STANDARD ---
export const Standard: Story = {
  args: {
    name: "Sophie Martin",
    jobTitle: "Lead Developer",
    role: "Admin",
    roleVariant: "info",
    avatarSrc: "https://i.pravatar.cc/150?u=sophie",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Le comportement par défaut : empilé (centré) sur mobile, et aligné en ligne (row) sur desktop.",
      },
    },
  },
  render: (args) => ({
    components: { ProfileCard },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100%; max-width: 600px;">
        <ProfileCard v-bind="args" />
      </div>
    `,
  }),
};

// --- 3. CENTRÉ (STYLE CARTE) ---
export const CenteredCard: Story = {
  args: {
    name: "Julien Dupont",
    jobTitle: "Product Designer",
    role: "Pro",
    roleVariant: "info",
    centered: true,
    actionLabel: "Contacter",
    avatarSrc: "https://i.pravatar.cc/150?u=julien",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Force le layout en colonne centrée (idéal pour des grilles de contacts). Nécessite souvent un conteneur parent avec une largeur fixe.",
      },
    },
  },
  render: (args) => ({
    components: { ProfileCard },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 320px;">
        <ProfileCard v-bind="args" />
      </div>
    `,
  }),
};

// --- 4. PERSONNALISATION TAILLES ---
export const CustomSizes: Story = {
  args: {
    name: "Directeur Général",
    jobTitle: "Management",
    role: "VIP",
    roleVariant: "warning",
    avatarSize: "xl",
    badgeSize: "md",
    badgeShape: "rounded",
    buttonSize: "md",
    actionLabel: "Prendre RDV",
    avatarSrc: "https://i.pravatar.cc/150?u=director",
    centered: false,
  },
  render: (args) => ({
    components: { ProfileCard },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100%; max-width: 700px;">
        <ProfileCard v-bind="args" />
      </div>
    `,
  }),
};

// --- 5. MINIMAL ---
export const Minimal: Story = {
  args: {
    name: "Marc Lavoine",
    jobTitle: "Marketing Intern",
    role: undefined,
    avatarSrc: "",
    avatarSize: "md",
    actionLabel: "Envoyer email",
  },
  render: (args) => ({
    components: { ProfileCard },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 600px;">
        <ProfileCard v-bind="args" />
      </div>
    `,
  }),
};
