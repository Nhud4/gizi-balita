import React from "react";

import BaseTable from "../../../components/BaseTable";
import { FILTER_FIELDS } from "../../../utils/constant";
import { column } from "./column";

export const ListData: React.FC = () => {
  return (
    <BaseTable
      columns={column(false)}
      data={[]}
      filterFields={[FILTER_FIELDS.STATUS, FILTER_FIELDS.GENDER]}
      onFilter={() => {}}
      title="Daftar Balita"
    />
  );
};
