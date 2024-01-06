<script lang="ts">
	import { afterUpdate } from 'svelte';

	let modalRef: HTMLDialogElement;
	export let isOpen: boolean = false;
	export let onClose: () => void = () => {};

	//jest-dom doesn't support the showModal and close methods, so we need to check that they exist first before using them
	function openDialog() {
		modalRef.showModal ? modalRef.showModal() : (modalRef.open = true);
	}

	function closeDialog() {
		modalRef.close ? modalRef.close() : (modalRef.open = false);
		onClose();
	}

	afterUpdate(() => {
		if (isOpen && !modalRef.open) openDialog();
		else if (!isOpen && modalRef.open) closeDialog();
	});
</script>

<dialog bind:this={modalRef} on:close={onClose}>
	<button on:click={closeDialog} data-testid="dialog__close-button">X</button>
	<slot>Dialog Content Goes Here</slot>
</dialog>
