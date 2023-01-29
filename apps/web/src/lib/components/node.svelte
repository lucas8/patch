<script lang="ts">
	import { NodeType, type Node, type Plugin } from '@patch/lib';
	import Knob from './primitives/knob.svelte';
	import Egress from './primitives/egress.svelte';
	import Ingress from './primitives/ingress.svelte';

	export let node: Node;
	export let plugin: Plugin;
</script>

{#if node.type === NodeType.KNOB}
	<Knob {plugin} {node} />
{:else if node.type === NodeType.EGRESS}
	<Egress {plugin} {node} />
{:else if node.type === NodeType.INGRESS}
	<Ingress {plugin} {node} />
{/if}
