<script lang="ts">
	import Connector from '$lib/components/connector.svelte';
	import { currentEdge, edges } from '$lib/stores/edges';
</script>

<svg>
	{#if $currentEdge}
		<Connector
			p1x={$currentEdge.p1x}
			p1y={$currentEdge.p1y}
			p2x={$currentEdge.p2x}
			p2y={$currentEdge.p2y}
		/>
	{/if}

	{#if $edges && $edges.length > 0}
		{#each $edges as { fromNode: { x: p1x, y: p1y }, toNode: { x: p2x, y: p2y } }}
			<Connector {p1x} {p1y} {p2x} {p2y} />
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
