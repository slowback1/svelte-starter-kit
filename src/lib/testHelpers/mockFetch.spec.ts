import { getFetchMock } from '$lib/testHelpers/getFetchMock';

describe('mockFetch', () => {
	it('returns the response for json', async () => {
		let mock = getFetchMock('hello world');

		let result = await fetch('/test').then((res) => res.json());

		expect(result).toEqual('hello world');
	});

	it('returns the response for text', async () => {
		let mock = getFetchMock('hello world');

		let result = await fetch('/test').then((res) => res.text());

		expect(result).toEqual('hello world');
	});

	it('returns the correct mock that functions for testing', async () => {
		let mock = getFetchMock('hello world');

		let result = await fetch('/test').then((res) => res.json());

		expect(mock).toHaveBeenCalled();
	});

	it('can customize the status that is returned', async () => {
		let mock = getFetchMock('hello world', 345);

		let status: number;

		let result = await fetch('/test').then((res) => {
			status = res.status;
			return res.json();
		});

		expect(status).toEqual(345);
	});
});
