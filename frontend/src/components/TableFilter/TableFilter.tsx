import React, { HTMLAttributes, useEffect, useState } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  PropsValue,
  SingleValue,
} from "react-select";

import ICONS from "../../configs/icons";
import { clsx } from "../../utils";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  closeFilter?: boolean;
  fields: FilterField[];
  onChange?: (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => void;
  selected: Record<string, unknown>;
};

export const TableFilter: React.FC<Props> = ({
  fields,
  className,
  onChange,
  selected,
  closeFilter,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (closeFilter) {
      setOpen(false);
    }
  }, [selected, closeFilter]);

  return (
    <div {...props} className={clsx(["relative", className as string])}>
      <button
        className="flex justify-center items-center rounded-lg cursor-pointer bg-[#ACFAEC] h-[45px] w-[45px]"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {open ? (
          <ICONS.Close height={24} width={24} style={{ fill: "#E5F0F4" }} />
        ) : (
          <ICONS.Filter style={{ color: "#009276" }} height={24} width={24} />
        )}
      </button>
      <div
        className={clsx([
          "transition origin-top-right bg-white shadow-2xl p-4 rounded-md",
          "min-w-[225px] max-h-[325px] overflow-auto",
          "absolute top-[100%] right-0 mt-4 z-10 border border-[#E5E5E5]",
          open ? "" : "scale-0",
        ])}
      >
        {fields?.map(({ label, name, options, type }) => (
          <div key={label}>
            <p className="mb-2 text-base font-medium">{label}</p>
            <Select
              components={{
                Control: () => null,
                Option: ({
                  innerProps,
                  innerRef,
                  isSelected,
                  data,
                  isMulti,
                }) => (
                  <div
                    {...innerProps}
                    ref={innerRef}
                    className="flex items-center mt-3 space-x-2 cursor-pointer"
                    role="button"
                  >
                    <input
                      checked={isSelected}
                      className="cursor-pointer"
                      id={data.value.toString()}
                      readOnly
                      type={isMulti ? "checkbox" : "radio"}
                    />
                    {data.icon}
                    <label
                      className="mt-1 text-sm pointer-events-none"
                      htmlFor={data.value.toString()}
                    >
                      {data.label}
                    </label>
                  </div>
                ),
              }}
              hideSelectedOptions={false}
              isMulti={type === "multiple"}
              menuIsOpen
              name={name}
              onChange={onChange}
              options={options}
              styles={{
                menu: (styles) => ({
                  ...styles,
                  background: "transparent",
                  position: "relative",
                  border: "none",
                  boxShadow: "unset",
                  marginTop: "-1.25rem",
                }),
              }}
              value={selected[name] as PropsValue<SelectOption>}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
