"use client";
import { Table } from "./components/Table";
import { IPSetting } from "./components/IPSetting";

export const ConfigTable = () => {
  if (typeof window === "undefined") return null;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <h3>Use IP:</h3>
        <IPSetting />
      </div>
      <h3>Fixed</h3>
      <Table group="fixed" />
      <h3>Variable </h3>
      <Table group="variable" />
    </div>
  );
};
