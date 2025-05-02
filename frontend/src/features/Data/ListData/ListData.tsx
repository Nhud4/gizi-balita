import React, { useContext } from "react";

import BaseTable from "../../../components/BaseTable";
import Button from "../../../components/Button";
import ICONS from "../../../configs/icons";
import { ModalContext } from "../../../contexts/ModalContext";
import { FILTER_FIELDS } from "../../../utils/constant";
import UploadData from "../UploadData";
import { column } from "./column";

export const ListData: React.FC = () => {
  const { setModal } = useContext(ModalContext);

  const onUpload = () => {
    setModal({
      open: true,
      content: <UploadData />,
      title: "Unggah Data Balita",
    });
  };

  return (
    <BaseTable
      actionComponent={
        <Button
          leftIcon={<ICONS.Upload width={20} height={20} />}
          className="!text-sm !min-h-[45px]"
          onClick={onUpload}
        >
          Unggah Data
        </Button>
      }
      columns={column(false)}
      data={[]}
      filterFields={[FILTER_FIELDS.STATUS, FILTER_FIELDS.GENDER]}
      onFilter={() => {}}
      title="Daftar Balita"
    />
  );
};
