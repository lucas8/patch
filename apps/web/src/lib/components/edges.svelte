<script lang="ts">
	import Edge from '$lib/components/edge.svelte';
	import { edges } from '$lib/stores/connectors';
</script>

<svg>
	{#if $edges && $edges.length > 0}
		{#each $edges as data}
			<Edge edge={data} />
		{/each}
	{/if}
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
