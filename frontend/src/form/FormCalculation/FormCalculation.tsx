import React from "react";

import Button from "../../components/Button";
import DropdownInput from "../../components/DropdownInput";
import TextInput from "../../components/TextInput";
import { GENDER_OPS } from "../../utils/constant";

export const FormCalculation: React.FC = () => {
  return (
    <form className="flex flex-col gap-4 bg-white p-4 rounded-xl">
      <h1 className="font-semibold">Masukkan Data Antropometri</h1>
      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Nama Balita" isRequired placeholder="Nama balita" />
        <DropdownInput
          label="Jenis Kelamin"
          isRequired
          options={GENDER_OPS}
          placeholder="Pilih jenis kelamin..."
        />
        <TextInput label="Usia" isRequired placeholder="0" prefix="Bulan" />
        <TextInput label="Berat Badan" isRequired placeholder="0" prefix="Kg" />
        <TextInput
          label="Tinggi Badan"
          isRequired
          placeholder="0"
          prefix="Cm"
        />
        <TextInput
          label="Lingkar Kepala"
          isRequired
          placeholder="0"
          prefix="Cm"
        />
        <TextInput label="Nilai K" isRequired placeholder="0" />
      </div>

      <div className="flex justify-end">
        <Button>Cek status gizi</Button>
      </div>
    </form>
  );
};
