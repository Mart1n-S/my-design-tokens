import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseInput from "./BaseInput.vue";

const globalOptions = {
  stubs: {
    BaseIcon: true,
  },
};

describe("BaseInput", () => {
  // 1. Rendu basique et v-model
  it("affiche la valeur initiale et émet update:modelValue à la saisie", async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: "Valeur initiale",
        id: "test-input",
      },
      global: globalOptions,
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("Valeur initiale");

    await input.setValue("Nouvelle valeur");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([
      "Nouvelle valeur",
    ]);
  });

  // 2. Gestion des États (Disabled, Readonly, Error)
  it("applique correctement l'état disabled", () => {
    const wrapper = mount(BaseInput, {
      props: {
        disabled: true,
        modelValue: "",
      },
      global: globalOptions,
    });

    const wrapperDiv = wrapper.find(".input-wrapper");
    const input = wrapper.find("input");

    expect(wrapperDiv.classes()).toContain("input-wrapper--disabled");
    expect(input.element.disabled).toBe(true);
  });

  it("applique correctement l'état readonly", () => {
    const wrapper = mount(BaseInput, {
      props: {
        readonly: true,
        modelValue: "",
      },
      global: globalOptions,
    });

    const wrapperDiv = wrapper.find(".input-wrapper");
    const input = wrapper.find("input");

    expect(wrapperDiv.classes()).toContain("input-wrapper--readonly");
    expect(input.element.readOnly).toBe(true);
  });

  it("applique correctement l'état error", () => {
    const wrapper = mount(BaseInput, {
      props: {
        error: true,
        modelValue: "",
      },
      global: globalOptions,
    });

    const wrapperDiv = wrapper.find(".input-wrapper");
    const input = wrapper.find("input");

    expect(wrapperDiv.classes()).toContain("input-wrapper--error");
    expect(input.attributes("aria-invalid")).toBe("true");
  });

  // 3. Gestion des Icônes (Props vs Slots)
  it("affiche une icône via la prop (BaseIcon)", () => {
    const wrapper = mount(BaseInput, {
      props: {
        iconLeft: "user",
        modelValue: "",
      },
      global: globalOptions,
    });

    expect(wrapper.classes()).toContain("input-wrapper--has-icon-left");
    expect(wrapper.findComponent({ name: "BaseIcon" }).exists()).toBe(true);
  });

  it("affiche une icône via le slot (Custom)", () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: "" },
      slots: {
        "icon-right": '<span class="custom-icon">€</span>',
      },
      global: globalOptions,
    });

    expect(wrapper.classes()).toContain("input-wrapper--has-icon-right");
    expect(wrapper.find(".custom-icon").exists()).toBe(true);
  });

  // 4. Héritage des attributs (inheritAttrs: false)
  it("applique les attributs non-prop directement sur l'input (placeholder, type...)", () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: "" },
      attrs: {
        placeholder: "Mon placeholder",
        type: "password",
        name: "password-field",
      },
      global: globalOptions,
    });

    const input = wrapper.find("input");
    const wrapperDiv = wrapper.find(".input-wrapper");

    expect(input.attributes("placeholder")).toBe("Mon placeholder");
    expect(input.attributes("type")).toBe("password");
    expect(input.attributes("name")).toBe("password-field");

    expect(wrapperDiv.attributes("placeholder")).toBeUndefined();
  });

  // 5. Focus sur clic wrapper
  it("donne le focus à l'input quand on clique sur le wrapper", async () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: "" },
      attachTo: document.body,
      global: globalOptions,
    });

    const input = wrapper.find("input");

    await wrapper.find(".input-wrapper").trigger("click");

    expect(document.activeElement).toBe(input.element);

    wrapper.unmount();
  });
});
