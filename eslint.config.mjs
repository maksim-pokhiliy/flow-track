import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["*.config.js", "commitlint.config.js", ".prettierrc"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "off", // handled by unused-imports
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Import/Export rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Node.js builtins prefixed with `node:`
            ["^node:"],
            // Packages. Things that start with a letter (or digit or underscore), or `@` followed by a letter
            ["^@?\\w"],
            // Internal packages - our @app alias
            ["^@app(/.*|$)"],
            // Side effect imports
            ["^\\u0000"],
            // Parent imports. Put `..` last
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // TypeScript handles this
      "import/order": "off", // using simple-import-sort instead

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React/JSX rules
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Using TypeScript
      "react/display-name": "off",
      "jsx-quotes": ["error", "prefer-double"],

      // Next.js specific rules
      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "warn",

      // General JavaScript rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-duplicate-imports": "error",
      "require-await": "error",
      "no-return-await": "error",
      "prefer-promise-reject-errors": "error",

      // Code style and formatting
      "padding-line-between-statements": [
        "error",
        // Always require blank lines after directive (like "use-strict"), except between directives
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "any", prev: "directive", next: "directive" },
        // Always require blank lines after import, except between imports
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        // Always require blank lines before and after every sequence of variable declarations and export
        { blankLine: "always", prev: "*", next: ["const", "let", "var", "export"] },
        { blankLine: "always", prev: ["const", "let", "var", "export"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var", "export"],
          next: ["const", "let", "var", "export"],
        },
        // Always require blank lines before and after class declaration, if, do/while, switch, try
        {
          blankLine: "always",
          prev: "*",
          next: ["if", "class", "for", "do", "while", "switch", "try"],
        },
        {
          blankLine: "always",
          prev: ["if", "class", "for", "do", "while", "switch", "try"],
          next: "*",
        },
        // Always require blank lines before return statements
        { blankLine: "always", prev: "*", next: "return" },
      ],

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/no-access-key": "error",

      // Performance and best practices
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "prefer-object-spread": "error",
      "no-useless-concat": "error",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      // Disable TypeScript-specific rules for JS files
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["**/*.config.{js,ts,mjs}", "**/next.config.{js,ts}"],
    rules: {
      // Allow console in config files
      "no-console": "off",
      // Allow require in config files
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];

export default eslintConfig;
