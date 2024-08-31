/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {

    testTimeout: 10000,
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
  
    "reporters": [
      "default",
      ["./node_modules/jest-html-reporters", {
        "pageTitle": "TESTES AUTOMATIZADOS - API TIMES",
        "publicPath": "./logs/",
        "filename": `log.html`,
        "includeFailureMsg": true,
        "includeSuiteFailure": true,
        "inlineSource": true,
        "darkTheme": true,
        "hideIcon": true
      }]
    ]
  
  }
  
  module.exports = config