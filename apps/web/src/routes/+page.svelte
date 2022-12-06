<script lang="ts">
	import { plugins } from '$lib/stores/plugins';
	import Canvas from '$lib/components/canvas.svelte';
	import Cursors from '$lib/components/cursors.svelte';
	import Modules from '$lib/components/plugins.svelte';

	const addBlock = () => {
		$plugins = [{ x: 0, y: 0, width: 300, height: 200 }, ...$plugins];
	};
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
