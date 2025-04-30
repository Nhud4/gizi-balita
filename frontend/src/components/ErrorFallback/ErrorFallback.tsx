import React from "react";
import IMAGES from "../../configs/images";
import Button from "../Button";

export const ErrorFallback: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <img src={IMAGES.Error} alt="waiting" style={{ width: "350px" }} />

      <h1 className="text-2xl font-semibold">
        Terjadi kesalahan saat memuat halaman
      </h1>

      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Kembali Ke Beranda
        </Button>
        <Button
          className="!bg-transparent border border-[#009276] !text-[#009276]"
          onClick={() => {
            window.location.reload();
          }}
        >
          Muat Ulang Halaman
        </Button>
      </div>
    </section>
  );
};
