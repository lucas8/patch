import { derived } from 'svelte/store';
import { doc } from '$lib/stores/doc';
import type { TDoc } from '@patch/lib';

export const getNodeEdgePositionsById = ($doc: TDoc, nodeId: string, socketId: string) => {
	const node = $doc.nodes.find((node) => node.id === nodeId);

	if (!node) return { x: 0, y: 0 };

	const socket = node.nodes?.find((socket) => socket.id === socketId);
	if (!socket) return { x: 0, y: 0 };

	return { x: socket.x + node.x, y: socket.y + node.y };
};

export const edges = derived(doc, ($doc) => {
	return $doc.edges?.map((edge) => {
		const currToPos = getNodeEdgePositionsById($doc, edge.toNodeId, edge.toSocketId);
		const currFromPos = getNodeEdgePositionsById($doc, edge.fromNodeId, edge.fromSocketId);

		return {
			fromNode: currFromPos,
			toNode: {
				x: currToPos.x - currFromPos.x,
				y: currToPos.y - currFromPos.y
			}
		};
	});
});
