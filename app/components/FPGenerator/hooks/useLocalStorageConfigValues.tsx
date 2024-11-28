import { useConfigStore } from "@/app/zustand/useConfigStore";
import { useEffect } from "react";

export const useLocalstorageConfigValues = () => {
  const config = useConfigStore((state) => state.config);
  const setFixedConfig = useConfigStore((state) => state.setFixedConfig);
  const setVariableConfig = useConfigStore((state) => state.setVariableConfig);

  useEffect(() => {
    (async () => {
      setVariableConfig(
        JSON.parse(window.localStorage.getItem("variableData") ?? "[]")
      );
      setFixedConfig(
        JSON.parse(window.localStorage.getItem("fixedData") ?? "[]")
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const enabledFixedValues: string[] = [];
      Object.entries(config.fixed).forEach(([key, value]) => {
        if (value.enabled) enabledFixedValues.push(key);
      });
      const enabledVariableValues: string[] = [];
      Object.entries(config.variable).forEach(([key, value]) => {
        if (value.enabled) enabledVariableValues.push(key);
      });
      window.localStorage.setItem(
        "variableData",
        JSON.stringify(enabledVariableValues)
      );
      window.localStorage.setItem(
        "fixedData",
        JSON.stringify(enabledFixedValues)
      );
    })();
  }, [config]);
};
