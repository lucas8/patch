<script lang="ts">
	export let radius: number = 80;
	export let degrees: number = 180;

	export let minValue: number = 0;
	export let maxValue: number = 1;
	export let value: number = 0.5;

	export let onChange = (value: number) => {};

	const minAngle = (360 - degrees) / 2;
	const maxAngle = minAngle + degrees;

	// this repersents the initial position of the mouse
	let dragState: undefined | { x: number; y: number } = undefined;
	let knobRef: HTMLElement;

	$: deg = getInitialDegFromValueMap(value);

	const handleMouseDown = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const rect = knobRef.getBoundingClientRect();
		dragState = {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!dragState) return;

		const { x, y } = dragState;
		const dx = e.clientX - x;
		const dy = e.clientY - y;
		let angle = (Math.atan(dy / dx) * 180) / Math.PI;

		if ((dx < 0 && dy >= 0) || (dx < 0 && dy < 0)) {
			angle += 90;
		} else {
			angle += 270;
		}

		const finalAngle = Math.min(Math.max(minAngle, angle), maxAngle);

		onChange(getValueFromDegMap(finalAngle));
	};

	const handleMouseUp = () => {
		dragState = undefined;
	};

	const getValueFromDegMap = (finalAngle: number) => {
		return ((finalAngle - minAngle) * (maxValue - minValue)) / (maxAngle - minAngle) + minValue;
	};

	const getInitialDegFromValueMap = (val: number) => {
		return Math.floor(
			((val - minValue) * (maxAngle - minAngle)) / (maxValue - minValue) + minAngle
		);
	};
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
	bind:this={knobRef}
	on:mousedown={handleMouseDown}
	class="knob outer"
	style:--radius="{radius}px"
>
	<div class="knob inner" style="transform:rotate({deg}deg)">
		<div class="handle" />
	</div>
</div>

<style>
	.knob {
		display: flex;
		position: relative;
		width: var(--radius);
		height: var(--radius);
	}
	.knob.outer {
		border-radius: 50%;
		width: var(--radius);
		height: var(--radius);
		background: red;
	}
	.knob.inner {
		border-radius: 50%;
	}
	.knob.inner .handle {
		background: #fff;
		position: absolute;
		width: 10%;
		height: 10%;
		bottom: 2%;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;
	}
</style>
