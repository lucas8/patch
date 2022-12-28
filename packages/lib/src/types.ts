import type { Counter } from '@automerge/automerge';

export type TNodeTypes = 'group' | 'socket';

export type TDocNode = {
	id: string;
	type: TNodeTypes;
	x: number;
	y: number;
	nodes?: TDocNode[];
};

export type TDocEdge = {
	id: string;
	fromNodeId: string;
	fromSocketId: string;
	toNodeId: string;
	toSocketId: string;
};

export type TDoc = {
	id: string;
	version: Counter;
	name: string;
	nodes: TDocNode[];
	edges: TDocEdge[];
};
