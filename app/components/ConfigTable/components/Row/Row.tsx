import { ConfigValue, FPConfig } from "@/app/zustand/types";
import { useConfigStore } from "@/app/zustand/useConfigStore";
import { memo, useEffect, useState } from "react";

export const Row = memo(
  ({
    configName,
  }: {
    configName: keyof FPConfig["fixed"] | keyof FPConfig["variable"];
  }) => {
    const [currentValue, setCurrentValue] = useState<string | number | null>(
      null
    );
    const configData: ConfigValue<string | number> = useConfigStore(
      (state) =>
        // @ts-expect-error We are checking the group
        state.config[state.config.fixed[configName] ? "fixed" : "variable"][
          configName
        ]
    );
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
      <tr className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
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
        <td className="px-6 py-4">{example}</td>
        <td className="px-6 py-4">{currentValue}</td>
        <td className="px-6 py-4">
          <a href={configData.docs} target="_blank" className=" text-blue-400">
            DOCUMENTATION
          </a>
        </td>
      </tr>
    );
  }
);

Row.displayName = "Row";