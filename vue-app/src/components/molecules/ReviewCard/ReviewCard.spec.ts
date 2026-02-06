import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ReviewCard from "./ReviewCard.vue";

// CONFIGURATION DES STUBS
const globalOptions = {
  stubs: {
    BaseAvatar: true,

    // FormField : On rend les props comme attributs pour pouvoir les tester
    FormField: {
      template: `
        <div class="form-field-stub" :label="label" :current-length="currentLength" :max-length="maxLength">
          <slot />
        </div>`,
      props: ["label", "currentLength", "maxLength"],
    },

    // BaseTextarea : On émet l'événement manuellement
    BaseTextarea: {
      template: `
        <textarea 
          class="base-textarea-stub" 
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />`,
      props: ["modelValue", "placeholder", "disabled"],
    },

    // BaseButton : On rend le disabled comme attribut pour le tester
    BaseButton: {
      template: `
        <button 
          type="submit" 
          class="base-button-stub" 
          :disabled="disabled">
          <slot />
        </button>`,
      props: ["disabled", "loading"],
    },
  },
};

describe("ReviewCard", () => {
  // 1. Rendu initial et Props
  it("affiche les labels et placeholders corrects", () => {
    const wrapper = mount(ReviewCard, {
      props: {
        modelValue: "",
        label: "Votre avis",
        buttonLabel: "Poster",
        placeholder: "Écrivez ici...",
      },
      global: globalOptions,
    });

    const formFieldStub = wrapper.find(".form-field-stub");
    expect(formFieldStub.attributes("label")).toBe("Votre avis");

    const textareaStub = wrapper.find(".base-textarea-stub");
    expect(textareaStub.attributes("placeholder")).toBe("Écrivez ici...");

    const buttonStub = wrapper.find(".base-button-stub");
    expect(buttonStub.text()).toBe("Poster");
  });

  // 2. Avatar et User
  it("passe les bonnes infos à l'avatar", () => {
    const wrapper = mount(ReviewCard, {
      props: {
        modelValue: "",
        userName: "John Doe",
        avatarSrc: "img.jpg",
      },
      global: globalOptions,
    });

    const avatar = wrapper.findComponent({ name: "BaseAvatar" });
    expect(avatar.props("src")).toBe("img.jpg");
    expect(avatar.props("alt")).toBe("John Doe");
    expect(avatar.props("initials")).toBe("J");
  });

  // 3. Two-way Binding (v-model)
  it('émet "update:modelValue" quand on écrit dans le textarea', async () => {
    const wrapper = mount(ReviewCard, {
      props: { modelValue: "" },
      global: globalOptions,
    });

    const textarea = wrapper.find(".base-textarea-stub");

    // On simule la saisie
    await textarea.setValue("Super produit !");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([
      "Super produit !",
    ]);
  });

  // 4. Validation (Bouton Disabled)
  it("désactive le bouton si le champ est vide ou ne contient que des espaces", async () => {
    const wrapper = mount(ReviewCard, {
      props: { modelValue: "   " },
      global: globalOptions,
    });

    const button = wrapper.find(".base-button-stub");

    expect((button.element as HTMLButtonElement).disabled).toBe(true);
  });

  it("active le bouton si le champ contient du texte", async () => {
    const wrapper = mount(ReviewCard, {
      props: { modelValue: "Hello" },
      global: globalOptions,
    });

    const button = wrapper.find(".base-button-stub");

    expect((button.element as HTMLButtonElement).disabled).toBe(false);
  });

  // 5. Soumission
  it('émet "submit" quand on envoie le formulaire valide', async () => {
    const wrapper = mount(ReviewCard, {
      props: { modelValue: "Mon avis" },
      global: globalOptions,
    });

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted()).toHaveProperty("submit");
    expect(wrapper.emitted("submit")).toHaveLength(1);
  });

  it('n\'émet PAS "submit" si le formulaire est invalide (vide)', async () => {
    const wrapper = mount(ReviewCard, {
      props: { modelValue: "" },
      global: globalOptions,
    });

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeUndefined();
  });

  it('n\'émet PAS "submit" si loading est true', async () => {
    const wrapper = mount(ReviewCard, {
      props: {
        modelValue: "Valid text",
        loading: true,
      },
      global: globalOptions,
    });

    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeUndefined();
  });

  // 6. Gestion du compteur (MaxLength)
  it("passe la longueur actuelle et maximale au FormField", async () => {
    const wrapper = mount(ReviewCard, {
      props: {
        modelValue: "12345",
        maxLength: 100,
        showCount: true,
      },
      global: globalOptions,
    });

    const formField = wrapper.find(".form-field-stub");

    // On vérifie les attributs HTML (rendus par le stub)
    expect(formField.attributes("current-length")).toBe("5");
    expect(formField.attributes("max-length")).toBe("100");
  });
});
