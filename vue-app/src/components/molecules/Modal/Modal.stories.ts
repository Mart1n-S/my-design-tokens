import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Modal from "./Modal.vue";
import BaseButton from "../../atoms/Button/BaseButton.vue";

const meta = {
  title: "Molecules/Modal",
  component: Modal,
  argTypes: {
    // --- PROPS ---
    isOpen: {
      control: "boolean",
      description: "Contrôle la visibilité.",
    },
    title: {
      control: "text",
      description: "Titre de la fenêtre.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Largeur de la modal.",
    },
    inline: {
      control: "boolean",
      description: "(Dev) Affiche la modal dans le flux sans overlay.",
    },

    // --- SLOTS ---
    default: {
      control: "text",
      description: "Contenu principal.",
    },
    footer: {
      control: false,
      description: "Zone des actions (Boutons).",
    },

    // --- EVENTS ---
    onClose: {
      action: "closed",
      description: "Émis à la fermeture (croix, echap, backdrop).",
      table: { category: "Events" },
    },
  },
  args: {
    isOpen: true,
    title: "Titre de la Modal",
    size: "md",
    inline: false,
    default:
      "Ceci est le contenu de la modal. Vous pouvez y mettre du texte, des formulaires, etc.",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { Modal, BaseButton },
    setup() {
      const showModal = ref(false);
      return { args, showModal };
    },
    template: `
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: var(--color-background-tertiary); border: 1px dashed var(--color-border-default); border-radius: 8px;">
        
        <BaseButton @click="showModal = true">
          Ouvrir la Modal (Playground)
        </BaseButton>

        <Modal 
          v-bind="args" 
          :is-open="showModal" 
          @close="showModal = false"
        >
          {{ args.default }}
          
          <template #footer>
            <BaseButton variant="secondary" @click="showModal = false">Annuler</BaseButton>
            <BaseButton variant="primary" @click="showModal = false">Confirmer</BaseButton>
          </template>
        </Modal>

      </div>
    `,
  }),
  args: {
    inline: false,
  },
};

// --- 2. VARIANTES DE TAILLES ---
// Ici on utilise la prop 'inline' pour les afficher les unes sous les autres
export const VariantesTailles: Story = {
  render: () => ({
    components: { Modal, BaseButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-6); background: var(--color-background-tertiary); padding: var(--spacing-6); border-radius: var(--radius-lg);">
        
        <div>
          <strong style="display:block; margin-bottom: 8px; font-family: var(--font-family-body);">Small (sm)</strong>
          <Modal :is-open="true" title="Confirmation" size="sm" inline>
            <p style="margin: 0;">Êtes-vous sûr de vouloir supprimer cet élément ?</p>
            <template #footer>
              <BaseButton variant="secondary" size="sm">Annuler</BaseButton>
              <BaseButton variant="danger" size="sm">Supprimer</BaseButton>
            </template>
          </Modal>
        </div>

        <div>
          <strong style="display:block; margin-bottom: 8px; font-family: var(--font-family-body);">Medium (md)</strong>
          <Modal :is-open="true" title="Éditer le profil" size="md" inline>
            <p style="margin: 0 0 10px 0;">Modifiez vos informations personnelles ci-dessous.</p>
            <div style="height: 60px; background: var(--color-background-secondary); border-radius: var(--radius-sm);"></div>
            <template #footer>
              <BaseButton variant="tertiary" size="md">Annuler</BaseButton>
              <BaseButton variant="primary" size="md">Enregistrer</BaseButton>
            </template>
          </Modal>
        </div>

        <div>
          <strong style="display:block; margin-bottom: 8px; font-family: var(--font-family-body);">Large (lg)</strong>
          <Modal :is-open="true" title="Rapport détaillé" size="lg" inline>
            <p style="margin: 0 0 10px 0;">Aperçu complet des statistiques.</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div style="height: 80px; background: var(--color-background-secondary); border-radius: var(--radius-sm);"></div>
              <div style="height: 80px; background: var(--color-background-secondary); border-radius: var(--radius-sm);"></div>
            </div>
          </Modal>
        </div>

      </div>
    `,
  }),
};

// --- 3. DEMO INTERACTIVE ---
export const DemoInteractive: Story = {
  render: () => ({
    components: { Modal, BaseButton },
    setup() {
      const isModalOpen = ref(false);
      const activeSize = ref<any>("md");

      const open = (size: string) => {
        activeSize.value = size;
        isModalOpen.value = true;
      };

      return { isModalOpen, activeSize, open };
    },
    template: `
      <div>
        <p style="margin-bottom: 10px; color: var(--color-text-secondary); font-family: var(--font-family-body);">
          Cliquez pour ouvrir une vraie modal (avec overlay).
        </p>

        <div style="display: flex; gap: var(--spacing-4);">
          <BaseButton @click="open('sm')">Ouvrir Small</BaseButton>
          <BaseButton variant="secondary" @click="open('md')">Ouvrir Medium</BaseButton>
          <BaseButton variant="tertiary" @click="open('lg')">Ouvrir Large</BaseButton>
        </div>

        <Modal 
          :is-open="isModalOpen" 
          :title="\`Exemple Modal (\${activeSize})\`" 
          :size="activeSize"
          @close="isModalOpen = false"
        >
          <p>
            Ceci est une vraie fenêtre modale. Le reste de la page est obscurci et inaccessible.
            Essayez d'appuyer sur <strong>Echap</strong> ou de cliquer sur la croix pour fermer.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </p>

          <template #footer>
            <BaseButton variant="secondary" @click="isModalOpen = false">Fermer</BaseButton>
            <BaseButton variant="primary" @click="isModalOpen = false">Confirmer</BaseButton>
          </template>
        </Modal>
      </div>
    `,
  }),
};
