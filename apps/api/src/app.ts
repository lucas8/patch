import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { connectDB } from '@patch/db';
import { router, createContext } from '@patch/trpc';

const app = express();
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

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`🚀 Server listening on port ${port}`);

	// CONNECT DB
	connectDB();
});
