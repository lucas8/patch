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
</script>

<Draggable bind:isDragging let:handleMouseDown on:updatePosition={onUpdatePosition}>
	<article style="transform: translate({plugin.x}px, {plugin.y}px)" on:mousedown={handleMouseDown}>
		<pre>{plugin.name}</pre>
		<div style:--width="{plugin.width}px" style:--height="{plugin.height}px">
			{#if plugin.nodes && plugin.nodes.length > 0}
				{#each plugin.nodes as node}
					<Node {node} {plugin} />
				{/each}
			{/if}
		</div>
	</article>
</Draggable>

<style>
	article {
		position: absolute;
		user-select: none;
	}
	div {
		background-color: dodgerblue;
		width: var(--width);
		height: var(--height);
	}
</style>
