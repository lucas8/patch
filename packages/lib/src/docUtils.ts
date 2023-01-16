import type { Document } from './types';

export const getPlugin = (doc: Document, id: string) => {
	return doc.plugins.find((p) => p.id === id);
};

export const getNode = (doc: Document, pluginId: string, nodeId: string) => {
	return doc.plugins.find((p) => p.id === pluginId)?.nodes.find((n) => n.id === nodeId);
};
