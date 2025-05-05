type SummaryTotal = {
  total: number;
};

type SummaryNormal = {
  total: number;
};

type SummaryAnomaly = {
  total: number;
};

type BarGizi = {
  resStatus0: number[];
  resStatus1: number[];
};

type DoughnutChart = {
  totalData: number;
  totalNormal: number;
  totalNotNormal: number;
};

type ReportParams = {
  year?: string;
  month?: string;
};
