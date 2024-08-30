import BaseApi from '$lib/api/baseApi';
import { mockApi } from '$lib/testHelpers/getFetchMock';
import { expect } from 'vitest';
import type { APIRequest, IRequestMiddleware } from '$lib/api/middleware/IRequestMiddleware';

class MockMiddleware implements IRequestMiddleware {
	public transformMock = vi.fn();

	async transformRequest(request: APIRequest) {
		this.transformMock(request);

		return request;
	}
}

class TestApi extends BaseApi {
	public mockMiddleware = new MockMiddleware();

	constructor() {
		super();

		this.addMiddleware(this.mockMiddleware);
	}

	async TestGet() {
		return await this.Get('/test');
	}

	async TestDelete() {
		return await this.Delete('/test');
	}

	async TestPost(body: any) {
		return await this.Post('/test', body);
	}

	async TestPut(body: any) {
		return await this.Put('/test', body);
	}
}

describe('BaseApi', () => {
	let api = new TestApi();

	it('calls the correct URL when getting from the API', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestGet();

		expect(mockFetch).toHaveBeenCalled();

		let [url, options] = mockFetch.mock.calls[0];

		expect(url).toContain('test');
		expect(options.method).toEqual('GET');
	});

	it('calls the correct URL when deleting from the API', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestDelete();

		expect(mockFetch).toHaveBeenCalled();

		let [url, options] = mockFetch.mock.calls[0];

		expect(url).toContain('test');
		expect(options.method).toEqual('DELETE');
	});

	it('appends the token as an authorization header when getting from the API', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestGet();

		let options = mockFetch.mock.calls[0][1];

		let authHeader = options.headers['Authorization'];

		expect(authHeader).toBeDefined();
		//TO-DO: update this test with the implementation of  the bearer token
		expect(authHeader).toEqual(`Bearer `);
	});

	it('can post with a post body', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestPost({ msg: 'hi' });

		expect(mockFetch).toHaveBeenCalled();

		let [url, options] = mockFetch.mock.calls[0];

		expect(url).toContain('test');
		expect(JSON.parse(options.body as string).msg).toEqual('hi');
		expect(options.method).toEqual('POST');
	});

	it('posting with a post body has the bearer token', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestPost({ msg: 'hi' });
		let options = mockFetch.mock.calls[0][1];

		let authHeader = options.headers['Authorization'];

		expect(authHeader).toBeDefined();
		//TO-DO: update this test with the implementation of  the bearer token
		expect(authHeader).toEqual(`Bearer `);
	});

	it('can put with a put body', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestPut({ msg: 'hi' });

		expect(mockFetch).toHaveBeenCalled();

		let [url, options] = mockFetch.mock.calls[0];

		expect(url).toContain('test');
		expect(JSON.parse(options.body as string).msg).toEqual('hi');
		expect(options.method).toEqual('PUT');
	});

	it('puting with a put body has the bearer token', async () => {
		let mockFetch = mockApi({
			'/test': 'hello world'
		});

		let result = await api.TestPut({ msg: 'hi' });
		let options = mockFetch.mock.calls[0][1];

		let authHeader = options.headers['Authorization'];

		expect(authHeader).toBeDefined();
		//TO-DO: update this test with the implementation of  the bearer token
		expect(authHeader).toEqual(`Bearer `);
	});

	it('runs the middleware added to the child class', async () => {
		let api = new TestApi();

		await api.TestGet();

		expect(api.mockMiddleware.transformMock).toHaveBeenCalled();
	});
});
