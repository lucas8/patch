import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { Router } from '@patch/trpc';

export const trpc = createTRPCProxyClient<Router>({
	links: [
		httpBatchLink({
			url: import.meta.env.VITE_APP_API_URL + '/trpc' || 'http://localhost:8080/trpc'
		})
	]
});
