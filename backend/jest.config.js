export default {
  testEnvironment: 'node',
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/tests/setup/setup.js'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/worker.js',
    '!src/seeders/**',
    '!src/config/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testTimeout: 120000,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './tests/results',
        filename: 'index.html',
        openReport: false,
        pageTitle: 'SpanStay Test Results',
      },
    ],
  ],
};
