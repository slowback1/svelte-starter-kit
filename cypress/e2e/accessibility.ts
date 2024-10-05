import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import AccessibilityDsl from '../dsl/accessibilityDsl';

let pageObject: AccessibilityDsl;

Given("I am a user checking the site's accessibility", () => {
	pageObject = new AccessibilityDsl();
});

When('I visit the {string} page', (page: string) => {
	pageObject.visitPage(page);
});

Then('the site should be accessible', () => {
	pageObject.checkA11y();
});
