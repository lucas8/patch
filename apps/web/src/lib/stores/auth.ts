import { writable } from 'svelte/store';

export const uid = writable(Date.now().toString(36));
