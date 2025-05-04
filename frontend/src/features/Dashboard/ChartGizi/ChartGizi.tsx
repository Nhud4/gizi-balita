import { ChartData } from "chart.js";
import { useState } from "react";

import BarChart from "../../../components/BarChart";
import DropdownInput from "../../../components/DropdownInput";
import { getYearList } from "../../../utils";
import { labelsYears } from "../../../utils/chart";

const thisYear = new Date().getFullYear();

export const ChartGizi = () => {
  const [year, setYear] = useState(thisYear.toString());
  const data: ChartData<"bar", number[], string> = {
    labels: labelsYears,
    datasets: [
      {
        barPercentage: 0.8,
        label: "Gisi Normal",
        data: [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300],
        backgroundColor: "#00C6A9",
        borderRadius: 10,
        borderSkipped: false,
      },
      {
        barPercentage: 0.8,
        label: "Gizi Kurang",
        data: [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300],
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

  return (
    <BarChart
      chartData={data}
      legend
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
