import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import * as Automerge from '@automerge/automerge';
import { initDocument } from './utils/initDocument';

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	// TODO: Add cors
	cors: {
		origin: process.env.WEB_ORIGIN || 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true
	}
});

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let doc = Automerge.init<any>();
const syncStates: Record<string, Automerge.SyncState> = {};

/**
 * Notes:
 * for persistance, store getLastLocalChange in a table, load all the bytes at once
 * remove dependence on socket.id
 */
io.on('connection', (socket) => {
	const peerId = socket.id;

	socket.on('disconnect', function () {
		console.log('Got disconnect!');

		delete syncStates[peerId];
	});

	socket.on('CLIENT_SYNC', (data) => {
		const tmpSyncMsg = Buffer.from(data.syncMessage, 'base64');

		if (!syncStates[peerId]) {
			// If the client is not already tracked, we create a new entry in our list and initiate a SyncState
			syncStates[peerId] = Automerge.initSyncState();
		}

		// If the client is already tracked
		// We update its synchronisation status
		// TODO: get patch from here
		const [nextDoc, nextSyncState] = Automerge.receiveSyncMessage(
			doc,
			syncStates[peerId],
			tmpSyncMsg
		);

		// There we update the synchronisation status of the client in our list
		syncStates[peerId] = nextSyncState;
		doc = nextDoc;

		genSyncMessage(peerId);
	});
});

const genSyncMessage = (peerId: string) => {
	const [nextSyncState, syncMessage] = Automerge.generateSyncMessage(doc, syncStates[peerId]);

	// If the client is indeed out of sync and needs an update
	if (syncMessage) {
		console.log(Buffer.from(syncMessage).toString('base64'));

		io.to(peerId).emit('UPDATE_SYNC_STATE', {
			syncMessage: Buffer.from(syncMessage).toString('base64')
		});
	}

	syncStates[peerId] = nextSyncState;
};

const updatePeers = (fromPeerId: string) => {
	Object.keys(syncStates).map((peerIdKey) => {
		// We don't want to send a message to the client that just sent us an update
		if (fromPeerId && fromPeerId === peerIdKey) return;

		let tmpState = null;

		try {
			const [nextSyncState, syncMessage] = Automerge.generateSyncMessage(
				doc,
				syncStates[peerIdKey]
			);

			// If the client is indeed out of sync and needs an update
			if (syncMessage) {
				console.log(Buffer.from(syncMessage).toString('base64'));

				io.to(peerIdKey).emit('update', {
					syncMessage: Buffer.from(syncMessage).toString('base64')
				});
			}

			tmpState = nextSyncState;
		} catch (e) {
			console.log(e);
		}

		// There we update the synchronisation state of the client if he needed an update
		if (tmpState) {
			syncStates[peerIdKey] = tmpState;
		}
	});
};

server.listen(port, () => {
	console.log(`🚀 Server listening on port ${port}`);

	const newDoc = initDocument(doc);
	doc = newDoc;
});
