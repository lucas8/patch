import { createTRPCProxyClient, httpBatchLink, createWSClient, wsLink } from '@trpc/client';
import type { Router } from '@patch/trpc';
import superjson from 'superjson';

function getEndingLink() {
	if (typeof window === 'undefined') {
		return httpBatchLink({
			url: `${import.meta.env.VITE_APP_API_URL}/api/trpc`
		});
	}
	const client = createWSClient({
		url: import.meta.env.VITE_APP_WS_URL
	});

	return wsLink<Router>({
		client
	});
}

export const trpc = createTRPCProxyClient<Router>({
	links: [getEndingLink()],
	transformer: superjson
});
