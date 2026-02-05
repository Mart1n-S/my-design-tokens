import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, computed } from "vue";
import FormField from "./FormField.vue";
import BaseTextarea from "../../atoms/Textarea/BaseTextarea.vue";

const meta: Meta<any> = {
  title: "Molecules/FormField/Textarea",
  component: FormField,
  argTypes: {
    // --- PROPS FORMFIELD (Conteneur) ---
    label: {
      control: "text",
      description: "Libellé du champ",
    },
    id: {
      control: "text",
      description: "Identifiant unique",
    },
    helpText: {
      control: "text",
      description: "Texte d'aide (gris)",
    },
    errorMessage: {
      control: "text",
      description: "Message d'erreur (rouge)",
    },
    error: {
      control: "boolean",
      description: "État d'erreur visuel",
    },
    required: {
      control: "boolean",
      description: "Marqueur requis (*)",
    },
    disabled: {
      control: "boolean",
      description: "État désactivé global",
    },

    // --- COMPTEUR ---
    showCount: {
      control: "boolean",
      description: "Affiche le compteur X / Y",
      table: { category: "Counter" },
    },
    maxLength: {
      control: "number",
      description: "Limite max pour le ratio du compteur",
      table: { category: "Counter" },
    },
    currentLength: {
      control: "number",
      description: "Longueur actuelle (calculée via v-model)",
      table: { category: "Counter" },
    },

    // --- PROPS VIRTUELLES (BaseTextarea) ---
    placeholder: {
      control: "text",
      description: "Placeholder du textarea",
      table: { category: "Textarea Props" },
    },
    rows: {
      control: "number",
      description: "Nombre de lignes (hauteur)",
      table: { category: "Textarea Props" },
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Option de redimensionnement",
      table: { category: "Textarea Props" },
    },

    // --- SLOTS ---
    default: { control: false },
  },
  args: {
    // Defaults FormField
    label: "Message",
    id: "textarea-demo",
    helpText: "",
    errorMessage: "",
    error: false,
    required: false,
    disabled: false,
    showCount: false,
    // Defaults Textarea
    placeholder: "Saisissez votre texte...",
    rows: 3,
    resize: "vertical",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { FormField, BaseTextarea },
    setup() {
      const textValue = ref("");
      // Calcul dynamique pour le compteur du FormField
      const textLength = computed(() => textValue.value.length);
      return { args, textValue, textLength };
    },
    template: `
      <div style="max-width: 500px;">
        <FormField 
          v-bind="args"
          :current-length="textLength"
        >
          <template #default="{ describedBy }">
            <BaseTextarea 
              :id="args.id"
              v-model="textValue"
              :placeholder="args.placeholder"
              :rows="args.rows"
              :resize="args.resize"
              :error="args.error"
              :disabled="args.disabled"
              :required="args.required"
              :aria-describedby="describedBy"
            />
          </template>
        </FormField>
      </div>
    `,
  }),
};

// --- 2. STANDARD ---
export const Standard: Story = {
  render: () => ({
    components: { FormField, BaseTextarea },
    setup() {
      const bio = ref("");
      return { bio };
    },
    template: `
      <div style="max-width: 500px;">
        <FormField 
          id="bio" 
          label="Biographie" 
          help-text="Sera visible sur votre profil public."
        >
          <BaseTextarea 
            id="bio" 
            v-model="bio" 
            placeholder="Racontez votre histoire..." 
          />
        </FormField>
      </div>
    `,
  }),
};

// --- 3. AVEC COMPTEUR & LIMITE ---
export const AvecCompteur: Story = {
  render: () => ({
    components: { FormField, BaseTextarea },
    setup() {
      const tweet = ref("");
      const limit = 100;
      // On calcule la longueur pour la passer au FormField
      const currentLen = computed(() => tweet.value.length);
      return { tweet, limit, currentLen };
    },
    template: `
      <div style="max-width: 500px;">
        <FormField 
          id="tweet" 
          label="Message court" 
          show-count 
          :max-length="limit" 
          :current-length="currentLen"
        >
          <BaseTextarea 
            id="tweet" 
            v-model="tweet" 
            :maxlength="limit" 
            rows="2"
            placeholder="Écrivez ici (max 100)..." 
          />
        </FormField>
      </div>
    `,
  }),
};

// --- 4. ÉTAT ERREUR ---
export const EtatErreur: Story = {
  render: () => ({
    components: { FormField, BaseTextarea },
    setup() {
      const comment = ref("");
      return { comment };
    },
    template: `
      <div style="max-width: 500px;">
        <FormField 
          id="comment-error" 
          label="Feedback" 
          error 
          error-message="Ce champ est requis pour soumettre."
          required
        >
          <template #default="{ describedBy }">
            <BaseTextarea 
              id="comment-error" 
              v-model="comment" 
              error 
              required 
              :aria-describedby="describedBy" 
            />
          </template>
        </FormField>
      </div>
    `,
  }),
};

// --- 5. DISABLED / READONLY ---
export const DisabledReadonly: Story = {
  render: () => ({
    components: { FormField, BaseTextarea },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); max-width: 700px;">

        <div>
          <FormField id="disabled-demo" label="Archives" disabled>
            <BaseTextarea 
              id="disabled-demo" 
              model-value="Contenu archivé non modifiable" 
              disabled 
              resize="none" 
            />
          </FormField>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 8px; font-family: var(--font-family-body);">
            Label grisé, pas d'interaction.
          </p>
        </div>

        <div>
          <FormField id="readonly-demo" label="Clé API">
            <BaseTextarea 
              id="readonly-demo" 
              model-value="TESTCLEAPI1234567890" 
              readonly 
              resize="none" 
            />
          </FormField>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 8px; font-family: var(--font-family-body);">
            Fond teinté, focus & copie ok.
          </p>
        </div>

      </div>
    `,
  }),
};
