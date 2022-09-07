// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

module.exports = (on, config) => {
	on('before:browser:launch', (browser = {}, args) => {
		// browser will look something like this
		// {
		//   name: 'chrome',
		//   displayName: 'Chrome',
		//   version: '63.0.3239.108',
		//   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		//   majorVersion: '63'
		// }

		if (browser.name === 'chrome') {
			args.push('--disable-site-isolation-trials');

			return args
		}

		if (browser.name === 'electron') {
			args['fullscreen'] = true

			// whatever you return here becomes the new args
			return args
		}
	})
}

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
  // failing the test
	return false
	})