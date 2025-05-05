import React, { useContext, useState } from "react";

import Button from "../../components/Button";
import DropdownInput from "../../components/DropdownInput";
import TextInput from "../../components/TextInput";
import ICONS from "../../configs/icons";
import { ModalContext } from "../../contexts/ModalContext";
import { GENDER_OPS, STATUS_OPS } from "../../utils/constant";

type Props = {
  formType: "detail" | "edit";
  detail: DataList;
};

export const FormData: React.FC<Props> = ({ formType, detail }) => {
  const { onClose } = useContext(ModalContext);
  const [formValues] = useState(detail);

  const selectGender = GENDER_OPS.filter(
    (item) => item.value === formValues.gender
  );
  const selectStatus = STATUS_OPS.filter(
    (item) => item.value === formValues.status
  );

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Nama Balita"
          isRequired
          placeholder="Nama balita"
          value={formValues.name}
          disabled={formType === "detail"}
        />
        <DropdownInput
          label="Jenis Kelamin"
          isRequired
          options={GENDER_OPS}
          placeholder="Pilih jenis kelamin..."
          isDisabled={formType === "detail"}
          value={selectGender}
        />
        <TextInput
          label="Usia"
          isRequired
          placeholder="0"
          prefix="Bulan"
          value={formValues.age}
          disabled={formType === "detail"}
        />
        <TextInput
          label="Berat Badan"
          isRequired
          placeholder="0"
          prefix="Kg"
          value={formValues.weight}
          disabled={formType === "detail"}
        />
        <TextInput
          label="Tinggi Badan"
          isRequired
          placeholder="0"
          prefix="Cm"
          value={formValues.height}
          disabled={formType === "detail"}
        />
        <TextInput
          label="Lingkar Kepala"
          isRequired
          placeholder="0"
          prefix="Cm"
          value={formValues.lila}
          disabled={formType === "detail"}
        />
        <DropdownInput
          label="Status Gizi"
          isRequired
          options={STATUS_OPS}
          placeholder="Pilih status gizi..."
          isDisabled={formType === "detail"}
          value={selectStatus}
        />
      </div>

      {formType === "edit" ? (
        <div className="flex justify-end items-center gap-4">
          <Button
            className="!bg-white border !border-[#009276] !text-[#009276]"
            onClick={onClose}
          >
            Tutup
          </Button>
          <Button leftIcon={<ICONS.Save width={20} height={20} />}>
            Simpan
          </Button>
        </div>
      ) : null}
    </form>
  );
};
