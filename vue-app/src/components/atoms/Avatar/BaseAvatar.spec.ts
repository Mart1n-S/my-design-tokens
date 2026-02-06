import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseAvatar from "./BaseAvatar.vue";

describe("BaseAvatar", () => {
  it('affiche le fallback "?" par défaut si aucune prop n\'est fournie', () => {
    const wrapper = mount(BaseAvatar, {
      props: { alt: "" },
    });

    expect(wrapper.classes()).toContain("avatar");
    expect(wrapper.find(".avatar__initials").text()).toBe("?");
  });

  // 2. Rendu avec Image
  it("affiche l'image quand src est fourni", () => {
    const src = "https://example.com/avatar.jpg";
    const alt = "John Doe";

    const wrapper = mount(BaseAvatar, {
      props: { src, alt },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(src);
    expect(img.attributes("alt")).toBe(alt);
  });

  // 3. Logique des Initiales (Fallback)
  it('affiche les initiales fournies via la prop "initials"', () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        initials: "JD",
        alt: "John Doe",
      },
    });
    expect(wrapper.find(".avatar__initials").text()).toBe("JD");
  });

  it('dérive l\'initiale depuis la prop "alt" si "initials" est absent', () => {
    const wrapper = mount(BaseAvatar, {
      props: { alt: "Marie Curie" },
    });
    // Doit prendre la première lettre ("M")
    expect(wrapper.find(".avatar__initials").text()).toBe("M");
  });

  // 4. Gestion de l'erreur de chargement (Image cassée)
  it("bascule sur le fallback si l'image échoue à charger (@error)", async () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        src: "bad-link.jpg",
        initials: "XX",
        alt: "Test Error",
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);

    await img.trigger("error");

    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.find(".avatar__initials").text()).toBe("XX");
  });

  // 5. Réactivité (Reset error)
  it("réessaie d'afficher l'image si la prop src change après une erreur", async () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        src: "bad.jpg",
        alt: "Test Reactive",
      },
    });

    await wrapper.find("img").trigger("error");
    expect(wrapper.find("img").exists()).toBe(false);

    await wrapper.setProps({ src: "good.jpg" });

    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("img").attributes("src")).toBe("good.jpg");
  });

  // 6. Accessibilité (Decoratif)
  it("gère les attributs aria pour les avatars décoratifs", () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        src: "img.jpg",
        alt: "Description ignorée",
        decorative: true,
      },
    });

    const img = wrapper.find("img");
    expect(img.attributes("alt")).toBe("");
    expect(img.attributes("aria-hidden")).toBe("true");
  });

  // 7. Tailles
  it("applique la classe de taille correcte", () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        size: "xl",
        alt: "Test Size",
      },
    });
    expect(wrapper.classes()).toContain("avatar--xl");
  });
});
