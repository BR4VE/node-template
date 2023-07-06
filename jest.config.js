module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/testSetup.js"],
  verbose: true,
  modulePathIgnorePatterns: ["<rootDir>/build/"],

  // Jest jsDom environment does not work without ignoring below pattern
  transformIgnorePatterns: ["/node_modules/(?!uuid)"],
};
