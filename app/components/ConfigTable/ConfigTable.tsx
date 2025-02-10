"use client";
import { Table } from "./components/Table";

export const ConfigTable = () => {
  if (typeof window === "undefined") return null;
  return (
		<div>
			<h3>Device</h3>
			<Table group="device" />
			<h3>Browser </h3>
			<Table group="browser" />
			<h3>UserSettings </h3>
			<Table group="userSettings" />
		</div>
	);
};
