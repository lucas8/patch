import type { PageLoad } from '../../[slug]/$types';

export const load = (({ params }) => {
	return { slug: params.slug };
}) satisfies PageLoad;
