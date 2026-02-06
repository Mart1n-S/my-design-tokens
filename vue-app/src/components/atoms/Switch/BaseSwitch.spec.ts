import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseSwitch from "./BaseSwitch.vue";

describe("BaseSwitch", () => {
  // 1. Rendu Basique et Label
  it("affiche le label correctement quand il est fourni", () => {
    const wrapper = mount(BaseSwitch, {
      props: {
        label: "Activer les notifications",
        modelValue: false,
        id: "test-switch",
      },
    });

    expect(wrapper.text()).toContain("Activer les notifications");
    expect(wrapper.classes()).toContain("switch-wrapper");
  });

  it("n'affiche pas de texte si le label est absent", () => {
    const wrapper = mount(BaseSwitch, {
      props: {
        modelValue: false,
        id: "test-switch-no-label",
      },
    });

    // .switch__label est sous v-if="label"
    expect(wrapper.find(".switch__label").exists()).toBe(false);
  });

  // 2. Interaction (v-model)
  it("émet l'événement update:modelValue lors du changement", async () => {
    const wrapper = mount(BaseSwitch, {
      props: {
        modelValue: false,
        id: "interaction-switch",
      },
    });

    const input = wrapper.find('input[type="checkbox"]');

    // On simule le coche de la case
    await input.setValue(true);

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
  });

  // 3. État Checked (On)
  it("reflète visuellement et techniquement l'état checked (modelValue: true)", () => {
    const wrapper = mount(BaseSwitch, {
      props: {
        modelValue: true,
        id: "checked-switch",
      },
    });

    const input = wrapper.find("input");

    // Vérifie la propriété DOM checked
    expect(input.element.checked).toBe(true);
    // Vérifie l'attribut ARIA pour l'accessibilité
    expect(input.attributes("aria-checked")).toBe("true");
  });

  // 4. État Disabled
  it("applique correctement l'état désactivé", () => {
    const wrapper = mount(BaseSwitch, {
      props: {
        disabled: true,
        modelValue: false,
        id: "disabled-switch",
      },
    });

    const wrapperLabel = wrapper.find(".switch-wrapper");
    const input = wrapper.find("input");

    // Classe CSS sur le parent
    expect(wrapperLabel.classes()).toContain("switch-wrapper--disabled");
    // Attribut HTML sur l'input
    expect(input.element.disabled).toBe(true);
  });

  // 5. Accessibilité (Liaison ID)
  it("lie correctement le label et l'input via l'ID", () => {
    const testId = "unique-id-123";
    const wrapper = mount(BaseSwitch, {
      props: {
        id: testId,
        modelValue: false,
      },
    });

    // Le <label> doit avoir for="unique-id-123"
    expect(wrapper.element.tagName).toBe("LABEL");
    expect(wrapper.attributes("for")).toBe(testId);

    // L'<input> doit avoir id="unique-id-123"
    expect(wrapper.find("input").attributes("id")).toBe(testId);
  });
});
