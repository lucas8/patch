import { prisma } from '@patch/db';
import type { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext({ req, res }: CreateExpressContextOptions) {
	return { prisma, res, req };
}

export type Context = inferAsyncReturnType<typeof createContext>;
