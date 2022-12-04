<script lang="ts">
	import Canvas from '$lib/components/canvas.svelte';

	let name = '';
	let showCanvas = false;
</script>

{#if showCanvas}
	<Canvas {name} />
{:else}
	<form on:submit|preventDefault={() => (showCanvas = true)}>
		<div>
			<label for="name">Name:</label>
			<input id="name" bind:value={name} />
		</div>
		<button type="submit">Submit</button>
	</form>
{/if}
