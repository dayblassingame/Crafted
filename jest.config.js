const path = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|svg)$": "<rootDir>/mocks/fileMock.js",
      "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
    },
  testEnvironment: 'jsdom',
};