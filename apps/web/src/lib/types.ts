import type { Counter, Int, Text } from '@automerge/automerge';

export type TPlugin = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type PluginDoc = {
	version: Counter;
	name: Text;
	nodes: { type: Text; x: Int; y: Int }[];
};
