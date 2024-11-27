import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin-js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,cjs,jsx}"]
  },
  {
    files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}
  },
  {
    languageOptions: {
      sourceType: "commonjs",
      globals: {...globals.node}
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@stylistic/js': stylistic
    },
    rules: {
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-trailing-spaces': [
        'error',
      ],
      'no-console': 'off',
    }
  }
];