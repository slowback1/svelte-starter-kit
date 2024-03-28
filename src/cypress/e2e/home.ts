import HomeDsl from '../dsl/homeDsl';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

let dsl: HomeDsl;

Given('I am a user of this web app', () => {
	dsl = new HomeDsl();
});

When('I visit the web app', () => {});

Then('I should see the web app', () => {
	dsl.assertOnHomePage();
});
