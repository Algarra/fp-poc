"use client";
import { Table } from "./components/Table";

export const ConfigTable = () => {
  if (typeof window === "undefined") return null;
  return (
    <div>
      <h3>Fixed</h3>
      <Table group="fixed" />
      <h3>Variable </h3>
      <Table group="variable" />
    </div>
  );
};
