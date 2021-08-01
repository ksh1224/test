/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
  },
};
