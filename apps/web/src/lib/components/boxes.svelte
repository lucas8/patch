<script lang="ts">
	import type { Unsubscribable } from '@trpc/server/observable';
	import Box from '$lib/components/box.svelte';
	import type { TBox } from '$lib/types';
	import { onMount, onDestroy } from 'svelte';
	import { trpc } from '$lib/trpc';

	export let boxes: TBox[];

	let subscription: undefined | Unsubscribable;

	onMount(() => {
		subscription = trpc.sync.listen.subscribe(undefined, {
			onError: console.log,
			onData: (data) => {
				const idx = boxes.findIndex((b) => b.id === data.id);
				boxes[idx] = data;
			}
		});
	});

	onDestroy(() => {
		if (!!subscription) {
			subscription.unsubscribe();
		}
	});
</script>

<div>
	{#each boxes as box}
		<Box bind:box />
	{/each}
</div>

<style>
	div {
		pointer-events: none;
	}
</style>
