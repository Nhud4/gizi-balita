import React, { useContext, useState } from "react";

import BaseTable from "../../../components/BaseTable";
import Button from "../../../components/Button";
import ConfirmationContent from "../../../components/ConfirmationContent";
import ICONS from "../../../configs/icons";
import { ModalContext } from "../../../contexts/ModalContext";
import FormData from "../../../form/FormData";
import {
  useAppDispatch,
  useMutationSlice,
  useQuerySlice,
} from "../../../redux/hooks";
import { clearData } from "../../../redux/slice/data";
import { fetchListData } from "../../../redux/slice/data/action";
import {
  fetchCleanData,
  fetchRemoveData,
} from "../../../redux/slice/data/action";
import { FILTER_FIELDS } from "../../../utils/constant";
import UploadData from "../UploadData";
import { column } from "./column";

const initialParams: DataListParams = {
  page: 1,
  size: 10,
};

export const ListData: React.FC = () => {
  const [params, setParams] = useState(initialParams);
  const { setModal, onClose } = useContext(ModalContext);
  const dispatch = useAppDispatch();

  const { data, loading, meta } = useQuerySlice<DataList[], DataListParams>({
    key: "list",
    slice: "data",
    clearSlice: clearData("list"),
    thunk: fetchListData(params),
    initial: params,
  });

  const onSuccess = () => {
    setParams({ page: 1, size: 10 });
    onClose();
  };

  const onUpload = () => {
    setModal({
      open: true,
      content: <UploadData onSuccess={onSuccess} />,
      title: "Unggah Data Balita",
    });
  };

  const onAction = (type: "detail" | "edit", values: DataList) => {
    setModal({
      open: true,
      content: (
        <FormData formType={type} detail={values} onSuccess={onSuccess} />
      ),
      title: type === "detail" ? "Detail Data Balita" : "Ubah Data Balita",
    });
  };

  const onDelete = (id: number) => {
    setModal({
      open: true,
      content: <ConfirmationContent confirmationType="delete" />,
      type: "confirmation",
      confirmationType: "delete",
      onConfirm: () => dispatch(fetchRemoveData(`${id}`)),
    });
  };

  const onFilter = (filter: Record<string, unknown>) => {
    setParams({ ...params, ...filter, page: 1 });
  };

  const onSearch = (search: string) => {
    if (search !== null) {
      setParams({ ...params, search, page: 1 });
    }
  };

  const onChangePage = (page: number) => {
    setParams({ ...params, page });
  };

  const onChangeRowPerPage = (size: number) => {
    setParams({ ...params, size, page: 1 });
  };

  const onClear = () => {
    setModal({
      open: true,
      content: <ConfirmationContent confirmationType="clear" />,
      type: "confirmation",
      confirmationType: "delete",
      onConfirm: () => dispatch(fetchCleanData()),
    });
  };

  useMutationSlice({
    key: "remove",
    slice: "data",
    clearSlice: () => dispatch(clearData("remove")),
    onSuccess: () => onSuccess(),
  });

  useMutationSlice({
    key: "clean",
    slice: "data",
    clearSlice: () => dispatch(clearData("clean")),
    onSuccess: () => onSuccess(),
  });

  return (
    <BaseTable
      actionComponent={
        <div className="flex gap-4">
          <Button
            leftIcon={<ICONS.Upload width={20} height={20} />}
            className="!text-sm !min-h-[45px]"
            onClick={onUpload}
          >
            Unggah Data
          </Button>
          <Button
            className="!text-sm !min-h-[45px] !bg-white border !border-[#D62A24] !text-[#D62A24]"
            onClick={onClear}
          >
            <ICONS.Trash width={20} height={20} style={{ fill: "#D62A24" }} />
          </Button>
        </div>
      }
      columns={column({
        loading,
        onDetail: (values) => onAction("detail", values),
        onEdit: (values) => onAction("edit", values),
        onDelete: (value) => onDelete(value),
      })}
      data={data}
      meta={meta}
      filterFields={[FILTER_FIELDS.STATUS, FILTER_FIELDS.GENDER]}
      onFilter={onFilter}
      onSearch={onSearch}
      onChangePage={onChangePage}
      onChangeRowPerPage={onChangeRowPerPage}
      title="Daftar Balita"
      totalRows={Number(params.size || 0)}
    />
  );
};
