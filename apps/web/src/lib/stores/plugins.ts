import { writable } from 'svelte/store';
import type { TPlugin } from '$lib/types';

export const plugins = writable<TPlugin[]>([{ x: 200, y: 200, width: 200, height: 100 }]);
