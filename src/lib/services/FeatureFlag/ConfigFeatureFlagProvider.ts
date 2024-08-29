import type { FeatureFlag } from '$lib/services/FeatureFlag/IFeatureFlagProvider';
import type IFeatureFlagProvider from '$lib/services/FeatureFlag/IFeatureFlagProvider';
import ConfigService from '$lib/services/Config/ConfigService';

export default class ConfigFeatureFlagProvider implements IFeatureFlagProvider {
	getFeatureFlags(): Promise<FeatureFlag[]> {
		return Promise.resolve(this.getFeatureFlagFromConfig());
	}

	private getFeatureFlagFromConfig(): FeatureFlag[] {
		let configService = new ConfigService();

		return this.normalizeFeatureFlagData(configService.getConfig<FeatureFlag[]>('featureFlags'));
	}

	private normalizeFeatureFlagData(featureFlags: FeatureFlag[] | null) {
		if (!featureFlags || !this.isFeatureFlagArray(featureFlags)) {
			return [];
		}

		return featureFlags;
	}

	private isFeatureFlagArray(maybeFeatureFlagArray: any) {
		return Array.isArray(maybeFeatureFlagArray) && maybeFeatureFlagArray.every(this.isFeatureFlag);
	}

	private isFeatureFlag(maybeFeatureFlag: any) {
		return (
			maybeFeatureFlag &&
			typeof maybeFeatureFlag.name === 'string' &&
			typeof maybeFeatureFlag.isEnabled === 'boolean'
		);
	}
}
