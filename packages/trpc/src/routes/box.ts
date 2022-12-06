import { t } from '../t';

// TODO: add width and height
export const boxRouter = t.router({
	/* Bootstrap client with the boxes in the db */
	list: t.procedure.query(async ({ ctx }) => {
		return await ctx.prisma.box.findMany();
	})
});
