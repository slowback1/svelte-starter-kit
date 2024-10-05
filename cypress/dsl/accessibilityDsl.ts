import DSL from './dsl';

export default class AccessibilityDsl extends DSL {
	protected visit(): void {
		cy.visit('/');
	}
	public checkA11y(): void {
		cy.injectAxe();
		cy.checkA11y();
	}
	public visitPage(pageName: string): void {
		let url = this.getPageUrl(pageName);
		cy.visit(url);
	}

	private getPageUrl(pageName: string): string {
		return this.pageUrls[pageName];
	}

	private readonly pageUrls: Record<string, string> = {
		Home: '/',
		'Demo List': '/demo/list',
		'Demo Form': '/demo/form',
		'Demo Content': '/demo/content'
	};
}
