import type { Preview } from "@storybook/vue3";
import "../src/styles/variables.css";
import "../src/styles/variables-dark.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Thème global de l'application",
      defaultValue: "light",
      toolbar: {
        title: "Thème",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Clair" },
          { value: "dark", icon: "circle", title: "Sombre" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
      element: "#storybook-root",
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      toc: true,
    },
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme || "light";

      document.documentElement.setAttribute("data-theme", theme);

      return {
        components: { story },
        setup() {
          return {};
        },
        template: `
          <div 
            style="
              background-color: var(--color-background-secondary); 
              color: var(--color-text-primary); 
              min-height: 100vh; 
              padding: 2rem;
              transition: background-color 0.3s, color 0.3s;
            "
          >
            <story />
          </div>
        `,
      };
    },
  ],
};

export default preview;