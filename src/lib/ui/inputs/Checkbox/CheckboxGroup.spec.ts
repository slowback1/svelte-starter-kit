import { render, type RenderResult } from '@testing-library/svelte';
import CheckboxGroup from '$lib/ui/inputs/Checkbox/CheckboxGroup.svelte';
import type { ComponentProps } from 'svelte';
import { beforeEach } from 'vitest';

describe('CheckboxGroup', () => {
	let result: RenderResult<CheckboxGroup>;

	function renderComponent(overrides: Partial<ComponentProps<CheckboxGroup>> = {}) {
		let props = {
			groupLabel: 'test',
			...overrides
		};

		if (result) result.unmount();

		result = render(CheckboxGroup, { props });
	}

	beforeEach(() => {
		renderComponent();
	});

	it('renders a fieldset to group the checkboxes in', () => {
		let fieldSet = result.container.querySelector('fieldset');

		expect(fieldSet).toBeInTheDocument();
	});

	it('renders a legend with the given label as text', () => {
		renderComponent({ groupLabel: 'Example Text' });

		let legend = result.container.querySelector('legend');

		expect(legend).toBeInTheDocument();
		expect(legend).toHaveTextContent('Example Text');
	});

	it("renders a custom class for horizontal alignment when given a 'row' alignment prop", () => {
		renderComponent({ align: 'row' });

		let wrapper = result.getByTestId('checkbox-group__checkboxes');

		expect(wrapper).toHaveClass('checkbox-group__checkboxes-row');
	});

	it("does not have the 'row' class by default", () => {
		let wrapper = result.getByTestId('checkbox-group__checkboxes');

		expect(wrapper).not.toHaveClass('checkbox-group__checkboxes-row');
	});
});
