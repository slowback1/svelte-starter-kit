import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
	fixturesFolder: 'src/cypress/fixtures',
	supportFolder: 'src/cypress/support',
	e2e: {
		setupNodeEvents: async (on, config) => {
			await addCucumberPreprocessorPlugin(on, config);

			on(
				'file:preprocessor',
				createBundler({
					plugins: [createEsbuildPlugin(config) as any]
				})
			);

			return config;
		},
		specPattern: 'cypress/**/*.feature',
		supportFolder: 'cypress/support',
		supportFile: 'cypress/support/e2e.ts',
		baseUrl: 'http://localhost:5173'
	}
});
