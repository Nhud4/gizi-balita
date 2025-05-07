import { ChartData } from "chart.js";
import { useEffect, useState } from "react";

import BarChart from "../../../components/BarChart";
import DropdownInput from "../../../components/DropdownInput";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchGrafikAge } from "../../../redux/slice/report/action";
import { getYearList } from "../../../utils";

const thisYear = new Date().getFullYear();

export const ChartAge = () => {
  const { data: age } = useAppSelector((state) => state.report.grafikAge);
  const [year, setYear] = useState(thisYear.toString());
  const dispatch = useAppDispatch();

  const data: ChartData<"bar", number[], string> = {
    labels: ["< 10", "10", "20", "30", "40", "50", "50 >"],
    datasets: [
      {
        barPercentage: 0.5,
        label: "Usia Balita",
        data: age,
        backgroundColor: "#1E88E5",
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const yearList = getYearList(2000, thisYear);
  const yearOps = yearList
    .sort((a, b) => b - a)
    .map((item) => ({
      label: item.toString(),
      value: item.toString(),
    }));
  const selectedYear = yearOps.filter((item) => item.value === year)[0];

  useEffect(() => {
    dispatch(fetchGrafikAge({ year }));
  }, [dispatch, year]);

  return (
    <BarChart
      title="Kelompok Usia Balita"
      topTooltip
      year={year}
      chartData={data}
      actionComponent={
        <DropdownInput
          options={yearOps}
          value={selectedYear}
          onChange={(newValue) => {
            const ops = newValue as DropdownOption;
            setYear(ops.value);
          }}
        />
      }
    />
  );
};
