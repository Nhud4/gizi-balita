type SliceState<T> = {
  code: number;
  data: T;
  error: boolean;
  loading: boolean;
  message: string;
  meta?: Meta;
  success: boolean;
};

type SliceReducer<S> = {
  action?: PayloadAction<unknown, string, never>;
  key: keyof S | keyof Draft<S>;
  state: S | Draft<S>;
  type: "fulfilled" | "pending" | "rejected";
};

type QuerySliceParams<T, S> = {
  clearSlice?: ActionCreatorWithPayload;
  initial?: unknown;
  key: "detail" | "list" | "profile";
  onSuccess?: (data: S) => void;
  slice: keyof T;
  thunk: AsyncThunk;
};

type MutationSliceParams<S, T> = {
  clearSlice?: () => void;
  key: "add" | "edit" | "remove" | "login" | "register" | "upload" | "clean";
  onError?: () => void;
  onSuccess?: (data: T) => void;
  slice: keyof S;
};

type FieldError = {
  field: string;
  message: string;
};
