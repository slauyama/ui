import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "./preview.css";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const withColorScheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as string;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color scheme",
      toolbar: {
        title: "Color scheme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: prefersDark ? "dark" : "light",
  },
  decorators: [withColorScheme],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
