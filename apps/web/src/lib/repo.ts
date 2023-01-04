import { browser } from '$app/environment';
import { Repo } from 'automerge-repo';
import { BroadcastChannelNetworkAdapter } from 'automerge-repo-network-broadcastchannel';
import { BrowserWebSocketClientAdapter } from 'automerge-repo-network-websocket';
import { LocalForageStorageAdapter } from 'automerge-repo-storage-localforage';

export const repo = new Repo({
	network: [
		new BroadcastChannelNetworkAdapter(),
		new BrowserWebSocketClientAdapter(import.meta.env.VITE_APP_WS_URL)
	],
	storage: browser ? new LocalForageStorageAdapter() : undefined
});
