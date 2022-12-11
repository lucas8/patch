<script lang="ts">
	import Plugin from '$lib/components/plugin.svelte';
	import { io } from '$lib/io';
	import { document, sendSyncMessage, recieveSyncMessage } from '$lib/stores/document';
	import { onMount } from 'svelte';

	const doc = document();

	onMount(() => {
		io.on('connect', () => {
			sendSyncMessage($doc);
		});

		io.on('UPDATE_SYNC_STATE', (data: { syncMessage: string }) => {
			recieveSyncMessage(data.syncMessage);
		});
	});

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

{#if $doc && $doc.nodes && $doc.nodes.length > 0}
	{#each $doc.nodes as plugin, idx}
		<Plugin {plugin} {idx} />
	{/each}
{/if}

<style>
	button {
		pointer-events: auto;
	}
</style>
