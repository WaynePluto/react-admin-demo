/**
 * @type {import('jest').Config}
 */
module.exports = {
  clearMocks: true,

  collectCoverage: false,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  // ts-jest与swc-jest二选一
  // preset: 'ts-jest',
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  // testMatch: ["<rootDir>/src/**/*/*.spec.ts"],
  testMatch: ["<rootDir>/src/views/login/*.spec.ts"],
};
