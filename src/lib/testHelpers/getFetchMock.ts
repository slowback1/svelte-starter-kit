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

function normalizeRoute(route: string) {
	let normalized = route.toLowerCase();

	if (normalized.startsWith('/')) normalized = normalized.slice(1);
	if (normalized.endsWith('/')) normalized = normalized.slice(0, -1);

	return normalized;
}

function compareRoutes(sourceRoute: string, searchUrl: string) {
	let normalizedFirst = normalizeRoute(sourceRoute);
	let normalizedSecond = normalizeRoute(searchUrl);

	if (sourceRoute.includes('*')) return compareWildcards(sourceRoute, searchUrl);

	return normalizedFirst == normalizedSecond;
}

function compareWildcards(wildcard: string, search: string) {
	let beforeWildcard = wildcard.substring(0, wildcard.indexOf('*'));
	let equivalentSearchString = search.substring(0, wildcard.indexOf('*'));

	return compareRoutes(beforeWildcard, equivalentSearchString);
}
type MockApiMap = { [route: string]: any | { response: any; status: number } };

function getMatchedResponse(url: string, map: MockApiMap) {
	let lowerUrl = url.toLowerCase();

	let routes = Object.keys(map);

	let matchedRoute = routes.find((route) => compareRoutes(route, lowerUrl));
	return map[matchedRoute];
}

export function mockApi(map: MockApiMap) {
	let mock = vi.fn((url: string) => {
		let matchedResponse = getMatchedResponse(url, map);

		if (!matchedResponse) throw new Error(`Invalid URL: '${url}'`);

		let response = matchedResponse;
		let status = 200;

		const isStatusResponse = !!matchedResponse.status && !!matchedResponse.response;

		if (isStatusResponse) {
			response = matchedResponse.response;
			status = matchedResponse.status;
		}

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
