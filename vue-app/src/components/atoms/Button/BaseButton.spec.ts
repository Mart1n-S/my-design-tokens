import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "./BaseButton.vue";

// On stub le composant BaseIcon pour éviter les erreurs s'il n'est pas chargé dans le contexte de test
const globalOptions = {
  stubs: {
    BaseIcon: true,
  },
};

describe("BaseButton", () => {
  // --- 1. Rendu Basique & Slots ---
  it("affiche le contenu du slot par défaut", () => {
    const wrapper = mount(BaseButton, {
      slots: { default: "Cliquez-moi" },
      global: globalOptions,
    });
    expect(wrapper.text()).toContain("Cliquez-moi");
    expect(wrapper.classes()).toContain("btn");
    expect(wrapper.classes()).toContain("btn--primary");
  });

  // --- 2. Props de Style (Variante, Taille, FullWidth) ---
  it("applique les classes de variantes et tailles", () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: "danger",
        size: "lg",
        fullWidth: true,
      },
      global: globalOptions,
    });

    expect(wrapper.classes()).toContain("btn--danger");
    expect(wrapper.classes()).toContain("btn--lg");
    expect(wrapper.classes()).toContain("btn--full-width");
  });

  // --- 3. Gestion du Tag (as="a") ---
  it("rend une balise <a> quand la prop 'as' est définie", () => {
    const wrapper = mount(BaseButton, {
      props: {
        as: "a",
        href: "https://google.com",
      },
      global: globalOptions,
    });

    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("https://google.com");
  });

  // --- 4. État Disabled ---
  it("n'émet pas de click si désactivé", async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
      global: globalOptions,
    });

    // Vérifie l'attribut HTML
    expect(wrapper.attributes()).toHaveProperty("disabled");

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("gère l'accessibilité pour les liens désactivés", async () => {
    // Les balises <a> n'ont pas d'attribut disabled natif, on utilise aria-disabled et le CSS
    const wrapper = mount(BaseButton, {
      props: {
        as: "a",
        disabled: true,
      },
      global: globalOptions,
    });

    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.classes()).toContain("btn--disabled");
  });

  // --- 5. État Loading ---
  it("affiche le spinner et cache le texte en mode loading", () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: "Envoyer" },
      global: globalOptions,
    });

    // La classe de loading est là
    expect(wrapper.classes()).toContain("btn--loading");

    // Le spinner est présent (svg)
    expect(wrapper.find(".btn__spinner").exists()).toBe(true);

    // Le contenu texte est caché visuellement (classe modifier)
    const content = wrapper.find(".btn__content");
    expect(content.classes()).toContain("btn__content--hidden");

    // Accessibilité
    expect(wrapper.attributes("aria-busy")).toBe("true");
  });

  it("empêche le clic pendant le chargement", async () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      global: globalOptions,
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  // --- 6. Icônes ---
  it("applique la classe icon-only si demandée", () => {
    const wrapper = mount(BaseButton, {
      props: { iconOnly: true },
      global: globalOptions,
    });
    expect(wrapper.classes()).toContain("btn--icon-only");
  });
});
