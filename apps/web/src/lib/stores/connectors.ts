import { writable } from 'svelte/store';

type Connector = {
	p1x: number;
	p1y: number;
	p2x: number;
	p2y: number;
};

export const connectors = writable<Record<string, Connector>>({});
