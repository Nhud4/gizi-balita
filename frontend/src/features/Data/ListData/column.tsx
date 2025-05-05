import { TableColumn } from "react-data-table-component";

import Popup from "../../../components/Popup";
import TableCell from "../../../components/TableCell";
import { clsx } from "../../../utils";

type Props = {
  loading: boolean;
  onDetail: (value: DataList) => void;
  onEdit: (value: DataList) => void;
  onDelete: (id: number) => void;
};

export const column = ({
  loading,
  onDetail,
  onDelete,
  onEdit,
}: Props): TableColumn<DataList>[] => [
  {
    name: "No",
    cell: ({ no }) => (
      <TableCell loading={loading} skeletonWidth={25} value={no?.toString()} />
    ),
    width: "70px",
  },
  {
    name: "Nama Balita",
    cell: ({ name }) => (
      <TableCell
        loading={loading}
        skeletonWidth={100}
        value={<p className="capitalize">{name.toLowerCase()}</p>}
      />
    ),
    width: "19%",
  },
  {
    name: "Jenis Kelamin",
    cell: ({ gender }) => (
      <TableCell
        loading={loading}
        skeletonWidth={25}
        value={gender === "L" ? "Laki-laki" : "Prempuan"}
      />
    ),
  },
  {
    name: "Usia",
    cell: ({ age }) => (
      <TableCell loading={loading} skeletonWidth={25} value={`${age} Bulan`} />
    ),
  },
  {
    name: "Berat Badan",
    cell: ({ weight }) => (
      <TableCell loading={loading} skeletonWidth={25} value={`${weight} Kg`} />
    ),
  },
  {
    name: "Tinggi Badan",
    cell: ({ height }) => (
      <TableCell loading={loading} skeletonWidth={25} value={`${height} Cm`} />
    ),
  },
  {
    name: "LiLA",
    cell: ({ lila }) => (
      <TableCell loading={loading} skeletonWidth={25} value={`${lila} Cm`} />
    ),
  },
  {
    name: "Status Gizi",
    cell: (values) => (
      <TableCell
        loading={loading}
        skeletonWidth={25}
        value={
          <Popup
            onDetail={() => onDetail(values)}
            onEdit={() => onEdit(values)}
            onDelete={() => onDelete(values.id)}
            value={
              <div
                className={clsx([
                  "p-2 rounded-md w-20 text-center",
                  values.status === "0"
                    ? "bg-[#EAF7EA] text-[#2CB22E]"
                    : "bg-[#FBEAE9] text-[#D62A24]",
                ])}
              >
                <p>{values.status === "0" ? "Normal" : "Kurang"}</p>
              </div>
            }
          />
        }
      />
    ),
    width: "15%",
  },
];
