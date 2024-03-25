import { fireEvent, screen } from '@testing-library/svelte';

export default class TextBoxTestHelpers {
	static assertHasLabel(testId: string, expectedLabel: string) {
		let label = screen.getByTestId(`${testId}-label`);

		expect(label).toHaveTextContent(expectedLabel);
	}

	static assertHasValue(testId: string, expectedValue: string) {
		let input = screen.getByTestId(`${testId}`);

		expect(input).toHaveValue(expectedValue);
	}

	static enterTextIntoTextbox(testId: string, value: string) {
		let input = screen.getByTestId(testId);

		fireEvent.input(input, { target: { value } });
	}
}
