<script lang="ts">
	import Edges from '$lib/components/edges.svelte';
	import Plugin from '$lib/components/plugin.svelte';
	import { doc } from '$lib/stores/doc';
	import { cloneTemplate } from '@patch/lib';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		doc.load(data.slug as any);
	});

	const handleCreateFilter = () => {
		doc.update((d) => {
			d.plugins.push(cloneTemplate('filter')!);
		});
	};
</script>

<nav>
	<button on:click={handleCreateFilter}>create filter</button>
</nav>

<main>
	{#if $doc && $doc.plugins && $doc.plugins.length > 0}
		<div>
			{#each $doc.plugins as plugin}
				<Plugin {plugin} />
			{/each}
		</div>
	{/if}
</main>

<Edges />

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
