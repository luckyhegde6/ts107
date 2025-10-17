const prettier = require("eslint-config-prettier");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const globals = require("globals");

module.exports = tseslint.config(
  
  // Base JS rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    rules: {
      "no-unused-vars": "off", // handled by TS
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "error",
      "no-console": "off",
    },

    ignores: [
      "dist/",
      "coverage/",
      "node_modules/",
    ],
  }
);
