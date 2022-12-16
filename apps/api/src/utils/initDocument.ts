import type { TDoc } from '@patch/lib';
import * as Automerge from '@automerge/automerge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initDocument = (initialDoc: Automerge.Doc<TDoc>) => {
	return Automerge.change(initialDoc, 'Init canvas state', (doc) => {
		doc.version = new Automerge.Counter(1);
		doc.name = 'hello';
		doc.nodes = [];
		doc.id = Automerge.uuid();
		doc.nodes.push({
			id: Automerge.uuid(),
			type: 'group',
			x: 200,
			y: 400,
			nodes: [
				{
					id: Automerge.uuid(),
					type: 'socket',
					x: 10,
					y: 40
				}
			]
		});
	});
};
