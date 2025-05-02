type UserToken = {
  exp: string;
  token: string;
};

type SelectOption = {
  icon?: string | React.ReactElement;
  image?: string | React.ReactElement;
  label: string | React.ReactElement;
  value: string;
};

type SelectRow<T> = {
  allSelected: boolean;
  selectedCount: number;
  selectedRows: T[];
};
