import { fingerprintConfig } from "./fingerprintConfig";
import { getHash } from "./getHash";
import { FPConfigBuilder } from "../zustand/types";

export const generateInternalFingerprint = async () => {
	const fingerprintData: {
		[K in keyof FPConfigBuilder]: { [key: string]: unknown };
	} = {
		device: {},
		browser: {},
		userSettings: {},
	};

	for (const [categoryName, categoryValue] of Object.entries(
		fingerprintConfig
	)) {
		for (const [key, value] of Object.entries(categoryValue)) {
			if (value.enabled) {
				const currentValue = await value.get();
				fingerprintData[categoryName as keyof FPConfigBuilder][key] = currentValue;
			}
		}
	}

	let fingerprint = "";

	for (const key of Object.keys(fingerprintConfig)) {
		const sectionFP = await getHash(
			JSON.stringify(fingerprintData[key as keyof FPConfigBuilder])
		);
		if (!fingerprint) {
			fingerprint = sectionFP;
		} else {
			fingerprint = fingerprint + "__" + sectionFP;
		}
	}

	return fingerprint;
};
