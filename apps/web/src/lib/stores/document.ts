import { writable } from 'svelte/store';
import * as AutoMerge from '@automerge/automerge';
import { io } from '$lib/io';
import { convertDataURIToBinary, uint8ToBase64 } from '$lib/utils';
import type { TFrontendDoc } from '@patch/lib';

const docStore = writable(AutoMerge.init<TFrontendDoc>());
const { subscribe, update } = docStore;

let syncState = AutoMerge.initSyncState();

export const sendSyncMessage = (doc: TFrontendDoc) => {
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

export const recieveSyncMessage = (syncMessage: string) => {
	const change = convertDataURIToBinary(syncMessage);

	update((doc) => {
		const [nextDoc, nextSyncState] = AutoMerge.receiveSyncMessage(doc, syncState, change);

		syncState = nextSyncState;

		return (doc = nextDoc);
	});
};

export const document = () => {
	const change = (changeFn: AutoMerge.ChangeFn<TFrontendDoc>) =>
		update((doc) => {
			const newDoc = AutoMerge.change(doc, changeFn);

			sendSyncMessage(doc);

			return (doc = newDoc);
		});

	// TODO: fix hmr

	return {
		subscribe,
		update: change,
		set: () => null
	};
};
