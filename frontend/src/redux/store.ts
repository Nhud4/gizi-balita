import { configureStore } from "@reduxjs/toolkit";

import auth from "./slice/auth";
import data from "./slice/data";
import report from "./slice/report";

export const store = configureStore({
  reducer: {
    auth,
    data,
    report,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
