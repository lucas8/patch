<script lang="ts">
	import { width as windowWidth, height as windowHeight } from '$lib/stores/canvas';
	import { trpc } from '$lib/trpc';
	import type { TBox } from '$lib/types';

	export let box: TBox;

	let isDragging = false;
	let width = 200;
	let height = 400;

	const handleMouseup = () => {
		if (isDragging) {
			trpc.sync.create.mutate({
				action: 'U',
				boxId: box.id,
				data: { x: box.x, y: box.y }
			});
		}

		isDragging = false;
	};

	const handleMousedown = () => {
		isDragging = true;
	};

	const handleMousemove = (e: MouseEvent) => {
		if (isDragging) {
			box.x = Math.max(Math.min(box.x + e.movementX, $windowWidth - width), 0);
			box.y = Math.max(Math.min(box.y + e.movementY, $windowHeight - height), 0);
		}
	};

	$: ({ x, y } = box);
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
