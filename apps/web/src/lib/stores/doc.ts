import { writable } from 'svelte/store';
import { repo } from '$lib/repo';
import type { DocHandleChangeEvent, DocumentId } from 'automerge-repo';
import type { Doc } from '@automerge/automerge';
import type { TDoc } from '@patch/lib';

export const useDoc = <T extends TDoc>(docId: string) => {
	const handle = repo?.find<T>(docId as DocumentId);
	const { subscribe, set } = writable<Doc<T> | undefined>(undefined);

	if (handle) {
		handle.syncValue().then((v) => set(v));

		const listener = (h: DocHandleChangeEvent<T>) => set(h.handle.doc);
		handle.on('change', listener);
	}

	const change = (fn: (doc: T) => void) => {
		if (!handle) return;
		handle.change(fn);
	};

	return {
		subscribe,
		update: change
	};
};

export const doc = useDoc('09f5b444-ab9f-42b0-bc68-ad10cfe52f33');
