import type { RenderResult } from '@testing-library/svelte';
import ToggleSwitch from '$lib/ui/inputs/ToggleSwitch/ToggleSwitch.svelte';
import { act, fireEvent, render, waitFor } from '@testing-library/svelte';
import { beforeEach } from 'vitest';

describe('ToggleSwitch', () => {
	let result: RenderResult<ToggleSwitch>;

	function renderComponent(overrides: any = {}) {
		if (result) result.unmount();

		let props = { id: 'id', ...overrides };

		result = render(ToggleSwitch, { props });
	}

	beforeEach(() => {
		renderComponent();
	});

	it('renders a thing that is detected as a switch', () => {
		let checkbox = result.getByRole('switch');

		expect(checkbox).toBeInTheDocument();
	});

	it('the switch is checked off by default', () => {
		let toggle = result.getByRole('switch');

		expect(toggle).toHaveAttribute('aria-checked', 'false');
	});

	it('when the switch is clicked it is checked on', async () => {
		let toggle = result.getByRole('switch');

		await act(() => {
			fireEvent.click(toggle);
		});

		await waitFor(() => {
			let toggle = result.getByRole('switch');

			expect(toggle).toHaveAttribute('aria-checked', 'true');
		});
	});

	it('component has a label that is correctly hooked up via aria-labelledby with the  given id', () => {
		renderComponent({ id: 'test', label: 'hello' });

		let toggle = result.getByRole('switch');

		expect(toggle).toHaveAttribute('aria-labelledby', 'test');

		let label = result.container.querySelector('#test');

		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent('hello');
	});

	it('by default the wrapper has a test id of the given id', () => {
		renderComponent({ id: 'test' });

		let wrapper = result.getByTestId('test');

		expect(wrapper).toBeInTheDocument();
	});

	it('can override the test id with a custom one', () => {
		renderComponent({ testId: 'something-else' });

		let wrapper = result.getByTestId('something-else');

		expect(wrapper).toBeInTheDocument();
	});

	it('can override whether or not toggle is checked by default', () => {
		renderComponent({ checked: true });

		let toggle = result.getByRole('switch');

		expect(toggle).toHaveAttribute('aria-checked', 'true');
	});

	it('calls back onClick when the toggle is clicked', () => {
		let onClick = vi.fn();

		renderComponent({ onClick });

		let toggle = result.getByRole('switch');

		fireEvent.click(toggle);

		expect(onClick).toHaveBeenCalledWith(true);
	});

	it('clicking twice will correctly call onClick the second time with the toggled value', () => {
		let onClick = vi.fn();

		renderComponent({ onClick });

		let toggle = result.getByRole('switch');

		fireEvent.click(toggle);
		fireEvent.click(toggle);

		expect(onClick).toHaveBeenCalledTimes(2);
	});
});
