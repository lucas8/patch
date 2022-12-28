<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';
	import type { TDocEdge } from '@patch/lib';
	import type { edges } from '$lib/stores/connectors';

	const offset = 30;

	export let edge: typeof $edges[0];

	let c1x = tweened(0, {
		duration: 800,
		easing: elasticOut
	});
	let c1y = tweened(0, {
		duration: 800,
		easing: elasticOut
	});

	// TODO: get diff of change, modify 2nd point according to this delta
	$: console.log(edge);

	$: ({
		fromNode: { x: p1x, y: p1y },
		toNode: { x: p2x, y: p2y }
	} = edge);

	$: console.log('p1', p1x, p1y);

	$: console.log('p2', p2x, p2y);

	$: theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;
	$: {
		c1x.set(Math.round(p2x / 2 + offset * Math.cos(theta)));
		c1y.set(Math.round(Math.abs(p2x / 2) + offset * Math.sin(theta)));
	}
</script>

<g>
	<path
		fill="none"
		stroke="rgb(247, 167, 143)"
		stroke-width="5"
		stroke-linecap="round"
		d="m{p1x},{p1y} q{$c1x},{$c1y} {p2x},{p2y}"
	/>
</g>

<style>
	path {
		cursor: pointer;
		position: absolute;
	}
</style>
