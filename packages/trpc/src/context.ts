// import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { inferAsyncReturnType } from '@trpc/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext() {
	return {};
}

export type Context = inferAsyncReturnType<typeof createContext>;
