import { derived, writable } from 'svelte/store';
import type { Document } from '@patch/lib';
import { doc } from '$lib/stores/doc';

export const getNodeEdgePositionsById = ($doc: Document, pluginId: string, nodeId: string) => {
	const plugin = $doc.plugins.find((p) => p.id === pluginId);

	if (!plugin) return { x: 0, y: 0 };

	const node = plugin.nodes.find((n) => n.id === nodeId);
	if (!node) return { x: 0, y: 0 };

	return { x: plugin.x + node.x + 25, y: plugin.y + node.y + 120 };
};

export const edges = derived(doc, ($doc) => {
	return $doc?.edges?.map((edge) => {
		const currToPos = getNodeEdgePositionsById($doc, edge.toPluginId, edge.toNodeId);
		const currFromPos = getNodeEdgePositionsById($doc, edge.fromPluginId, edge.fromNodeId);

		console.log(currToPos, currFromPos);

		return {
			fromNode: currFromPos,
			toNode: {
				x: currToPos.x - currFromPos.x,
				y: currToPos.y - currFromPos.y
			}
		};
	});
});

export const currentEdge = writable<{
	p1x: number;
	p1y: number;
	p2x: number;
	p2y: number;
	pluginId: string;
	nodeId: string;
} | null>(null);
