<script lang="ts">
	import throttle from 'lodash/throttle';
	import { uid } from '$lib/stores/auth';
	import { width, height } from '$lib/stores/canvas';
	import { trpc } from '$lib/trpc';

	const handleMousemove = throttle(async (event: MouseEvent) => {
		const x = event.pageX;
		const y = event.pageY;

		trpc.cursor.save.mutate({ x, y, uid: $uid });
	}, 50);

	const handleResize = () => {
		width.set(globalThis.window.innerWidth);
		height.set(globalThis.window.innerHeight);
	};
</script>

<svelte:window on:resize|passive={handleResize} />

<main on:mousemove={handleMousemove}>
	<slot />
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		position: relative;
		transform-origin: top left;
		top: 0;
		left: 0;
		padding: 0 1rem;
	}
</style>
