import { create } from "zustand";
import { FPConfig, UseConfigStore } from "./types";

export const useConfigStore = create<UseConfigStore>((set, get) => ({
  ipEnabled: true,
  config: {
    fixed: {
      platform: {
        enabled: true,
        description:
          "string identifying the platform on which the user's browser is running",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform",
        example: "MacIntel",
        get: () => navigator.platform,
      },
      hardwareConcurrency: {
        enabled: true,
        description:
          "the number of logical processors available to run threads on the user's computer",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency",
        example: 11,
        get: () => navigator.hardwareConcurrency,
      },
      deviceMemory: {
        enabled: true,
        description: "approximate amount of device memory in gigabytes",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory",
        example: 8,
        // @ts-expect-error navigator type is wrong
        get: () => navigator.deviceMemory,
      },
      screenWidth: {
        enabled: true,
        description: "the width of the screen in CSS pixels",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/width",
        example: 1512,
        get: () => screen.width,
      },
      screenWHeight: {
        enabled: true,
        description: "the height of the screen in CSS pixels",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/height",
        example: 1512,
        get: () => screen.height,
      },
      colorDepth: {
        enabled: true,
        description: "the color depth of the screen",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth",
        example: 30,
        get: () => screen.colorDepth,
      },
      devicePixelRatio: {
        enabled: true,
        description:
          "the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio",
        example: 2,
        get: () => window.devicePixelRatio,
      },
      maxTouchPoints: {
        enabled: true,
        description:
          "the maximum number of simultaneous touch contact points that are supported by the current device",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints",
        example: 2,
        get: () => navigator.maxTouchPoints,
      },
      keyboardSize: {
        enabled: true,
        description: "number with the keyboard size",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Keyboard",
        example: 48,
        // @ts-expect-error navigator type is wrong
        get: async () => await navigator.keyboard?.getLayoutMap()?.size,
      },
    },
    variable: {
      language: {
        enabled: false,
        description:
          "string representing the preferred language of the user, usually the language of the browser UI",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language",
        example: "en-US",
        get: () => navigator.language,
      },
      languages: {
        enabled: false,
        description:
          "an array of strings representing the user's preferred languages",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages",
        example: ["en-US", "en"],
        get: () => navigator.languages,
      },
      userAgent: {
        enabled: false,
        description:
          "The user agent string is built on a formal structure which can be decomposed into several pieces of info. Each of these pieces of info comes from other navigator properties which are also settable by the user. ",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent",
        example:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        get: () => navigator.userAgent,
      },
      vendor: {
        enabled: false,
        description:
          'is always either "Google Inc.", "Apple Computer, Inc.", or (in Firefox) the empty string.',
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vendor",
        example: "Google Inc.",
        get: () => navigator.vendor,
      },
      timeZone: {
        enabled: false,
        description: "timezone string",
        docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions",
        example: "Europe/Luxembourg",
        get: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      canvasFP: {
        enabled: false,
        description: "generates a canvas fingerprint",
        docs: "https://en.wikipedia.org/wiki/Canvas_fingerprinting",
        example: "",
        get: () => "",
      },
      reduceMotionSettings: {
        enabled: false,
        description:
          "used to detect if a user has enabled a setting on their device to minimize the amount of non-essential motion",
        docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
        example: "(prefers-reduced-motion: reduce)",
        get: () => window.matchMedia("(prefers-reduced-motion: reduce)")?.media,
      },
      darkTheme: {
        enabled: false,
        description:
          "used to detect if a user has requested light or dark color themes",
        docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme",
        example: "(prefers-color-scheme: dark)",
        get: () => window.matchMedia("(prefers-color-scheme: dark)")?.media,
      },
      plugins: {
        enabled: false,
        description: "describing the plugins installed in the browser",
        docs: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/plugins",
        example: {},
        get: () => navigator.plugins,
      },
    },
  },
  onEnableChangeConfig: (configName, enabledNewValue) => {
    const config = get().config;
    // @ts-expect-error we nkow this could not exist is what we are checking
    const category: keyof FPConfig = config.fixed[configName]
      ? "fixed"
      : "variable";

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
  setFixedConfig: (fixedSelectedValues) => {
    const config = get().config;
    const fixedConfig = config.fixed;

    (Object.keys(fixedConfig) as Array<keyof typeof fixedConfig>).forEach(
      (key) => {
        if (fixedSelectedValues.includes(key)) fixedConfig[key].enabled = true;
        else fixedConfig[key].enabled = false;
      }
    );
    set({
      config: {
        ...config,
        fixed: fixedConfig,
      },
    });
  },
  setVariableConfig: (variableSelectedValues) => {
    const config = get().config;
    const variableConfig = config.variable;

    (Object.keys(variableConfig) as Array<keyof typeof variableConfig>).forEach(
      (key) => {
        if (variableSelectedValues.includes(key))
          variableConfig[key].enabled = true;
        else variableConfig[key].enabled = false;
      }
    );
    set({
      config: {
        ...config,
        variable: variableConfig,
      },
    });
  },
  setChangeIpEnabled: (newValue) => {
    set({ ipEnabled: newValue });
  },
}));
