type Meta = {
  page: number;
  totalCost?: number;
  totalData: number;
  totalPage: number;
  totalPerPage: number;
  totalRevenue?: number;
};

type ApiResponse<T> = {
  code: number;
  data: T;
  message: string;
  meta?: Meta;
  success: boolean;
};

type TableParams = {
  filterBy?: string;
  order?: "asc" | "desc" | string;
  page: number | string;
  search?: string;
  size: number | string;
  sort?: string;
  status?: string;
};
