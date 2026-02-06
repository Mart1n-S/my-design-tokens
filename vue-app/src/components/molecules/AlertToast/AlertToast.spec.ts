import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AlertToast from "./AlertToast.vue";

// On stub les composants enfants pour isoler le test
const globalOptions = {
  stubs: {
    BaseIcon: true,
    BaseButton: true,
  },
};

describe("AlertToast", () => {
  // 1. Rendu Basique (Titre et Variante par défaut)
  it("affiche le titre et applique la variante par défaut (info)", () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Message important",
      },
      global: globalOptions,
    });

    expect(wrapper.text()).toContain("Message important");
    expect(wrapper.find(".alert").classes()).toContain("alert--info");

    // Vérifie l'icône par défaut pour info
    const icon = wrapper.findComponent({ name: "BaseIcon" });
    expect(icon.props("name")).toBe("info");
  });

  // 2. Affichage de la description
  it("affiche la description si elle est fournie", () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Titre",
        description: "Détails de l'erreur ici.",
      },
      global: globalOptions,
    });

    expect(wrapper.find(".alert__desc").exists()).toBe(true);
    expect(wrapper.text()).toContain("Détails de l'erreur ici.");
  });

  // 3. Gestion des Variantes et Icônes automatiques
  it('utilise l\'icône "check" pour la variante "success"', () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Bravo",
        variant: "success",
      },
      global: globalOptions,
    });

    expect(wrapper.find(".alert").classes()).toContain("alert--success");
    const icon = wrapper.findComponent({ name: "BaseIcon" });
    expect(icon.props("name")).toBe("check");
  });

  it('utilise l\'icône "warning" pour la variante "warning"', () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Attention",
        variant: "warning",
      },
      global: globalOptions,
    });

    const icon = wrapper.findComponent({ name: "BaseIcon" });
    expect(icon.props("name")).toBe("warning");
  });

  it('utilise l\'icône "close" pour la variante "error"', () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Erreur",
        variant: "error",
      },
      global: globalOptions,
    });

    const icon = wrapper.findComponent({ name: "BaseIcon" });
    expect(icon.props("name")).toBe("close");
  });

  // 4. Icône personnalisée
  it('surcharge l\'icône par défaut si une prop "icon" est fournie', () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Custom",
        variant: "success",
        icon: "star",
      },
      global: globalOptions,
    });

    const icon = wrapper.findComponent({ name: "BaseIcon" });
    expect(icon.props("name")).toBe("star");
  });

  // 5. Fermeture (Closable)
  it("n'affiche pas le bouton de fermeture par défaut", () => {
    const wrapper = mount(AlertToast, {
      props: { title: "Non closable" },
      global: globalOptions,
    });

    expect(wrapper.findComponent({ name: "BaseButton" }).exists()).toBe(false);
  });

  it("affiche le bouton et ferme l'alerte au clic", async () => {
    const wrapper = mount(AlertToast, {
      props: {
        title: "Closable",
        closable: true,
      },
      global: globalOptions,
    });

    // Le bouton doit être là
    const closeBtn = wrapper.findComponent({ name: "BaseButton" });
    expect(closeBtn.exists()).toBe(true);

    // On simule le clic sur le composant bouton stubbé
    await closeBtn.trigger("click");

    // 1. Vérifie l'émission de l'événement
    expect(wrapper.emitted()).toHaveProperty("close");

    // 2. Vérifie que le composant a disparu du DOM (v-if="isVisible")
    expect(wrapper.find(".alert").exists()).toBe(false);
  });
});
