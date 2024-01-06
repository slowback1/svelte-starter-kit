<script lang="ts">
	import { onMount } from 'svelte';
	import MessageBus from '$lib/bus/MessageBus';
	import getRealStorageProvider from '$lib/bus/realStorageProvider';
	import Header from '$lib/components/navigation/Header.svelte';
	import UrlPathProvider, { RealUrlProvider } from '$lib/providers/urlPathProvider';
	import { ColorTheme } from '$lib/services/ThemeService';
	import { Messages } from '$lib/bus/Messages';
	import ConfigService, { type ApplicationConfig } from '$lib/services/ConfigService';

	let currentTheme: ColorTheme = ColorTheme.Light;

	onMount(() => {
		MessageBus.initialize(getRealStorageProvider());
		UrlPathProvider.initialize(new RealUrlProvider());
		ConfigService.initialize();

		MessageBus.subscribe<ColorTheme>(
			Messages.CurrentTheme,
			(value) => (currentTheme = value ?? ColorTheme.Light)
		);
	});
</script>

<div
	class:light-theme={currentTheme === ColorTheme.Light}
	class:dark-theme={currentTheme === ColorTheme.Dark}
>
	<Header />
	<main id="content" class="main-content">
		<slot />
	</main>
</div>

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
