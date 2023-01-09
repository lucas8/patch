<script lang="ts">
	import type { TDocNode } from '@patch/lib';
	import Socket from '$lib/components/primitives/socket.svelte';
	import Draggable from './draggable.svelte';
	import { doc } from '$lib/stores/doc';
	import Knob from './primitives/knob.svelte';

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

	const onUpdateValue = (childId: number, newValue: number) => {
		if (!idx || !childId) return;

		doc.update((newDoc) => {
			newDoc.nodes[idx].nodes![childId].value = newValue;
		});
	};
</script>

<Draggable bind:isDragging let:handleMouseDown on:updatePosition={onUpdatePosition}>
	<article style="transform: translate({node.x}px, {node.y}px)" on:mousedown={handleMouseDown}>
		<pre>Type: {node.type}</pre>
		{#if node.nodes && node.nodes.length > 0}
			{#each node.nodes as child, childId}
				{#if child.type === 'socket'}
					<Socket parent={node} node={child} />
				{:else if child.type === 'knob'}
					<pre>{child.value}</pre>
					<Knob
						radius={40}
						value={child.value}
						minValue={0}
						maxValue={1}
						onChange={(newValue) => onUpdateValue(childId, newValue)}
					/>
				{/if}
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
