import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { t } from './t';

import { cursorsRouter } from './routes';

export const router = t.router({
	cursors: cursorsRouter
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
