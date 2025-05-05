import { createSlice } from "@reduxjs/toolkit";

import { basicState, clearReducer, thunkBuilder } from "../../utils";
import {
  fetchGrafikAge,
  fetchGrafikGizi,
  fetchPercentageGender,
  fetchPercentageGizi,
  fetchSummaryAnomaly,
  fetchSummaryNormal,
  fetchSummaryTotal,
} from "./action";

interface ReportState {
  summaryTotal: SliceState<SummaryTotal | null>;
  summaryNormal: SliceState<SummaryNormal | null>;
  summaryAnomaly: SliceState<SummaryAnomaly | null>;
  grafikGizi: SliceState<BarGizi | null>;
  grafikAge: SliceState<number[] | []>;
  percentageGizi: SliceState<DoughnutChart | null>;
  percentageGender: SliceState<DoughnutChart | null>;
}

const initialState: ReportState = {
  summaryTotal: { ...basicState, data: null },
  summaryNormal: { ...basicState, data: null },
  summaryAnomaly: { ...basicState, data: null },
  grafikGizi: { ...basicState, data: null },
  grafikAge: { ...basicState, data: [] },
  percentageGender: { ...basicState, data: null },
  percentageGizi: { ...basicState, data: null },
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReport: (state, actions) => {
      clearReducer(state, actions);
    },
  },
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: "summaryTotal", thunk: fetchSummaryTotal });
    thunkBuilder({ builder, key: "summaryNormal", thunk: fetchSummaryNormal });
    thunkBuilder({
      builder,
      key: "summaryAnomaly",
      thunk: fetchSummaryAnomaly,
    });
    thunkBuilder({ builder, key: "grafikGizi", thunk: fetchGrafikGizi });
    thunkBuilder({ builder, key: "grafikAge", thunk: fetchGrafikAge });
    thunkBuilder({
      builder,
      key: "percentageGizi",
      thunk: fetchPercentageGizi,
    });
    thunkBuilder({
      builder,
      key: "percentageGender",
      thunk: fetchPercentageGender,
    });
  },
});

export const { clearReport } = reportSlice.actions;

export default reportSlice.reducer;
