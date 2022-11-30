<script lang="ts">
	import { onMount } from 'svelte';
	import { trpc } from '../lib/trpc';

	let result = '';

	onMount(async () => {
		result = await trpc.hello.hello.query('lucas');
	});
</script>

<pre>{result}</pre>
