/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQuerySlice = <T, P>({
  slice,
  key,
  clearSlice,
  onSuccess,
  thunk,
  initial,
}: QuerySliceParams<RootState, T>) => {
  const dispatch = useAppDispatch();
  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice];
    return stateObj[key as keyof typeof stateObj] as SliceState<T>;
  });
  const { error, message, success, data } = sliceState;

  useEffect(() => {
    if (clearSlice) {
      if (error) {
        dispatch(clearSlice);
        toast.error("Terjadi kesalahan saat mengambil data");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message]);

  useEffect(() => {
    if (onSuccess) {
      if (success) {
        onSuccess(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, data]);

  useEffect(() => {
    if (initial) {
      dispatch(thunk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  return { ...sliceState, refetch: (_args?: P) => dispatch(thunk) };
};

export const useMutationSlice = <T>({
  slice,
  key,
  onSuccess,
  clearSlice,
}: MutationSliceParams<RootState, T>) => {
  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice];
    return stateObj[key as keyof typeof stateObj] as SliceState<T>;
  });
  const { error, success, message, data } = sliceState;

  const successMessage = {
    add: "Data berhasil ditambahkan",
    edit: "Data berhasil diperbarui",
    remove: "Data berhasil dihapus",
    login: "Anda berhasil login, tunggu beberapa saat untuk masuk ke beranda",
    register: "Pendaftaran berhasil, silahkan masuk dengan akun anda",
    upload: "Data berhasil diunggah",
    clean: "Berhasil menghapus semua data",
  };

  useEffect(() => {
    if (clearSlice) {
      if (error || success) {
        if (success) {
          if (onSuccess) onSuccess(data);
          clearSlice();
          toast.success(successMessage[key]);
        }

        if (error) {
          toast.error(message);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success, message, data]);

  return { ...sliceState };
};
