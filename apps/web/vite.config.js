import { sveltekit } from '@sveltejs/kit/vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

/** @type {import('vite').UserConfig} */
const config = {
	logLevel: 'info',
	build: {
		minify: false
	},
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
		__RELOAD_SW__: false
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			strategies: 'injectManifest',
			filename: 'prompt-sw.ts',
			scope: '/',
			base: '/',
			manifest: {
				short_name: 'patch',
				name: 'patch',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: []
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		}),
		topLevelAwait(),
		wasm()
	],
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
