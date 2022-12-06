<script lang="ts">
	import { plugins } from '$lib/stores/plugins';
	import Plugin from './plugin.svelte';
</script>

<div>
	{#each $plugins as plugin}
		<Plugin bind:plugin />
	{/each}
</div>

<style>
	div {
		pointer-events: none;
	}
</style>
