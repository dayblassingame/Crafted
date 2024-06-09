const path = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  rootDir: '.',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|svg)$": "<rootDir>/mocks/fileMock.js",
    },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
};