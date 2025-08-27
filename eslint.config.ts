import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import pluginPromise from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  perfectionist.configs["recommended-natural"],
  sonarjs.configs.recommended,
  pluginPromise.configs["flat/recommended"],
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["src/**/*.{ts,mts,cts}"],
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintPluginUnicorn.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [
      "src/**/*.{spec,test}.{js,ts,mjs,mts,cjs,cts}",
      "src/**/__tests__/**/*.{js,ts,mjs,mts,cjs,cts}",
    ],
    ...vitest.configs.recommended,
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "eslint.config.ts",
      "vitest.config.ts",
    ],
  },
  eslintConfigPrettier,
);
