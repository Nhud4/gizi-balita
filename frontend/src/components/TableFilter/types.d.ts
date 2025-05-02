type FilterField = {
  initialValue?: SelectOption;
  label: string;
  name: string;
  options: SelectOption[];
  type?: "single" | "multiple";
};
