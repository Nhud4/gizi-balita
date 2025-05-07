import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import DropdownInput from "../../components/DropdownInput";
import Spinner from "../../components/Spinner";
import TextInput from "../../components/TextInput";
import { useAppDispatch, useMutationSlice } from "../../redux/hooks";
import { clearData } from "../../redux/slice/data";
import { fetchCreateData } from "../../redux/slice/data/action";
import { GENDER_OPS } from "../../utils/constant";

const defaultValues = {
  name: "",
  gender: "L",
  age: "",
  weight: "",
  height: "",
  lila: "",
  k: 0,
};

type Values = {
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  lila: string;
  k: number;
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
    k: "Nilai K",
  };

  Object.keys(values).forEach((item) => {
    const key = item as keyof Values;
    if (!values[key]) {
      state((prev) => ({ ...prev, [key]: `${label[key]} tidak boleh kosong` }));
    }
    if (values[key] === 0) {
      state((prev) => ({ ...prev, [key]: `${label[key]} harus lebih dari 0` }));
    }
  });
};

export const FormCalculation: React.FC = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [errMessage, serErrMessage] = useState(defaultValues);
  const dispatch = useAppDispatch();

  const selectGender = GENDER_OPS.filter(
    (item) => item.value === formValues.gender
  )[0];
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formValues.name ||
      !formValues.age ||
      !formValues.weight ||
      !formValues.height ||
      !formValues.lila ||
      formValues.k === 0
    ) {
      MessageErr(formValues, serErrMessage);
    } else {
      dispatch(fetchCreateData(formValues));
    }
  };

  const { loading } = useMutationSlice({
    key: "add",
    slice: "data",
    clearSlice: () => dispatch(clearData("add")),
  });

  useEffect(() => {
    Object.keys(formValues).forEach((item) => {
      const key = item as keyof Values;
      if (formValues[key]) {
        serErrMessage((prev) => ({ ...prev, [key]: "" }));
      }
    });
  }, [formValues]);

  return (
    <form
      className="flex flex-col gap-4 bg-white p-4 rounded-xl"
      onSubmit={onSubmit}
    >
      <h1 className="font-semibold">Masukkan Data Antropometri</h1>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Nama Balita"
          isRequired
          upperCase
          placeholder="Nama balita"
          value={formValues.name}
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
          onlyNumber
          value={formValues.age}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, age: e.target.value }))
          }
          errMessage={errMessage.age}
        />
        <TextInput
          label="Berat Badan"
          isRequired
          placeholder="0"
          prefix="Kg"
          onlyNumber
          value={formValues.weight}
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
          onlyNumber
          value={formValues.height}
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
          onlyNumber
          value={formValues.lila}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, lila: e.target.value }))
          }
          errMessage={errMessage.lila}
        />
        <TextInput
          label="Nilai K"
          isRequired
          placeholder="0"
          onlyNumber
          integer
          value={formValues.k}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              k: parseInt(e.target.value) || 0,
            }))
          }
          errMessage={errMessage.k as unknown as string}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {loading ? <Spinner /> : "Cek dan simpan data balita"}
        </Button>
      </div>
    </form>
  );
};
