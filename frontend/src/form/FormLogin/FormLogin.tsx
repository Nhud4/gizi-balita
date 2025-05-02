import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date();
    date.setDate(date.getDate() + 1);

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
      setUserToken({ exp: date.toISOString(), token: formValues.username });
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (formValues.username) {
      setErr((prev) => ({ ...prev, username: "" }));
    }
    if (formValues.password) {
      setErr((prev) => ({ ...prev, password: "" }));
    }
  }, [formValues]);

  return (
    <form className="w-[75%] space-y-8" onSubmit={onSubmit}>
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
        Masuk
      </Button>
    </form>
  );
};
