import { getFetchMock, mockApi } from '$lib/testHelpers/getFetchMock';
import { afterEach, beforeEach } from 'vitest';

describe('fetch mocking', () => {
	let realFetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

	beforeEach(() => {
		realFetch = global.fetch;
	});

	afterEach(() => {
		global.fetch = realFetch;
	});

	async function fetchAndJson(route: string) {
		return await fetch(route).then((res) => res.json());
	}

	describe('getFetchMock', () => {
		it('returns the response for json', async () => {
			let mock = getFetchMock('hello world');

			let result = await fetchAndJson('/test');

			expect(result).toEqual('hello world');
		});

		it('returns the response for text', async () => {
			let mock = getFetchMock('hello world');

			let result = await fetch('/test').then((res) => res.text());

			expect(result).toEqual('hello world');
		});

		it('returns the correct mock that functions for testing', async () => {
			let mock = getFetchMock('hello world');

			let result = await fetchAndJson('/test');

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

	describe('mockApi', () => {
		it('returns the response json when given the correct url', async () => {
			let mock = mockApi({ test: 'hello world' });

			let result = await fetchAndJson('test');

			expect(result).toEqual('hello world');
		});

		it('returns the correct value when the map has more than one route', async () => {
			let mock = mockApi({
				test: 'hello world',
				test2: 'value'
			});

			let result = await fetchAndJson('test2');

			expect(result).toEqual('value');
		});

		it('will properly normalize routes', async () => {
			let mock = mockApi({
				TEST: 'hello world'
			});

			let result = await fetchAndJson('test');

			expect(result).toEqual('hello world');
		});

		it('will ignore a leading / in the route when matching routes', async () => {
			let mock = mockApi({
				'/test': 'hello world'
			});

			let result = await fetchAndJson('test');

			expect(result).toEqual('hello world');
		});

		it('will ignore a leading / in the given url when matching routes', async () => {
			let mock = mockApi({
				test: 'hello world'
			});

			let result = await fetchAndJson('/test');

			expect(result).toEqual('hello world');
		});

		it('will ignore a trailing / in the  given url when matching routes', async () => {
			let mock = mockApi({
				'/test/': 'hello world'
			});

			let result = await fetchAndJson('test');

			expect(result).toEqual('hello world');
		});

		it('Considers a * as a wildcard when matching routes', async () => {
			let mock = mockApi({
				'/test/*': 'hello world'
			});

			let result = await fetchAndJson('/test/1');

			expect(result).toEqual('hello world');
		});

		it('can return a custom status', async () => {
			let status: number;
			let mock = mockApi({
				'/test/': { response: 'hello world', status: 123 }
			});

			let result = await fetch('test').then((res) => {
				status = res.status;
			});

			expect(status).toEqual(123);
		});

		it('the returned status is 200 by default', async () => {
			let status: number;
			let mock = mockApi({
				'/test/': 'hello world'
			});

			let result = await fetch('test').then((res) => {
				status = res.status;
			});

			expect(status).toEqual(200);
		});

		it('throws an error if there are no matches', async () => {
			let mock = mockApi({
				'/test': 'hello world'
			});

			let itThrew = false;

			let result = await fetchAndJson('/not-a-url').catch((err) => {
				itThrew = true;
			});

			expect(itThrew).toEqual(true);
		});

		it('the error it throws indicates the reason why it threw', async () => {
			let mock = mockApi({
				'/test': 'hello world'
			});

			let itThrew = false;
			let errorMessage: string;

			let result = await fetchAndJson('/not-a-url').catch((err: Error) => {
				itThrew = true;
				errorMessage = err.message;
			});

			expect(itThrew).toEqual(true);
			expect(errorMessage).toContain("Invalid URL: '/not-a-url'");
		});

		it('correct calls the mock', async () => {
			let mock = mockApi({
				'/test': 'hello world'
			});

			await fetchAndJson('test');

			expect(mock).toHaveBeenCalled();
		});
	});
});
