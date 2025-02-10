import { useConfigStore } from "@/app/zustand/useConfigStore";
import { useEffect } from "react";

export const useLocalstorageConfigValues = () => {
  const config = useConfigStore((state) => state.config);
  const setDeviceConfig = useConfigStore((state) => state.setDeviceConfig);
  const setBrowserConfig = useConfigStore((state) => state.setBrowserConfig);
	const setUserSettingsConfig = useConfigStore(
		(state) => state.setUserSettingsConfig
	);


  useEffect(() => {
			setDeviceConfig(
				JSON.parse(window.localStorage.getItem("deviceData") ?? "[]")
			);
			setBrowserConfig(
				JSON.parse(window.localStorage.getItem("browserData") ?? "[]")
			);
			setUserSettingsConfig(
				JSON.parse(window.localStorage.getItem("userConfigData") ?? "[]")
			);
	}, [setDeviceConfig, setBrowserConfig, setUserSettingsConfig]);

  useEffect(() => {
		const enabledDeviceValues: string[] = [];
		Object.entries(config.device).forEach(([key, value]) => {
			if (value.enabled) enabledDeviceValues.push(key);
		});
		const enabledBrowserValues: string[] = [];
		Object.entries(config.browser).forEach(([key, value]) => {
			if (value.enabled) enabledBrowserValues.push(key);
		});
		const enabledUserSettingsValues: string[] = [];
		Object.entries(config.userSettings).forEach(([key, value]) => {
			if (value.enabled) enabledUserSettingsValues.push(key);
		});

		window.localStorage.setItem(
			"browserData",
			JSON.stringify(enabledBrowserValues)
		);
		window.localStorage.setItem(
			"deviceData",
			JSON.stringify(enabledDeviceValues)
		);
		window.localStorage.setItem(
			"userConfigData",
			JSON.stringify(enabledUserSettingsValues)
		);
  }, [config]);

};
