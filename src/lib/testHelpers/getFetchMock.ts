export function getFetchMock(response: any, status: number = 200) {
	let mock = vi.fn(() => {
		return Promise.resolve({
			json(): Promise<any> {
				return Promise.resolve(response);
			},
			text(): Promise<string> {
				return Promise.resolve(response);
			},
			status: status
		} as any);
	});

	global.fetch = mock;

	return mock;
}
