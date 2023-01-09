<script lang="ts">
	import Edges from '$lib/components/edges.svelte';
	import Group from '$lib/components/group.svelte';
	import { doc } from '$lib/stores/doc';
	import { uuid } from '@automerge/automerge';
	import { onMount } from 'svelte';
	import type { PageData } from '../../[slug]/$types';

	export let data: PageData;

	onMount(() => {
		doc.load(data.slug);
	});

	const changeName = () => {
		doc.update((doc) => {
			doc.name = 'lucas';
		});
	};

	const addBlock = () => {
		doc.update((doc) => {
			doc.nodes.push({
				id: uuid(),
				type: 'group',
				x: 0,
				y: 0,
				nodes: [
					{ id: uuid(), type: 'socket', x: 50, y: 10 },
					{ id: uuid(), type: 'knob', value: 0.5, x: 10, y: 80 }
				]
			});
		});
	};
</script>

<header>
	<h1>Name: {$doc?.name}</h1>
	<button on:click={changeName}>change name</button>
	<button on:click={addBlock}>add block</button>
</header>

<main>
	<div>
		{#if $doc && $doc.nodes && $doc.nodes.length > 0}
			{#each $doc.nodes as node, idx}
				<Group {node} {idx} />
			{/each}
		{/if}
	</div>

	<Edges />
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

	header {
		position: relative;
		z-index: 10;
	}

	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
