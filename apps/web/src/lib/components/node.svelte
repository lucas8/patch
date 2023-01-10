<script lang="ts">
	import { NodeType, type Node, type Plugin } from '@patch/lib';
	import Knob from './primitives/knob.svelte';

	export let node: Node;
	export let plugin: Plugin;
</script>

{#if node.type === NodeType.KNOB}
	<Knob {plugin} {node} />
{/if}
