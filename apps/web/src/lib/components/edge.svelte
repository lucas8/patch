<script lang="ts">
	// import { tweened } from 'svelte/motion';
	// import { elasticOut } from 'svelte/easing';

	export let p1x: number;
	export let p1y: number;
	export let p2x: number;
	export let p2y: number;

	let c1x = 90;
	let c1y = 40;

	// const offset = 30;

	// turned off this for now - big perf loss
	// let c1x = tweened(0, {
	// 	duration: 800,
	// 	easing: elasticOut
	// });
	// let c1y = tweened(0, {
	// 	duration: 800,
	// 	easing: elasticOut
	// });

	// $: theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;
	// $: {
	// 	c1x.set(Math.round(p2x / 2 + offset * Math.cos(theta)));
	// 	c1y.set(Math.round(Math.abs(p2x / 2) + offset * Math.sin(theta)));
	// }
</script>

<g>
	<path
		fill="none"
		stroke="rgb(247, 167, 143)"
		stroke-width="5"
		stroke-linecap="round"
		d="m{p1x},{p1y} q{c1x},{c1y} {p2x},{p2y}"
	/>
</g>

<style>
	path {
		cursor: pointer;
		position: absolute;
	}
</style>
