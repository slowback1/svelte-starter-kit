import DSL from './dsl';

export default class HomeDsl extends DSL {
	constructor() {
		super();
	}

	protected visit(): void {
		cy.visit('/');
	}

	assertOnHomePage() {
		cy.get('#content').should('be.visible');
	}

	assertColorTheme(theme: 'light' | 'dark') {
		cy.get(`.${theme}-theme`).should('be.visible');
	}

	switchColorThemes() {
		cy.get('[data-testid="theme-toggle"]').get("[role='switch']").click();
	}
}
