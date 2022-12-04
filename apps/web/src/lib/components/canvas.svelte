<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Unsubscribable } from '@trpc/server/observable';
	import { trpc } from '$lib/trpc';

	export let name: string;

	let subscription: undefined | Unsubscribable;

	let cursors: Record<string, { x: number; y: number; name: string }> = {};

	async function handleMousemove(event: MouseEvent) {
		const x = Math.ceil((event.pageX / window.innerWidth) * 10000) / 100;
		const y = Math.ceil((event.pageY / window.innerHeight) * 10000) / 100;

		trpc.cursorRouter.cursorMove.mutate({ x, y, name });
	}

	onMount(() => {
		subscription = trpc.cursorRouter.cursorListen.subscribe(
			{ name },
			{
				onError: console.log,
				onData: (data) => {
					cursors[data.name] = { x: data.x, y: data.y, name: data.name };
				}
			}
		);
	});

	onDestroy(() => {
		if (!!subscription) {
			subscription.unsubscribe();
		}
	});
</script>

<div on:mousemove={handleMousemove} />

<ul>
	{#each Object.values(cursors) as { name, x, y }}
		<li style="left: {x}%; top: {y}%">
			<svg
				version="1.1"
				width="25px"
				height="25px"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 21 21"
			>
				<polygon fill="black" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
				<polygon fill="currentColor" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" />
			</svg>
			<span style={'background-color: deeppink'}>{name}</span>
		</li>
	{/each}
</ul>

<style>
	div {
		z-index: 1000;
		height: 100vh;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 1rem;
	}
	ul {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	li {
		color: deeppink;
		position: absolute;
		display: flex;
		flex-direction: column;
		pointer-events: none;
		overflow: hidden;
		white-space: nowrap;
	}
	span {
		color: black;
	}
</style>
