import React from "react";

import BaseTable from "../../../components/BaseTable";
import { column } from "./column";

export const ClassificationList: React.FC = () => {
  return (
    <BaseTable columns={column(false)} data={[]} title="Tetangga Terdekat" />
  );
};
