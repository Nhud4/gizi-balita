import React, { useContext, useState } from "react";

import Button from "../../components/Button";
import DropdownInput from "../../components/DropdownInput";
import Spinner from "../../components/Spinner";
import TextInput from "../../components/TextInput";
import ICONS from "../../configs/icons";
import { ModalContext } from "../../contexts/ModalContext";
import { useAppDispatch, useMutationSlice } from "../../redux/hooks";
import { clearData } from "../../redux/slice/data";
import { fetchUpdateData } from "../../redux/slice/data/action";
import { GENDER_OPS, STATUS_OPS } from "../../utils/constant";

type Props = {
  formType: "detail" | "edit";
  detail: DataList;
  onSuccess?: () => void;
};

type Values = {
  name: string;
  gender: string;
  age: number | string;
  weight: string;
  height: string;
  lila: string;
  status: string;
};

const defaultErr: Values = {
  name: "",
  gender: "",
  age: "",
  weight: "",
  height: "",
  lila: "",
  status: "",
};

const MessageErr = (
  values: Values,
  state: React.Dispatch<React.SetStateAction<Values>>
) => {
  const label = {
    name: "Nama balita",
    gender: "Jenis kelamin",
    age: "Usia",
    weight: "Berat badan",
    height: "Tinggi badan",
    lila: "Lingkar kepala",
    status: "Status Gizi",
  };

  Object.keys(values).forEach((item) => {
    const key = item as keyof Values;
    if (!values[key]) {
      state((prev) => ({ ...prev, [key]: `${label[key]} tidak boleh kosong` }));
    }
  });
};

export const FormData: React.FC<Props> = ({ formType, detail, onSuccess }) => {
  const { onClose } = useContext(ModalContext);
  const [formValues, setFormValues] = useState(detail);
  const [errMessage, serErrMessage] = useState(defaultErr);
  const dispatch = useAppDispatch();

  const selectGender = GENDER_OPS.filter(
    (item) => item.value === formValues.gender
  );
  const selectStatus = STATUS_OPS.filter(
    (item) => item.value === formValues.status
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formValues.name ||
      !formValues.age ||
      !formValues.weight ||
      !formValues.height ||
      !formValues.lila ||
      !formValues.status
    ) {
      MessageErr(formValues, serErrMessage);
    } else {
      const payload: UpdatePayload = {
        name: formValues.name,
        gender: formValues.gender,
        age: formValues.age,
        weight: formValues.weight,
        height: formValues.height,
        lila: formValues.lila,
        status: formValues.status,
      };

      dispatch(fetchUpdateData({ id: `${detail.id}`, payload }));
    }
  };

  const { loading } = useMutationSlice({
    key: "edit",
    slice: "data",
    clearSlice: () => dispatch(clearData("edit")),
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Nama Balita"
          isRequired
          upperCase
          placeholder="Nama balita"
          value={formValues.name}
          disabled={formType === "detail"}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
          errMessage={errMessage.name}
        />
        <DropdownInput
          label="Jenis Kelamin"
          isRequired
          options={GENDER_OPS}
          placeholder="Pilih jenis kelamin..."
          isDisabled={formType === "detail"}
          value={selectGender}
          onChange={(newValue) => {
            const ops = newValue as DropdownOption;
            setFormValues((prev) => ({ ...prev, gender: ops.value }));
          }}
        />
        <TextInput
          label="Usia"
          isRequired
          placeholder="0"
          prefix="Bulan"
          value={formValues.age}
          disabled={formType === "detail"}
          onlyNumber
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
          errMessage={errMessage.age as string}
        />
        <TextInput
          label="Berat Badan"
          isRequired
          placeholder="0"
          prefix="Kg"
          value={formValues.weight}
          disabled={formType === "detail"}
          onlyNumber
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, weight: e.target.value }))
          }
          errMessage={errMessage.weight}
        />
        <TextInput
          label="Tinggi Badan"
          isRequired
          placeholder="0"
          prefix="Cm"
          value={formValues.height}
          disabled={formType === "detail"}
          onlyNumber
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, height: e.target.value }))
          }
          errMessage={errMessage.height}
        />
        <TextInput
          label="Lingkar Kepala"
          isRequired
          placeholder="0"
          prefix="Cm"
          value={formValues.lila}
          disabled={formType === "detail"}
          onlyNumber
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, lila: e.target.value }))
          }
          errMessage={errMessage.lila}
        />
        <DropdownInput
          label="Status Gizi"
          isRequired
          options={STATUS_OPS}
          placeholder="Pilih status gizi..."
          isDisabled={formType === "detail"}
          value={selectStatus}
          onChange={(newValue) => {
            const ops = newValue as DropdownOption;
            setFormValues((prev) => ({ ...prev, status: ops.value }));
          }}
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
          <Button
            leftIcon={
              !loading ? <ICONS.Save width={20} height={20} /> : undefined
            }
            disabled={loading}
          >
            {loading ? <Spinner /> : "Simpan"}
          </Button>
        </div>
      ) : null}
    </form>
  );
};
