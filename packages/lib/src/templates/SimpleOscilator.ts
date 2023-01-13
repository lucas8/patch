import { Plugin, Knob, BasePlugin, Egress } from './primitives';

@Plugin({ name: 'Simple Oscilator', width: 100, height: 100, x: 0, y: 0 })
export class SimpleOscilator extends BasePlugin {
	@Knob({
		name: 'Amplitude',
		x: 50,
		y: 40,
		config: {
			min: 0,
			max: 100
		}
	})
	public amplitude = 50;

	// @Ingress({ name: 'Frequency', x: 10, y: 10 })
	// public frequency = 0;

	@Egress({ name: 'Sine Wave', x: 10, y: 10 })
	public sine() {
		const node = new OscillatorNode(this.context);
		node.frequency.value = 200 + this.amplitude * 2800;
		return node;
	}
}
