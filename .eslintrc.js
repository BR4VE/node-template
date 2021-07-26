module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-underscore-dangle": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
