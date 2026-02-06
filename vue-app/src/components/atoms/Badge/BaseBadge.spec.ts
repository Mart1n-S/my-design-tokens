import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseBadge from "./BaseBadge.vue";

describe("BaseBadge", () => {
  // 1. Test du rendu par défaut
  it("affiche le contenu par défaut et les classes de base", () => {
    const wrapper = mount(BaseBadge, {
      slots: {
        default: "Nouveau",
      },
    });

    // Vérifie le texte
    expect(wrapper.text()).toContain("Nouveau");

    // Vérifie les classes par défaut (définies dans withDefaults)
    expect(wrapper.classes()).toContain("badge");
    expect(wrapper.classes()).toContain("badge--neutral");
    expect(wrapper.classes()).toContain("badge--md");
    expect(wrapper.classes()).toContain("badge--rounded");

    // Vérifie l'accessibilité
    expect(wrapper.attributes("role")).toBe("status");
  });

  // 2. Test des variantes (Couleurs)
  it("applique la classe de variante correcte (success)", () => {
    const wrapper = mount(BaseBadge, {
      props: { variant: "success" },
    });
    expect(wrapper.classes()).toContain("badge--success");
    expect(wrapper.classes()).not.toContain("badge--neutral");
  });

  it("applique la classe de variante correcte (error)", () => {
    const wrapper = mount(BaseBadge, {
      props: { variant: "error" },
    });
    expect(wrapper.classes()).toContain("badge--error");
  });

  // 3. Test des tailles
  it("applique la classe de taille correcte (sm)", () => {
    const wrapper = mount(BaseBadge, {
      props: { size: "sm" },
    });
    expect(wrapper.classes()).toContain("badge--sm");
  });

  // 4. Test des formes (Shapes)
  it("applique la classe de forme correcte (pill)", () => {
    const wrapper = mount(BaseBadge, {
      props: { shape: "pill" },
    });
    expect(wrapper.classes()).toContain("badge--pill");
  });

  // 5. Test du Slot Icone (Logique v-if)
  it("affiche le wrapper icône si le slot est présent", () => {
    const wrapper = mount(BaseBadge, {
      slots: {
        default: "Avec icône",
        icon: '<svg class="fake-icon"></svg>',
      },
    });

    // Le conteneur .badge__icon doit exister
    expect(wrapper.find(".badge__icon").exists()).toBe(true);
    // L'élément injecté doit être présent
    expect(wrapper.find(".fake-icon").exists()).toBe(true);
  });

  it("n'affiche pas le wrapper icône si le slot est absent", () => {
    const wrapper = mount(BaseBadge, {
      slots: {
        default: "Sans icône",
      },
    });

    // Le conteneur .badge__icon ne doit PAS exister (v-if="hasIcon")
    expect(wrapper.find(".badge__icon").exists()).toBe(false);
  });
});
