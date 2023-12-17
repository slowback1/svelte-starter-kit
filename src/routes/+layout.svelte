<script lang="ts">
	import { onMount } from 'svelte';
	import MessageBus from '$lib/bus/MessageBus';
	import getRealStorageProvider from '$lib/bus/realStorageProvider';
	import Header from '$lib/components/navigation/Header.svelte';
	import UrlPathProvider, { RealUrlProvider } from '$lib/providers/urlPathProvider';

	onMount(() => {
		MessageBus.initialize(getRealStorageProvider());
		UrlPathProvider.initialize(new RealUrlProvider());
	});
</script>

<Header />
<main id="content" class="main-content">
	<slot />
</main>

<style global>
	@import '../style/reset.css';
	@import '../style/globals.css';

	.main-content {
		min-height: calc(100vh - var(--gutters-y) * 2 - var(--header-height));
		padding: var(--gutters-y) var(--gutters-x);
		scroll-behavior: auto;
		display: flex;
		flex-direction: column;
	}
</style>
