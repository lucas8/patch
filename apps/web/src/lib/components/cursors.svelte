<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscribable } from '@trpc/server/observable';
	import Cursor from '$lib/components/cursor.svelte';
	import { trpc } from '$lib/trpc';
	import { uid } from '$lib/stores/auth';

	// let subscription: undefined | Unsubscribable;
	let cursors: Record<string, { x: number; y: number; uid: string }> = {};

	// onMount(() => {
	// 	subscription = trpc.cursors.list.subscribe(
	// 		{ uid: $uid },
	// 		{
	// 			onError: console.log,
	// 			onData: (data) => {
	// 				cursors[data.uid] = { x: data.x, y: data.y, uid: data.uid };
	// 			}
	// 		}
	// 	);
	// });

	// onDestroy(() => {
	// 	if (!!subscription) {
	// 		subscription.unsubscribe();
	// 	}
	// });
</script>

<ul>
	{#each Object.values(cursors) as { x, y }}
		<Cursor {x} {y} />
	{/each}
</ul>

<style>
	ul {
		pointer-events: none;
	}
</style>
