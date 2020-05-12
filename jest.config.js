process.env.TEST_ENV = 'jest'

module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: false,
    __PRODUCTION__: true,
    __TEST__: true,

    __NODE_ENV__: process.env.NODE_ENV,

    __DEBUG_PORT__: process.env.DEBUG_PORT || false,

    __VERSION__: require('./package.json').version,
  },
  watchPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*?)$': '<rootDir>/src/$1',
    '^server/(.*?)$': '<rootDir>/server/$1',
    '^mongodb/(.*?)$': '<rootDir>/mongodb/$1',
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>/__tests__/**/*spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
}
