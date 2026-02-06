import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseTextarea from "./BaseTextarea.vue";

describe("BaseTextarea", () => {
  // 1. Rendu basique et v-model
  it("affiche la valeur initiale et émet update:modelValue à la saisie", async () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: "Texte initial",
        id: "bio",
      },
    });

    const textarea = wrapper.find("textarea");

    // Vérification de la valeur
    expect(textarea.element.value).toBe("Texte initial");

    // Simulation de saisie
    await textarea.setValue("Nouveau contenu");

    // Vérification de l'émission
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([
      "Nouveau contenu",
    ]);
  });

  // 2. Gestion des États (Disabled, Readonly, Error)
  it("applique correctement l'état disabled", () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        disabled: true,
        modelValue: "",
      },
    });

    // Vérifie la classe CSS
    expect(wrapper.classes()).toContain("textarea-field--disabled");
    // Vérifie l'attribut HTML natif
    expect(wrapper.element.disabled).toBe(true);
  });

  it("applique correctement l'état readonly", () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        readonly: true,
        modelValue: "",
      },
    });

    expect(wrapper.classes()).toContain("textarea-field--readonly");
    expect(wrapper.element.readOnly).toBe(true);
  });

  it("applique correctement l'état error", () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        error: true,
        modelValue: "",
      },
    });

    // Style
    expect(wrapper.classes()).toContain("textarea-field--error");
    // Accessibilité
    expect(wrapper.attributes("aria-invalid")).toBe("true");
  });

  // 3. Gestion du Resize
  it("applique la classe de redimensionnement correcte (vertical par défaut)", () => {
    const wrapper = mount(BaseTextarea, {
      props: { modelValue: "" },
    });
    // Par défaut dans le composant : resize: 'vertical'
    expect(wrapper.classes()).toContain("resize--vertical");
  });

  it("change la classe de redimensionnement si la prop change", () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        resize: "none",
        modelValue: "",
      },
    });
    expect(wrapper.classes()).toContain("resize--none");
  });

  // 4. Props spécifiques (Rows)
  it("applique le nombre de lignes (rows)", () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        rows: 10,
        modelValue: "",
      },
    });

    // L'attribut HTML rows doit être présent
    expect(wrapper.find("textarea").attributes("rows")).toBe("10");
  });

  // 5. Héritage des attributs (inheritAttrs: false)
  it("transmet les attributs standards (placeholder, maxlength) au textarea", () => {
    const wrapper = mount(BaseTextarea, {
      props: { modelValue: "" },
      attrs: {
        placeholder: "Racontez votre histoire...",
        maxlength: "200",
      },
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.attributes("placeholder")).toBe(
      "Racontez votre histoire...",
    );
    expect(textarea.attributes("maxlength")).toBe("200");
  });
});
