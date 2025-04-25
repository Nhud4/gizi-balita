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

type DataList = {
  id: number;
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  lila: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type TotalData = {
  total: number;
  status: string;
};

type MinimumData = {
  min_age: string;
  min_weight: string;
  min_height: string;
  min_lila: string;
};

type MaximumData = {
  max_age: string;
  max_weight: string;
  max_height: string;
  max_lila: string;
};

type CreateDataPayload = {
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  lila: string;
  k: number;
};

type InsertData = {
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  lila: string;
  status: string;
};
