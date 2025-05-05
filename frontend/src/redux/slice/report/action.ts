import { createAsyncThunk } from "@reduxjs/toolkit";

import * as services from "../../../api/report/report.api";

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
