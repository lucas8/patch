import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import { initDocument } from './utils/initDocument';
import { Document, cloneTemplate } from '@patch/lib';

const wss = new WebSocketServer({ noServer: true });

(async () => {
	const { Repo } = await (eval('import("automerge-repo")') as Promise<
		typeof import('automerge-repo')
	>);
	const { NodeWSServerAdapter } = await (eval(
		'import("automerge-repo-network-websocket")'
	) as Promise<typeof import('automerge-repo-network-websocket')>);
	const { NodeFSStorageAdapter } = await (eval(
		'import("automerge-repo-storage-nodefs")'
	) as Promise<typeof import('automerge-repo-storage-nodefs')>);

	const config = {
		network: [new NodeWSServerAdapter(wss)],
		storage: new NodeFSStorageAdapter()
	};

	const repo = new Repo(config);

	const doc = repo.create<Document>();
	doc.change((doc) => {
		initDocument(doc);

		// Setting up our document with a basic oscilator plugin
		doc.plugins.push(cloneTemplate('oscilator'));
	});

	console.log(doc.documentId);
})();

const dir = '.amrg';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

const port = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 8080;
const app = express();

app.get('/', (req, res) => {
	res.send('Welcome!');
});

const server = app.listen(port, () => {
	console.log(`🚀 Server listening on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, (socket) => {
		wss.emit('connection', socket, request);
	});
});
