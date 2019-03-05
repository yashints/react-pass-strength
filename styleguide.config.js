module.exports = {
  components: "src/lib/PasswordStrength.tsx",
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  ignore: [
    "src/setupTests.ts",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/models.ts",
    "**/index.js",
    "**/*.d.ts",
    "**/__mocks__/**/*.*"
  ]
};
