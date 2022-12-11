import type { Doc } from '@automerge/automerge';

export type TPlugin = {
	type: string;
	x: number;
	y: number;
};

// TODO: rename this
export type PluginDoc = {
	version: number;
	name: string;
	nodes: TPlugin[];
};

export type TDoc = Doc<PluginDoc>;
