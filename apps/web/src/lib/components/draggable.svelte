<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isDragging = false;
	export let handleMouseUp = () => {
		isDragging = false;
	};

	const dispatch = createEventDispatcher();

	const handleMouseMove = (event: MouseEvent) => {
		dispatch('updatePosition', event);
	};

	const handleMouseDown = (e: MouseEvent) => {
		e.stopPropagation();
		isDragging = true;
	};
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<slot {handleMouseDown} />
