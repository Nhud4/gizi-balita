import React, { useContext } from "react";
import IMAGES from "../../configs/images";
import ICONS from "../../configs/icons";
import { ModalContext } from "../../contexts/ModalContext";
import ConfirmationContent from "../ConfirmationContent";

import styles from "./styles.module.css";

type Props = {
  title?: string;
};

export const Header: React.FC<Props> = ({ title }) => {
  const { setModal } = useContext(ModalContext);

  const onLogout = () => {
    setModal({
      open: true,
      content: <ConfirmationContent confirmationType="logout" />,
      type: "confirmation",
      confirmationType: "logout",
    });
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        <div className={styles.admin}>
          <h1>Admin Satu</h1>
          <img src={IMAGES.Avatar} alt="avatar" />
        </div>

        <button className={styles.button} onClick={onLogout}>
          <ICONS.Power />
        </button>
      </div>
    </div>
  );
};
