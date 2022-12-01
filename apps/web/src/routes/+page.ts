import type { PageData } from './$types';
import { trpc } from '$lib/trpc';

// 👇 this method will be invoked on BOTH the server and the client, as needed ⚠️
export const load: PageData = () => ({
	hello: trpc.hello.hello.query('lucas')
});
