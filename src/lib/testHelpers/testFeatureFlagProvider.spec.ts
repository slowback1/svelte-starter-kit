import TestFeatureFlagProvider, {
	createTestFeatureFlag
} from '$lib/testHelpers/testFeatureFlagProvider';

describe('testFeatureFlagProvider', () => {
	it('returns the given feature flags', async () => {
		let featureFlags = [createTestFeatureFlag('test1'), createTestFeatureFlag('test2', false)];

		let provider = new TestFeatureFlagProvider(featureFlags);

		let result = await provider.getFeatureFlags();

		expect(result).toEqual(featureFlags);
	});

	it('the getFeatureFlags method is a mock that can be asserted against', async () => {
		let featureFlags = [createTestFeatureFlag('test1'), createTestFeatureFlag('test2', false)];

		let provider = new TestFeatureFlagProvider(featureFlags);

		let result = await provider.getFeatureFlags();

		expect(result).toEqual(featureFlags);
		expect(provider.getFeatureFlagsMock).toHaveBeenCalled();
	});
});
