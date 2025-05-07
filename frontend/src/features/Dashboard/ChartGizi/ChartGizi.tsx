import { ChartData } from "chart.js";
import { useEffect, useState } from "react";

import BarChart from "../../../components/BarChart";
import DropdownInput from "../../../components/DropdownInput";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchGrafikGizi } from "../../../redux/slice/report/action";
import { getYearList } from "../../../utils";
import { labelsYears } from "../../../utils/chart";

const thisYear = new Date().getFullYear();

export const ChartGizi = () => {
  const { data: gizi } = useAppSelector((state) => state.report.grafikGizi);
  const [year, setYear] = useState(thisYear.toString());
  const dispatch = useAppDispatch();

  const data: ChartData<"bar", number[], string> = {
    labels: labelsYears,
    datasets: [
      {
        barPercentage: 0.8,
        label: "Gisi Normal",
        data: gizi?.resStatus0 || [],
        backgroundColor: "#00C6A9",
        borderRadius: 10,
        borderSkipped: false,
      },
      {
        barPercentage: 0.8,
        label: "Gizi Kurang",
        data: gizi?.resStatus1 || [],
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
    dispatch(fetchGrafikGizi({ year }));
  }, [dispatch, year]);

  return (
    <BarChart
      title="Grafik Gizi Balita"
      chartData={data}
      legend
      year={year}
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
