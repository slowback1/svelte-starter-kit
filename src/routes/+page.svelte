<script lang="ts">
	import { onMount } from 'svelte';
	import FeatureFlagService from '$lib/services/FeatureFlag/FeatureFlagService';
	import { FeatureFlags } from '$lib/services/FeatureFlag/FeatureFlags';

	let showDemo = false;

	onMount(() => {
		let unsubscribe = FeatureFlagService.subscribeToFeature(
			FeatureFlags.DEMO_FEATURE_FLAG,
			(value) => {
				showDemo = value;
			}
		);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if showDemo}
	<p>Looks like you know about feature flags!</p>
{/if}
