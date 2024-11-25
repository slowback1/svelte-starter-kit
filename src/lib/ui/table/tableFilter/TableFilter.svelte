<script lang="ts">
	import type {
		TableFilterFieldProps,
		TableFilterProps
	} from '$lib/ui/table/tableFilter/tableFilterTypes';
	import TableFilterService from '$lib/ui/table/tableFilter/tableFilterService.svelte';
	import FilterField from '$lib/ui/table/tableFilter/filterFields/FilterField.svelte';
	import Button from '$lib/ui/buttons/Button/Button.svelte';

	const filterProps: TableFilterProps = $props();

	const service = new TableFilterService(filterProps);

	const fields: TableFilterFieldProps[] = $derived.by(() => service.getInputProps());
</script>

<div class="table-filter">
	{#each fields as field}
		<FilterField {...field} />
	{/each}

	<Button size="small" variant="text" onClick={() => service.resetFields()}>Reset Filters</Button>
</div>
