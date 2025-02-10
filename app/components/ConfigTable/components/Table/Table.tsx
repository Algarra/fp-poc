import { FPConfig } from "@/app/zustand/types";
import { Row } from "../Row/Row";
import { useConfigStore } from "@/app/zustand/useConfigStore";
import { useShallow } from "zustand/shallow";

export const Table = ({ group }: { group: keyof FPConfig }) => {
  const groupConfig = useConfigStore(
    useShallow(
      (state) =>
        Object.keys(state.config[group]) as Array<
          | keyof (typeof state.config)["device"]
          | keyof (typeof state.config)["browser"]
					| keyof (typeof state.config)["browser"]
        >
    )
  );

  return (
    <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
      <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Enabled
          </th>
          <th scope="col" className="px-6 py-3">
            Config name
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Example
          </th>
          <th scope="col" className="px-6 py-3">
            Your current value
          </th>
          <th scope="col" className="px-6 py-3">
            Docs
          </th>
        </tr>
      </thead>
      <tbody>
        {groupConfig.map((key) => (
          <Row key={key} configName={key} />
        ))}
      </tbody>
    </table>
  );
};
