import React from "react";
import { clsx } from "../../utils";

import styles from "./styles.module.css";

type Props = {
  children: string | React.ReactNode;
  className?: string;
  color?: "primary" | "secondary";
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({
  children,
  className = "",
  color = "primary",
  onClick,
}) => {
  return (
    <button
      className={clsx([styles.base, styles[color], className])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
