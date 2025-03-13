'use client'
import { FPConfig } from "@/app/zustand/types";
import { useConfigStore } from "@/app/zustand/useConfigStore";
import { memo, useEffect, useState } from "react";

export const Row = memo(
	({
		configName,
	}: {
		configName:
			| keyof FPConfig["device"]
			| keyof FPConfig["browser"]
			| keyof FPConfig["userSettings"];
	}) => {
		const [currentValue, setCurrentValue] = useState<string | number | null>(
			null
		);
    		const [tooltipText, setTooltipText] = useState<string | number | null>(
					null
				);
		const config = useConfigStore(
			(state) =>
				state.config
		);
		// @ts-expect-error we are checking it
		const configData = config[config.device[configName] ? "device" : config.browser[configName]? "browser": "userSettings" ][configName];
		const onEnableChangeConfig = useConfigStore(
			(state) => state.onEnableChangeConfig
		);
		const example =
			typeof configData.example !== "number" &&
			typeof configData.example !== "string"
				? JSON.stringify(configData.example)
				: configData.example;

		useEffect(() => {
			(async () => {
				let value = await configData.get();
				if (typeof value !== "number" && typeof value !== "string") {
					value = JSON.stringify(value);
				}
				setCurrentValue(value);
			})();
		}, []);

		return (
			<tr className="bg-white relative border-b dark:bg-neutral-800 dark:border-neutral-700">
				<th
					scope="row"
					className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
				>
					<label className="inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							onChange={() => {
								onEnableChangeConfig(configName, !configData.enabled);
							}}
							checked={configData.enabled}
							className="sr-only peer"
						/>
						<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					</label>
				</th>

				<th
					scope="row"
					className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white"
				>
					{configName}
				</th>
				<td className="px-6 py-4">{configData.description}</td>
				<td
					data-tooltip-target="tooltip-default"
					className="px-6 py-4 text-ellipsis overflow-hidden max-w-80"
					onMouseOver={() => setTooltipText(example)}
					onMouseOut={() => setTooltipText(null)}
				>
					{example}
				</td>
				<td
					className="px-6 py-4 text-ellipsis overflow-hidden max-w-80"
					onMouseOver={() => setTooltipText(currentValue)}
					onMouseOut={() => setTooltipText(null)}
				>
					{currentValue}
				</td>
				<td className="px-6 py-4">
					<a href={configData.docs} target="_blank" className=" text-blue-400">
						DOCUMENTATION
					</a>
				</td>
				{tooltipText !== null && (
					<td
						role="tooltip"
						className="absolute left-0 break-all bottom-[100%] max-w-[80%] z-10 px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs tooltip dark:bg-gray-700"
					>
						{tooltipText}
						<div className="tooltip-arrow" data-popper-arrow></div>
					</td>
				)}
			</tr>
		);
	}
);

Row.displayName = "Row";
