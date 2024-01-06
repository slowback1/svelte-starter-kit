import Accordion from './Accordion.Test.svelte';
import { act, fireEvent, render, type RenderResult, waitFor } from '@testing-library/svelte';
import { beforeEach } from 'vitest';
import MessageBus from '$lib/bus/MessageBus';
import getLocalStorageMock from '$lib/testHelpers/localStorageMock';

describe('Accordion', () => {
	let result: RenderResult<Accordion>;

	function renderComponent(overrides: any = {}) {
		if (result) result.unmount();

		let props = {
			...overrides
		};

		result = render(Accordion, { props });
	}

	beforeEach(() => {
		MessageBus.initialize(getLocalStorageMock());

		renderComponent();
	});

	it.each([
		[0, 'label 1'],
		[1, 'label 2'],
		[2, 'label 3']
	])('renders the label of each item for index %s', (index, label) => {
		let items = result.getAllByTestId('accordion-item');

		let item = items[index];

		expect(item).toBeTruthy();

		let labelElement = item.querySelector("[data-testid='accordion-item__label']");

		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveTextContent(label);
	});

	it('the accordion content is not visible when the accordion is closed', () => {
		let firstItem = result.getAllByTestId('accordion-item')[0];

		expect(firstItem).toBeInTheDocument();

		let content = firstItem.querySelector("[data-testid='accordion-item__content']");

		expect(content).not.toHaveClass('accordion-item__content-open');
	});

	function assertThatContentIsClosed(index = 0) {
		let firstItem = result.getAllByTestId('accordion-item')[index];

		expect(firstItem).toBeInTheDocument();

		let content = firstItem.querySelector("[data-testid='accordion-item__content']");
		let label = firstItem.querySelector("[data-testid='accordion-item__label']");

		expect(content).not.toHaveClass('accordion-item__content-open');
		expect(label).toHaveAttribute('aria-expanded', 'false');
	}

	function clickLabel(index = 0) {
		let item = result.getAllByTestId('accordion-item')[index];

		expect(item).toBeTruthy();

		let labelElement = item.querySelector("[data-testid='accordion-item__label']");

		act(() => {
			fireEvent.click(labelElement);
		});
	}

	async function clickLabelAndWaitForContentToOpen(index = 0) {
		clickLabel(index);

		await waitFor(() => {
			let item = result.getAllByTestId('accordion-item')[index];
			let content = item.querySelector("[data-testid='accordion-item__content']");
			let label = item.querySelector("[data-testid='accordion-item__label']");

			expect(content).toHaveClass('accordion-item__content-open');
			expect(label).toHaveAttribute('aria-expanded', 'true');
		});
	}

	it('clicking the label will open the content', async () => {
		await clickLabelAndWaitForContentToOpen();

		await waitFor(() => {
			let item = result.getAllByTestId('accordion-item')[0];
			let content = item.querySelector("[data-testid='accordion-item__content']");

			expect(content).toHaveClass('accordion-item__content-open');
		});
	});

	it('clicking the label twice will close the content', async () => {
		await clickLabelAndWaitForContentToOpen(0);

		clickLabel(0);

		await waitFor(() => {
			assertThatContentIsClosed(0);
		});
	});

	it('clicking the first label first, then the second label second closes the content of the first label', async () => {
		await clickLabelAndWaitForContentToOpen(0);

		clickLabel(1);

		await waitFor(() => {
			assertThatContentIsClosed(0);
		});
	});

	it('the content has an aria-controls attribute and the toggle has an id attribute that match each other', () => {
		let item = result.getAllByTestId('accordion-item')[0];

		let label = item.querySelector("[data-testid='accordion-item__label']");

		expect(label).toHaveAttribute('aria-controls', 'label-1');

		let content = item.querySelector("[data-testid='accordion-item__content']");

		expect(content).toHaveAttribute('id', 'label-1');
	});

	it("the content has an aria-role of 'region'", () => {
		let item = result.getAllByTestId('accordion-item')[0];
		let content = item.querySelector("[data-testid='accordion-item__content']");

		expect(content).toHaveAttribute('role', 'region');
	});

	it('the content has the correct labelled-by id', () => {
		let item = result.getAllByTestId('accordion-item')[0];

		let label = item.querySelector("[data-testid='accordion-item__label']");
		let content = item.querySelector("[data-testid='accordion-item__content']");

		expect(label).toHaveAttribute('id', 'label-1-control');
		expect(content).toHaveAttribute('aria-labelledby', 'label-1-control');
	});
});
