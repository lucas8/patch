<script lang="ts">
	import { doc } from '$lib/stores/doc';
	import { currentEdge } from '$lib/stores/edges';
	import { uuid } from '@automerge/automerge';
	import type { Node, Plugin } from '@patch/lib';
	import Draggable from '../draggable.svelte';

	export let plugin: Plugin;
	export let node: Node;

	let prevNode: any = undefined;

	let isDragging = false;
	let p2x = 0;
	let p2y = 0;

	$: p1x = plugin.x + node.x + 25;
	$: p1y = plugin.y + node.y + 150;

	const onUpdatePosition = (e: CustomEvent<MouseEvent>) => {
		if (isDragging) {
			p2x = e.detail.clientX - p1x;
			p2y = e.detail.clientY - p1y;

			if (node && node.id) {
				currentEdge.set({ p1x, p1y, p2x, p2y, nodeId: node.id, pluginId: plugin.id });
			}
		}
	};

	const windowHandleMouseUp = () => {
		isDragging = false;

		if (node && node.id) {
			currentEdge.set(null);
		}
	};

	const localHandleMouseUp = async (e: MouseEvent) => {
		// make sure the current component isn't recieveing the drag event
		if (!isDragging && $currentEdge !== null) {
			// we need to capture the current edge bc the update function will happen
			// after the currentEdge is set to null
			prevNode = $currentEdge;

			doc.update((d) => {
				d.edges.push({
					id: uuid(),
					fromPluginId: prevNode.pluginId,
					fromNodeId: prevNode.nodeId,
					toPluginId: plugin.id,
					toNodeId: node.id
				});
			});
		}
	};
</script>

<Draggable
	on:updatePosition={onUpdatePosition}
	handleMouseUp={windowHandleMouseUp}
	bind:isDragging
	let:handleMouseDown
>
	<div
		on:mouseup={localHandleMouseUp}
		on:mousedown={handleMouseDown}
		style="transform: translate({node.x}px, {node.y}px)"
	>
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
