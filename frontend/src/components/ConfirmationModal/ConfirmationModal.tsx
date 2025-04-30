import React from "react";
import Button from "../Button";

import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  open: boolean;
  title?: string;
  children: React.ReactNode;
  confirmationType?: "delete" | "add" | "edit" | "logout";
};

export const ConfirmationModal: React.FC<Props> = ({
  open,
  onClose,
  children,
  confirmationType,
}) => {
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
              <Button className={styles.confirm}>Konfirmasi</Button>
            </div>
          ) : null}

          {confirmationType === "delete" ? (
            <div className="flex justify-center items-center gap-4">
              <Button className={styles.cancel}>Ya, Hapus</Button>
              <Button className={styles.confirm} onClick={onClose}>
                Batal
              </Button>
            </div>
          ) : null}

          {confirmationType === "logout" ? (
            <div className="flex justify-center items-center gap-4">
              <Button className={styles.cancel}>Ya, Keluar</Button>
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
