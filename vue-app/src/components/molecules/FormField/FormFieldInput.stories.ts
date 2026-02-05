import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, computed } from "vue";
import FormField from "./FormField.vue";
import BaseInput from "../../atoms/Input/BaseInput.vue";
import BaseButton from "../../atoms/Button/BaseButton.vue";

const iconList = [
  "",
  "search",
  "mail",
  "user",
  "lock",
  "eye",
  "eye-off",
  "warning",
  "check",
];

const meta: Meta<any> = {
  title: "Molecules/FormField/Input",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    // --- PROPS FORMFIELD ---
    label: {
      control: "text",
      description: "Libellé du champ",
    },
    id: {
      control: "text",
      description: "Identifiant unique (lié au label)",
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
      description: "Affiche l'astérisque requis",
    },
    disabled: {
      control: "boolean",
      description: "État désactivé (appliqué au label et compteur)",
    },

    // --- COMPTEUR ---
    showCount: {
      control: "boolean",
      description: "Afficher le compteur (nécessite maxLength)",
      table: { category: "Counter" },
    },
    maxLength: {
      control: "number",
      description: "Limite max (pour le calcul de ratio)",
      table: { category: "Counter" },
    },
    currentLength: {
      control: "number",
      description: "Longueur actuelle (doit être passée par le parent)",
      table: { category: "Counter" },
    },

    // --- PROPS VIRTUELLES (Pour BaseInput dans le Playground) ---
    iconLeft: {
      control: "select",
      options: iconList,
      description: "Icône gauche (sur BaseInput)",
      table: { category: "Input Props" },
    },
    iconRight: {
      control: "select",
      options: iconList,
      description: "Icône droite (sur BaseInput)",
      table: { category: "Input Props" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder (sur BaseInput)",
      table: { category: "Input Props" },
    },

    // --- SLOTS ---
    default: {
      control: false,
    },
  },
  args: {
    // FormField defaults
    label: "Label du champ",
    id: "field-demo",
    helpText: "",
    errorMessage: "",
    error: false,
    required: false,
    disabled: false,
    showCount: false,
    // Input defaults
    iconLeft: "",
    iconRight: "",
    placeholder: "Tapez ici...",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. PLAYGROUND ---
export const Playground: Story = {
  render: (args) => ({
    components: { FormField, BaseInput },
    setup() {
      const textValue = ref("");

      // Calcul dynamique de la longueur pour le compteur du FormField
      const textLength = computed(() => textValue.value.length);

      return { args, textValue, textLength };
    },
    template: `
      <div style="max-width: 400px;">
        <FormField 
          v-bind="args" 
          :current-length="textLength"
        >
          <template #default="{ describedBy }">
            <BaseInput 
              :id="args.id" 
              v-model="textValue" 
              :placeholder="args.placeholder"
              :icon-left="args.iconLeft"
              :icon-right="args.iconRight"
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

// --- 2. STANDARD & RECHERCHE ---
export const StandardRecherche: Story = {
  render: () => ({
    components: { FormField, BaseInput },
    setup() {
      const searchVal = ref("");
      return { searchVal };
    },
    template: `
      <div style="max-width: 400px;">
        <FormField id="search-demo" label="Recherche utilisateur">
          <BaseInput 
            id="search-demo" 
            v-model="searchVal" 
            type="search" 
            icon-left="search" 
            icon-size="md"
            placeholder="Tapez un nom..." 
          />
        </FormField>
      </div>
    `,
  }),
};

// --- 3. MOT DE PASSE ---
export const MotDePasse: Story = {
  render: () => ({
    components: { FormField, BaseInput, BaseButton },
    setup() {
      const password = ref("");
      const showPassword = ref(false);

      const toggle = () => {
        showPassword.value = !showPassword.value;
      };

      return { password, showPassword, toggle };
    },
    template: `
      <div style="max-width: 400px;">
        <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 10px; font-family: var(--font-family-body);">
          Cliquez sur l'œil pour changer le type de l'input.
        </p>

        <FormField id="pass-demo" label="Mot de passe">
          <BaseInput 
            id="pass-demo" 
            v-model="password" 
            :type="showPassword ? 'text' : 'password'"
            placeholder="Votre mot de passe"
          >
            <template #icon-right>
              <BaseButton 
                variant="tertiary" 
                size="md" 
                :icon="showPassword ? 'eye-off' : 'eye'" 
                icon-only
                aria-label="Afficher/Masquer le mot de passe" 
                @click="toggle" 
              />
            </template>
          </BaseInput>
        </FormField>
      </div>
    `,
  }),
};

// --- 4. VALIDATION / ERREUR ---
export const ValidationErreur: Story = {
  render: () => ({
    components: { FormField, BaseInput },
    setup() {
      const emailVal = ref("jean.dupont@");
      return { emailVal };
    },
    template: `
      <div style="max-width: 400px;">
        <FormField 
          id="email-demo" 
          label="Email professionnel" 
          error
          error-message="Veuillez entrer une adresse email valide." 
          required
        >
          <template #default="{ describedBy }">
            <BaseInput 
              id="email-demo" 
              type="email" 
              v-model="emailVal" 
              icon-left="mail" 
              icon-right="warning" 
              error
              icon-size="md" 
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
    components: { FormField, BaseInput },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-4); max-width: 600px;">

        <FormField id="disabled-input" label="Identifiant" disabled>
          <BaseInput 
            id="disabled-input" 
            model-value="USER_8821" 
            icon-left="user" 
            icon-size="md" 
            disabled 
          />
        </FormField>

        <FormField id="readonly-input" label="Clé API Publique" help-text="Cette clé est visible par tous.">
          <BaseInput 
            id="readonly-input" 
            model-value="pk_live_51Ha7xk..." 
            readonly 
            icon-size="md" 
          />
        </FormField>

      </div>
    `,
  }),
};
