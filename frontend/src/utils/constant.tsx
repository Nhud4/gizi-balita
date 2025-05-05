export const FILTER_FIELDS: Record<string, FilterField> = {
  STATUS: {
    label: "Status Gizi",
    name: "gizi",
    options: [
      { label: "Semua", value: "" },
      { label: "Gizi Normal", value: "0" },
      { label: "Gizi Kurang", value: "1" },
    ],
    initialValue: { label: "Semua", value: "" },
    type: "single",
  },
  GENDER: {
    label: "Jenis Kelamin",
    name: "gender",
    options: [
      { label: "Semua", value: "" },
      { label: "Laki-laki", value: "L" },
      { label: "Perempuan", value: "P" },
    ],
    initialValue: { label: "Semua", value: "" },
    type: "single",
  },
};

export const GENDER_OPS: DropdownOption[] = [
  { label: "Laki-laki", value: "L" },
  { label: "Perempuan", value: "P" },
];

export const STATUS_OPS: DropdownOption[] = [
  { label: "Gizi Normal", value: "0" },
  { label: "Gizi Kurang", value: "1" },
];
