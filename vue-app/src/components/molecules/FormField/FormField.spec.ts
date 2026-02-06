import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FormField from "./FormField.vue";

describe("FormField", () => {
  // 1. Rendu Basique
  it('affiche le label correctement avec l\'attribut "for"', () => {
    const wrapper = mount(FormField, {
      props: {
        id: "user-email",
        label: "Adresse email",
      },
    });

    const label = wrapper.find("label");
    expect(label.text()).toBe("Adresse email");
    expect(label.attributes("for")).toBe("user-email");

    // Pas de requis par défaut
    expect(wrapper.find(".required-mark").exists()).toBe(false);
  });

  // 2. État Requis
  it("affiche l'astérisque si required est true", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "test",
        label: "Label",
        required: true,
      },
    });

    expect(wrapper.find(".required-mark").exists()).toBe(true);
    expect(wrapper.find(".required-mark").text()).toBe("*");
  });

  // 3. Gestion des Messages (Help vs Error)
  it("affiche le texte d'aide quand tout va bien", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "test",
        label: "Label",
        helpText: "Votre mot de passe doit contenir 8 caractères.",
      },
    });

    const helpMsg = wrapper.find(".form-field__message--help");
    expect(helpMsg.exists()).toBe(true);
    expect(helpMsg.text()).toBe(
      "Votre mot de passe doit contenir 8 caractères.",
    );
    // L'ID doit être généré automatiquement
    expect(helpMsg.attributes("id")).toBe("test-help");
  });

  it("affiche le message d'erreur (et cache l'aide) en cas d'erreur", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "test",
        label: "Label",
        helpText: "Texte d'aide",
        errorMessage: "Champ invalide",
        error: true,
      },
    });

    // Le message d'erreur doit être là
    const errorMsg = wrapper.find(".form-field__message--error");
    expect(errorMsg.exists()).toBe(true);
    expect(errorMsg.text()).toBe("Champ invalide");
    expect(errorMsg.attributes("role")).toBe("alert");
    expect(errorMsg.attributes("id")).toBe("test-error");

    // L'aide ne doit PAS être là (v-else-if)
    expect(wrapper.find(".form-field__message--help").exists()).toBe(false);

    // Le label doit être rouge
    expect(wrapper.find("label").classes()).toContain(
      "form-field__label--error",
    );
  });

  // 4. Compteur de caractères
  it("affiche le compteur si showCount et maxLength sont fournis", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "bio",
        label: "Bio",
        showCount: true,
        maxLength: 140,
        currentLength: 50,
      },
    });

    const counter = wrapper.find(".form-field__counter");
    expect(counter.exists()).toBe(true);
    expect(counter.text()).toBe("50 / 140");
    expect(counter.classes()).not.toContain("form-field__counter--limit");
  });

  it("change le style du compteur si la limite est dépassée", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "bio",
        label: "Bio",
        showCount: true,
        maxLength: 10,
        currentLength: 11, // Dépassement
      },
    });

    expect(wrapper.find(".form-field__counter").classes()).toContain(
      "form-field__counter--limit",
    );
  });

  it("n'affiche pas le compteur si showCount est false", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "bio",
        label: "Bio",
        showCount: false,
        maxLength: 10,
      },
    });
    expect(wrapper.find(".form-field__counter").exists()).toBe(false);
  });

  // 5. Accessibilité (Slot Props describedBy)
  it("passe les IDs corrects (help/error) au slot via describedBy", () => {
    // C'est le test le plus important pour ce composant.
    // On injecte un template dans le slot pour récupérer la prop 'describedBy'
    // et on l'applique sur une div témoin pour vérifier sa valeur.
    const wrapper = mount(FormField, {
      props: {
        id: "my-input",
        label: "Label",
        helpText: "Aide ici",
        errorMessage: "Erreur ici",
        error: true,
      },
      slots: {
        default: `
          <template #default="slotProps">
            <div id="slot-content" :data-describedby="slotProps.describedBy">Input</div>
          </template>
        `,
      },
    });

    const slotContent = wrapper.find("#slot-content");
    const describedBy = slotContent.attributes("data-describedby");

    // Il doit contenir l'ID de l'erreur ET l'ID de l'aide
    expect(describedBy).toContain("my-input-error");
    expect(describedBy).toContain("my-input-help");
  });

  // 6. État Disabled
  it("applique les styles disabled sur le label et le compteur", () => {
    const wrapper = mount(FormField, {
      props: {
        id: "test",
        label: "Label",
        disabled: true,
        showCount: true,
        maxLength: 10,
      },
    });

    expect(wrapper.find("label").classes()).toContain(
      "form-field__label--disabled",
    );
    expect(wrapper.find(".form-field__counter").classes()).toContain(
      "form-field__counter--disabled",
    );
  });
});
