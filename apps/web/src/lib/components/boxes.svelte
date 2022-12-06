<script lang="ts">
	import Box from '$lib/components/box.svelte';
	import type { TBox } from '$lib/types';

	export let boxes: TBox[];
</script>

<div>
	{#each boxes as box}
		<Box bind:box />
	{/each}
</div>

<style>
	div {
		pointer-events: none;
	}
</style>
