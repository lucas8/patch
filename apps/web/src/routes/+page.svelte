<script lang="ts">
	import Plugin from '$lib/components/plugin.svelte';
	import { doc } from '$lib/stores/doc';

	const changeName = () => {
		doc.update((doc) => {
			doc.name = 'lucas';
		});
	};

	const addBlock = () => {
		doc.update((doc) => {
			doc.nodes.push({ type: 'plugin', x: 0, y: 0 });
		});
	};
</script>

<h1>Name: {$doc.name}</h1>
<button on:click={changeName}>change name</button>
<button on:click={addBlock}>add block</button>

<div>
	{#if $doc && $doc.nodes && $doc.nodes.length > 0}
		{#each $doc.nodes as plugin, idx}
			<Plugin {plugin} {idx} />
		{/each}
	{/if}
</div>

<style>
	button {
		pointer-events: auto;
	}
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
