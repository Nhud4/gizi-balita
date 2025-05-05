import { ChartData } from "chart.js";
import { useEffect, useState } from "react";

import DoughnutChart from "../../../components/DoughnutChart";
import DropdownInput from "../../../components/DropdownInput";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchPercentageGender } from "../../../redux/slice/report/action";
import { getYearList } from "../../../utils";
import { labelsYears } from "../../../utils/chart";

const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();

export const PercentageGender = () => {
  const { data: gender } = useAppSelector(
    (state) => state.report.percentageGender
  );
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(thisYear.toString());
  const [month, setMonth] = useState((thisMonth + 1).toString());

  const data: ChartData<"doughnut", number[], string> = {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [
      {
        label: "# of Votes",
        data: [gender?.totalNormal || 0, gender?.totalNotNormal || 0],
        backgroundColor: ["#1E88E5", "#FFC107"],
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
  const selectYear = yearOps.filter((item) => item.value === year);

  const monthOps = labelsYears.map((item, index) => ({
    label: item,
    value: (index + 1).toString(),
  }));
  const selectMonth = monthOps.filter((item) => item.value === month);

  useEffect(() => {
    dispatch(fetchPercentageGender({ year, month }));
  }, [dispatch, year, month]);

  return (
    <DoughnutChart
      data={data}
      title="Jenis Kelamin"
      actionComponent={
        <div className="flex items-center gap-1">
          <DropdownInput
            options={yearOps}
            value={selectYear}
            onChange={(newValue) => {
              const ops = newValue as DropdownOption;
              setYear(ops.value);
            }}
          />
          <DropdownInput
            options={monthOps}
            value={selectMonth}
            onChange={(newValue) => {
              const ops = newValue as DropdownOption;
              setMonth(ops.value);
            }}
          />
        </div>
      }
    />
  );
};
