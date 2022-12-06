import { trpc } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	boxes: trpc.box.list.query()
});
