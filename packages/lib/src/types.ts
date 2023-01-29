import type { Counter } from '@automerge/automerge';

export enum NodeType {
	KNOB = 'knob',
	INGRESS = 'ingress',
	EGRESS = 'egress'
}

export type NodeConfig = {
	name: string;
	x: number;
	y: number;
};
interface _Node<C extends Record<string, unknown>> extends NodeConfig {
	id: string;
	type: NodeType;
	config: C;
}

// ** public document types */

export type KnobConfig = {
	min: number;
	max: number;
	value: number;
};
export interface KnobNode extends _Node<KnobConfig> {
	type: NodeType.KNOB;
}
export type IngressConfig = Record<string, unknown>;
export interface IngressNode extends _Node<IngressConfig> {
	type: NodeType.INGRESS;
}
export type EgressConfig = Record<string, unknown>;
export interface EgressNode extends _Node<EgressConfig> {
	type: NodeType.EGRESS;
}

export type Node = KnobNode | IngressNode | EgressNode;

//** internal document types */

export interface Edge {
	id: string;
	fromNodeId: string;
	toNodeId: string;
	fromPluginId: string;
	toPluginId: string;
}

export type PluginOptions = {
	templateId: string;
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
	backgroundColor: string;
};

export interface Plugin extends PluginOptions {
	id: string;
	nodes: Node[];
}

export interface Document {
	id: string;
	version: Counter;
	name: string;
	plugins: Plugin[];
	edges: Edge[];
}
