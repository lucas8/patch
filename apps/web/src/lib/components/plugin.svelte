<script lang="ts">
	import { document } from '$lib/stores/document';
	import type { TPlugin } from '$lib/types';

	const [doc] = document();

	export let idx: number;
	export let plugin: TPlugin;

	const width = 200;
	const height = 200;

	let isDragging = false;

	const handleMouseup = () => {
		isDragging = false;
	};

	const handleMousedown = () => {
		isDragging = true;
	};

	const handleMousemove = (e: MouseEvent) => {
		if (isDragging) {
			doc.update((newDoc) => {
				newDoc.nodes[idx].x = Math.max(plugin.x + e.movementX, 0);
				newDoc.nodes[idx].y = Math.max(plugin.y + e.movementY, 0);
			});
		}
	};
</script>

<svelte:window on:mouseup={handleMouseup} on:mousemove={handleMousemove} />

<article
	style="left: {plugin.x}px; top: {plugin.y}px; width: {width}px; height: {height}px"
	on:mousedown={handleMousedown}
>
	<pre>Type: {plugin.type}</pre>
</article>

<style>
	article {
		background-color: dodgerblue;
		position: absolute;
		pointer-events: auto;
		cursor: pointer;
	}
</style>
