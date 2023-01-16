import { Document } from '../../types';

export abstract class BasePlugin {
	// getValue: (doc: (doc: Document) => any) => any = () => 0;
	private getDoc: () => Document;

	get doc() {
		return this.getDoc();
	}

	// constructor(getValue: (doc: (doc: Document) => any) => any) {
	// 	this.getValue = getValue;
	// }

	constructor(getDoc: () => Document) {
		this.getDoc = getDoc;
	}
}
