export type APIRequest = {
	url: string;
	method: string;
	headers: Record<string, string>;
	body?: any;
};

let a = fetch('');

export interface IRequestMiddleware {
	transformRequest(request: APIRequest): Promise<APIRequest>;
}
