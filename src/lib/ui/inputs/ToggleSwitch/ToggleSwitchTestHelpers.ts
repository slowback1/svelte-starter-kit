import { fireEvent, screen } from '@testing-library/svelte';

export default class ToggleSwitchTestHelpers {
	static assertHasLabel(testId: string, expectedLabel: string) {
		let label = screen.getByTestId(testId).querySelector('.slider__label');

		expect(label).toHaveTextContent(expectedLabel);
	}

	static assertToggleState(testId: string, isChecked: boolean) {
		let toggle = screen.getByTestId(testId).querySelector("[role='switch']");

		expect(toggle).toHaveAttribute('aria-checked', `${isChecked}`);
	}

	static toggleSwitch(testId: string) {
		let toggle = screen.getByTestId(testId).querySelector("[role='switch']");

		fireEvent.click(toggle);
	}
}
