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
