import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { connectDB } from '@patch/db';
import { router, createContext } from '@patch/trpc';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import http from 'http';

const port = parseInt(process.env.PORT || '8080');

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(
	cors({
		origin: process.env.WEB_ORIGIN || 'http://localhost:3000',
		credentials: true
	})
);

app.use(
	'/api/trpc',
	createExpressMiddleware({
		router,
		createContext
	})
);

const handler = applyWSSHandler({ wss, router, createContext });

server.listen(port, () => {
	console.log(`🚀 Server listening on port ${port}`);

	// CONNECT DB
	connectDB();
});

process.on('SIGTERM', () => {
	handler.broadcastReconnectNotification();
	wss.close();
	server.close();
});
