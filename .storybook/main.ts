import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
  // guidelines/*.html link ../styles.css, which imports the token files. Tokens are served under
  // /guideline-tokens because /tokens is where Vite serves the preview's own token imports.
  staticDirs: [
    { from: "./static", to: "/" },
    { from: "../guidelines", to: "/guidelines" },
    { from: "../tokens", to: "/guideline-tokens" },
  ],
  stories: [
    {
      directory: "../foundations",
      files: "*.stories.tsx",
      titlePrefix: "Foundations",
    },
    {
      directory: "../components",
      files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
      titlePrefix: "Components",
    },
    {
      directory: "../ui_kits",
      files: "**/*.stories.tsx",
    },
    {
      directory: "../templates",
      files: "**/*.stories.tsx",
    },
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
};
export default config;
