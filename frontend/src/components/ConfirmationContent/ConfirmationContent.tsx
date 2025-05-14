import React from "react";

import IMAGES from "../../configs/images";

type Props = {
  confirmationType?: "delete" | "add" | "edit" | "logout" | "clear";
};

export const ConfirmationContent: React.FC<Props> = ({ confirmationType }) => {
  if (confirmationType === "delete") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <img src={IMAGES.Remove} alt="icon" />
        <h1 className="font-semibold">Konfirmasi Penghapusan</h1>
        <p className="text-sm">
          Apakah Anda yakin ingin menghapus <br /> secara permanen pada data
          yang dipilih?
        </p>
      </div>
    );
  }

  if (confirmationType === "clear") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <img src={IMAGES.Clean} alt="icon" />
        <h1 className="font-semibold">Konfirmasi Penghapusan Semua Data</h1>
        <p className="text-sm">
          Apakah Anda yakin ingin menghapus <br /> secara permanen semua data?
        </p>
      </div>
    );
  }

  if (confirmationType === "add") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <img src={IMAGES.Question} alt="icon" />
        <h1 className="font-semibold">Konfirmasi Pengecekan</h1>
        <p className="text-sm">
          Apakah Anda yakin untuk melanjutkan <br /> pengecekan data? Pastikan
          informasi yang dimasukkan <br /> benar dan sesuai.
        </p>
      </div>
    );
  }

  if (confirmationType === "logout") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <img
          src={IMAGES.Power}
          alt="icon"
          style={{ width: "96px", height: "96px" }}
        />
        <h1 className="font-semibold">Konfirmasi Keluar</h1>
        <p className="text-sm">
          Apakah Anda yakin ingin keluar dari akun? <br />
          Pastikan semua pekerjaan telah disimpan <br /> sebelum keluar.
        </p>
      </div>
    );
  }

  return null;
};
