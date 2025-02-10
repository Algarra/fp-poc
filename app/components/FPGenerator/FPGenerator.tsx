"use client";
import { useConfigStore } from "@/app/zustand/useConfigStore";
import { useEffect, useState } from "react";
import { useLocalstorageConfigValues } from "./hooks/useLocalStorageConfigValues";
import { getHash } from "@/app/fingerprintMonoLibrary/getHash";

export const FPGenerator = () => {
  const [deviceFP, setDeviceFP] = useState<string>("");
  const [browserFP, setBrowserFP] = useState<string>("");
	const [userSettingsFP, setUserSettingsFP] = useState<string>("");
  const [combinedFP, setCombinedFp] = useState<string>("");

  const config = useConfigStore((state) => state.config);
	const resetConfigValues = useConfigStore((state) => state.resetConfigValues);

  useLocalstorageConfigValues();
  useEffect(() => {
    (async () => {
      const newDeviceData: { [key: string]: unknown } = {};
      for (const [key, value] of Object.entries(config.device)) {
        if (value.enabled) {
          const currentValue = await value.get();
          newDeviceData[key] = currentValue;
        }
      }
      const fixedFP = await getHash(
        JSON.stringify(newDeviceData)
      );
      setDeviceFP(fixedFP);

      const newBrowserData: { [key: string]: unknown } = {};
      for (const [key, value] of Object.entries(config.browser)) {
        if (value.enabled) {
          const currentValue = await value.get();
          newBrowserData[key] = currentValue;
        }
      }
      const browserFP = await getHash(JSON.stringify(newBrowserData));
      setBrowserFP(browserFP);

			const newUserSettingsData: { [key: string]: unknown } = {};
			for (const [key, value] of Object.entries(config.userSettings)) {
				if (value.enabled) {
					const currentValue = await value.get();
					newUserSettingsData[key] = currentValue;
				}
			}
			const userSettingsFP = await getHash(
				JSON.stringify(newUserSettingsData)
			);
			setUserSettingsFP(userSettingsFP);

      const combinedFP = fixedFP + '__' + browserFP + '__' + userSettingsFP;
      setCombinedFp(combinedFP);
    })();
  }, [config]);

  return (
		<div className=" my-14 w-full text-center">
			<h1>Your FP is:</h1>
			<h4 className="break-words">
				<b>Device FP:</b>
				{deviceFP}
			</h4>
			<h4 className="break-words">
				<b>Browser FP:</b>
				{browserFP}
			</h4>
			<h4 className="break-words">
				<b>User Settings FP:</b>
				{userSettingsFP}
			</h4>
			<h4 className="break-words">
				<b>Combined FP:</b>
				{combinedFP}
			</h4>
			<button
				type="button"
				onClick={resetConfigValues}
				className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
			>
				Reset
			</button>
		</div>
	);
};
