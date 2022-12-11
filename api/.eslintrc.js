module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    project: ["./tsconfig.json"],
  },
  rules: {
    semi: ["error", "always"],
    indent: ["error", 2],
    "no-undef": "warn",
    "space-before-blocks": ["warn", { functions: "always" }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": 0,
  },
};
