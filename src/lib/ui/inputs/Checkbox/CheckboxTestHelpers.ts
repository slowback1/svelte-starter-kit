import { fireEvent, screen } from '@testing-library/svelte';

export default class CheckboxTestHelpers {
	static assertHasLabel(testId: string, expectedLabel: string) {
		let label = screen.getByTestId(`${testId}-label`);

		expect(label).toHaveTextContent(expectedLabel);
	}

	static assertCheckboxIsChecked(testId: string) {
		let input = screen.getByTestId(`${testId}`);

		expect(input).toBeChecked();
	}

	static assertCheckboxISNotChecked(testId: string) {
		let input = screen.getByTestId(testId);

		expect(input).not.toBeChecked();
	}

	static checkCheckbox(testId: string) {
		let input = screen.getByTestId(testId);

		fireEvent.click(input);
	}
}
