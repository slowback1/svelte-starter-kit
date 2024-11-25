<script lang="ts">
	import {
		type TableFilterFieldProps,
		TableFilterFieldType
	} from '$lib/ui/table/tableFilter/tableFilterTypes';
	import TextBox from '$lib/ui/inputs/TextBox/TextBox.svelte';
	import TextFilter from '$lib/ui/table/tableFilter/filterFields/TextFilter.svelte';

	let props: TableFilterFieldProps = $props();
</script>

{#if props.field.type === TableFilterFieldType.Text}
	<TextFilter {...props} />
{/if}
