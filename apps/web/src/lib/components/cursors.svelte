<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscribable } from '@trpc/server/observable';
	import { trpc } from '$lib/trpc';

	export let uid: string;

	let subscription: undefined | Unsubscribable;
	let cursors: Record<string, { x: number; y: number; uid: string }> = {};

	onMount(() => {
		subscription = trpc.cursorRouter.cursorListen.subscribe(
			{ uid },
			{
				onError: console.log,
				onData: (data) => {
					cursors[data.uid] = { x: data.x, y: data.y, uid: data.uid };
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

<ul>
	{#each Object.values(cursors) as { uid, x, y }}
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
			<span>{uid}</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		pointer-events: none;
	}
	li {
		color: deeppink;
		position: fixed;
		display: flex;
		flex-direction: column;
		pointer-events: none;
		overflow: hidden;
		white-space: nowrap;
	}
	span {
		color: black;
		background-color: deeppink;
	}
</style>
