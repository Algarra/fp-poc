"use client";
import { useConfigStore } from "@/app/zustand/useConfigStore";
import { useEffect, useState } from "react";
import { useLocalstorageConfigValues } from "./hooks/useLocalStorageConfigValues";

export const FPGenerator = () => {
  const [fixedFP, setFixedFP] = useState<string>("");
  const [variableFP, setVariableFP] = useState<string>("");
  const [combinedFP, setCombinedFp] = useState<string>("");
  const [userIp, setUserIp] = useState<string | null>(null);
  const isIPEnabled = useConfigStore((state) => state.ipEnabled);

  const config = useConfigStore((state) => state.config);

  const generateFingerprint = async (data: string) => {
    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(data)
    );
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  useLocalstorageConfigValues();
  useEffect(() => {
    (async () => {
      if (!userIp) return;
      const FPIP = isIPEnabled ? userIp : "";
      const newFixedData: { [key: string]: unknown } = {};
      for (const [key, value] of Object.entries(config.fixed)) {
        if (value.enabled) {
          const currentValue = await value.get();
          newFixedData[key] = currentValue;
        }
      }
      const fixedFP = await generateFingerprint(
        JSON.stringify(newFixedData) + FPIP
      );
      setFixedFP(fixedFP);

      const newVariableData: { [key: string]: unknown } = {};

      for (const [key, value] of Object.entries(config.variable)) {
        if (value.enabled) {
          const currentValue = await value.get();
          newVariableData[key] = currentValue;
        }
      }

      const fvariableFP = await generateFingerprint(
        JSON.stringify(newVariableData) + FPIP
      );
      setVariableFP(fvariableFP);

      const combinedFP = await generateFingerprint(
        JSON.stringify(newVariableData) + JSON.stringify(newFixedData) + FPIP
      );
      setCombinedFp(combinedFP);
    })();
  }, [config, userIp]);

  useEffect(() => {
    (async () => {
      const ip = await fetch("https://api.ipify.org?format=json").then((res) =>
        res.json()
      );
      setUserIp(ip);
    })();
  }, []);

  return (
    <div className=" my-14 w-full text-center">
      <h1>Your FP is:</h1>
      <h4>
        <b>Fixed FP:</b>
        {fixedFP}
      </h4>
      <h4>
        <b>Variable FP:</b>
        {variableFP}
      </h4>
      <h4>
        <b>Comnbined FP:</b>
        {combinedFP}
      </h4>
    </div>
  );
};
