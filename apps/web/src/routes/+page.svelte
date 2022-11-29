<script lang="ts">
	let counter  = 0;
</script>

<pre>{counter}</pre>
<button on:click={() => (counter += 1)}>+1</button>
<button on:click={() => (counter -= 1)}>-1</button>
