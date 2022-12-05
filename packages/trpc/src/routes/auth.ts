import { t } from '../t';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { COOKIE_NAME, createToken } from '../utils/jwt';

export const authRouter = t.router({
	signup: t.procedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string(),
				name: z.string()
			})
		)
		.mutation(async ({ input, ctx }) => {
			const hashedPassword = await hash(input.password, 10);
			const user = await ctx.prisma.user.create({
				data: {
					name: input.name,
					email: input.email,
					passwordHash: hashedPassword
				}
			});

			const token = createToken(user.id);
			ctx.res.cookie(COOKIE_NAME, token, {
				httpOnly: true,
				secure: true,
				signed: true,
				// 30 days
				maxAge: 1000 * 60 * 60 * 24 * 30
			});

			return true;
		})
});
