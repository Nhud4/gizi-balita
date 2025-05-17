import React, { useEffect, useState } from "react";

import BaseTable from "../../../components/BaseTable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchListSynthetic } from "../../../redux/slice/report/action";
import { column } from "./column";

type Props = {
  data: DataResponse;
};

const initialParams = {
  page: 1,
  size: 10,
};

export const SyntheticList: React.FC<Props> = ({ data }) => {
  const {
    data: list,
    meta,
    loading,
  } = useAppSelector((state) => state.report.listSynthetic);
  const dispatch = useAppDispatch();
  const [params, setParams] = useState(initialParams);

  const onChangePage = (page: number) => {
    setParams({ ...params, page });
  };

  const onChangeRowPerPage = (size: number) => {
    setParams({ ...params, size, page: 1 });
  };

  useEffect(() => {
    dispatch(fetchListSynthetic(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, data]);

  return (
    <BaseTable
      columns={column(loading)}
      data={list}
      meta={meta}
      onChangePage={onChangePage}
      onChangeRowPerPage={onChangeRowPerPage}
      title="Data Synthetic"
    />
  );
};
