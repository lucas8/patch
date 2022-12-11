import { writable, type Writable } from 'svelte/store';
import * as AutoMerge from '@automerge/automerge';
import { io } from '$lib/io';
import type { PluginDoc, TDoc } from '$lib/types';
import { convertDataURIToBinary, uint8ToBase64 } from '$lib/utils';

const { subscribe, update } = writable(AutoMerge.init<PluginDoc>());
let syncState = AutoMerge.initSyncState();

export const document: () => [
	Omit<Writable<TDoc>, 'update'> & {
		update: (changeFn: AutoMerge.ChangeFn<PluginDoc>) => void;
	},
	(doc: TDoc) => void,
	(doc: TDoc, syncMessage: string) => void
] = () => {
	const sendSyncMessage = (doc: TDoc) => {
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

	const recieveSyncMessage = (doc: TDoc, syncMessage: string) => {
		const change = convertDataURIToBinary(syncMessage);

		update((doc) => {
			const [nextDoc, nextSyncState] = AutoMerge.receiveSyncMessage(doc, syncState, change);

			syncState = nextSyncState;

			return (doc = nextDoc);
		});

		// sendSyncMessage(doc);

		return;
	};

	const change = (changeFn: AutoMerge.ChangeFn<PluginDoc>) =>
		update((doc) => {
			const newDoc = AutoMerge.change(doc, changeFn);

			sendSyncMessage(newDoc);

			return (doc = newDoc);
		});

	// TODO: fix hmr

	return [
		{
			subscribe,
			update: change,
			set: () => null
		},
		sendSyncMessage,
		recieveSyncMessage
	];
};
