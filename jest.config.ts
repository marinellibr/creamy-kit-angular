import type { Config } from 'jest';

const config: Config = {
  projects: ['<rootDir>/projects/creamy-kit'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};

export default config;
