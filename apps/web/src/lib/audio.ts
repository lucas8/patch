import { browser } from '$app/environment';
import { getTemplate, type Plugin } from '@patch/lib';
import { doc } from '$lib/stores/doc';
import { get } from 'svelte/store';

export class AudioManager {
	context: AudioContext;

	private instances: Array<any> = [];

	constructor() {
		this.context = new AudioContext();
	}

	createPluginInstances(plugins: Plugin[]) {
		return plugins.map((p) => {
			if (p.templateId) {
				const tClass = getTemplate(p.templateId);

				if (!tClass) return;

				const instance = new tClass(() => get(doc)!);
				this.instances.push(instance);
			}
			console.log(this.instances);
		});
	}
}

export const audioManager = browser ? new AudioManager() : undefined;
