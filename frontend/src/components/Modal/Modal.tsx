import React from "react";
import ICONS from "../../configs/icons";

import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  open: boolean;
  title?: string;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({
  open,
  title = "Modal Title",
  onClose,
  children,
}) => {
  if (open) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <button onClick={onClose}>
              <ICONS.Close height="26" width="26" />
            </button>
            {title ? <h5>{title}</h5> : null}
          </div>
          <div className="px-4 mt-4">{children}</div>
        </div>
      </div>
    );
  }

  return null;
};
