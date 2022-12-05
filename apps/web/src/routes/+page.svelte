<script lang="ts">
	import Space from '$lib/components/space.svelte';
	import Cursors from '$lib/components/cursors.svelte';

	let uid = Date.now().toString(36);

	const addBlock = () => {
		console.log('test');
	};
</script>

<Space {uid}>
	<Cursors {uid} />

	<button on:click={addBlock}>add block</button>
</Space>
