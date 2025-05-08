import React, { useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Select, { StylesConfig } from "react-select";

import ICONS from "../../configs/icons";
import IMAGES from "../../configs/images";
import { clsx } from "../../utils";
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
  meta?: Meta;
  totalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowPerPage?: (size: number) => void;
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
  meta,
  title,
  filterFields,
  totalRows,
  onFilter,
  onSearch,
  onChangePage,
  actionComponent,
  onChangeRowPerPage,
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

  const showingInfo = useMemo(() => {
    const start =
      Number(meta?.page) === 1
        ? 1
        : Number(totalRows) * (Number(meta?.page) - 1) + 1;
    const end = Number(meta?.page) * Number(totalRows || 0);

    return Number(meta?.totalData)
      ? `${start} - ${
          end > Number(meta?.totalData) ? Number(meta?.totalData) : end
        }`
      : "0";
  }, [meta?.page, totalRows, meta?.totalData]);

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
          {meta ? (
            <span className="text-sm px-3 py-[6px] rounded-lg bg-[#ACFAEC]">
              {meta?.totalData || 0}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          {onSearch ? (
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
          ) : null}

          {withFilter ? (
            <TableFilter
              className="ml-auto"
              fields={filterFields}
              onChange={onChangeFilter}
              selected={selected}
              closeFilter
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

      {meta ? (
        <div className="flex justify-between items-center text-xs mt-8">
          <div>
            {showingInfo} dari {meta?.totalData}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <p>Menampilkan baris perhalaman</p>
              <Select
                defaultValue={options[0]}
                menuPlacement="auto"
                options={options}
                styles={customStyles}
                isSearchable={false}
                onChange={(newValue) => {
                  const option = newValue as { value: number; label: number };
                  if (onChangeRowPerPage) {
                    onChangeRowPerPage(option.value);
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                className="border border-[#E5E5E5] rounded-md rotate-90 p-1"
                onClick={() => {
                  const currentPage = meta?.page as number;
                  if (onChangePage) {
                    onChangePage(currentPage - 1);
                  }
                }}
                disabled={meta?.page === 1}
              >
                <ICONS.Arrow
                  width={15}
                  height={15}
                  style={{ fill: meta?.page === 1 ? "#9E9E9E" : "" }}
                />
              </button>
              <p>
                {meta?.page}/{" "}
                <span className="opacity-70">
                  {meta?.totalPage === 0 ? 1 : meta?.totalPage}
                </span>{" "}
              </p>
              <button
                className={clsx([
                  "border border-[#E5E5E5] rounded-md -rotate-90 p-1",
                  meta?.page === meta?.totalPage || meta?.totalPage === 0
                    ? "cursor-default"
                    : "cursor-pointer",
                ])}
                disabled={Boolean(
                  meta?.page === meta?.totalPage || meta?.totalPage === 0
                )}
                onClick={() => {
                  const currentPage = meta?.page as number;
                  if (onChangePage) {
                    onChangePage(currentPage + 1);
                  }
                }}
              >
                <ICONS.Arrow
                  width={15}
                  height={15}
                  style={{
                    fill:
                      meta?.page === meta?.totalPage || meta?.totalPage === 0
                        ? "#9E9E9E"
                        : "",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
