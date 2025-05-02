import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";

type Props = {
  onSuccess?: () => void;
  isSignUp?: boolean;
};

type Values = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const defaultValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const defaultErr = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const MessageErr = (
  values: Values,
  state: React.Dispatch<React.SetStateAction<Values>>
) => {
  const label = {
    name: "Nama akun",
    username: "Nama pengguna",
    password: "Kata sandi",
    confirmPassword: "Konfirmasi kata sandi",
  };

  Object.keys(values).forEach((item) => {
    const key = item as keyof Values;
    if (!values[key]) {
      state((prev) => ({ ...prev, [key]: `${label[key]} tidak boleh kosong` }));
    }
  });
};

export const FormRegister: React.FC<Props> = ({ onSuccess, isSignUp }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [err, setErr] = useState(defaultErr);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formValues.name ||
      !formValues.username ||
      !formValues.password ||
      !formValues.confirmPassword
    ) {
      MessageErr(formValues, setErr);
    } else if (onSuccess) {
      onSuccess();
    }
  };

  useEffect(() => {
    Object.keys(formValues).forEach((item) => {
      const key = item as keyof Values;
      if (formValues[key]) {
        setErr((prev) => ({
          ...prev,
          [key]: "",
        }));
      }
    });

    if (formValues.password || formValues.confirmPassword) {
      setErr((prev) => ({
        ...prev,
        confirmPassword:
          formValues.password !== formValues.confirmPassword
            ? "Konfirmasi kata sandi tidak sama"
            : "",
      }));
    }
  }, [formValues]);

  useEffect(() => {
    if (isSignUp) {
      setFormValues(defaultValues);
    }
  }, [isSignUp]);

  return (
    <form className="w-[75%] space-y-8" onSubmit={onSubmit}>
      <div className="text-left space-y-3">
        <h1 className="text-2xl font-bold">Daftar Akun Baru</h1>
        <p className="text-[#9E9E9E]">
          Buat akun Anda untuk mulai menggunakan layanan kami
        </p>
      </div>

      <div className="space-y-3">
        <TextInput
          label="Nama Akun"
          isRequired
          placeholder="Nama Akun"
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
          errMessage={err.name}
        />

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

        <PasswordInput
          label="Konfirmasi Kata sandi"
          isRequired
          placeholder="Masukkan ulang kata sandi anda"
          value={formValues.confirmPassword}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          errMessage={err.confirmPassword}
        />
      </div>

      <Button className="!rounded-full !w-full font-semibold" type="submit">
        Buat Akun
      </Button>
    </form>
  );
};
