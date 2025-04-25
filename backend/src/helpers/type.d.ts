type DataResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T | null;
};

type TokenResponse = {
  userId: number;
  name: string;
  iat: number;
  exp: number;
};

type Meta = {
  page: number;
  totalPage: number;
  totalData: number;
  totalDataOnPage: number;
};
