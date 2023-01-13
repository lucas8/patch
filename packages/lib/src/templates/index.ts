import { Plugin, Node } from '../types';
import { SimpleOscilator } from './SimpleOscilator';
import { uuid } from '@automerge/automerge';

const templates = { oscilator: SimpleOscilator };

const getTemplates = (): Record<keyof typeof templates, Plugin> => {
	return Object.values(templates).reduce((prev, templateFn, i) => {
		const plugin: Plugin = Reflect.getMetadata('plugin', templateFn.prototype);
		const nodes: Node[] = Reflect.getMetadata('node', templateFn);

		// TODO: add some hard checks with zod or something if we open this up to the public
		return { ...prev, [Object.keys(templates)[i]]: { ...plugin, nodes } };
	}, {} as Record<string, Plugin>);
};

export const cloneTemplate = (id: keyof typeof templates) => {
	const templates = getTemplates();

	return { ...templates[id], id: uuid() };
};
