<script>
	import SkipToContentLink from '$lib/components/navigation/SkipToContentLink.svelte';
	import HeaderLink from '$lib/components/navigation/HeaderLink.svelte';
</script>

<nav data-testid="header">
	<SkipToContentLink />

	<HeaderLink href="/" label="Home" />
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin: 0;
		padding-inline: var(--gutters-x);
		background-color: var(--color-primary-background);
		color: var(--color-primary-font);
		height: var(--header-height);
	}
</style>
