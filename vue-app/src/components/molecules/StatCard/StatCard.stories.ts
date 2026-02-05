import type { Meta, StoryObj } from "@storybook/vue3";
import StatCard from "./StatCard.vue";

const iconList = [
  "",
  "user",
  "heart",
  "warning",
  "mail",
  "settings",
  "check",
  "info",
];

const meta = {
  title: "Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    // --- PROPS ---
    label: {
      control: "text",
      description: 'Le titre du KPI (ex: "Revenu").',
    },
    value: {
      control: "text",
      description: 'La donnée chiffrée (ex: "42k €").',
    },
    icon: {
      control: "select",
      options: iconList,
      description: "Nom de l'icône (coin supérieur droit).",
    },
    trend: {
      control: "text",
      description: 'Texte du badge de variation (ex: "+12%").',
    },
    trendType: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info"],
      description: "Couleur du badge de tendance.",
    },
  },
  args: {
    label: "Revenu Mensuel",
    value: "42,500 €",
    icon: "info",
    trend: "+12%",
    trendType: "success",
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { StatCard },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 300px;">
        <StatCard v-bind="args" />
      </div>
    `,
  }),
};

// --- 2. EXEMPLE DASHBOARD ---
export const DashboardGrid: Story = {
  render: () => ({
    components: { StatCard },
    template: `
      <div style="
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
        gap: var(--spacing-6);
        max-width: 900px;
      ">
        
        <StatCard 
          label="Nouveaux Utilisateurs" 
          value="1,240" 
          icon="user" 
          trend="+18%" 
          trend-type="success" 
        />

        <StatCard 
          label="Taux d'engagement" 
          value="52.4%" 
          icon="heart" 
          trend="-2.1%" 
          trend-type="warning" 
        />

        <StatCard 
          label="Erreurs Serveur" 
          value="12" 
          icon="warning" 
          trend="+4" 
          trend-type="error" 
        />

        <StatCard 
          label="Mails Envoyés" 
          value="8,543" 
          icon="mail" 
          trend="Stable" 
          trend-type="info" 
        />

        <StatCard 
          label="Version App" 
          value="v2.1.0" 
          icon="settings" 
        />

      </div>
    `,
  }),
};
