<script lang="ts">
	import { onMount } from 'svelte';
	import FeatureFlagService from '$lib/services/FeatureFlag/FeatureFlagService';
	import { FeatureFlags } from '$lib/services/FeatureFlag/FeatureFlags';
	import FeatureToggle from '$lib/utils/FeatureToggle.svelte';

	let showDemo = false;

	onMount(() => {
		let unsubscribe = FeatureFlagService.subscribeToFeature(
			FeatureFlags.DEMO_FEATURE_FLAG,
			(value) => {
				showDemo = value;
			}
		);

		return () => {
			unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>Svelte Starter Kit</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<FeatureToggle featureFlag={FeatureFlags.DEMO_FEATURE_FLAG}>
	<p slot="enabled">Looks like you know about feature flags!</p>
</FeatureToggle>
