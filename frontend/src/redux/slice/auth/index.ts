import { createSlice } from "@reduxjs/toolkit";

import { basicState, clearReducer, thunkBuilder } from "../../utils";
import { fetchLoginUser } from "./action";

interface AuthState {
  login: SliceState<LoginResponse | null>;
}

const initialState: AuthState = {
  login: { ...basicState, data: null },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state, actions) => {
      clearReducer(state, actions);
    },
  },
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: "login", thunk: fetchLoginUser });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
