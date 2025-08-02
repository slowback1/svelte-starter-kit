export default abstract class DSL {
	constructor() {
		this.visit();

		// potential grossness ahead -- sveltekit is in the "handoff to client" phase when the page is initially loaded
		// so we need to add a wait before elements are consistently interactable
		const halfASecond = 500;
		cy.wait(halfASecond);
	}

	protected abstract visit(): void;
}
