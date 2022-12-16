import type { Counter } from '@automerge/automerge';

export type TNodeTypes = 'group' | 'socket';

export type TDocNode = {
	id: string;
	type: TNodeTypes;
	x: number;
	y: number;
	nodes?: TDocNode[];
};

export type TDoc = {
	id: string;
	version: Counter;
	name: string;
	nodes: TDocNode[];
};
