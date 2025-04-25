type UploadDataPayload = {
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  lila: string;
  status: string;
  created_at: Date;
};

type ListParams = {
  page: number;
  size: number;
  search?: string;
  gizi?: string;
  gender?: string;
};
