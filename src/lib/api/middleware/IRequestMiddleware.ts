export type APIRequest = {
	url: string;
	method: string;
	headers: Record<string, string>;
	body?: any;
};

export interface IRequestMiddleware {
	transformRequest(request: APIRequest): Promise<APIRequest>;
}
