import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import React, { Key } from "react";
import { Doughnut } from "react-chartjs-2";

import { baseChartOptions } from "../../utils/chart";

ChartJS.register(ArcElement, Tooltip, Legend);

delete baseChartOptions.scales;
const chartOptions = {
  ...baseChartOptions,
  cutout: "60%",
  plugins: {
    ...baseChartOptions.plugins,
    tooltip: {
      enabled: true,
      backgroundColor: "#fff",
      displayColors: false,
      titleFontSize: 14,
      titleAlign: "center",
      titleColor: "#1C627F",
      bodyFontSize: 12,
      bodyAlign: "center",
      bodyColor: "#1C627F",
      borderWidth: 1,
      borderColor: "#D4D4D4",
      callbacks: {
        title: (item) => {
          return item[0].label;
        },
        label: (item) => {
          const { dataset } = item;
          const total = dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = `${Math.round((item.parsed / total) * 100)}%`;

          return `${item.formattedValue} (${percentage})`;
        },
      },
    },
  },
} as ChartOptions<"doughnut">;

type Props = {
  actionComponent?: React.ReactElement;
  data: ChartData<"doughnut", number[], string>;
  title?: string;
};

export const DoughnutChart: React.FC<Props> = ({
  actionComponent,
  data,
  title = "Doughnut Chart",
}): React.ReactElement => {
  const total = data.datasets[0].data.reduce((a, b) => a + b);
  return (
    <div className="flex flex-col justify-between bg-white p-6 rounded-xl shadow-2xl h-full">
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        {actionComponent}
      </div>

      <div className="h-56">
        <Doughnut data={data} options={chartOptions} />
      </div>

      <div className="grid grid-cols-2 w-full border border-[#D4D4D4] rounded-xl p-4">
        {data.datasets[0].data.map((item, key) => (
          <div
            key={key as Key}
            className={key !== 0 ? "border-l border-[#D4D4D4] pl-4" : ""}
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: Array.isArray(data.datasets[0].backgroundColor)
                    ? data.datasets[0].backgroundColor[key] ?? "#fff"
                    : "#fff",
                }}
              />
              <span className="text-sm text-[#9E9E9E]">
                {data?.labels?.[key] ?? ""}
              </span>
            </div>

            <p className="text-lg font-semibold pl-[1.3rem]">
              {((item / total) * 100).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
