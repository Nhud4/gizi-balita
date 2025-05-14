import { createAsyncThunk } from "@reduxjs/toolkit";

import * as services from "../../../api/data/data.api";
import { generateNoColumn } from "../../../utils";

export const fetchListData = createAsyncThunk(
  "data/list",
  async (params: DataListParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.listData(params);

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

export const fetchDetailData = createAsyncThunk(
  "data/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await services.detailData(id);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchCreateData = createAsyncThunk(
  "data/crate",
  async (payload: DataPayload, { rejectWithValue }) => {
    try {
      const { data, ...res } = await services.createData(payload);
      return {
        ...res,
        data: {
          ...data,
          neighbor: data.neighbor.map((item, index) => ({
            ...item,
            no: index + 1,
          })),
        },
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchUploadData = createAsyncThunk(
  "data/upload",
  async (payload: UploadPayload, { rejectWithValue }) => {
    try {
      const response = await services.uploadData(payload);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchUpdateData = createAsyncThunk(
  "data/update",
  async (
    params: { id: string; payload: UpdatePayload },
    { rejectWithValue }
  ) => {
    try {
      const { id, payload } = params;
      const response = await services.updateData(id, payload);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchRemoveData = createAsyncThunk(
  "data/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await services.removeData(id);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchCleanData = createAsyncThunk(
  "data/clean",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.removeAllData();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
