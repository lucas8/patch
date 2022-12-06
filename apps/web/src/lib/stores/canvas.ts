import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const width = writable(browser ? globalThis.window.innerWidth : undefined);
export const height = writable(browser ? globalThis.window.innerHeight : undefined);
