<script lang="ts">
	import type { TableRenderContext } from '$lib/ui/table/table/tableTypes';
	import type { TestTableData } from '$lib/ui/table/table/testing/testTableDefinitions';

	const { columnDefinition, row, rowIndex }: TableRenderContext<TestTableData> = $props();
</script>

<span data-testid={`super-duper-secret-thing-${rowIndex}`}>
	{row.name.split('').reverse().join('')}
</span>
