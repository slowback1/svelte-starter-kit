import { fireEvent, screen, waitFor } from '@testing-library/svelte';

export default class ComboBoxTestHelpers {
	static assertThatComboBoxHasLabel(testId: string, expectedLabel: string) {
		let label = screen.getByTestId(`${testId}__label`);

		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent(expectedLabel);
	}

	static assertThatComboBoxHasValue(testId: string, expectedValue: string) {
		let input = screen.getByTestId(`${testId}__input`);

		expect(input).toBeInTheDocument();
		expect(input).toHaveValue(expectedValue);
	}

	static async selectComboBoxOption(testId: string, labelToSelect: string) {
		let input = screen.getByTestId(`${testId}__input`);

		fireEvent.input(input, { target: { value: labelToSelect } });

		await waitFor(() => {
			let options = screen.getByTestId(`${testId}__options`);

			expect(options).toBeInTheDocument();
		});

		let firstOption = screen.getAllByTestId(`${testId}__options`)[0];

		fireEvent.click(firstOption);
	}
}
