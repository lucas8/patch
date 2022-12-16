<script lang="ts">
	import { doc } from '$lib/stores/doc';
	import type { TDocNode } from '@patch/lib';
	import Socket from '$lib/components/socket.svelte';
	import Draggable from './draggable.svelte';

	export let idx: number;
	export let node: TDocNode;

	let isDragging = false;

	const onUpdatePosition = (e: CustomEvent<MouseEvent>) => {
		if (isDragging) {
			doc.update((newDoc) => {
				newDoc.nodes[idx].x = Math.max(node.x + e.detail.movementX, 0);
				newDoc.nodes[idx].y = Math.max(node.y + e.detail.movementY, 0);
			});
		}
	};
</script>

<Draggable bind:isDragging let:handleMouseDown on:updatePosition={onUpdatePosition}>
	<article style="transform: translate({node.x}px, {node.y}px)" on:mousedown={handleMouseDown}>
		<pre>Type: {node.type}</pre>
		{#if node.nodes && node.nodes.length > 0}
			{#each node.nodes as child}
				<Socket parent={node} node={child} />
			{/each}
		{/if}
	</article>
</Draggable>

<style>
	article {
		width: 200px;
		height: 200px;
		background-color: dodgerblue;
		position: absolute;
		user-select: none;
	}
</style>
