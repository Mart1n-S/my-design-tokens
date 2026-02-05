import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, watch } from "vue";
import AlertToast from "./AlertToast.vue";
import BaseButton from "../../atoms/Button/BaseButton.vue";

const iconList = [
  "",
  "info",
  "check",
  "warning",
  "close",
];

const meta = {
  title: "Molecules/AlertToast",
  component: AlertToast,
  argTypes: {
    // --- PROPS ---
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description: "Définit la couleur et l'icône par défaut.",
    },
    title: {
      control: "text",
      description: "Titre principal (gras).",
    },
    description: {
      control: "text",
      description: "Texte de détail (optionnel).",
    },
    closable: {
      control: "boolean",
      description: "Affiche la croix de fermeture.",
    },
    icon: {
      control: "select",
      options: iconList,
      description: "Surcharge l'icône par défaut.",
    },

    // --- EVENTS ---
    onClose: {
      action: "closed",
      description: "Émis lorsque l'utilisateur clique sur fermer.",
      table: { category: "Events" },
    },
  },
  args: {
    variant: "info",
    title: "Information",
    description: "Ceci est un message d'information standard.",
    closable: true,
    icon: "",
  },
} satisfies Meta<typeof AlertToast>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { AlertToast, BaseButton },
    setup() {
      // Pour pouvoir "réinitialiser" l'alerte après fermeture, on utilise une clé (key).
      // Changer la clé force Vue à détruire et recréer le composant.
      const componentKey = ref(0);
      const isClosed = ref(false);

      const handleReset = () => {
        componentKey.value++;
        isClosed.value = false;
      };

      const handleClose = () => {
        isClosed.value = true;
        // On appelle l'action Storybook standard si définie
        args.onClose?.();
      };

      // Si l'utilisateur change des props (ex: variant) alors que c'est fermé,
      // on réouvre automatiquement pour qu'il voie le résultat.
      watch(
        () => args,
        () => {
          if (isClosed.value) handleReset();
        },
        { deep: true },
      );

      return { args, componentKey, isClosed, handleReset, handleClose };
    },
    template: `
      <div style="min-height: 100px;">
        
        <AlertToast 
          v-if="!isClosed"
          :key="componentKey" 
          v-bind="args" 
          @close="handleClose"
        />

        <div v-else 
          style="
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            gap: 10px; 
            padding: 20px; 
            background: var(--color-background-tertiary); 
            border-radius: var(--radius-md);
            border: 1px dashed var(--color-border-default);
          ">
          <p style="margin: 0; font-size: 14px; color: var(--color-text-secondary); font-family: var(--font-family-body);">
            L'alerte a été fermée.
          </p>
          <BaseButton size="sm" variant="secondary" icon="refresh-cw" @click="handleReset">
            Réafficher l'alerte
          </BaseButton>
        </div>

      </div>
    `,
  }),
};

// --- 2. VARIANTES SÉMANTIQUES ---
export const VariantesSemantiques: Story = {
  render: () => ({
    components: { AlertToast },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 600px;">
        
        <AlertToast 
          variant="info" 
          title="Nouvelle version disponible"
          description="La version 2.0 inclut de nouvelles fonctionnalités de dashboard." 
        />

        <AlertToast 
          variant="success" 
          title="Paiement validé"
          description="Votre transaction #89023 a été traitée avec succès." 
        />

        <AlertToast 
          variant="warning" 
          title="Maintenance programmée"
          description="Le service sera indisponible ce soir entre 22h et 23h." 
        />

        <AlertToast 
          variant="error" 
          title="Échec de connexion"
          description="Impossible de joindre le serveur. Vérifiez votre connexion internet." 
        />

      </div>
    `,
  }),
};

// --- 3. STYLES ALTERNATIFS ---
export const StylesAlternatifs: Story = {
  render: () => ({
    components: { AlertToast },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 600px;">
        
        <AlertToast 
          variant="error" 
          icon="close" 
          title="Une erreur inconnue est survenue (Titre seul)." 
        />

        <AlertToast 
          variant="info" 
          icon="info" 
          title="Notification système"
          description="Ici on force l'icône 'info' via la prop icon." 
        />

      </div>
    `,
  }),
};

// --- 4. FERMETURE ---
export const Fermeture: Story = {
  render: () => ({
    components: { AlertToast, BaseButton },
    setup() {
      const showAlert = ref(true);
      return { showAlert };
    },
    template: `
      <div style="max-width: 600px;">
        <transition name="fade">
          <AlertToast 
            v-if="showAlert" 
            variant="warning" 
            icon="warning" 
            title="Alerte Dismissible"
            description="Cliquez sur la croix à droite pour me fermer." 
            closable
            @close="showAlert = false" 
          />
        </transition>

        <div v-if="!showAlert" style="margin-top: 10px;">
          <BaseButton size="sm" variant="secondary" @click="showAlert = true">
            Reset Démo
          </BaseButton>
        </div>
      </div>
    `,
  }),
};
