import { TableColumn } from "react-data-table-component";

import TableCell from "../../../components/TableCell";
import { clsx } from "../../../utils";

export const column = (loading: boolean): TableColumn<Neighbor>[] => [
  {
    name: "Rank",
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={25} value={no?.toString()} />
    ),
    width: "70px",
  },
  {
    name: "Nama",
    cell: ({ name }) => (
      <TableCell loading={loading} skeletonWidth={100} value={name} />
    ),
  },
  {
    name: "Jenis Kelamin",
    cell: ({ gender }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={gender === "L" ? "Laki-laki" : "Perempuan"}
      />
    ),
  },
  {
    name: "Usia",
    cell: ({ age }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={`${age.toFixed(2)} Bulan`}
      />
    ),
  },
  {
    name: "Berat Badan",
    cell: ({ weight }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={`${parseFloat(weight || "0").toFixed(2)} Kg`}
      />
    ),
  },
  {
    name: "Tinggi Badan",
    cell: ({ height }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={`${parseFloat(height || "0").toFixed(2)} Cm`}
      />
    ),
  },
  {
    name: "LiLA",
    cell: ({ lila }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={`${parseFloat(lila || "0").toFixed(2)} Cm`}
      />
    ),
  },
  {
    name: "Jarak",
    cell: ({ dist }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={`${dist.toFixed(3)}`}
      />
    ),
  },
  {
    name: "Status Gizi",
    cell: ({ status }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={
          <div
            className={clsx([
              "p-2 rounded-md w-20 text-center",
              status === "0"
                ? "bg-[#EAF7EA] text-[#2CB22E]"
                : "bg-[#FBEAE9] text-[#D62A24]",
            ])}
          >
            <p>{status === "0" ? "Normal" : "Kurang"}</p>
          </div>
        }
      />
    ),
  },
];
