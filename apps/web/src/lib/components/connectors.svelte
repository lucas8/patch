<script lang="ts">
	import Connector from '$lib/components/connector.svelte';
	import { connectors } from '$lib/stores/connectors';
</script>

<svg>
	{#each Object.values($connectors) as connector}
		<Connector {...connector} />
	{/each}
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
