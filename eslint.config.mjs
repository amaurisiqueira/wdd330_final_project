import globals from "globals";
import pluginJs from "@eslint/js";
//import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
//import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs}"] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Reglas genéricas de ESLint
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      // Otras reglas que consideres apropiadas
    },
  },
];