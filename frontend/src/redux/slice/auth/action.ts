import { createAsyncThunk } from "@reduxjs/toolkit";

import * as services from "../../../api/auth/auth.api";

export const fetchLoginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await services.login(payload);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchRegisterUSer = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await services.register(payload);
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchProfileUser = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.profile();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
