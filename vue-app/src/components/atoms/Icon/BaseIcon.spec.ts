import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseIcon from "./BaseIcon.vue";

// On n'a pas besoin de mocker les tokens car ce sont de simples constantes string,
// mais on assume ici que Spacing3='12px', Spacing4='16px', Spacing6='24px'
describe("BaseIcon", () => {
  // 1. Rendu Basique et Mapping
  it("rend l'icône demandée (user)", () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "user" },
    });

    // Lucide ajoute généralement une classe .lucide-user sur le SVG
    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.find(".lucide-user").exists()).toBe(true);
    expect(wrapper.classes()).toContain("base-icon");
  });

  // 2. Fallback (Nom inconnu)
  it("rend l'icône Info par défaut si le nom est inconnu", () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "icone-qui-n-existe-pas" },
    });

    // Doit afficher l'icône Info
    expect(wrapper.find(".lucide-info").exists()).toBe(true);
  });

  // 3. Gestion du Loading (Spin)
  it('ajoute la classe "spin" uniquement quand le nom est "loading"', () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "loading" },
    });

    expect(wrapper.classes()).toContain("spin");

    expect(wrapper.find("svg").exists()).toBe(true);
  });

  it('n\'ajoute pas la classe "spin" pour les autres icônes', () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "settings" },
    });
    expect(wrapper.classes()).not.toContain("spin");
  });

  // 4. Gestion des Couleurs
  it("applique la couleur passée en prop", () => {
    const wrapper = mount(BaseIcon, {
      props: {
        name: "heart",
        color: "#ff0000",
      },
    });

    // Lucide applique la couleur sur l'attribut "stroke" du SVG
    expect(wrapper.find("svg").attributes("stroke")).toBe("#ff0000");
  });

  // 5. Gestion des Tailles (Conversion Token -> Px)
  // Note: Lucide applique la taille sur width et height
  it('convertit la taille "sm" en pixels corrects', () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "check", size: "sm" },
    });

    // parseInt("12px") -> 12
    const svg = wrapper.find("svg");
    expect(svg.attributes("width")).toBe("12");
    expect(svg.attributes("height")).toBe("12");
  });

  it('convertit la taille "lg" en pixels corrects', () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "check", size: "lg" },
    });

    // parseInt("24px") -> 24
    const svg = wrapper.find("svg");
    expect(svg.attributes("width")).toBe("24");
    expect(svg.attributes("height")).toBe("24");
  });

  it("utilise la taille par défaut (md/lg selon default) si rien n'est précisé", () => {
    const wrapper = mount(BaseIcon, {
      props: { name: "check" },
    });

    const svg = wrapper.find("svg");
    expect(svg.attributes("width")).toBe("16");
  });
});
