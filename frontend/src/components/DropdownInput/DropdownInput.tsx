import React from "react";
import Select, { Props, StylesConfig } from "react-select";

type DropdownProps = {
  options: DropdownOption[];
  label?: string;
  isRequired?: boolean;
  defaultValue?: DropdownOption;
} & Props;

const customStyles: StylesConfig = {
  option: (provided, { isSelected }) => ({
    ...provided,
    fontSize: 14,
    background: isSelected ? "#009276" : "#ffffff",
    "&:hover": {
      background: isSelected ? "#009276" : "#38F4D1",
    },
  }),
  control: (rest) => ({
    ...rest,
    fontSize: 14,
    cursor: "pointer",
    minWidth: "6rem",
    minHeight: 46,
    borderRadius: "6px",
    borderColor: "#E5E5E5",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export const DropdownInput: React.FC<DropdownProps> = ({
  options,
  label,
  isRequired,
  defaultValue,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label ? (
        <h1 className="text-sm text-left font-medium">
          {label}
          {isRequired ? <span>*</span> : null}
        </h1>
      ) : null}
      <Select
        {...props}
        defaultValue={defaultValue}
        options={options}
        menuPlacement="auto"
        styles={customStyles}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#38F4D1",
            primary: "#009276",
          },
        })}
      />
    </div>
  );
};
