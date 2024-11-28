export type ConfigValue<T> = {
  enabled: boolean;
  description: string;
  docs: string;
  example: T;
  get: (() => T) | (() => Promise<T>);
};

export type FPConfig = {
  fixed: {
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
  variable: {
    language: ConfigValue<string>;
    languages: ConfigValue<readonly string[]>;
    userAgent: ConfigValue<string>;
    vendor: ConfigValue<string>;
    timeZone: ConfigValue<string>;
    canvasFP: ConfigValue<string>;
    reduceMotionSettings: ConfigValue<string>;
    darkTheme: ConfigValue<string>;
    plugins: ConfigValue<object>;
  };
};

export type UseConfigStore = {
  ipEnabled: boolean;
  config: FPConfig;
  onEnableChangeConfig: (
    configName: keyof FPConfig["fixed"] | keyof FPConfig["variable"],
    enabledNewValue: boolean
  ) => void;
  setFixedConfig: (config: (keyof FPConfig["fixed"])[]) => void;
  setVariableConfig: (config: (keyof FPConfig["variable"])[]) => void;
  setChangeIpEnabled: (newValue: boolean) => void;
};
