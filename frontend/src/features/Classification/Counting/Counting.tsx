import React from "react";

export const Counting: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <h1 className="font-semibold">Hasil Cek Status Gizi</h1>
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-sm font-medium text-[#9E9E9E]">
          Belum ada data gizi
        </p>
      </div>
    </div>
  );
};
