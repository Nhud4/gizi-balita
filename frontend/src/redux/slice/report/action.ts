import { createAsyncThunk } from "@reduxjs/toolkit";

import * as services from "../../../api/report/report.api";
import { generateNoColumn } from "../../../utils";

export const fetchSummaryTotal = createAsyncThunk(
  "report/summary/total",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.summaryTotal();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchSummaryNormal = createAsyncThunk(
  "report/summary/normal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.summaryNormal();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchSummaryAnomaly = createAsyncThunk(
  "report/summary/anomaly",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.summaryAnomaly();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchGrafikGizi = createAsyncThunk(
  "report/grafik/gizi",
  async (params: ReportParams, { rejectWithValue }) => {
    try {
      const response = await services.barGizi(params);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchGrafikAge = createAsyncThunk(
  "report/grafik/age",
  async (params: ReportParams, { rejectWithValue }) => {
    try {
      const response = await services.barAge(params);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchPercentageGizi = createAsyncThunk(
  "report/percentage/gizi",
  async (params: ReportParams, { rejectWithValue }) => {
    try {
      const response = await services.chartGizi(params);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchPercentageGender = createAsyncThunk(
  "report/percentage/gender",
  async (params: ReportParams, { rejectWithValue }) => {
    try {
      const response = await services.chartGender(params);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchListSynthetic = createAsyncThunk(
  "synthetic/list",
  async (params: TableParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.listSynthetic(params);

      return {
        ...res,
        data: data.map((item, index) => ({
          ...item,
          no: generateNoColumn(meta, index, Number(params.size)),
        })),
        meta,
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchTotalData = createAsyncThunk(
  "synthetic/total",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.totalData();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchTotalAllData = createAsyncThunk(
  "synthetic/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.totalAllData();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
