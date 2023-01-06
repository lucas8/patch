<script lang="ts">
	export let p1x: number;
	export let p1y: number;
	export let p2x: number;
	export let p2y: number;

	let c1x = 90;
	let c1y = 40;
</script>

<g>
	<path
		fill="none"
		stroke="#4CF367"
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
