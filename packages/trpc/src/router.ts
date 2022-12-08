import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { t } from './t';
import { boxRouter, cursorRouter, syncRouter } from './routes';

export const router = t.router({
	cursor: cursorRouter,
	box: boxRouter,
	sync: syncRouter
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
