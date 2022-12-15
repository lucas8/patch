import { writable } from 'svelte/store';
import * as AutoMerge from '@automerge/automerge';
import { io } from '$lib/io';
import { convertDataURIToBinary, uint8ToBase64 } from '$lib/utils';
import type { TFrontendDoc } from '@patch/lib';

const createDocument = () => {
	let syncState = AutoMerge.initSyncState();
	const docStore = writable(AutoMerge.init<TFrontendDoc>());
	const { subscribe, update } = docStore;

	const change = (changeFn: AutoMerge.ChangeFn<TFrontendDoc>) => {
		return update((doc) => {
			const newDoc = AutoMerge.change(doc, changeFn);

			sendSyncMessage(newDoc);

			return (doc = newDoc);
		});
	};

	const sendSyncMessage = (doc: AutoMerge.Doc<TFrontendDoc>) => {
		const [nextSyncState, syncMessage] = AutoMerge.generateSyncMessage(doc, syncState);

		if (syncMessage) {
			const b64 = uint8ToBase64(syncMessage);

			io.emit('CLIENT_SYNC', {
				syncMessage: b64
			});
		}

		syncState = nextSyncState;
		return;
	};

	io.on('connect', () => {
		subscribe((doc) => {
			sendSyncMessage(doc);
		});
	});

	io.on('UPDATE_SYNC_STATE', (data: { syncMessage: string }) => {
		const change = convertDataURIToBinary(data.syncMessage);

		update((doc) => {
			const [nextDoc, nextSyncState] = AutoMerge.receiveSyncMessage(doc, syncState, change);

			syncState = nextSyncState;

			return (doc = nextDoc);
		});
	});

	// TODO: fix hmr

	return {
		subscribe,
		update: change,
		set: () => null
	};
};

export const doc = createDocument();
