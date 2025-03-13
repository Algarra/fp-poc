import { FPConfigBuilder } from "../zustand/types";

/**
 * Represents a user in the system.
 *
 * @description
  ## device:
    ### - platform:
      - **description**: string identifying the platform on which the user's browser is running,
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent},
      - **example**: macOS
    ### - hardwareConcurrency: 
      - **description**: the number of logical processors available to run threads on the user's computer,
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency},
      - **example**: 11
    ### - deviceMemory: 
      - **description**: approximate amount of device memory in gigabytes,
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory},
      - **example**: 8
    ### - screenWidth:
      - **description**: "the width of the screen in CSS pixels",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/width},
      - **example**: 1512
    ### - screenWHeight:
      - **description**: "the height of the screen in CSS pixels",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/height},
      - **example**: 1512
    ### - colorDepth:
      - **description**: "The color depth of the screen.",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth},
      - **example**: 30
    ### - devicePixelRatio:
      - **description**: 'The ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device.'
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio},
      - **example**: 2
    ### - maxTouchPoints:
      - **description**: "The maximum number of simultaneous touch contact points that are supported by the current device."
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints},
      - **example**: 2
    ### - keyboardSize: 
      - **description**: "Number with the keyboard size."
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Keyboard},
      - **example**: 48
  ## browser:
    ### - userAgent:
      - **description**:
        "The user agent string is built on a formal structure which can be decomposed into several pieces of info. Each of these pieces of info comes from other navigator properties which are also settable by the user. ",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent},
      - **example**:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    ### - vendor:
      - **description**:
        'is always either "Google Inc.", "Apple Computer, Inc.", or (in Firefox) the empty string.',
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vendor},
      - **example**: "Google Inc."
    ### - canvasFP:
      - **description**: "generates a canvas fingerprint",
      - **docs**: {@link https://en.wikipedia.org/wiki/Canvas_fingerprinting},
      - **example**: ""
    ### - plugins:
      - **description**: "describing the plugins installed in the browser",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/plugins},
      - **example**: {}
  ## userSettings:
    ### - language:
      - **description**:
        "string representing the preferred language of the user, usually the language of the browser UI",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language},
      - **example**: "en-US"
    ### - languages: 
      - **description**:
        "an array of strings representing the user's preferred languages",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages},
      - **example**: ["en-US", "en"]
    ### - reduceMotionSettings:
      - **description**:
        "used to detect if a user has enabled a setting on their device to minimize the amount of non-essential motion",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion},
      - **example**: "(prefers-reduced-motion: reduce)"
    ### - darkTheme:
      - **description**:
        "used to detect if a user has requested light or dark color themes",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme},
      - **example**: "(prefers-color-scheme: dark)"
    ### - timeZone:
      - **description**: "timezone string",
      - **docs**: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions},
      - **example**: "Europe/Luxembourg"
 */
