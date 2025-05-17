import { ChartData } from "chart.js";
import React, { useEffect } from "react";

import BarChart from "../../../components/BarChart";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchTotalAllData } from "../../../redux/slice/report/action";

type Props = {
  data: DataResponse;
};

export const TotalAllData: React.FC<Props> = ({ data }) => {
  const { data: total } = useAppSelector((state) => state.report.totalAllData);
  const dispatch = useAppDispatch();

  const chartData: ChartData<"bar", number[], string> = {
    labels: ["Gizi Normal", "Gizi Kurang"],
    datasets: [
      {
        barPercentage: 0.8,
        label: "Jumlah",
        data: [total?.normal || 0, total?.anomaly || 0],
        backgroundColor: ["#1E88E5", "#FFC107"],
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchTotalAllData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <BarChart title="Data Sesudah Smooth" chartData={chartData} year=" " />
  );
};
