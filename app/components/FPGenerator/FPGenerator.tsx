/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";
import { useConfigStore } from "@/app/zustand/useConfigStore";
import { useEffect, useState } from "react";

export const FPGenerator = () => {
  const [fixedFP, setFixedFP] = useState<string | null>(null);
  const [variableFP, setVariableFP] = useState<string | null>(null);
  const [combinedFP, setCombinedFp] = useState<string | null>(null);
  const [userIp, setUserIp] = useState<string | null>(null);

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

  useEffect(() => {
    (async () => {
      if (!userIp) return;
      const newFixedData: any = {};

      for (const [key, value] of Object.entries(config.fixed)) {
        if (value.enabled) {
          const currentValue = await value.get();
          newFixedData[key] = currentValue;
        }
      }

      const fixedFP = await generateFingerprint(
        JSON.stringify(newFixedData) + userIp
      );
      setFixedFP(fixedFP);

      const newVariableData: any = {};

      for (const [key, value] of Object.entries(config.variable)) {
        if (value.enabled) {
          const currentValue = await value.get();
          newVariableData[key] = currentValue;
        }
      }

      const fvariableFP = await generateFingerprint(
        JSON.stringify(newVariableData) + userIp
      );
      setVariableFP(fvariableFP);

      const combinedFP = await generateFingerprint(
        JSON.stringify(newVariableData) + JSON.stringify(newFixedData) + userIp
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
      <h1>Yous FP is:</h1>
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