export const fingerprintConfig: FPConfigBuilder = {
	device: {
		platform: {
			enabled: true,
			get: () => {
				const getPlatform = () => {
					const userAgent = navigator.userAgent;
					if (/Windows/i.test(userAgent)) return "Windows";
					if (/Mac/i.test(userAgent)) return "macOS";
					if (/Linux/i.test(userAgent)) return "Linux";
					if (/Android/i.test(userAgent)) return "Android";
					if (/iPhone/i.test(userAgent)) return "iPhone-iOS";
					if (/iPad/i.test(userAgent)) return "iPad-iOS";
					if (/iPod/i.test(userAgent)) return "iPod-iOS";
					return "Unknown";
				};

				return getPlatform();
			},
		},
		hardwareConcurrency: {
			enabled: true,
			get: () => navigator.hardwareConcurrency,
		},
		deviceMemory: {
			enabled: true,
			// @ts-expect-error navigator type missing deviceMemory
			get: () => navigator.deviceMemory,
		},
		screenWidth: {
			enabled: true,
			get: () => window.screen.width,
		},
		screenWHeight: {
			enabled: true,
			get: () => window.screen.height,
		},
		colorDepth: {
			enabled: true,
			get: () => window.screen.colorDepth,
		},
		devicePixelRatio: {
			enabled: true,
			get: () => window.devicePixelRatio,
		},
		maxTouchPoints: {
			enabled: true,
			get: () => navigator.maxTouchPoints,
		},
		keyboardSize: {
			enabled: true,
			// @ts-expect-error navigator type missing keyboard
			get: async () => await navigator.keyboard?.getLayoutMap()?.size,
		},
	},
	browser: {
		userAgent: {
			enabled: true,
			get: () => navigator.userAgent,
		},
		vendor: {
			enabled: false,
			get: () => navigator.vendor,
		},
		canvasFP: {
			enabled: true,
			get: () => {
				const canvas = document.createElement("canvas");

				canvas.id = "myCanvas";
				canvas.width = 200;
				canvas.height = 40;
				canvas.style.border = "1px solid #000000";
				canvas.style.display = "none";
				document.body.appendChild(canvas);
				const ctx = canvas.getContext("2d");

				if (!ctx) return "";

				// Draw shapes
				ctx.fillStyle = "rgb(255,0,255)";
				ctx.beginPath();
				ctx.rect(20, 20, 150, 100);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				ctx.beginPath();
				ctx.fillStyle = "rgb(0,255,255)";
				ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();

				// Draw text and rectangle
				const txt = "abz190#$%^@£éú";
				ctx.textBaseline = "top";
				ctx.font = '17px "Arial 17"';
				ctx.textBaseline = "alphabetic";
				ctx.fillStyle = "rgb(255,5,5)";
				ctx.rotate(0.03);
				ctx.fillText(txt, 4, 17);
				ctx.fillStyle = "rgb(155,255,5)";
				ctx.shadowBlur = 8;
				ctx.shadowColor = "red";
				ctx.fillRect(20, 12, 100, 5);

				// Convert image to base64 text
				const src = canvas.toDataURL();

				let hash = 0;
				for (let i = 0; i < src.length; i++) {
					const char = src.charCodeAt(i);
					hash = (hash << 5) - hash + char;
					hash = hash & hash;
				}
				canvas.remove();

				return hash.toString();
			},
		},
		audioFP: {
			enabled: true,
			get: async () => {
				if (!OfflineAudioContext) return 0;
				const context = new OfflineAudioContext(1, 44100, 44100); // 1 canal, 44100 muestras
				const oscillator = context.createOscillator();
				const gain = context.createGain();

				oscillator.type = "triangle";
				oscillator.frequency.value = 1000;
				gain.gain.value = 0.001;

				oscillator.connect(gain);
				gain.connect(context.destination);

				oscillator.start();

				const audioBuffer = await context.startRendering();

				const fingerprint = Array.from(audioBuffer.getChannelData(0))
					.slice(0, 100)
					.reduce((acc, val) => acc + Math.abs(val), 0);

				return fingerprint;
			},
		},
		webGLFP: {
			enabled: true,
			get: () => {
				try {
					const canvas = document.createElement("canvas");
					canvas.style.display = "none";
					const gl = canvas.getContext("webgl");

					if (!gl) return "WebGL Not Supported";

					const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
					const gpuVendor = debugInfo
						? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
						: "Unknown";
					const gpuRenderer = debugInfo
						? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
						: "Unknown";

					const extensions = gl.getSupportedExtensions()?.sort().join(",");

					const shaderPrecision = gl.getShaderPrecisionFormat(
						gl.VERTEX_SHADER,
						gl.HIGH_FLOAT
					)?.precision;
					canvas.remove();

					return `${gpuVendor}-${gpuRenderer}-${extensions}-${shaderPrecision}`;
				} catch {
					return "";
				}
			},
		},
		plugins: {
			enabled: false,
			get: () => navigator.plugins,
		},
	},
	userSettings: {
		language: {
			enabled: true,
			get: () => navigator.language,
		},
		languages: {
			enabled: true,
			get: () => navigator.languages,
		},
		reduceMotionSettings: {
			enabled: true,
			get: () =>
				`${window.matchMedia("(prefers-reduced-motion: reduce)")?.matches}`,
		},
		darkTheme: {
			enabled: true,
			get: () =>
				`${window.matchMedia("(prefers-color-scheme: dark)")?.matches}`,
		},
		timeZone: {
			enabled: true,
			get: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
	},
};
