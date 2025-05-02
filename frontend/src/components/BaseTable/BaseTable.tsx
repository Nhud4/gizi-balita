import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Select, { StylesConfig } from "react-select";

import ICONS from "../../configs/icons";
import IMAGES from "../../configs/images";
import { tableStyles } from "../../utils/datatable";
import {
  useDebounce,
  useWindowHeight,
  useWindowWidth,
} from "../../utils/hooks";
import TableFilter from "../TableFilter";
import useFilter from "../TableFilter/useFilter";

type Props<T> = {
  data: T[];
  columns: TableColumn<T>[];
  title: string;
  filterFields?: FilterField[];
  onFilter?: (params: Record<string, unknown>) => void;
  onSearch?: (search: string) => void;
  actionComponent?: React.ReactNode;
};

const options = [
  { value: 10, label: 10 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 50, label: 50 },
];

const customStyles: StylesConfig = {
  option: (provided, { isSelected }) => ({
    ...provided,
    fontSize: 12,
    padding: 5,
    background: isSelected ? "#009276" : "#ffffff",
    "&:hover": {
      background: isSelected ? "#009276" : "#E5E5E5",
    },
  }),
  control: () => ({
    display: "flex",
    width: 40,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "8px 0",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition, fontSize: 12 };
  },
};

export const BaseTable: <T>(props: Props<T>) => React.ReactElement = ({
  data,
  columns,
  title,
  filterFields,
  onFilter,
  onSearch,
  actionComponent,
}) => {
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  const withFilter = onFilter && filterFields?.length;
  const initialFilter = filterFields?.length
    ? Object.assign(
        {},
        ...filterFields.map((item) => ({
          [item.name]: item?.initialValue || "",
        }))
      )
    : {};

  const { selected, onChangeFilter, params } = useFilter(initialFilter);
  const hasFilter = Object.values(params).some((item) =>
    Array.isArray(item) ? item.length : Boolean(item)
  );
  const [alreadyFiltered, setAlreadyFiltered] = useState(hasFilter);
  const [search, setSearch] = useState<string | null>(null);
  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    if (withFilter && alreadyFiltered) {
      onFilter(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, alreadyFiltered]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debounceSearch as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  useEffect(() => {
    setAlreadyFiltered(hasFilter);
  }, [hasFilter]);

  return (
    <div
      className="bg-white p-4 rounded-xl"
      style={{ maxWidth: `${windowWidth - 32}px` }}
    >
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <span className="text-sm px-3 py-[6px] rounded-lg bg-[#ACFAEC]">
            50
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border px-4 h-[45px] rounded-lg border-[#E5E5E5]">
            <ICONS.Search width={25} height={25} />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Cari disini..."
              onChange={({ target: { value } }) => setSearch(value)}
              value={search || ""}
            />
          </div>

          {withFilter ? (
            <TableFilter
              className="ml-auto"
              fields={filterFields}
              onChange={onChangeFilter}
              selected={selected}
            />
          ) : null}

          {actionComponent}
        </div>
      </div>

      <DataTable
        columns={columns}
        customStyles={tableStyles()}
        data={data}
        persistTableHead={true}
        theme="solarized"
        fixedHeader
        fixedHeaderScrollHeight={`${windowHeight - 300}px`}
        noDataComponent={
          <div className="grid w-full min-h-full bg-white place-items-center py-8">
            <div className="flex flex-col items-center">
              <img alt="Empty" className="w-[40%]" src={IMAGES.Empty} />
              <p className="font-semibold text-center text-black-80">
                Data tidak ditemukan.
              </p>
            </div>
          </div>
        }
      />

      <div className="flex justify-between items-center text-sm">
        <div>1 - 10 dari 50</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <p>Menampilkan baris perhalaman</p>
            <Select
              defaultValue={options[0]}
              menuPlacement="auto"
              options={options}
              styles={customStyles}
              isSearchable={false}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-[#E5E5E5] rounded-md rotate-90 p-1">
              <ICONS.Arrow width={15} height={15} style={{ fill: "#9E9E9E" }} />
            </button>
            <p>1/5</p>
            <button className="border border-[#E5E5E5] rounded-md -rotate-90 p-1 cursor-pointer">
              <ICONS.Arrow width={15} height={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
