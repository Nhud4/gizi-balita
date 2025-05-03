import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";
import Spinner from "../../components/Spinner";
import TextInput from "../../components/TextInput";
import { useAppDispatch, useMutationSlice } from "../../redux/hooks";
import { clearAuth } from "../../redux/slice/auth";
import { fetchLoginUser } from "../../redux/slice/auth/action";
import { setUserToken } from "../../storage";

const defaultValues = {
  username: "",
  password: "",
};

const defaultErr = {
  username: "",
  password: "",
};

export const FormLogin: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginPayload>(defaultValues);
  const [err, setErr] = useState(defaultErr);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.username || !formValues.password) {
      if (!formValues.username) {
        setErr((prev) => ({
          ...prev,
          username: "Username tidak boleh kosong",
        }));
      }
      if (!formValues.password) {
        setErr((prev) => ({
          ...prev,
          password: "Password tidak boleh kosong",
        }));
      }
    } else {
      dispatch(fetchLoginUser(formValues));
    }
  };

  const { loading } = useMutationSlice({
    key: "login",
    slice: "auth",
    clearSlice: () => dispatch(clearAuth("login")),
    onSuccess: (data) => {
      setUserToken(data as UserToken);
      setIsLogin(true);
    },
  });

  useEffect(() => {
    if (formValues.username) {
      setErr((prev) => ({ ...prev, username: "" }));
    }
    if (formValues.password) {
      setErr((prev) => ({ ...prev, password: "" }));
    }
  }, [formValues]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLogin) {
      timeout = setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isLogin]);

  return (
    <form className="w-[65%] space-y-8" onSubmit={onSubmit}>
      <div className="text-left space-y-3">
        <h1 className="text-2xl font-bold">Masuk ke Akun Anda</h1>
        <p className="text-[#9E9E9E]">
          Masukkan nama pengguna dan kata sandi Anda untuk mulai menggunakan
          layanan
        </p>
      </div>

      <div className="space-y-3">
        <TextInput
          label="Nama Pengguna"
          isRequired
          placeholder="Nama Pengguna"
          value={formValues.username}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, username: e.target.value }))
          }
          errMessage={err.username}
        />

        <PasswordInput
          label="Kata sandi"
          isRequired
          placeholder="Masukkan kata sandi anda"
          value={formValues.password}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
          errMessage={err.password}
        />
      </div>

      <Button className="!rounded-full !w-full font-semibold" type="submit">
        {loading ? <Spinner /> : "Masuk"}
      </Button>
    </form>
  );
};
