import type { Counter } from '@automerge/automerge';

export enum NodeType {
	KNOB = 'knob',
	INGRESS = 'ingress',
	EGRESS = 'egress'
}

interface _Node<C extends Record<string, unknown>> {
	id: string;
	type: NodeType;
	name: string;
	x: number;
	y: number;
	config: C;
}

export interface KnobNode
	extends _Node<{
		min: number;
		max: number;
		value: number;
	}> {
	type: NodeType.KNOB;
}
export interface IngressNode extends _Node<Record<string, never>> {
	type: NodeType.INGRESS;
}
export interface EgressNode extends _Node<Record<string, never>> {
	type: NodeType.EGRESS;
}

export type Node = KnobNode | IngressNode | EgressNode;

//** internal document types */

export interface Edge {
	id: string;
	fromNodeId: string;
	toNodeId: string;
	fromSocketId: string;
	toSocketId: string;
}

export interface Plugin {
	id: string;
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
	nodes: Node[];
}

export interface Document {
	id: string;
	version: Counter;
	name: string;
	plugins: Plugin[];
	edges: Edge[];
}
