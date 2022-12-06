<script lang="ts">
	import Canvas from '$lib/components/canvas.svelte';
	import Cursors from '$lib/components/cursors.svelte';
	import Boxes from '$lib/components/boxes.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Canvas>
	<Cursors />

	<Boxes boxes={data.boxes} />
</Canvas>
