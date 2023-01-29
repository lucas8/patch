import { KnobNode } from '../types';
import { Plugin, Knob, BasePlugin, Ingress } from './primitives';

@Plugin({
	templateId: 'filter',
	name: 'Simple Filter',
	width: 100,
	height: 200,
	x: 0,
	y: 0,
	backgroundColor: 'blueviolet'
})
export class SimpleFilter extends BasePlugin {
	@Knob({
		name: 'Cutoff',
		x: 30,
		y: 120,
		config: {
			min: 0,
			max: 1,
			value: 0.1
		}
	})
	public get cutoff(): number | undefined {
		// TODO: what if multiple filters
		return this.getNode<KnobNode>('filter', 'cutoff')?.config?.value;
	}

	// TODO: this should be an ingress
	@Ingress({ name: 'Output', x: 20, y: 5 })
	public output() {
		return 200;
	}
}
