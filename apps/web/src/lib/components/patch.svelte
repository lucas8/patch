<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';

	const offset = 30;

	export let p1x = 201;
	export let p1y = 110;
	export let p2x = 0;
	export let p2y = 0;

	let c1x = tweened(0, {
		duration: 800,
		easing: elasticOut
	});
	let c1y = tweened(0, {
		duration: 800,
		easing: elasticOut
	});

	const handleMouseMove = (e: MouseEvent) => {
		p2x = e.clientX - p1x;
		p2y = e.clientY - p1y;
	};

	$: theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;
	$: {
		c1x.set(p2x / 2 + offset * Math.cos(theta));
		c1y.set(Math.abs(p2x / 2) + offset * Math.sin(theta));
	}
</script>

<svg>
	<path
		fill="none"
		stroke="rgb(247, 167, 143)"
		stroke-width="5"
		stroke-linecap="round"
		d="m{p1x},{p1y} q{$c1x},{$c1y} {p2x},{p2y}"
	/>
</svg>

<svelte:body on:mousemove={handleMouseMove} />

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	path {
		pointer-events: none;
		cursor: pointer;
		touch-action: manipulation;
	}
</style>
