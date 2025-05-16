import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  compat.config({
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^",
        "destructuredArrayIgnorePattern": "^",
        "varsIgnorePattern": "^",
        "ignoreRestSiblings": true
      }
  ]
  },
  })
];

export default eslintConfig;
