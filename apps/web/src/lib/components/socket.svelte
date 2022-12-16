<script lang="ts">
	import { connectors } from '$lib/stores/connectors';
	import type { TDocNode } from '@patch/lib';
	import Draggable from './draggable.svelte';

	export let parent: TDocNode;
	export let node: TDocNode;

	let isDragging = false;
	let p2x = 0;
	let p2y = 0;

	$: p1x = parent.x + node.x + 25;
	$: p1y = parent.y + node.y + 50;

	const onUpdatePosition = (e: CustomEvent<MouseEvent>) => {
		if (isDragging) {
			p2x = e.detail.clientX - p1x;
			p2y = e.detail.clientY - p1y;
			if (node && node.id) {
				connectors.update((curr) => {
					curr[node.id] = { p1x, p1y, p2x, p2y };
					return curr;
				});
			}
		}
	};

	const handleMouseUp = () => {
		isDragging = false;

		if (node && node.id) {
			connectors.update((curr) => {
				delete curr[node.id];
				return curr;
			});
		}
	};
</script>

<Draggable bind:isDragging on:updatePosition={onUpdatePosition} {handleMouseUp} let:handleMouseDown>
	<div on:mousedown={handleMouseDown} style="transform: translate({node.x}px, {node.y}px)">
		<pre>Type: {node.type}</pre>
	</div>
</Draggable>

<style>
	div {
		position: absolute;
		width: 50px;
		height: 50px;
		background-color: red;
	}
</style>
