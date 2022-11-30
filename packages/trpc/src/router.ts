import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { t } from './t';

import { hello } from './routes/hello';

export const router = t.router({
	hello
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
