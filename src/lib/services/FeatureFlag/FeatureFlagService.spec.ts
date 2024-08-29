import TestFeatureFlagProvider, {
	createTestFeatureFlag
} from '$lib/testHelpers/testFeatureFlagProvider';
import FeatureFlagService from '$lib/services/FeatureFlag/FeatureFlagService';

describe('FeatureFlagService', () => {
	describe('initializing', () => {
		it('calls the provider to get the feature flags', async () => {
			let provider = new TestFeatureFlagProvider([]);

			await FeatureFlagService.initialize(provider);

			expect(provider.getFeatureFlagsMock).toHaveBeenCalled();
		});

		it('saves the feature flags from the provider', async () => {
			let featureFlags = [createTestFeatureFlag('test1'), createTestFeatureFlag('test2', false)];
			let provider = new TestFeatureFlagProvider(featureFlags);

			await FeatureFlagService.initialize(provider);

			expect(FeatureFlagService.featureFlags).toEqual(featureFlags);
		});

		it("doesn't error out if the provider returns an error", async () => {
			let provider = new TestFeatureFlagProvider([]);
			provider.getFeatureFlagsMock = vi.fn(() => {
				return Promise.reject('error');
			});

			expect(async () => {
				await FeatureFlagService.initialize(provider);
			}).not.toThrow();
		});

		it('sets the feature flags to an empty array if the provider returns an error', async () => {
			let provider = new TestFeatureFlagProvider([]);
			provider.getFeatureFlagsMock = vi.fn(() => {
				return Promise.reject('error');
			});

			await FeatureFlagService.initialize(provider);

			expect(FeatureFlagService.featureFlags).toEqual([]);
		});
	});

	describe('checking if a feature is enabled', () => {
		beforeEach(async () => {
			let provider = new TestFeatureFlagProvider([
				createTestFeatureFlag('test1'),
				createTestFeatureFlag('test2', false)
			]);

			await FeatureFlagService.initialize(provider);
		});

		it.each([
			[{ featureFlagName: 'test1', shouldBeEnabled: true }],
			[{ featureFlagName: 'test2', shouldBeEnabled: false }],
			[{ featureFlagName: 'test3', shouldBeEnabled: false }]
		])(
			'When the feature flag is %featureFlagName% then it should be %shouldBeEnabled%',
			({ featureFlagName, shouldBeEnabled }) => {
				let result = FeatureFlagService.isFeatureEnabled(featureFlagName);

				expect(result).toEqual(shouldBeEnabled);
			}
		);
	});
});
