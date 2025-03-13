import { create } from "zustand";
import { FPConfig, FPConfigBuilder, UseConfigStore } from "./types";
import { fingerprintConfig } from "../fingerprintMonoLibrary/fingerprintConfig";

export const useConfigStore = create<UseConfigStore>((set, get) => ({
	config: {
		device: {
			platform: {
				enabled: true,
				description:
					"string identifying the platform on which the user's browser is running",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform",
				example: "MacIntel",
				get: fingerprintConfig.device.platform.get,
			},
			hardwareConcurrency: {
				enabled: true,
				description:
					"the number of logical processors available to run threads on the user's computer",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency",
				example: 11,
				get: fingerprintConfig.device.hardwareConcurrency.get,
			},
			deviceMemory: {
				enabled: true,
				description: "approximate amount of device memory in gigabytes",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory",
				example: 8,
				get: fingerprintConfig.device.deviceMemory.get,
			},
			screenWidth: {
				enabled: true,
				description: "the width of the screen in CSS pixels",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/width",
				example: 1512,
				get: fingerprintConfig.device.screenWidth.get,
			},
			screenWHeight: {
				enabled: true,
				description: "the height of the screen in CSS pixels",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/height",
				example: 1512,
				get: fingerprintConfig.device.screenWHeight.get,
			},
			colorDepth: {
				enabled: true,
				description: "the color depth of the screen",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth",
				example: 30,
				get: fingerprintConfig.device.colorDepth.get,
			},
			devicePixelRatio: {
				enabled: true,
				description:
					"the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio",
				example: 2,
				get: fingerprintConfig.device.devicePixelRatio.get,
			},
			maxTouchPoints: {
				enabled: true,
				description:
					"the maximum number of simultaneous touch contact points that are supported by the current device",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints",
				example: 2,
				get: fingerprintConfig.device.maxTouchPoints.get,
			},
			keyboardSize: {
				enabled: true,
				description: "number with the keyboard size",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Keyboard",
				example: 48,
				get: fingerprintConfig.device.keyboardSize.get,
			},
		},
		browser: {
			userAgent: {
				enabled: false,
				description:
					"The user agent string is built on a formal structure which can be decomposed into several pieces of info. Each of these pieces of info comes from other navigator properties which are also settable by the user. ",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent",
				example:
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
				get: fingerprintConfig.browser.userAgent.get,
			},
			vendor: {
				enabled: false,
				description:
					'is always either "Google Inc.", "Apple Computer, Inc.", or (in Firefox) the empty string.',
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vendor",
				example: "Google Inc.",
				get: fingerprintConfig.browser.vendor.get,
			},
			canvasFP: {
				enabled: false,
				description: "generates a canvas fingerprint",
				docs: "https://en.wikipedia.org/wiki/Canvas_fingerprinting",
				example: "1332266307",
				get: fingerprintConfig.browser.canvasFP.get,
			},
			audioFP: {
				enabled: true,
				description: "generate a FP based on how the device handles the audio",
				example: 0.04985900235897134,
				get: fingerprintConfig.browser.audioFP.get,
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext",
			},
			webGLFP: {
				enabled: true,
				description: "generate a FP based on webGl",
				example:
					"Google Inc. (Apple)-ANGLE (Apple, ANGLE Metal Renderer: Apple M3 Pro, Unspecified Version)-ANGLE_instanced_arrays,EXT_blend_minmax,EXT_clip_control,EXT_color_buffer_half_float,EXT_depth_clamp,EXT_disjoint_timer_query,EXT_float_blend,EXT_frag_depth,EXT_polygon_offset_clamp,EXT_sRGB,EXT_shader_texture_lod,EXT_texture_compression_bptc,EXT_texture_compression_rgtc,EXT_texture_filter_anisotropic,EXT_texture_mirror_clamp_to_edge,KHR_parallel_shader_compile,OES_element_index_uint,OES_fbo_render_mipmap,OES_standard_derivatives,OES_texture_float,OES_texture_float_linear,OES_texture_half_float,OES_texture_half_float_linear,OES_vertex_array_object,WEBGL_blend_func_extended,WEBGL_color_buffer_float,WEBGL_compressed_texture_astc,WEBGL_compressed_texture_etc,WEBGL_compressed_texture_etc1,WEBGL_compressed_texture_pvrtc,WEBGL_compressed_texture_s3tc,WEBGL_compressed_texture_s3tc_srgb,WEBGL_debug_renderer_info,WEBGL_debug_shaders,WEBGL_depth_texture,WEBGL_draw_buffers,WEBGL_lose_context,WEBGL_multi_draw,WEBGL_polygon_mode-23",
				get: fingerprintConfig.browser.webGLFP.get,
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL",
			},
			plugins: {
				enabled: false,
				description: "describing the plugins installed in the browser",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/plugins",
				example: {},
				get: fingerprintConfig.browser.plugins.get,
			},
		},
		userSettings: {
			language: {
				enabled: false,
				description:
					"string representing the preferred language of the user, usually the language of the browser UI",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language",
				example: "en-US",
				get: fingerprintConfig.userSettings.language.get,
			},
			languages: {
				enabled: false,
				description:
					"an array of strings representing the user's preferred languages",
				docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages",
				example: ["en-US", "en"],
				get: fingerprintConfig.userSettings.languages.get,
			},
			reduceMotionSettings: {
				enabled: false,
				description:
					"used to detect if a user has enabled a setting on their device to minimize the amount of non-essential motion",
				docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
				example: "(prefers-reduced-motion: reduce)",
				get: fingerprintConfig.userSettings.reduceMotionSettings.get,
			},
			darkTheme: {
				enabled: false,
				description:
					"used to detect if a user has requested light or dark color themes",
				docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme",
				example: "(prefers-color-scheme: dark)",
				get: fingerprintConfig.userSettings.darkTheme.get,
			},
			timeZone: {
				enabled: false,
				description: "timezone string",
				docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions",
				example: "Europe/Luxembourg",
				get: fingerprintConfig.userSettings.timeZone.get,
			},
		},
	},
	onEnableChangeConfig: (configName, enabledNewValue) => {
		const config = get().config;
		// @ts-expect-error we know this could not exist is what we are checking
		const category: keyof FPConfig = config.device[configName]
			? "device" // @ts-expect-error we know this could not exist is what we are checking
			: config.browser[configName]
			? "browser"
			: "userSettings";

		set({
			config: {
				...config,
				[category]: {
					...config[category],
					[configName]: {
						// @ts-expect-error we have made sure the category is the coorrect one defining the const
						...config[category][configName],
						enabled: enabledNewValue,
					},
				},
			},
		});
	},
	setDeviceConfig: (deviceSelectedValues) => {
		const config = get().config;
		const deviceConfig = config.device;

		(Object.keys(deviceConfig) as Array<keyof typeof deviceConfig>).forEach(
			(key) => {
				if (deviceSelectedValues.includes(key))
					deviceConfig[key].enabled = true;
				else deviceConfig[key].enabled = false;
			}
		);
		set({
			config: {
				...config,
				device: deviceConfig,
			},
		});
	},
	setBrowserConfig: (browserSelectedValues) => {
		const config = get().config;
		const browserConfig = config.browser;

		(Object.keys(browserConfig) as Array<keyof typeof browserConfig>).forEach(
			(key) => {
				if (browserSelectedValues.includes(key))
					browserConfig[key].enabled = true;
				else browserConfig[key].enabled = false;
			}
		);
		set({
			config: {
				...config,
				browser: browserConfig,
			},
		});
	},
	setUserSettingsConfig: (userSettingsSelectedValues) => {
		const config = get().config;
		const userSettingsConfig = config.userSettings;

		(
			Object.keys(userSettingsConfig) as Array<keyof typeof userSettingsConfig>
		).forEach((key) => {
			if (userSettingsSelectedValues.includes(key))
				userSettingsConfig[key].enabled = true;
			else userSettingsConfig[key].enabled = false;
		});
		set({
			config: {
				...config,
				userSettings: userSettingsConfig,
			},
		});
	},
	resetConfigValues: () => {
		const enabledDeviceValues: Array<keyof FPConfigBuilder["device"]> = [];
		Object.entries(fingerprintConfig.device).forEach(([key, value]) => {
			if (value.enabled)
				enabledDeviceValues.push(key as keyof FPConfigBuilder["device"]);
		});
		const enabledBrowserValues: Array<keyof FPConfigBuilder["browser"]> = [];
		Object.entries(fingerprintConfig.browser).forEach(([key, value]) => {
			if (value.enabled)
				enabledBrowserValues.push(key as keyof FPConfigBuilder["browser"]);
		});
		const enabledUserSettingsValues: Array<
			keyof FPConfigBuilder["userSettings"]
		> = [];
		Object.entries(fingerprintConfig.userSettings).forEach(([key, value]) => {
			if (value.enabled)
				enabledUserSettingsValues.push(
					key as keyof FPConfigBuilder["userSettings"]
				);
		});

		// window.localStorage.setItem(
		// 	"browserData",
		// 	JSON.stringify(enabledBrowserValues)
		// );
		// window.localStorage.setItem(
		// 	"deviceData",
		// 	JSON.stringify(enabledDeviceValues)
		// );
		// window.localStorage.setItem(
		// 	"userConfigData",
		// 	JSON.stringify(enabledUserSettingsValues)
		// );

		get().setDeviceConfig(enabledDeviceValues);
		get().setBrowserConfig(enabledBrowserValues);
		get().setUserSettingsConfig(enabledUserSettingsValues);
	},
}));
