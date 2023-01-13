import { EgressNode, KnobConfig, KnobNode, NodeConfig, NodeType } from '../..';

export const Knob = (options: NodeConfig & { config: Omit<KnobConfig, 'value'> }) => {
	return (target: any, propertyKey: string) => {
		const { config } = options;

		const initialValue = new target.constructor()[propertyKey] ?? 0;

		const node = target.constructor;
		const fields = Reflect.getMetadata('node', node) || [];
		const field: KnobNode = {
			id: propertyKey,
			type: NodeType.KNOB,
			name: options.name,
			x: options.x,
			y: options.y,
			config: { value: initialValue, ...config }
		};

		Reflect.defineMetadata('node', [...fields, field], node);
	};
};

// TODO: take in type of output
export const Egress = (options: NodeConfig) => {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const node = target.constructor;
		const fields = Reflect.getMetadata('node', node) || [];
		const field: EgressNode = {
			id: propertyKey,
			type: NodeType.EGRESS,
			name: options.name,
			x: options.x,
			y: options.y,
			config: {}
		};

		Reflect.defineMetadata('node', [...fields, field], node);
	};
};
