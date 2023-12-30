import { act, fireEvent, render, type RenderResult } from '@testing-library/svelte';
import Dialog from '$lib/ui/containers/Dialog.svelte';

describe('Dialog', () => {
	let result: RenderResult<Dialog>;

	function renderComponent(overrides: any = {}) {
		let props = {
			isOpen: false,
			...overrides
		};

		if (result) result.unmount();

		result = render(Dialog, props);
	}

	beforeEach(() => {
		renderComponent();
	});

	it('renders nothing when not open', () => {
		let dialog = result.queryByRole('dialog');

		expect(dialog).not.toBeInTheDocument();
	});

	it('renders a dialog when set to open', () => {
		renderComponent({ isOpen: true });

		let dialog = result.queryByRole('dialog');

		expect(dialog).toBeInTheDocument();
	});

	it('can open the dialog via a prop change and not a remount', () => {
		result.rerender({ isOpen: true });

		let dialog = result.queryByRole('dialog');

		expect(dialog).toBeInTheDocument();
	});

	it('closing the dialog calls the onClose prop', () => {
		let onClose = vi.fn();

		renderComponent({ onClose, isOpen: true });

		let dialog = result.queryByRole('dialog');
		expect(dialog).toBeInTheDocument();

		let closeButton = result.getByTestId('dialog__close-button');
		fireEvent.click(closeButton);

		expect(onClose).toHaveBeenCalled();
	});

	it('it closing the dialog closes the dialog', () => {
		let onClose = vi.fn();

		renderComponent({ onClose, isOpen: true });

		let dialog = result.queryByRole('dialog');
		expect(dialog).toBeInTheDocument();

		let closeButton = result.getByTestId('dialog__close-button');
		act(() => {
			fireEvent.click(closeButton);
		});

		dialog = result.queryByRole('dialog');

		expect(dialog).not.toBeInTheDocument();
	});
});
