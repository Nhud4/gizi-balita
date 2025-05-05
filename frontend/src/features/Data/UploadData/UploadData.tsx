import React, { useContext, useRef, useState } from "react";

import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import ICONS from "../../../configs/icons";
import IMAGES from "../../../configs/images";
import { ModalContext } from "../../../contexts/ModalContext";

export const UploadData: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [, setDoc] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);
  const { onClose } = useContext(ModalContext);

  return (
    <div className="relative flex flex-col gap-6">
      <input
        ref={ref}
        type="file"
        className="absolute w-0 transform scale-0 opacity-0"
        accept=".csv"
        onChange={(event) => {
          const { files } = event.target;
          if (!files?.length) return;

          const file = files[0] as unknown as File;
          setFileName(files[0].name);
          setDoc(file);
        }}
      />

      <div className="flex flex-col justify-center items-center gap-4 border border-dashed rounded-lg border-[#38F4D1] p-4">
        {loadSubmit ? (
          <Spinner size="large" />
        ) : (
          <img src={IMAGES.CsvFile} alt="csv" width={100} />
        )}
        <h1 className="text-xl font-semibold">{fileName || "Unggah Data"}</h1>
        <p className="text-sm text-[#9E9E9E]">
          Format yang didukung hanya .csv
        </p>
        <Button
          leftIcon={
            <ICONS.Upload width={20} height={20} style={{ color: "009276" }} />
          }
          className="!bg-white border !border-[#009276] !text-[#009276]"
          onClick={() => {
            ref.current?.click();
          }}
        >
          {fileName ? "Pilih ulang" : "Pilih file"}
        </Button>
      </div>

      <div className="flex justify-end items-center gap-4">
        <Button
          className="!bg-white border !border-[#009276] !text-[#009276]"
          onClick={onClose}
        >
          Tutup
        </Button>
        <Button
          leftIcon={<ICONS.Save width={20} height={20} />}
          onClick={() => setLoadSubmit(true)}
          disabled={loadSubmit}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};
