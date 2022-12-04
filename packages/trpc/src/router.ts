import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { t } from './t';

import { cursorRouter } from './routes';

export const router = t.router({
	cursorRouter
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
