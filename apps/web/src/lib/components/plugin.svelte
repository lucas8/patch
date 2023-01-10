<script lang="ts">
	import { type Plugin, getPlugin } from '@patch/lib';
	import Draggable from './draggable.svelte';
	import { doc } from '$lib/stores/doc';
	import Node from './node.svelte';

	export let plugin: Plugin;

	let isDragging = false;

	const onUpdatePosition = (e: CustomEvent<MouseEvent>) => {
		if (isDragging) {
			doc.update((newDoc) => {
				const newPlugin = getPlugin(newDoc, plugin.id);

				if (newPlugin) {
					newPlugin.x = Math.max(plugin.x + e.detail.movementX, 0);
					newPlugin.y = Math.max(plugin.y + e.detail.movementY, 0);
				}
			});
		}
	};

	const onUpdateValue = (childId: number, newValue: number) => {
		if (!childId) return;
		console.log('onUpdateValue', childId, newValue);
		// doc.update((newDoc) => {
		// 	const newPlugin = getPlugin(newDoc, plugin.id);

		// 	if (newPlugin) {
		// 		// TODO: programmatically update the config value
		// 		// newPlugin.nodes![childId].value = newValue;
		// 	}
		// });
	};
</script>

<Draggable bind:isDragging let:handleMouseDown on:updatePosition={onUpdatePosition}>
	<article
		style="transform: translate({plugin.x}px, {plugin.y}px)"
		on:mousedown={handleMouseDown}
		style:--width={plugin.width}
		style:--height={plugin.height}
	>
		<pre>Name: {plugin.name}</pre>
		{#if plugin.nodes && plugin.nodes.length > 0}
			{#each plugin.nodes as node}
				<Node {node} {plugin} />
			{/each}
		{/if}
	</article>
</Draggable>

<style>
	article {
		width: var(--width);
		height: var(--height);
		background-color: dodgerblue;
		position: absolute;
		user-select: none;
	}
</style>
