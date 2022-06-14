module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    requireConfigFile: false,
    sourceType: "module",
  },
  plugins: [],
  root: true,
  rules: {
    "react/display-name": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: "**/*.test.{js,jsx}",
      env: { jest: true },
      extends: ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
      rules: {
        "testing-library/no-container": "OFF",
        "testing-library/no-node-access": "OFF",
      },
    },
  ],
};
