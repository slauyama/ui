// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config(
  {
    // Facet's own reference source, copied verbatim into ui_kits/ and templates/ alongside this
    // repo's real .tsx compositions: raw browser-babel JSX run against a global
    // window.FacetDesignSystem_d4e8f5, and Claude Design's generated `.dc.html` runtime. Neither
    // is written against this repo's environment, so neither is meant to pass its lint rules.
    ignores: ["ui_kits/**/*.jsx", "templates/**/support.js", "templates/**/ds-base.js"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  storybook.configs["flat/recommended"],
  {
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    },
  }
);
