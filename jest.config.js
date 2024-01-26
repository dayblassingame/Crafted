const path = require('path');

module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': path.resolve(__dirname, 'src/$1'),
  },
  resolver: 'jest-webpack-resolver',
};