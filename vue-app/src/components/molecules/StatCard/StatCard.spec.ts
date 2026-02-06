import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StatCard from "./StatCard.vue";

const globalOptions = {
  stubs: {
    BaseIcon: true,

    BaseBadge: {
      template:
        '<div class="base-badge-stub" :variant="variant"><slot /></div>',
      props: ["variant"],
    },
  },
};

describe("StatCard", () => {
  // 1. Rendu minimal (Label + Valeur)
  it("affiche le label et la valeur", () => {
    const wrapper = mount(StatCard, {
      props: {
        label: "Revenus Totaux",
        value: "42,000 €",
      },
      global: globalOptions,
    });

    // Vérifie le label
    expect(wrapper.find(".stat-card__label").text()).toBe("Revenus Totaux");

    // Vérifie la valeur
    expect(wrapper.find(".stat-card__value").text()).toBe("42,000 €");

    // Vérifie que les éléments optionnels sont absents
    expect(wrapper.findComponent({ name: "BaseIcon" }).exists()).toBe(false);
    expect(wrapper.find(".base-badge-stub").exists()).toBe(false);
  });

  // 2. Affichage de l'icône
  it("affiche l'icône si la prop est fournie", () => {
    const wrapper = mount(StatCard, {
      props: {
        label: "Vues",
        value: "100",
        icon: "eye",
      },
      global: globalOptions,
    });

    const icon = wrapper.findComponent({ name: "BaseIcon" });
    expect(icon.exists()).toBe(true);
    expect(icon.props("name")).toBe("eye");
  });

  // 3. Affichage de la tendance (Trend)
  it("affiche le badge de tendance avec le bon texte et la bonne variante", () => {
    const wrapper = mount(StatCard, {
      props: {
        label: "Croissance",
        value: "+5%",
        trend: "+12% vs mois dernier",
        trendType: "success",
      },
      global: globalOptions,
    });

    // On récupère le stub du badge
    const badgeStub = wrapper.find(".base-badge-stub");

    // Le badge doit être présent
    expect(badgeStub.exists()).toBe(true);

    // Le texte du badge (slot) doit être correct
    expect(badgeStub.text()).toContain("+12% vs mois dernier");

    // La prop "variant" doit être passée correctement (rendue en attribut sur le stub)
    expect(badgeStub.attributes("variant")).toBe("success");
  });

  it('utilise la variante "neutral" par défaut pour le badge', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: "Info",
        value: "0",
        trend: "Stable",
      },
      global: globalOptions,
    });

    const badgeStub = wrapper.find(".base-badge-stub");
    expect(badgeStub.attributes("variant")).toBe("neutral");
  });
});
