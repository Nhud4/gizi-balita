import React, { JSX, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import ICONS from "../../configs/icons";
import FormLogin from "../../form/FormLogin";
import FormRegister from "../../form/FormRegister";
import styles from "./styles.module.css";

export const Login: React.FC = (): JSX.Element => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div
      className={`${styles.container} ${
        isSignUp ? styles.rightPanelActive : ""
      }`}
    >
      <div className={styles.logo}>
        {isSignUp ? (
          <ICONS.WhiteLogo width={50} height={50} />
        ) : (
          <ICONS.GreenLogo width={50} height={50} />
        )}
        <div className={isSignUp ? styles.whiteLogo : styles.greenLogo}>
          <h1>PUSKESMAS</h1>
          <p>Bojonegoro</p>
        </div>
      </div>

      <div
        className={`
        ${styles.formContainer}
        ${styles.signInContainer}
        `}
      >
        <div className={styles.wrapperForm}>
          <FormLogin />
        </div>
      </div>

      <div
        className={`
        ${styles.formContainer}
        ${styles.signUpContainer}
        `}
      >
        <div className={styles.wrapperForm}>
          <FormRegister
            isSignUp={isSignUp}
            onSuccess={() => {
              toast.success("Akun berhasil di buat");
              setIsSignUp(false);
            }}
          />
        </div>
      </div>

      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Yuk, Buat Akun Baru!</h1>
            <p>
              Isi data dirimu dan mulai pantau tumbuh kembang si kecil dengan
              lebih mudah. Sudah punya akun? Klik tombol di bawah untuk masuk.
            </p>
            <Button
              className={styles.overlayButton}
              onClick={() => setIsSignUp(false)}
            >
              Masuk
            </Button>
          </div>

          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hai, Selamat Datang di Aplikasi Gizi Balita</h1>
            <p>
              Yuk, catat dan pantau status gizi si kecil dengan mudah dan cepat.
              Belum punya akun? Klik tombol di bawah untuk daftar dulu, ya!
            </p>
            <Button
              className={styles.overlayButton}
              onClick={() => setIsSignUp(true)}
            >
              Daftar Akun
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
