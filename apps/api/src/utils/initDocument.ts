import * as Automerge from '@automerge/automerge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initDocument = (initialDoc: Automerge.Doc<any>) => {
	return Automerge.change(initialDoc, 'Init canvas state', (doc) => {
		doc.version = new Automerge.Counter(1);
		doc.name = new Automerge.Text('hello');
		doc.nodes = [];
		doc.nodes.push({
			type: new Automerge.Text('plugin'),
			x: new Automerge.Int(200),
			y: new Automerge.Int(400)
		});
	});
};
