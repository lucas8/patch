import { derived, writable } from 'svelte/store';
import type { TDoc } from '@patch/lib';
import { doc } from '$lib/stores/doc';

export const getNodeEdgePositionsById = ($doc: TDoc, nodeId: string, socketId: string) => {
	const node = $doc.nodes.find((node) => node.id === nodeId);

	if (!node) return { x: 0, y: 0 };

	const socket = node.nodes?.find((socket) => socket.id === socketId);
	if (!socket) return { x: 0, y: 0 };

	return { x: socket.x + node.x, y: socket.y + node.y };
};

export const edges = derived(doc, ($doc) => {
	return $doc?.edges?.map((edge) => {
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

export const currentEdge = writable<{
	p1x: number;
	p1y: number;
	p2x: number;
	p2y: number;
	socketId: string;
	nodeId: string;
} | null>(null);
