import * as req from "../../utils/httpRequest";

const endpoint = {
  main: "/api/report",
  synthetic: "/api/synthetic",
};

export const summaryTotal = async () => {
  const data = await req.get<ApiResponse<SummaryTotal>>(
    `${endpoint.main}/total/all`
  );
  return data;
};

export const summaryNormal = async () => {
  const data = await req.get<ApiResponse<SummaryNormal>>(
    `${endpoint.main}/total/normal`
  );
  return data;
};

export const summaryAnomaly = async () => {
  const data = await req.get<ApiResponse<SummaryAnomaly>>(
    `${endpoint.main}/total/kurang`
  );
  return data;
};

export const barGizi = async (params: ReportParams) => {
  const data = await req.get<ApiResponse<BarGizi>>(
    `${endpoint.main}/status`,
    params
  );
  return data;
};

export const barAge = async (params: ReportParams) => {
  const data = await req.get<ApiResponse<number[]>>(
    `${endpoint.main}/age`,
    params
  );
  return data;
};

export const chartGizi = async (params: ReportParams) => {
  const data = await req.get<ApiResponse<DoughnutChart>>(
    `${endpoint.main}/gizi`,
    params
  );
  return data;
};

export const chartGender = async (params: ReportParams) => {
  const data = await req.get<ApiResponse<DoughnutChart>>(
    `${endpoint.main}/gender`,
    params
  );
  return data;
};

export const listSynthetic = async (params: TableParams) => {
  const data = await req.get<ApiResponse<DataList[]>>(
    `${endpoint.synthetic}/list`,
    params
  );
  return data;
};

export const totalData = async () => {
  const data = await req.get<ApiResponse<TotalData>>(
    `${endpoint.synthetic}/total`
  );
  return data;
};

export const totalAllData = async () => {
  const data = await req.get<ApiResponse<TotalData>>(
    `${endpoint.synthetic}/all`
  );
  return data;
};
