<script lang="ts">
	import { repo } from '$lib/repo';
	import { onDestroy, onMount } from 'svelte';

	let docIds: string[] = [];

	const listenerFn = (e: any) => {
		docIds.push(e.handle.documentId);
		docIds = docIds;
	};

	onMount(() => {
		repo.addListener('document', listenerFn);
	});

	onDestroy(() => {
		repo.removeListener('document', listenerFn);
	});
</script>

<main>
	<h1>hello world</h1>
	<ol>
		{#each docIds as id}
			<li>
				<a href="/space/{id}">{id}</a>
			</li>
		{/each}
	</ol>
</main>
