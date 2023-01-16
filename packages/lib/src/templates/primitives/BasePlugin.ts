import { Document, Node } from '../../types';

// TODO: hook up event emitter to doc updates
export abstract class BasePlugin {
	private _getDoc: () => Document;

	public getNode<T extends Node>(templateId: string, nodeId: string): T | undefined {
		const doc = this._getDoc();

		return doc.plugins
			?.find((p) => p.templateId === templateId)
			?.nodes?.find((k) => k.id === nodeId) as T;
	}

	protected constructor(getDoc: () => Document) {
		this._getDoc = getDoc;
	}
}
