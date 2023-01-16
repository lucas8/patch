import { Plugin, Node } from '../types';
import { SimpleOscilator } from './SimpleOscilator';
import { uuid } from '@automerge/automerge';

const templates = [SimpleOscilator];

const getTemplates = (): Array<Plugin> => {
	return templates.reduce((prev, templateFn) => {
		const plugin: Plugin = Reflect.getMetadata('plugin', templateFn.prototype);
		const nodes: Node[] = Reflect.getMetadata('node', templateFn);

		// TODO: add some hard checks with zod or something if we open this up to the public
		return [{ ...plugin, nodes } as Plugin, ...prev];
	}, [] as Array<Plugin>);
};

export const cloneTemplate = (id: keyof typeof templates) => {
	const plugins = getTemplates();
	const template = plugins.find((t) => t.templateId === id);

	return { ...template, id: uuid() };
};

export const getTemplate = (templateId: string) => {
	return templates.find((templateFn) => {
		const plugin: Plugin = Reflect.getMetadata('plugin', templateFn.prototype);

		return plugin.templateId === templateId;
	});
};
