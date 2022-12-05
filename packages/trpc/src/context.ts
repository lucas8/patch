import { prisma } from '@patch/db';
import type { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { COOKIE_NAME, verifyToken } from './utils/jwt';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext({ req, res }: CreateExpressContextOptions) {
	try {
		const token = req.cookies.get(COOKIE_NAME);
		// 👆 or, if we're using HTTP headers based authentication, we could do something like this:
		// const token = event.request.headers.get('authorization')?.replace('Bearer ', '');

		const { id: userId } = verifyToken(token);

		return { prisma, res, req, userId };
	} catch {
		return { userId: null, prisma, res, req };
	}
}

export type Context = inferAsyncReturnType<typeof createContext>;
