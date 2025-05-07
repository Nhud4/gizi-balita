import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { HTMLProps, Key } from "react";
import { Bar } from "react-chartjs-2";

import { clsx } from "../../utils";
import { baseChartOptions } from "../../utils/chart";
import styles from "./styles.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = HTMLProps<HTMLDivElement> & {
  actionComponent?: React.ReactElement;
  chartData: ChartData<"bar", number[], string>;
  legend?: boolean;
  options?: ChartOptions<"bar">;
  title?: string;
  year?: string;
  topTooltip?: boolean;
};

export const BarChart: React.FC<Props> = React.memo(
  ({
    actionComponent,
    chartData,
    options,
    title = "Bar Chart",
    legend,
    year,
    topTooltip,
    ...props
  }): React.ReactElement => {
    const chartOptions = {
      ...baseChartOptions,
      plugins: {
        ...baseChartOptions.plugins,
        tooltip: {
          backgroundColor: "#fff",
          displayColors: false,
          caretPadding: 8,
          yAlign: "bottom",
          bodyAlign: "center",
          bodyColor: "#1C627F",
          titleAlign: "center",
          titleColor: "#1C627F",
          borderWidth: 1,
          borderColor: "#D4D4D4",
          callbacks: {
            title: (item) => {
              return topTooltip
                ? `${item[0].dataset.label} ${item[0].label}`
                : item[0].dataset.label;
            },
            label: (item) => {
              return [
                item.formattedValue,
                topTooltip
                  ? `Tahun ${year || new Date().getFullYear()}`
                  : `${item.label} ${year || new Date().getFullYear()}`,
              ];
            },
          },
        },
      },
      scales: {
        y: {
          grid: {
            borderDash: [15],
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    } as ChartOptions<"bar">;

    return (
      <div className="bg-white p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">{title}</h1>
          {actionComponent}
        </div>
        <div>
          {legend ? (
            <div className="flex items-center space-x-8 py-4 w-full">
              {chartData.datasets.map((item, index) => (
                <div key={index as Key} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.backgroundColor as string }}
                  />
                  <h1 className="text-sm text-[#9E9E9E]">{item.label}</h1>
                </div>
              ))}
            </div>
          ) : null}

          <div
            {...props}
            className={clsx([styles.chart, props.className as string])}
          >
            <Bar
              data={chartData}
              options={{
                ...chartOptions,
                ...options,
                layout: {
                  padding: {
                    top: legend ? 20 : 40,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);
