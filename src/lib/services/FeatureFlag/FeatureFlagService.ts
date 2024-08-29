import type IFeatureFlagProvider from '$lib/services/FeatureFlag/IFeatureFlagProvider';
import type { FeatureFlag } from '$lib/services/FeatureFlag/IFeatureFlagProvider';

export default class FeatureFlagService {
	public static featureFlags: FeatureFlag[] = [];

	public static async initialize(provider: IFeatureFlagProvider) {
		this.featureFlags = await provider.getFeatureFlags().catch(() => []);
	}

	public static isFeatureEnabled(featureFlagName: string): boolean {
		let featureFlag = this.featureFlags.find((flag) => flag.name === featureFlagName);

		return featureFlag?.isEnabled ?? false;
	}
}
