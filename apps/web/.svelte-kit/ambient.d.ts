// this file is generated — do not edit it

/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 *
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 *
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 *
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 *
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 *
 * You can override `.env` values from the command line like so:
 *
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const npm_package_devDependencies_lint_staged: string;
	export const NVM_INC: string;
	export const npm_package_devDependencies_prettier: string;
	export const MANPATH: string;
	export const TERM_PROGRAM: string;
	export const NODE: string;
	export const INIT_CWD: string;
	export const npm_config_version_git_tag: string;
	export const npm_package_prisma_schema: string;
	export const NVM_CD_FLAGS: string;
	export const _P9K_TTY: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const TERM: string;
	export const SHELL: string;
	export const npm_package_devDependencies_vite: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_config_init_license: string;
	export const npm_package_scripts_lint: string;
	export const npm_package_lint_staged_packages_ui_______js_ts_jsx_tsx__0: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const TERM_SESSION_ID: string;
	export const npm_config_registry: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies_svelte_preprocess: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_scripts_generate: string;
	export const ZSH: string;
	export const npm_package_readmeFilename: string;
	export const npm_package_devDependencies__patch_config: string;
	export const NVM_DIR: string;
	export const USER: string;
	export const npm_package_scripts_check_watch: string;
	export const COMMAND_MODE: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_turbo: string;
	export const npm_execpath: string;
	export const npm_package_devDependencies_tslib: string;
	export const PAGER: string;
	export const npm_package_devDependencies_svelte: string;
	export const LSCOLORS: string;
	export const npm_config_argv: string;
	export const PATH: string;
	export const _: string;
	export const npm_config_engine_strict: string;
	export const __CFBundleIdentifier: string;
	export const PWD: string;
	export const npm_package_lint_staged_apps_______js_ts_jsx_tsx__0: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_lint_staged___json_0: string;
	export const npm_lifecycle_event: string;
	export const P9K_SSH: string;
	export const npm_package_name: string;
	export const npm_package_packageManager: string;
	export const P9K_TTY: string;
	export const LANG: string;
	export const npm_package_scripts_db_start: string;
	export const ITERM_PROFILE: string;
	export const npm_config_version_commit_hooks: string;
	export const npm_package_scripts_build: string;
	export const TURBO_HASH: string;
	export const XPC_FLAGS: string;
	export const npm_config_bin_links: string;
	export const npm_package_scripts_db_migrate_deploy: string;
	export const npm_package_engines_node: string;
	export const npm_config_wrap_output: string;
	export const npm_package_version: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const SHLVL: string;
	export const HOME: string;
	export const COLORFGBG: string;
	export const npm_package_type: string;
	export const npm_config_strict_ssl: string;
	export const npm_config_save_prefix: string;
	export const npm_package_scripts_db_push: string;
	export const LC_TERMINAL_VERSION: string;
	export const npm_config_version_git_message: string;
	export const npm_package_devDependencies_husky: string;
	export const HOMEBREW_PREFIX: string;
	export const ITERM_SESSION_ID: string;
	export const npm_package_scripts_format: string;
	export const YARN_WRAP_OUTPUT: string;
	export const LESS: string;
	export const LOGNAME: string;
	export const npm_lifecycle_script: string;
	export const NVM_BIN: string;
	export const npm_config_user_agent: string;
	export const npm_config_ignore_scripts: string;
	export const npm_config_version_git_sign: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const LC_TERMINAL: string;
	export const npm_package_scripts_prepare: string;
	export const npm_config_ignore_optional: string;
	export const npm_config_init_version: string;
	export const npm_config_init_author_name: string;
	export const npm_package_workspaces_0: string;
	export const npm_package_scripts_check: string;
	export const npm_config_version_tag_prefix: string;
	export const npm_package_workspaces_1: string;
	export const npm_node_execpath: string;
	export const COLORTERM: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 *
 * Values are replaced statically at build time.
 *
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 *
 * This module cannot be imported into client-side code.
 *
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 *
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		npm_package_devDependencies_lint_staged: string;
		NVM_INC: string;
		npm_package_devDependencies_prettier: string;
		MANPATH: string;
		TERM_PROGRAM: string;
		NODE: string;
		INIT_CWD: string;
		npm_config_version_git_tag: string;
		npm_package_prisma_schema: string;
		NVM_CD_FLAGS: string;
		_P9K_TTY: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		TERM: string;
		SHELL: string;
		npm_package_devDependencies_vite: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_config_init_license: string;
		npm_package_scripts_lint: string;
		npm_package_lint_staged_packages_ui_______js_ts_jsx_tsx__0: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		TERM_SESSION_ID: string;
		npm_config_registry: string;
		npm_package_private: string;
		npm_package_devDependencies_svelte_preprocess: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_scripts_generate: string;
		ZSH: string;
		npm_package_readmeFilename: string;
		npm_package_devDependencies__patch_config: string;
		NVM_DIR: string;
		USER: string;
		npm_package_scripts_check_watch: string;
		COMMAND_MODE: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_turbo: string;
		npm_execpath: string;
		npm_package_devDependencies_tslib: string;
		PAGER: string;
		npm_package_devDependencies_svelte: string;
		LSCOLORS: string;
		npm_config_argv: string;
		PATH: string;
		_: string;
		npm_config_engine_strict: string;
		__CFBundleIdentifier: string;
		PWD: string;
		npm_package_lint_staged_apps_______js_ts_jsx_tsx__0: string;
		npm_package_scripts_preview: string;
		npm_package_lint_staged___json_0: string;
		npm_lifecycle_event: string;
		P9K_SSH: string;
		npm_package_name: string;
		npm_package_packageManager: string;
		P9K_TTY: string;
		LANG: string;
		npm_package_scripts_db_start: string;
		ITERM_PROFILE: string;
		npm_config_version_commit_hooks: string;
		npm_package_scripts_build: string;
		TURBO_HASH: string;
		XPC_FLAGS: string;
		npm_config_bin_links: string;
		npm_package_scripts_db_migrate_deploy: string;
		npm_package_engines_node: string;
		npm_config_wrap_output: string;
		npm_package_version: string;
		XPC_SERVICE_NAME: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_svelte_check: string;
		SHLVL: string;
		HOME: string;
		COLORFGBG: string;
		npm_package_type: string;
		npm_config_strict_ssl: string;
		npm_config_save_prefix: string;
		npm_package_scripts_db_push: string;
		LC_TERMINAL_VERSION: string;
		npm_config_version_git_message: string;
		npm_package_devDependencies_husky: string;
		HOMEBREW_PREFIX: string;
		ITERM_SESSION_ID: string;
		npm_package_scripts_format: string;
		YARN_WRAP_OUTPUT: string;
		LESS: string;
		LOGNAME: string;
		npm_lifecycle_script: string;
		NVM_BIN: string;
		npm_config_user_agent: string;
		npm_config_ignore_scripts: string;
		npm_config_version_git_sign: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		LC_TERMINAL: string;
		npm_package_scripts_prepare: string;
		npm_config_ignore_optional: string;
		npm_config_init_version: string;
		npm_config_init_author_name: string;
		npm_package_workspaces_0: string;
		npm_package_scripts_check: string;
		npm_config_version_tag_prefix: string;
		npm_package_workspaces_1: string;
		npm_node_execpath: string;
		COLORTERM: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: string]: string | undefined;
	};
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 *
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 *
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	};
}
