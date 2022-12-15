import type { Counter, Int, Text } from '@automerge/automerge';

export type TBackendDoc = {
	version: Counter;
	name: Text;
	nodes: Array<{
		type: Text;
		x: Int;
		y: Int;
	}>;
};

export type TFrontendDocNode = {
	type: 'plugin';
	x: number;
	y: number;
};

export type TFrontendDoc = {
	version: number;
	name: string;
	nodes: TFrontendDocNode[];
};
