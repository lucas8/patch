import { Document } from '@patch/lib';
import * as Automerge from '@automerge/automerge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initDocument = (doc: Document) => {
	doc.id = Automerge.uuid();
	doc.version = new Automerge.Counter(1);
	doc.name = 'Initial Document';
	doc.plugins = [];
	doc.edges = [];
};
