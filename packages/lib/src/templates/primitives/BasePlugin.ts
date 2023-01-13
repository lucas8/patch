// type Context = AudioContext;
type Context = any;

export abstract class BasePlugin {
	context: Context;

	constructor(context: Context) {
		this.context = context;
	}
}
