import * as req from "../../utils/httpRequest";

const endpoint = {
  main: "/api/data",
};

export const listData = async (params: DataListParams) => {
  const data = await req.get<ApiResponse<DataList[]>>(
    `${endpoint.main}/list`,
    params
  );
  return data;
};

export const detailData = async (id: string) => {
  const data = await req.get<ApiResponse<DataList>>(
    `${endpoint.main}/detail/${id}`
  );
  return data;
};

export const createData = async (payload: DataPayload) => {
  const data = await req.post<ApiResponse<DataResponse>>(
    `${endpoint.main}/create`,
    payload
  );
  return data;
};

export const uploadData = async (payload: UploadPayload) => {
  const data = await req.post(`${endpoint.main}/upload`, payload);
  return data;
};

export const updateData = async (id: string, payload: UpdatePayload) => {
  const data = await req.patch(`${endpoint.main}/update/${id}`, payload);
  return data;
};

export const removeData = async (id: string) => {
  const data = await req.remove(`${endpoint.main}/delete/${id}`);
  return data;
};

export const removeAllData = async () => {
  const data = await req.remove(`${endpoint.main}/clear`);
  return data;
};
