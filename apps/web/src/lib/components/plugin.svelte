<script lang="ts">
	import { doc } from '$lib/stores/doc';
	import type { TFrontendDocNode } from '@patch/lib';

	export let idx: number;
	export let plugin: TFrontendDocNode;

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
	style="transform: translate({plugin.x}px, {plugin.y}px); width: {width}px; height: {height}px"
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
