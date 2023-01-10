<script lang="ts">
	import Plugin from '$lib/components/plugin.svelte';
	import { doc } from '$lib/stores/doc';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		doc.load(data.slug as any);
	});
</script>

<main>
	{#if $doc && $doc.plugins && $doc.plugins.length > 0}
		<div>
			{#each $doc.plugins as plugin, idx}
				<h2>{plugin.name}</h2>
				<Plugin {plugin} />
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		position: relative;
		transform-origin: top left;
		top: 0;
		left: 0;
		padding: 0 1rem;
	}

	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
