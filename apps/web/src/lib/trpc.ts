import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { Router } from '@patch/trpc';

export const trpc = createTRPCProxyClient<Router>({
	links: [
		httpBatchLink({
			// TODO: make env vars work
			url: 'http://localhost:8080/api/trpc'
		})
	]
});
