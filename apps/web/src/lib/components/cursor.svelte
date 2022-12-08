<script lang="ts">
	import { spring } from 'svelte/motion';

	export let x: number;
	export let y: number;

	// TODO: cursor left canvas
	let coords = spring(
		{ x, y },
		{
			stiffness: 0.07,
			damping: 0.35
		}
	);

	$: {
		coords.set({ x, y });
	}
</script>

<li style="transform: translateX({$coords.x}px) translateY({$coords.y}px)">
	<svg width="32" height="44" viewBox="0 0 24 36" fill="none">
		<path
			fill="currentColor"
			d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
		/>
	</svg>
</li>

<style>
	li {
		top: 0;
		left: 0;
		z-index: 1000;
		color: deeppink;
		position: absolute;
		pointer-events: none;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
