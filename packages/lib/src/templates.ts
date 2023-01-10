import { Plugin, NodeType } from './types';

// TODO: store this in a remote db
export const templates: Record<string, Plugin> = {
	oscilator: {
		id: 'oscilator_0.1',
		name: 'Oscilator v0.1',
		width: 100,
		height: 100,
		x: 0,
		y: 0,
		nodes: [
			{
				id: 'amp',
				name: 'Amplitude',
				type: NodeType.KNOB,
				x: 50,
				y: 40,
				config: {
					min: 0,
					max: 100,
					value: 100
				}
			},
			{
				id: 'sine_wave',
				name: 'Sine Wave',
				type: NodeType.EGRESS,
				x: 20,
				y: 80,
				config: {}
			},
			{
				id: 'square_wave',
				name: 'Square Wave',
				type: NodeType.EGRESS,
				x: 40,
				y: 80,
				config: {}
			}
		]
	}
};
