import { KnobNode } from '../types';
import { Plugin, Knob, BasePlugin, Egress } from './primitives';

@Plugin({
	templateId: 'oscilator',
	name: 'Simple Oscilator',
	width: 200,
	height: 200,
	x: 0,
	y: 0,
	backgroundColor: '#008080'
})
export class SimpleOscilator extends BasePlugin {
	@Knob({
		name: 'Amplitude',
		x: 70,
		y: 20,
		config: {
			min: 0,
			max: 100,
			value: 51
		}
	})
	public get amplitude(): number | undefined {
		return this.getNode<KnobNode>('oscilator', 'amplitude')?.config?.value;
	}

	@Egress({ name: 'Sine Wave', x: 60, y: 70 })
	public sine() {
		return 200;
	}
}
