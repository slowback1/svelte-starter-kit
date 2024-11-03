import type { APIRequest, IRequestMiddleware } from '$lib/api/middleware/IRequestMiddleware';
import AuthorizationMiddleware from '$lib/api/middleware/AuthorizationMiddleware';
import UrlMiddleware from '$lib/api/middleware/UrlMiddleware';
import HeaderMiddleware from '$lib/api/middleware/HeaderMiddleware';
import UrlEncodingMiddleware from '$lib/api/middleware/UrlEncodingMiddleware';

export type RequestParameters = RequestInit & { queryParameters?: Record<string, string> };

export default abstract class BaseApi {
	private readonly middlewares: IRequestMiddleware[] = [];
	protected constructor() {
		this.addMiddleware(new UrlMiddleware());
		this.addMiddleware(new HeaderMiddleware());
		this.addMiddleware(new AuthorizationMiddleware());
		this.addMiddleware(new UrlEncodingMiddleware());
	}

	protected addMiddleware(middleware: IRequestMiddleware) {
		this.middlewares.push(middleware);
	}

	private async request<T>(url: string, request: RequestParameters = {}): Promise<T> {
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

	private getApiRequest(url: string, request: RequestParameters): APIRequest {
		return {
			body: request.body,
			headers: {},
			method: request.method ?? HTTP_METHODS.GET,
			url: url,
			queryParameters: request.queryParameters ?? {}
		};
	}

	private buildPostyRequestInit(
		body: any,
		method: string,
		queryParameters: Record<string, string>
	): RequestParameters {
		let stringifedBody = this.stringifyBody(body);

		return {
			body: stringifedBody,
			method: method,
			queryParameters
		};
	}

	private stringifyBody(body: any) {
		if (typeof body === 'string') return body;

		return JSON.stringify(body);
	}

	protected async Get<T>(url: string, queryParameters: Record<string, string> = {}): Promise<T> {
		return await this.request<T>(url, { queryParameters });
	}

	protected async Post<T>(
		url: string,
		body: any,
		queryParameters: Record<string, string> = {}
	): Promise<T> {
		return this.request<T>(
			url,
			this.buildPostyRequestInit(body, HTTP_METHODS.POST, queryParameters)
		);
	}

	protected async Put<T>(
		url: string,
		body: any,
		queryParameters: Record<string, string> = {}
	): Promise<T> {
		return this.request<T>(
			url,
			this.buildPostyRequestInit(body, HTTP_METHODS.PUT, queryParameters)
		);
	}

	protected async Delete<T>(url: string, queryParameters: Record<string, string> = {}): Promise<T> {
		return this.request<T>(url, { method: HTTP_METHODS.DELETE, queryParameters });
	}
}

const HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};
