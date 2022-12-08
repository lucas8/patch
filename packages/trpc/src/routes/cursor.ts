import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import { z } from 'zod';
import { t } from '../t';

// TODO: replace with redis
const ee = new EventEmitter();

type MousePos = {
	uid: string;
	x: number;
	y: number;
};

export const cursorRouter = t.router({
	listen: t.procedure.input(z.object({ uid: z.string() })).subscription(({ input }) => {
		return observable<MousePos>((emit) => {
			const onAdd = (data: MousePos) => {
				// if (data.uid === input.uid) return;

				emit.next(data);
			};

			ee.on('cursorMove', onAdd);

			return () => {
				ee.off('cursorMove', onAdd);
			};
		});
	}),
	save: t.procedure
		.input(z.object({ x: z.number(), y: z.number(), uid: z.string() }))
		.mutation(async ({ input }) => {
			const pos: MousePos = { x: input.x, y: input.y, uid: input.uid };
			ee.emit('cursorMove', pos);

			return true;
		})
});
