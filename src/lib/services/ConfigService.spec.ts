import { beforeEach, vi } from 'vitest';
import { getFetchMock } from '$lib/testHelpers/getFetchMock';
import ConfigService, { type ApplicationConfig } from '$lib/services/ConfigService';
import { waitFor } from '@testing-library/svelte';
import MessageBus from '$lib/bus/MessageBus';
import { Messages } from '$lib/bus/Messages';

describe('ConfigService', () => {
	describe('initializing', () => {
		let mockFetch = vi.fn();

		beforeEach(async () => {
			const exampleConfig: ApplicationConfig = {
				baseUrl: 'value'
			};

			mockFetch = getFetchMock(exampleConfig);

			ConfigService.initialize();
		});

		it('calls fetch for the correct url', async () => {
			await waitFor(() => {
				expect(mockFetch).toHaveBeenCalled();

				let url = mockFetch.mock.calls[0][0];

				expect(url).toContain('/config/config.json');
			});
		});

		it('passes the config into the message bus', async () => {
			await waitFor(() => {
				let lastMessage = MessageBus.getLastMessage<ApplicationConfig>(Messages.ApplicationConfig);

				expect(lastMessage.baseUrl).toEqual('value');
			});
		});
	});

	describe('getting config from the service', () => {
		let service: ConfigService;

		beforeEach(() => {
			MessageBus.sendMessage(Messages.ApplicationConfig, { baseUrl: 'value' });

			service = new ConfigService();
		});

		it('can get the config from the message bus', () => {
			let result = service.getConfig('baseUrl');

			expect(result).toEqual('value');
		});
	});
});
