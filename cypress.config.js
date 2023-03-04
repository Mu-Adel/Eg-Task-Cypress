import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import * as fs from 'fs'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Bundle Cypress specs using esbuild
      on('file:preprocessor', createBundler())

      on('task', {
        readTxtFile(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8')
          }
        },
      })
      return config
    },
    baseUrl: `http://localhost:3000`,
  },
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
})
