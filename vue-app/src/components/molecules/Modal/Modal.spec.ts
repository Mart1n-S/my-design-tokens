import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Modal from "./Modal.vue";

// Configuration globale pour isoler le test
const globalOptions = {
  stubs: {
    // On remplace le bouton par un stub simple
    BaseButton: true,
    // IMPORTANT : On stub Teleport pour que le contenu soit rendu
    // à l'intérieur du wrapper de test et non à la fin du body.
    // Cela rend les querySelector (wrapper.find) beaucoup plus simples.
    Teleport: true,
    transition: true,
  },
};

describe("Modal", () => {
  // 1. Visibilité (v-if)
  it("ne rend rien si isOpen est false", () => {
    const wrapper = mount(Modal, {
      props: { isOpen: false },
      global: globalOptions,
    });

    expect(wrapper.find(".modal-backdrop").exists()).toBe(false);
  });

  it("rend le contenu si isOpen est true", () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        title: "Titre Test",
      },
      global: globalOptions,
    });

    expect(wrapper.find(".modal-backdrop").exists()).toBe(true);
    expect(wrapper.find(".modal__title").text()).toBe("Titre Test");
  });

  // 2. Gestion des Slots
  it("affiche le contenu du slot default et footer", () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      slots: {
        default: "<p>Contenu principal</p>",
        footer: "<button>Action</button>",
      },
      global: globalOptions,
    });

    expect(wrapper.find(".modal__content").html()).toContain(
      "Contenu principal",
    );
    expect(wrapper.find(".modal__footer").exists()).toBe(true);
    expect(wrapper.find(".modal__footer").html()).toContain("Action");
  });

  // 3. Fermeture via intéractions souris
  it('émet "close" quand on clique sur le bouton de fermeture (BaseButton)', async () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: globalOptions,
    });

    // On trouve le bouton stubbé et on émet son event click
    await wrapper.findComponent({ name: "BaseButton" }).trigger("click");

    expect(wrapper.emitted()).toHaveProperty("close");
    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it('émet "close" quand on clique sur le backdrop (fond gris)', async () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: globalOptions,
    });

    await wrapper.find(".modal-backdrop").trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it('N\'émet PAS "close" quand on clique sur le contenu de la modale', async () => {
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: globalOptions,
    });

    // Le .stop sur le @click de modal-container doit empêcher la propagation
    await wrapper.find(".modal-container").trigger("click");

    expect(wrapper.emitted("close")).toBeUndefined();
  });

  // 4. Fermeture via Clavier (Escape)
  it('émet "close" quand on appuie sur Echap (Escape)', async () => {
    // On monte le composant
    const wrapper = mount(Modal, {
      props: { isOpen: true },
      global: globalOptions,
    });

    // On simule l'appui sur Echap au niveau global (document)
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);

    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it('n\'émet pas "close" sur Echap si la modale est fermée', async () => {
    const wrapper = mount(Modal, {
      props: { isOpen: false },
      global: globalOptions,
    });

    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);

    expect(wrapper.emitted("close")).toBeUndefined();
  });

  // 5. Props de style (Size, Inline)
  it("applique la classe de taille correcte", () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        size: "lg",
      },
      global: globalOptions,
    });

    expect(wrapper.find(".modal-container").classes()).toContain("modal--lg");
  });

  it("gère le mode inline (pas de teleport, backdrop transparent)", () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
        inline: true,
      },
      global: globalOptions,
    });

    // Vérifie la classe CSS spécifique
    expect(wrapper.find(".modal-backdrop").classes()).toContain(
      "modal-backdrop--inline",
    );

  });

  // 6. Focus Management (Avancé)
  it("place le focus sur la modale à l'ouverture", async () => {
    // Pour tester le focus, l'élément DOIT être attaché au vrai DOM
    const wrapper = mount(Modal, {
      props: { isOpen: false },
      global: globalOptions,
      attachTo: document.body,
    });

    // On ouvre
    await wrapper.setProps({ isOpen: true });

    // On attend que le watcher et le nextTick du composant fassent effet
    await wrapper.vm.$nextTick();

    const modalContainer = wrapper.find(".modal-container").element;

    // Vérifie que l'élément actif du document est bien notre container
    expect(document.activeElement).toBe(modalContainer);

    wrapper.unmount();
  });
});
