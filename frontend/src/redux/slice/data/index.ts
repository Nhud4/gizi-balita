import { createSlice } from "@reduxjs/toolkit";

import { basicState, clearReducer, meta, thunkBuilder } from "../../utils";
import {
  fetchCleanData,
  fetchCreateData,
  fetchDetailData,
  fetchListData,
  fetchRemoveData,
  fetchUpdateData,
  fetchUploadData,
} from "./action";

interface DataState {
  list: SliceState<DataList[]>;
  detail: SliceState<DataList | null>;
  add: SliceState<DataResponse | null>;
  upload: SliceState<unknown>;
  edit: SliceState<unknown>;
  remove: SliceState<unknown>;
  clean: SliceState<unknown>;
}

const initialState: DataState = {
  list: { ...basicState, meta },
  detail: { ...basicState, data: null },
  add: { ...basicState, data: null },
  upload: basicState,
  edit: basicState,
  remove: basicState,
  clean: basicState,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData: (state, actions) => {
      clearReducer(state, actions);
    },
  },
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: "list", thunk: fetchListData });
    thunkBuilder({ builder, key: "detail", thunk: fetchDetailData });
    thunkBuilder({ builder, key: "add", thunk: fetchCreateData });
    thunkBuilder({ builder, key: "upload", thunk: fetchUploadData });
    thunkBuilder({ builder, key: "edit", thunk: fetchUpdateData });
    thunkBuilder({ builder, key: "remove", thunk: fetchRemoveData });
    thunkBuilder({ builder, key: "clean", thunk: fetchCleanData });
  },
});

export const { clearData } = dataSlice.actions;

export default dataSlice.reducer;
