// Extend the Navigator type to include deviceMemory
declare global {
	interface Navigator {
		deviceMemory?: number;
	}
}

export type ValueConfigBuilder<T> = {
	enabled: boolean;
	get: (() => T) | (() => Promise<T>);
};

export type FPConfigBuilder = {
	device: {
		platform: ValueConfigBuilder<string>;
		hardwareConcurrency: ValueConfigBuilder<number>;
		deviceMemory: ValueConfigBuilder<number>;
		screenWidth: ValueConfigBuilder<number>;
		screenWHeight: ValueConfigBuilder<number>;
		colorDepth: ValueConfigBuilder<number>;
		devicePixelRatio: ValueConfigBuilder<number>;
		maxTouchPoints: ValueConfigBuilder<number>;
		keyboardSize: ValueConfigBuilder<number>;
	};
	browser: {
		userAgent: ValueConfigBuilder<string>;
		vendor: ValueConfigBuilder<string>;
		canvasFP: ValueConfigBuilder<string>;
		plugins: ValueConfigBuilder<object>;
	};
	userSettings: {
		language: ValueConfigBuilder<string>;
		languages: ValueConfigBuilder<readonly string[]>;
		timeZone: ValueConfigBuilder<string>;
		reduceMotionSettings: ValueConfigBuilder<string>;
		darkTheme: ValueConfigBuilder<string>;
	};
};

export type ConfigValue<T> = {
	enabled: boolean;
	description: string;
	docs: string;
	example: T;
	get: (() => T) | (() => Promise<T>);
};

export type FPConfig = {
	device: {
		platform: ConfigValue<string>;
		hardwareConcurrency: ConfigValue<number>;
		deviceMemory: ConfigValue<number>;
		screenWidth: ConfigValue<number>;
		screenWHeight: ConfigValue<number>;
		colorDepth: ConfigValue<number>;
		devicePixelRatio: ConfigValue<number>;
		maxTouchPoints: ConfigValue<number>;
		keyboardSize: ConfigValue<number>;
	};
	browser: {
		userAgent: ConfigValue<string>;
		vendor: ConfigValue<string>;
		canvasFP: ConfigValue<string>;
		plugins: ConfigValue<object>;
	};
	userSettings: {
		language: ConfigValue<string>;
		languages: ConfigValue<readonly string[]>;
		reduceMotionSettings: ConfigValue<string>;
		darkTheme: ConfigValue<string>;
		timeZone: ConfigValue<string>;
	};
};

export type UseConfigStore = {
	config: FPConfig;
	onEnableChangeConfig: (
		configName:
			| keyof FPConfig["device"]
			| keyof FPConfig["browser"]
			| keyof FPConfig["userSettings"],
		enabledNewValue: boolean
	) => void;
	setDeviceConfig: (config: (keyof FPConfig["device"])[]) => void;
	setBrowserConfig: (config: (keyof FPConfig["browser"])[]) => void;
	setUserSettingsConfig: (config: (keyof FPConfig["userSettings"])[]) => void;
	resetConfigValues: () => void
};
