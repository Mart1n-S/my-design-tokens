import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import ReviewCard from "./ReviewCard.vue";

const meta: Meta<any> = {
  title: "Molecules/ReviewCard",
  component: ReviewCard,
  tags: ["autodocs"],
  argTypes: {
    // --- V-MODEL ---
    modelValue: {
      control: "text",
      description: "Contenu du texte (v-model).",
    },

    // --- USER INFO ---
    userName: {
      control: "text",
      description: "Nom (pour initiales si pas d'image).",
    },
    avatarSrc: {
      control: "text",
      description: "URL de l'image de profil.",
    },
    avatarAlt: {
      control: "text",
      description: "Alt text pour l'accessibilité.",
    },

    // --- FORM CONFIG ---
    label: {
      control: "text",
      description: "Label du champ.",
    },
    placeholder: {
      control: "text",
      description: "Texte indicatif.",
    },
    buttonLabel: {
      control: "text",
      description: "Texte du bouton d'action.",
    },

    // --- STATES & VALIDATION ---
    loading: {
      control: "boolean",
      description: "État de chargement (désactive tout).",
      table: { category: "States" },
    },
    showCount: {
      control: "boolean",
      description: "Affiche le compteur de caractères.",
      table: { category: "Validation" },
    },
    maxLength: {
      control: "number",
      description: "Limite native de caractères.",
      table: { category: "Validation" },
    },

    // --- EVENTS ---
    "onUpdate:modelValue": {
      action: "input",
      table: { category: "Events" },
    },
    onSubmit: {
      action: "submit",
      description: "Émis quand le formulaire est valide et soumis.",
      table: { category: "Events" },
    },
  },
  args: {
    modelValue: "",
    userName: "John Doe",
    avatarSrc: "https://i.pravatar.cc/150?u=john",
    label: "Votre avis",
    placeholder: "Partagez votre expérience...",
    buttonLabel: "Envoyer",
    loading: false,
    showCount: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args: any) => ({
    components: { ReviewCard },
    setup() {
      const text = ref(args.modelValue);
      return { args, text };
    },
    template: `
      <div style="max-width: 600px;">
        <ReviewCard 
          v-bind="args" 
          v-model="text" 
        />
        <div style="margin-top: 20px; padding: 10px; background: var(--color-background-tertiary); border-radius: 4px; font-family: monospace; font-size: 12px; color: var(--color-text-secondary);">
          v-model: "{{ text }}"
        </div>
      </div>
    `,
  }),
};

// --- 2. STANDARD ---
export const Standard: Story = {
  render: () => ({
    components: { ReviewCard },
    setup() {
      const reviewText = ref("");
      const isSubmitting = ref(false);

      const handleSubmit = () => {
        isSubmitting.value = true;
        // Simulation d'appel API
        setTimeout(() => {
          isSubmitting.value = false;
          alert(`Envoyé : ${reviewText.value}`);
          reviewText.value = "";
        }, 1500);
      };

      return { reviewText, isSubmitting, handleSubmit };
    },
    template: `
      <div style="max-width: 700px;">
        <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 10px;">
          Configuration classique pour un fil de commentaires.
        </p>

        <ReviewCard 
          v-model="reviewText" 
          user-name="John Doe" 
          avatar-src="https://i.pravatar.cc/150?u=john"
          label="Laisser un commentaire" 
          placeholder="Dites-nous ce que vous avez pensé du produit..."
          :loading="isSubmitting" 
          @submit="handleSubmit" 
        />
      </div>
    `,
  }),
};

// --- 3. SANS PHOTO (Initiales) ---
export const SansPhoto: Story = {
  args: {
    userName: "Marie Curie",
    avatarSrc: "", // Pas d'image -> Fallback initiales
    label: "Posez une question",
    buttonLabel: "Publier la question",
    placeholder: "Votre question ici...",
    modelValue: "",
  },
  render: (args) => ({
    components: { ReviewCard },
    setup() {
      const text = ref("");
      return { args, text };
    },
    template: `
      <div style="max-width: 700px;">
        <ReviewCard v-bind="args" v-model="text" />
      </div>
    `,
  }),
};

// --- 4. AVEC LIMITE (Max Length) ---
export const AvecLimite: Story = {
  render: () => ({
    components: { ReviewCard },
    setup() {
      const tweet = ref("");
      return { tweet };
    },
    template: `
      <div style="max-width: 700px;">
        <ReviewCard 
          v-model="tweet" 
          user-name="Twitter Fan" 
          label="Tweet rapide" 
          button-label="Tweeter"
          placeholder="Quoi de neuf ? (Max 140 caractères)" 
          show-count 
          :max-length="140" 
        />
      </div>
    `,
  }),
};

// --- 5. ÉTATS VISUELS ---
export const EtatsVisuels: Story = {
  render: () => ({
    components: { ReviewCard },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-6); max-width: 700px;">

        <div>
          <p style="font-size: 12px; font-weight: bold; margin-bottom: 8px;">État Vide (Bouton désactivé)</p>
          <ReviewCard 
            model-value="" 
            user-name="Test" 
            placeholder="Essayez de cliquer sur envoyer... (Impossible)" 
          />
        </div>

        <div>
          <p style="font-size: 12px; font-weight: bold; margin-bottom: 8px;">État Loading (Tout désactivé)</p>
          <ReviewCard 
            model-value="Envoi en cours..." 
            user-name="Bot" 
            loading 
          />
        </div>

      </div>
    `,
  }),
};
