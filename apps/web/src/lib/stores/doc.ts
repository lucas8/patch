import { writable } from 'svelte/store';
import type { Doc } from '@automerge/automerge';
import type { TDoc } from '@patch/lib';
import { repo } from '$lib/repo';
import type { DocHandle, DocHandleChangeEvent, DocumentId } from 'automerge-repo';

export const createDocStore = <T extends TDoc>() => {
	const { subscribe, set } = writable<Doc<T> | undefined>(undefined);

	let handle: DocHandle<T> | null = null;

	const change = (fn: (doc: T) => void) => {
		if (!handle) return;

		handle.change(fn);
	};

	const load = (docId: DocumentId) => {
		handle = repo.find<T>(docId);
		handle.value().then((v) => set(v));

		const listener = (h: DocHandleChangeEvent<T>) => set(h.handle.doc);
		handle.on('change', listener);
	};

	return {
		load,
		subscribe,
		update: change
	};
};

export const doc = createDocStore();
