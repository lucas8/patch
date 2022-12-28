<script lang="ts">
	import Edges from '$lib/components/edges.svelte';
	import Group from '$lib/components/group.svelte';
	import { doc } from '$lib/stores/doc';
	import { uuid } from '@automerge/automerge';

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
				nodes: [{ id: uuid(), type: 'socket', x: 50, y: 10 }]
			});
		});
	};
</script>

<header>
	<h1>Name: {$doc.name}</h1>
	<button on:click={changeName}>change name</button>
	<button on:click={addBlock}>add block</button>
</header>

<div>
	{#if $doc && $doc.nodes && $doc.nodes.length > 0}
		{#each $doc.nodes as node, idx}
			<Group {node} {idx} />
		{/each}
	{/if}
</div>

<Edges />

<style>
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
