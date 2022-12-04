import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import { z } from 'zod';
import { t } from '../t';

// TODO: replace with redis
const ee = new EventEmitter();

type MousePos = {
	name: string;
	x: number;
	y: number;
};

export const cursorRouter = t.router({
	cursorListen: t.procedure.input(z.object({ name: z.string() })).subscription(({ input }) => {
		return observable<MousePos>((emit) => {
			const onAdd = (data: MousePos) => {
				// if (data.name === input.name) return;

				emit.next(data);
			};

			ee.on('cursorMove', onAdd);

			return () => {
				ee.off('cursorMove', onAdd);
			};
		});
	}),
	cursorMove: t.procedure
		.input(z.object({ x: z.number(), y: z.number(), name: z.string() }))
		.mutation(async ({ input }) => {
			const pos: MousePos = { x: input.x, y: input.y, name: input.name };
			ee.emit('cursorMove', pos);

			return true;
		})
});
