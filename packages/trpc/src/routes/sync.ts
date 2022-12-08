import type { Box } from '@patch/db';
import { t } from '../t';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';

const SYNC_SYMBOL = Symbol();

const SYNC_ACTIONS = ['U', 'I'] as const;

const ee = new EventEmitter();

export const syncRouter = t.router({
	listen: t.procedure.subscription(() => {
		return observable<Box>((emit) => {
			const onAdd = (data: Box) => {
				emit.next(data);
			};

			ee.on(SYNC_SYMBOL, onAdd);

			return () => {
				ee.off(SYNC_SYMBOL, onAdd);
			};
		});
	}),
	create: t.procedure
		.input(
			z.object({
				boxId: z.string().uuid(),
				action: z.enum(SYNC_ACTIONS),
				data: z.object({ x: z.number(), y: z.number() })
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { boxId, action, data } = input;

			const update = await ctx.prisma.$transaction(async (tx) => {
				await tx.syncUpdate.create({
					data: { action, boxId, ...data }
				});

				const updatedBox = await tx.box.update({ where: { id: boxId }, data: { ...data } });

				return updatedBox;
			});

			ee.emit(SYNC_SYMBOL, update);

			return update;
		})
});
