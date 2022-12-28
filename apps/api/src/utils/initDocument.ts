import type { TDoc } from '@patch/lib';
import * as Automerge from '@automerge/automerge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initDocument = (initialDoc: Automerge.Doc<TDoc>) => {
	return Automerge.change(initialDoc, 'Init canvas state', (doc) => {
		doc.id = Automerge.uuid();
		doc.version = new Automerge.Counter(1);
		doc.name = 'hello';
		doc.nodes = [];
		doc.edges = [];

		const node1 = Automerge.uuid();
		const socket1 = Automerge.uuid();
		const node2 = Automerge.uuid();
		const socket2 = Automerge.uuid();

		doc.nodes.push({
			id: node1,
			type: 'group',
			x: 200,
			y: 400,
			nodes: [
				{
					id: socket1,
					type: 'socket',
					x: 10,
					y: 40
				}
			]
		});

		doc.nodes.push({
			id: node2,
			type: 'group',
			x: 800,
			y: 400,
			nodes: [
				{
					id: socket2,
					type: 'socket',
					x: 10,
					y: 40
				}
			]
		});

		doc.edges.push({
			id: Automerge.uuid(),
			fromNodeId: node1,
			fromSocketId: socket1,
			toNodeId: node2,
			toSocketId: socket2
		});
	});
};
