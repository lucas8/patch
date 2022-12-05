<script lang="ts">
	import { trpc } from '$lib/trpc';

	export let uid: string;

	const handleMousemove = async (event: MouseEvent) => {
		const x = Math.ceil((event.pageX / window.innerWidth) * 10000) / 100;
		const y = Math.ceil((event.pageY / window.innerHeight) * 10000) / 100;

		trpc.cursorRouter.cursorMove.mutate({ x, y, uid });
	};
</script>

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
