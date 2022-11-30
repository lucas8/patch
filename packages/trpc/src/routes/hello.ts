import { prisma } from '@patch/db';
import { z } from 'zod';
import { t } from '../t';

export const hello = t.router({
	hello: t.procedure.input(z.string()).query(async (req) => {
		const userCount = await prisma.user.count();

		return `Hello ${req.input}! There are ${userCount} users in the database.`;
	})
});
