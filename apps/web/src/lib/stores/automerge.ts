import { writable, type Writable } from 'svelte/store';
import * as AutoMerge from '@automerge/automerge';
import { io } from '$lib/io';
import type { PluginDoc } from '$lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertDataURIToBinary = (dataURI: any) => {
	// TODO: refactor
	const raw = atob(dataURI);
	const rawLength = raw.length;
	const array = new Uint8Array(new ArrayBuffer(rawLength));

	for (let i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uint8ToBase64 = (arr: Uint8Array) =>
	btoa(
		Array(arr.length)
			.fill('')
			.map((_, i) => String.fromCharCode(arr[i]))
			.join('')
	);

export const setupRootDocument: () => [
	Omit<Writable<AutoMerge.Doc<PluginDoc>>, 'update'> & {
		update: (changeFn: AutoMerge.ChangeFn<PluginDoc>) => void;
	},
	(doc: AutoMerge.Doc<PluginDoc>) => void
] = () => {
	let syncState = AutoMerge.initSyncState();
	const { subscribe, update } = writable(AutoMerge.init<PluginDoc>());

	const sendSyncMessage = (doc: AutoMerge.Doc<PluginDoc>) => {
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

	const change = (changeFn: AutoMerge.ChangeFn<PluginDoc>) =>
		update((doc) => {
			const newDoc = AutoMerge.change(doc, changeFn);

			sendSyncMessage(newDoc);

			return (doc = newDoc);
		});

	io.on('UPDATE_SYNC_STATE', (data: { syncMessage: string }) => {
		const change = convertDataURIToBinary(data.syncMessage);

		update((doc) => {
			const [nextDoc, nextSyncState] = AutoMerge.receiveSyncMessage(doc, syncState, change);

			syncState = nextSyncState;

			return (doc = nextDoc);
		});

		subscribe((doc) => sendSyncMessage(doc));
	});

	return [
		{
			subscribe,
			update: change,
			set: () => null
		},
		sendSyncMessage
	];
};
