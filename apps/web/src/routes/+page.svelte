<script lang="ts">
	import Canvas from '$lib/components/canvas.svelte';
	import Cursors from '$lib/components/cursors.svelte';
	import Modules from '$lib/components/plugins.svelte';
	import { io } from '$lib/io';
	import { setupRootDocument } from '$lib/stores/automerge';
	import { onMount } from 'svelte';
	import { Text } from '@automerge/automerge';

	const [doc, sendSyncMessage] = setupRootDocument();

	onMount(() => {
		io.on('connect', () => {
			sendSyncMessage($doc);
		});
	});

	const addBlock = () => {
		doc.update((doc) => {
			doc.name = new Text('lucas');
		});
	};

	$: {
		console.log($doc.name);
	}
</script>

<Canvas>
	<Cursors />

	<Modules />

	<button on:click={addBlock}>add block</button>
</Canvas>

<style>
	button {
		pointer-events: auto;
	}
</style>
