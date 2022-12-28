<script lang="ts">
	import type { TDocNode } from '@patch/lib';

	export let parent: TDocNode;
	export let node: TDocNode;
</script>

<div style="transform: translate({node.x}px, {node.y}px)">
	<pre>Type: {node.type}</pre>
</div>

<style>
	div {
		position: absolute;
		width: 50px;
		height: 50px;
		background-color: red;
	}
</style>
