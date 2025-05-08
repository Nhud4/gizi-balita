import React, { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import ICONS from "../../configs/icons";
import IMAGES from "../../configs/images";
import { ModalContext } from "../../contexts/ModalContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProfileUser } from "../../redux/slice/auth/action";
import { clearStorage } from "../../storage";
import ConfirmationContent from "../ConfirmationContent";
import styles from "./styles.module.css";

type Props = {
  title?: string;
};

export const Header: React.FC<Props> = ({ title }) => {
  const { data, loading } = useAppSelector((state) => state.auth.profile);
  const { setModal } = useContext(ModalContext);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    setModal({
      open: true,
      content: <ConfirmationContent confirmationType="logout" />,
      type: "confirmation",
      confirmationType: "logout",
      onConfirm: () => {
        clearStorage();
        window.location.href = "/login";
      },
    });
  };

  useEffect(() => {
    dispatch(fetchProfileUser());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        <div className={styles.admin}>
          {loading ? (
            <Skeleton width={50} />
          ) : (
            <h1 className="capitalize">{data?.name}</h1>
          )}
          <img src={IMAGES.Avatar} alt="avatar" />
        </div>

        <button className={styles.button} onClick={onLogout}>
          <ICONS.Power />
        </button>
      </div>
    </div>
  );
};
