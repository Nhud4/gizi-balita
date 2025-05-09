import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import ICONS from "../../../configs/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchSummaryAnomaly,
  fetchSummaryNormal,
  fetchSummaryTotal,
} from "../../../redux/slice/report/action";
import { formatTotal } from "../../../utils";

type CardProps = {
  bg: string;
  color: string;
  title: string;
  value: number;
  loading?: boolean;
};

export const CardSummary = ({
  bg,
  color,
  title,
  value,
  loading,
}: CardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xl">
      <div
        className="p-3 rounded-full w-fit h-fit"
        style={{ backgroundColor: bg }}
      >
        <ICONS.Chart width={30} height={30} style={{ color }} />
      </div>

      <div>
        <h1 className="text-sm text-[#9E9E9E] capitalize">{title}</h1>
        {loading ? (
          <Skeleton />
        ) : (
          <p className="text-xl font-semibold">{formatTotal(value)}</p>
        )}
      </div>
    </div>
  );
};

export const Summary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: all, loading: allLoad } = useAppSelector(
    (state) => state.report.summaryTotal
  );
  const { data: normal, loading: normalLoad } = useAppSelector(
    (state) => state.report.summaryNormal
  );
  const { data: anomaly, loading: anomalyLoad } = useAppSelector(
    (state) => state.report.summaryAnomaly
  );
  const isLoading = allLoad || normalLoad || anomalyLoad;

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
  const dataValue = [all?.total || 0, normal?.total || 0, anomaly?.total || 0];

  useEffect(() => {
    dispatch(fetchSummaryTotal());
    dispatch(fetchSummaryNormal());
    dispatch(fetchSummaryAnomaly());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {new Array(3).fill(0).map((_, i) => (
        <CardSummary
          key={i}
          bg={colorList[i].bg}
          color={colorList[i].color}
          title={title[i]}
          value={dataValue[i]}
          loading={isLoading}
        />
      ))}
    </div>
  );
};
