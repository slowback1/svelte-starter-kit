import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import HomeDsl from '../dsl/homeDsl';

let dsl: HomeDsl;

Given('I visit the app for the first time', () => {
	dsl = new HomeDsl();
	dsl.assertOnHomePage();
});
Then('I should see the default color theme', () => {
	dsl.assertColorTheme('light');
});

When('I switch the color theme', () => {
	dsl.switchColorThemes();
});

When('I switch the color theme twice', () => {
	dsl.switchColorThemes();
	dsl.switchColorThemes();
});

Then('I should see the other color theme', () => {
	dsl.assertColorTheme('dark');
});
