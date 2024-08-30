import type { APIRequest, IRequestMiddleware } from '$lib/api/middleware/IRequestMiddleware';
import AuthorizationMiddleware from '$lib/api/middleware/AuthorizationMiddleware';
import UrlMiddleware from '$lib/api/middleware/UrlMiddleware';
import HeaderMiddleware from '$lib/api/middleware/HeaderMiddleware';

export default abstract class BaseApi {
	private readonly middlewares: IRequestMiddleware[] = [];
	protected constructor() {
		this.addMiddleware(new UrlMiddleware());
		this.addMiddleware(new HeaderMiddleware());
		this.addMiddleware(new AuthorizationMiddleware());
	}

	protected addMiddleware(middleware: IRequestMiddleware) {
		this.middlewares.push(middleware);
	}

	private async request<T>(url: string, request: RequestInit = {}): Promise<T> {
		let apiRequest = this.getApiRequest(url, request);

		apiRequest = await this.runMiddlewares(apiRequest);

		let res = await this.runRequest(apiRequest);

		return res.json();
	}

	private async runRequest(request: APIRequest): Promise<Response> {
		let options: RequestInit = {
			method: request.method,
			headers: {
				...request.headers
			}
		};

		if (request.body) {
			options.body = this.stringifyBody(request.body);
		}

		return await fetch(request.url, options);
	}

	private async runMiddlewares(request: APIRequest): Promise<APIRequest> {
		let transformedRequest = request;

		for (let middleware of this.middlewares) {
			transformedRequest = await middleware.transformRequest(transformedRequest);
		}

		return transformedRequest;
	}

	private getApiRequest(url: string, request: RequestInit): APIRequest {
		return {
			body: request.body,
			headers: {},
			method: request.method ?? HTTP_METHODS.GET,
			url: url
		};
	}

	private buildPostyRequestInit(body: any, method: string): RequestInit {
		let stringifedBody = this.stringifyBody(body);

		return {
			body: stringifedBody,
			method: method
		};
	}

	private stringifyBody(body: any) {
		if (typeof body === 'string') return body;

		return JSON.stringify(body);
	}

	protected async Get<T>(url: string): Promise<T> {
		return await this.request<T>(url);
	}

	protected async Post<T>(url: string, body: any): Promise<T> {
		return this.request<T>(url, this.buildPostyRequestInit(body, HTTP_METHODS.POST));
	}

	protected async Put<T>(url: string, body: any): Promise<T> {
		return this.request<T>(url, this.buildPostyRequestInit(body, HTTP_METHODS.PUT));
	}

	protected async Delete<T>(url: string): Promise<T> {
		return this.request<T>(url, { method: HTTP_METHODS.DELETE });
	}
}

const HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};
