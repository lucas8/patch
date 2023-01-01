import { browser } from '$app/environment';
import { Repo } from 'automerge-repo';
import { BroadcastChannelNetworkAdapter } from 'automerge-repo-network-broadcastchannel';
import { BrowserWebSocketClientAdapter } from 'automerge-repo-network-websocket';
import { LocalForageStorageAdapter } from 'automerge-repo-storage-localforage';

export const repo = browser
	? new Repo({
			network: [
				new BroadcastChannelNetworkAdapter(),
				new BrowserWebSocketClientAdapter('ws://localhost:8080')
			],
			storage: new LocalForageStorageAdapter()
	  })
	: undefined;
