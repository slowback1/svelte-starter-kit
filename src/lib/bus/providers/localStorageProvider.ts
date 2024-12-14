import type IStorageProvider from './IStorageProvider';

export default class LocalStorageProvider implements IStorageProvider {
	getItem(key: string) {
		return localStorage.getItem(key);
	}

	setItem(key: string, value: any) {
		localStorage.setItem(key, value);
	}

	getStore() {
		let keys = Object.keys(localStorage);

		return keys.reduce((map, key) => {
			map[key] = localStorage.getItem(key);

			return map;
		}, {});
	}
}
