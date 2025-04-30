import React from "react";
import ICONS from "../../../configs/icons";

type CardProps = {
  bg: string;
  color: string;
  title: string;
  value: number;
};

export const CardSummary = ({ bg, color, title, value }: CardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xl">
      <div
        className="p-3 rounded-full w-fit h-fit"
        style={{ backgroundColor: bg }}
      >
        <ICONS.Chart width={30} height={30} style={{ color }} />
      </div>

      <div>
        <h1 className="text-sm text-[#9E9E9E]">{title}</h1>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export const Summary: React.FC = () => {
  const colorList = [
    { bg: "#38F4D1", color: "#009276" },
    { bg: "#B4DAFA", color: "#1E88E5" },
    { bg: "#FBEEC7", color: "#FFC107" },
  ];
  const title = [
    "total data balita",
    "total balita gizi normal",
    "total balita gizi kurang",
  ];
  const dataValue = [1500, 1500, 3000];

  return (
    <div className="grid grid-cols-3 gap-4">
      {new Array(3).fill(0).map((_, i) => (
        <CardSummary
          key={i}
          bg={colorList[i].bg}
          color={colorList[i].color}
          title={title[i]}
          value={dataValue[i]}
        />
      ))}
    </div>
  );
};
