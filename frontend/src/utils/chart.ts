import { ChartOptions } from "chart.js";

export const labelsYears = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Des",
];

export const baseChartOptions: ChartOptions = {
  onHover: (event, element) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas: any = event.native?.target;
    canvas.style.cursor = element[0] ? "pointer" : "default";
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: {
      top: 20,
    },
  },
};
