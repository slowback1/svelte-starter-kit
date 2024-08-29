﻿export type FeatureFlag = {
	name: string;
	isEnabled: boolean;
	description?: string;
};

export default interface IFeatureFlagProvider {
	getFeatureFlags(): Promise<FeatureFlag[]>;
}
