import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    "^.+\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@app(.*)$": "<rootDir>/src$1" 
  },
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
}

export default config;
