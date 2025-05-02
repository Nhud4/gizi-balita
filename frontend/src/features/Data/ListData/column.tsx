import { TableColumn } from "react-data-table-component";

import TableCell from "../../../components/TableCell";

export const column = (loading: boolean): TableColumn<DataList>[] => [
  {
    name: "No",
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={25} value={no?.toString()} />
    ),
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
        value={gender === "L" ? "Laki-laki" : "Prempuan"}
      />
    ),
  },
  {
    name: "Usia",
    cell: ({ age }) => (
      <TableCell loading={loading} skeletonWidth={100} value={`${age} Bulan`} />
    ),
  },
  {
    name: "Berat",
    cell: ({ weight }) => (
      <TableCell loading={loading} skeletonWidth={100} value={`${weight} Kg`} />
    ),
  },
  {
    name: "Tinggi",
    cell: ({ height }) => (
      <TableCell loading={loading} skeletonWidth={100} value={`${height} Cm`} />
    ),
  },
  {
    name: "LiLA",
    cell: ({ lila }) => (
      <TableCell loading={loading} skeletonWidth={100} value={`${lila} Cm`} />
    ),
  },
];
