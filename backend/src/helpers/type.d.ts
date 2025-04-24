type DataResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T | null;
};
