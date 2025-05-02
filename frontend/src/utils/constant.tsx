export const FILTER_FIELDS: Record<string, FilterField> = {
  STATUS: {
    label: "Status Gizi",
    name: "status",
    options: [
      { label: "Semua", value: "" },
      { label: "Gizi Normal", value: "finish" },
      { label: "Gizi Kurang", value: "cancel" },
    ],
    initialValue: { label: "Semua", value: "" },
    type: "single",
  },
  GENDER: {
    label: "Jenis Kelamin",
    name: "gender",
    options: [
      { label: "Semua", value: "" },
      { label: "Laki-laki", value: "finish" },
      { label: "Perempuan", value: "cancel" },
    ],
    initialValue: { label: "Semua", value: "" },
    type: "single",
  },
};
