import React from "react";

import BaseTable from "../../../components/BaseTable";
import { column } from "./column";

type Props = {
  data?: Neighbor[];
};

export const ClassificationList: React.FC<Props> = ({ data }) => {
  if (data) {
    return (
      <BaseTable
        columns={column(false)}
        data={data}
        title="Tetangga Terdekat"
      />
    );
  }
};
