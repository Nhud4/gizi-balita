import React from "react";

import { clsx } from "../../../utils";
import styles from "./styles.module.css";

type Props = {
  data?: PayloadResponse;
};

export const Counting: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <h1 className="font-semibold">Hasil Cek Status Gizi</h1>
      {data ? (
        <table className={styles.tableData}>
          <tr>
            <th>Nama</th>
            <td>{data.name}</td>
          </tr>
          <tr>
            <th>Jenis Kelamin</th>
            <td>{data.gender === "L" ? "Laki-laki" : "Perempuan"}</td>
          </tr>
          <tr>
            <th>Usia</th>
            <td>{data.age} Bulan</td>
          </tr>
          <tr>
            <th>Berat Badan</th>
            <td>{data.weight} Cm</td>
          </tr>
          <tr>
            <th>Tinggi Badan</th>
            <td>{data.height} Cm</td>
          </tr>
          <tr>
            <th>LiLA</th>
            <td>{data.lila} Cm</td>
          </tr>
          <tr>
            <th>Nilai K</th>
            <td>{data.k}</td>
          </tr>
          <tr>
            <th>Status Gizi</th>
            <td>
              <div
                className={clsx([
                  "p-2 rounded-md w-20 text-center",
                  data.status === "0"
                    ? "bg-[#EAF7EA] text-[#2CB22E]"
                    : "bg-[#FBEAE9] text-[#D62A24]",
                ])}
              >
                <p>{data.status === "0" ? "Normal" : "Kurang"}</p>
              </div>
            </td>
          </tr>
        </table>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-sm font-medium text-[#9E9E9E]">
            Belum ada data gizi
          </p>
        </div>
      )}
    </div>
  );
};
