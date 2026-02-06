import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProfileCard from "./ProfileCard.vue";

const globalOptions = {
  stubs: {
    BaseAvatar: true,

    // Stub avec template pour le Badge (pour lire le slot)
    BaseBadge: {
      template: '<div class="base-badge-stub"><slot /></div>',
    },

    // Stub avec template pour le Button (pour lire le slot et cliquer)
    BaseButton: {
      template: '<button class="base-button-stub"><slot /></button>',
    },
  },
};

describe("ProfileCard", () => {
  // 1. Rendu minimal
  it("affiche le nom et le bouton par défaut", () => {
    const wrapper = mount(ProfileCard, {
      props: {
        name: "Alice Wonderland",
      },
      global: globalOptions,
    });

    // Le nom doit être affiché
    expect(wrapper.find(".profile-card__name").text()).toBe("Alice Wonderland");

    const button = wrapper.find(".base-button-stub");

    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("Voir le profil");

    // Le job et le badge ne doivent pas être là
    expect(wrapper.find(".profile-card__job").exists()).toBe(false);
    expect(wrapper.find(".base-badge-stub").exists()).toBe(false);
  });

  // 2. Rendu complet (Job + Role)
  it("affiche le job et le badge si les props sont fournies", () => {
    const wrapper = mount(ProfileCard, {
      props: {
        name: "Bob Builder",
        jobTitle: "Architecte",
        role: "Admin",
      },
      global: globalOptions,
    });

    // Job
    expect(wrapper.find(".profile-card__job").exists()).toBe(true);
    expect(wrapper.find(".profile-card__job").text()).toBe("Architecte");

    const badge = wrapper.find(".base-badge-stub");

    expect(badge.exists()).toBe(true);
    expect(badge.text()).toContain("Admin");
  });

  // 3. Logique des Props (Avatar Alt)
  it("utilise le nom comme texte alternatif (alt) pour l'avatar si avatarAlt n'est pas fourni", () => {
    const wrapper = mount(ProfileCard, {
      props: { name: "Charlie" },
      global: globalOptions,
    });

    const avatar = wrapper.findComponent({ name: "BaseAvatar" });

    expect(avatar.exists()).toBe(true);
    expect(avatar.props("alt")).toBe("Charlie");
    expect(avatar.props("initials")).toBe("C");
  });

  it("utilise avatarAlt si fourni", () => {
    const wrapper = mount(ProfileCard, {
      props: {
        name: "Dave",
        avatarAlt: "Photo de profil de Dave",
      },
      global: globalOptions,
    });

    const avatar = wrapper.findComponent({ name: "BaseAvatar" });
    expect(avatar.props("alt")).toBe("Photo de profil de Dave");
  });

  // 4. Style (Centré)
  it("applique la classe CSS centrée si la prop centered est true", () => {
    const wrapper = mount(ProfileCard, {
      props: {
        name: "Eve",
        centered: true,
      },
      global: globalOptions,
    });

    expect(wrapper.find(".profile-card").classes()).toContain(
      "profile-card--centered",
    );
  });

  // 5. Interaction (Event)
  it('émet l\'événement "action" au clic sur le bouton', async () => {
    const wrapper = mount(ProfileCard, {
      props: { name: "Frank" },
      global: globalOptions,
    });

    const button = wrapper.find(".base-button-stub");

    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("action");
    expect(wrapper.emitted("action")).toHaveLength(1);
  });
});
