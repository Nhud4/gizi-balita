import { createSlice } from "@reduxjs/toolkit";

import { basicState, clearReducer, thunkBuilder } from "../../utils";
import { fetchLoginUser, fetchProfileUser, fetchRegisterUSer } from "./action";

interface AuthState {
  login: SliceState<LoginResponse | null>;
  register: SliceState<unknown>;
  profile: SliceState<UserProfile | null>;
}

const initialState: AuthState = {
  login: { ...basicState, data: null },
  register: basicState,
  profile: { ...basicState, data: null },
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
    thunkBuilder({ builder, key: "register", thunk: fetchRegisterUSer });
    thunkBuilder({ builder, key: "profile", thunk: fetchProfileUser });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
