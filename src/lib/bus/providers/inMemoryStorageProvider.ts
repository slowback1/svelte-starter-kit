import type IStorageProvider from '$lib/bus/providers/IStorageProvider';

export default class InMemoryStorageProvider implements IStorageProvider {
	private store: Record<string, never> = {};

	getItem(key: string) {
		return this.store[key];
	}

	setItem(key: string, value: never) {
		this.store[key] = value;
	}

	getStore() {
		return this.store;
	}
}
