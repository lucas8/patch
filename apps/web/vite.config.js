import { sveltekit } from '@sveltejs/kit/vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

/** @type {import('vite').UserConfig} */
const config = {
	logLevel: 'info',
	plugins: [sveltekit(), topLevelAwait(), wasm()],
	worker: {
		format: 'es',
		plugins: [wasm(), topLevelAwait()]
	},
	optimizeDeps: {
		exclude: [
			'@automerge/automerge-wasm',
			'@automerge/automerge-wasm/bundler/bindgen_bg.wasm',
			'@syntect/wasm'
		]
	},
	server: {
		fs: {
			strict: false
		}
	}
};

export default config;
