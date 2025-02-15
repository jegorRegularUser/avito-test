import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{ts,tsx,js,jsx,cjs,mjs}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: [
          "./tsconfig.app.json",
          "./tsconfig.json",
          "./tsconfig.node.json",
        ],
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "no-unused-vars": "off",
    },
    ignores: [
      "node_modules",
      "dist",
      "build",
      "out",
      "coverage",
      "public",
      "static",
      "assets",
      "babel.config.mjs",
      "eslint.config.js",
      "jest.config.mjs",
      "jest/styleMock.js",
      "server/app.js",
    ],
  },
];
