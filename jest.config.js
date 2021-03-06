module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 15,
      lines: 30,
    },
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
};
