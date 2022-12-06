<script lang="ts">
	import type { TPlugin } from '$lib/types';
	import { width as windowWidth, height as windowHeight } from '$lib/stores/canvas';

	export let plugin: TPlugin;

	let isDragging = false;

	const handleMouseup = () => {
		isDragging = false;
	};

	const handleMousedown = () => {
		isDragging = true;
	};

	const handleMousemove = (e: MouseEvent) => {
		if (isDragging) {
			plugin.x = Math.max(Math.min(plugin.x + e.movementX, $windowWidth - width), 0);
			plugin.y = Math.max(Math.min(plugin.y + e.movementY, $windowHeight - height), 0);
		}
	};

	$: ({ x, y, width, height } = plugin);
</script>

<svelte:window on:mouseup={handleMouseup} on:mousemove={handleMousemove} />

<article
	style="left: {x}px; top: {y}px; width: {width}px; height: {height}px"
	on:mousedown={handleMousedown}
>
	i am a card!
</article>

<style>
	article {
		background-color: dodgerblue;
		position: absolute;
		pointer-events: auto;
		cursor: pointer;
	}
</style>
