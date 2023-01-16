import { Plugin as PluginType, PluginOptions } from '../../types';

export const Plugin = (options: PluginOptions): ClassDecorator => {
	return (target: any) => {
		const plugin = target.prototype;
		const field: Omit<PluginType, 'id'> = {
			...options,
			nodes: []
		};

		Reflect.defineMetadata('plugin', field, plugin);
		return target;
	};
};
