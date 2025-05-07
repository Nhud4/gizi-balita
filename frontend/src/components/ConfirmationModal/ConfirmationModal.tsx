import React, { useState } from "react";

import Button from "../Button";
import Spinner from "../Spinner";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  open: boolean;
  title?: string;
  children: React.ReactNode;
  confirmationType?: "delete" | "add" | "edit" | "logout";
  onConfirm?: () => void;
};

export const ConfirmationModal: React.FC<Props> = ({
  open,
  onClose,
  children,
  confirmationType,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  if (open) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className="px-4">{children}</div>
          {confirmationType === "add" ? (
            <div className="flex justify-center items-center gap-4">
              <Button className={styles.cancel} onClick={onClose}>
                Batal
              </Button>
              <Button
                className={styles.confirm}
                onClick={() => {
                  setLoading(true);
                  if (onConfirm) onConfirm();
                }}
              >
                {loading ? <Spinner /> : "Konfirmasi"}
              </Button>
            </div>
          ) : null}

          {confirmationType === "delete" ? (
            <div className="flex justify-center items-center gap-4">
              <Button
                className={styles.cancel}
                onClick={() => {
                  setLoading(true);
                  if (onConfirm) onConfirm();
                }}
              >
                {loading ? <Spinner type="secondary" /> : "Ya, Hapus"}
              </Button>
              <Button className={styles.confirm} onClick={onClose}>
                Batal
              </Button>
            </div>
          ) : null}

          {confirmationType === "logout" ? (
            <div className="flex justify-center items-center gap-4">
              <Button className={styles.cancel} onClick={onConfirm}>
                Ya, Keluar
              </Button>
              <Button className={styles.confirm} onClick={onClose}>
                Batal
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return null;
};
