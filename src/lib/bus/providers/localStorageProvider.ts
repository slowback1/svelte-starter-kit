import type IStorageProvider from './IStorageProvider';

export default function getLocalStorageProvider(): IStorageProvider {
	return {
		getItem: localStorage.getItem.bind(localStorage),
		setItem: localStorage.setItem.bind(localStorage),
		getStore: () => {
			let keys = Object.keys(localStorage);

			return keys.reduce((map, key) => {
				map[key] = localStorage.getItem(key);

				return map;
			}, {});
		}
	};
}
