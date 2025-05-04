import { ChartData } from "chart.js";

import DoughnutChart from "../../../components/DoughnutChart";
import DropdownInput from "../../../components/DropdownInput";
import { getYearList } from "../../../utils";
import { labelsYears } from "../../../utils/chart";

const thisYear = new Date().getFullYear();

export const PercentageGizi = () => {
  const data: ChartData<"doughnut", number[], string> = {
    labels: ["Gizi Normal", "Gizi Kurang"],
    datasets: [
      {
        label: "# of Votes",
        data: [1500, 1500],
        backgroundColor: ["#00C6A9", "#1E88E5"],
        borderWidth: 4,
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

  const monthOps = labelsYears.map((item, index) => ({
    label: item,
    value: (index + 1).toString(),
  }));

  return (
    <DoughnutChart
      data={data}
      title="Persentase Gizi Balita"
      actionComponent={
        <div className="flex items-center gap-1">
          <DropdownInput options={yearOps} defaultValue={yearOps[0]} />
          <DropdownInput options={monthOps} defaultValue={monthOps[0]} />
        </div>
      }
    />
  );
};
