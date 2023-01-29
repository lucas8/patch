import { Plugin, Node } from '../types';
import { SimpleOscilator } from './SimpleOscilator';
import { uuid } from '@automerge/automerge';
import { SimpleFilter } from './SimpleFilter';

const templates = [SimpleOscilator, SimpleFilter];

const getTemplates = (): Array<Plugin> => {
	return templates.reduce((prev, templateFn) => {
		const plugin: Plugin = Reflect.getMetadata('plugin', templateFn.prototype);
		const nodes: Node[] = Reflect.getMetadata('node', templateFn);

		// TODO: add some hard checks with zod or something if we open this up to the public
		return [{ ...plugin, nodes } as Plugin, ...prev];
	}, [] as Array<Plugin>);
};

export const cloneTemplate = (id: string): Plugin | undefined => {
	const plugins = getTemplates();
	const template = plugins.find((t) => t.templateId === id);

	if (!template) {
		return undefined;
	}

	// TODO: really bad to create the id here
	return { ...template, id: uuid() };
};

export const getTemplate = (templateId: string) => {
	return templates.find((templateFn) => {
		const plugin: Plugin = Reflect.getMetadata('plugin', templateFn.prototype);

		return plugin.templateId === templateId;
	});
};
